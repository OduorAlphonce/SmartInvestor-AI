package services

import (
	"errors"
	"math"

	"github.com/OduorAlphonce/SmartInvestor-AI/models"
)

func CalculateBasePrice(unitCost, desiredMargin float64) float64 {
	// formula for calculating profit margin

	basePrice := unitCost * (1 + desiredMargin/100)
	return basePrice
}

func CalculateSuggestedRange(basePrice, competitorMin, competitorMax float64) (min float64, max float64, err error) {
	if competitorMin > competitorMax {
		return -1, -1, errors.New("invalid competitormin value : competitormin > competitormax")
	}

	min = math.Max(basePrice, competitorMin)
	max = competitorMax

	return min, max, nil
}

func CalculateRecommendedPrice(basePrice, competitorMin, competitorMax float64) float64 {
	median := (competitorMin + competitorMax) / 2

	clamped := basePrice

	if basePrice < competitorMin {
		clamped = competitorMin
	}

	if basePrice > competitorMax {
		clamped = competitorMax
	}

	recommended := (clamped * 0.6) + (median * 0.4)

	return recommended
}

func GenerateProfitScenarios(unitCost, competitorMin, competitorMax, recommended float64) []models.ProfitScenario {
	lowPrice := competitorMin + 0.1*(recommended-competitorMin)
	highPrice := competitorMax - 0.1*(competitorMax-recommended)
	median := (competitorMin + competitorMax) / 2

	prices := []float64{highPrice, median, recommended, lowPrice}

	result := []models.ProfitScenario{}

	for _, price := range prices {
		profitPerUnit := price - unitCost
		marginPercent := (profitPerUnit / unitCost) * 100
		marketPosition := DetermineMarketPosition(price, competitorMin, competitorMax)

		item := models.ProfitScenario{
			Price:          price,
			MarginPercent:  marginPercent,
			MarketPosition: marketPosition,
			ProfitPerUnit:  profitPerUnit,
		}
		result = append(result, item)
	}
	return result
}

func DetermineMarketPosition(price, competitorMin, competitorMax float64) string {
	median := (competitorMin + competitorMax) / 2
	marketRange := competitorMax - competitorMin
	if price < competitorMin {
		return "Below market"
	}
	if math.Abs(price-median) <= 0.05*marketRange {
		return "At market"
	}
	if price >= competitorMax-0.05*marketRange {
		return "Premium"
	}
	return "Competitive"
}

func DetectRiskFactors(
	basePrice float64,
	competitorMin float64,
	competitorMax float64,
) []string {
	factors := []string{}

	if basePrice > competitorMax {
		factors = append(factors,
			"Base price exceeds highest competitor price",
		)
	}

	spread := competitorMax - competitorMin
	if competitorMin > 0 && (spread/competitorMin) > 0.5 {
		factors = append(factors,
			"Competitor prices vary widely, indicating market uncertainty",
		)
	}

	return factors
}
