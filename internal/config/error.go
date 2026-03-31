package config

import "log"

func validate(cfg *Config) {
	if cfg.GeminiKey == "" {
		log.Fatal("No .env file found in root of Backend directory")
	}
}