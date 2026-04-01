package main

import (
	"time"

	"github.com/OduorAlphonce/SmartInvestor-AI/config"
	"github.com/OduorAlphonce/SmartInvestor-AI/handlers"
	"github.com/OduorAlphonce/SmartInvestor-AI/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	cfg := config.Load()

	r := gin.Default()

	// CORS
	allowOrigins := []string{
		"http://localhost:3000",
	}
	if cfg.FrontendURL != "" {
		allowOrigins = append(allowOrigins, cfg.FrontendURL)
	}

	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowOrigins,
		AllowMethods:     []string{"GET", "POST", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Rate limiting
	r.Use(middleware.RateLimiter())

	// Routes
	for _, healthPath := range []string{"/ping", "/health", "/api/ping", "/api/health"} {
		r.GET(healthPath, handlers.PingHandler)
	}
	for _, pricingPath := range []string{"/price/recommend", "/api/price/recommend"} {
		r.POST(pricingPath, handlers.PriceRecommendingHandler)
	}

	// Start cleanup worker
	go middleware.CleanupClients()

	r.Run(":" + cfg.Port)
}
