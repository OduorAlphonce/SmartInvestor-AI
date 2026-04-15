package middleware

import (
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

type ClientLimiter struct {
	limiter  *rate.Limiter
	lastSeen time.Time
}

var (
	clients = make(map[string]*ClientLimiter)
	mu      sync.Mutex
)

func RateLimiter() gin.HandlerFunc {
	return func(c *gin.Context) {
		ip := c.ClientIP()

		mu.Lock()
		client, exists := clients[ip]
		if !exists {
			clients[ip] = &ClientLimiter{
				limiter:  rate.NewLimiter(1, 5), // 1 req/sec, burst 5
				lastSeen: time.Now(),
			}
			client = clients[ip]
		}
		client.lastSeen = time.Now()
		mu.Unlock()

		if !client.limiter.Allow() {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"error": "rate limit exceeded",
			})
			return
		}

		c.Next()
	}
}

func CleanupClients() {
	for {
		time.Sleep(time.Minute)
		mu.Lock()
		for ip, client := range clients {
			if time.Since(client.lastSeen) > 3*time.Minute {
				delete(clients, ip)
			}
		}
		mu.Unlock()
	}
}
