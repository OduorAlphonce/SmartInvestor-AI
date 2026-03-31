package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	GeminiKey string
}

func Load() *Config {
	// Load .env if present (safe in prod too)
	_ = godotenv.Load("../../.env")

	cfg := &Config{
		GeminiKey: getEnv("OPENROUTER_API_KEY", ""),
	}

	validate(cfg)
	return cfg
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}