package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/OduorAlphonce/SmartInvestor-AI/config"
	"github.com/OduorAlphonce/SmartInvestor-AI/handlers"
	"github.com/OduorAlphonce/SmartInvestor-AI/middleware"

	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Initialize Sentry
	err := sentry.Init(sentry.ClientOptions{
		Dsn:              os.Getenv("SENTRY_DSN"),
		EnableTracing:    true,
		TracesSampleRate: 1.0,
	})
	if err != nil {
		log.Fatalf("sentry.Init: %s", err)
	}
	defer sentry.Flush(2 * time.Second)

	cfg := config.Load()
	fmt.Println("cfg : ", cfg)

	r := gin.Default()

	// Sentry middleware
	r.Use(sentrygin.New(sentrygin.Options{
		Repanic: true,
	}))

	// CORS
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:3000",
			"https://yourdomain.com",
		},
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Rate limiting
	r.Use(middleware.RateLimiter())

	// Routes
	r.GET("/ping", handlers.PingHandler)
	r.POST("/api/price/recommend", handlers.PriceRecommendingHandler)

	// Start cleanup worker
	go middleware.CleanupClients()

	r.Run() // :8080
}