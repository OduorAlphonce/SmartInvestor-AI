package main

import (
    "fmt"
	"time"

	"github.com/OduorAlphonce/SmartInvestor-AI/config"
	"github.com/OduorAlphonce/SmartInvestor-AI/handlers"
	"github.com/OduorAlphonce/SmartInvestor-AI/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()
	fmt.Println("cfg : ", cfg)

	r := gin.Default()

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