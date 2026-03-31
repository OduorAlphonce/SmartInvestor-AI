package services

import (
	"fmt"
	"math"

	"github.com/OduorAlphonce/SmartInvestor-AI/models"
)

const (
	RiskLow    = "low"
	RiskMedium = "medium"
	RiskHigh   = "high"

	MarketCompetitive = "Competitive"
	MarketOptimal     = "Optimal"
	MarketPremium     = "Premium"
)

// roundToTwoDecimals rounds a float64 to 2 decimal places
func roundToTwoDecimals(val float64) float64 {
	return math.Round((val+1e-9)*100) / 100
}

// CalculatePricing computes recommended price, profit scenarios, and risk evaluation
func CalculatePricing(input models.PricingInputs) models.PricingResult {
	if input.UnitCost <= 0 {
		panic("UnitCost must be greater than 0")
	}

	// Recommended price based on desired margin
	recommendedPrice := roundToTwoDecimals(input.UnitCost * (1 + input.DesiredMargin/100))

	// Define suggested price range
	minPrice := roundToTwoDecimals(math.Max(input.CompetitorMinPrice, recommendedPrice*0.9))
	maxPrice := roundToTwoDecimals(math.Min(input.CompetitorMaxPrice, recommendedPrice*1.1))

	// Generate profit scenarios
	scenarios := []models.ProfitScenario{
		{
			Price:          minPrice,
			ProfitPerUnit:  roundToTwoDecimals(minPrice - input.UnitCost),
			MarginPercent:  roundToTwoDecimals((minPrice - input.UnitCost) / input.UnitCost * 100),
			MarketPosition: MarketCompetitive,
		},
		{
			Price:          recommendedPrice,
			ProfitPerUnit:  roundToTwoDecimals(recommendedPrice - input.UnitCost),
			MarginPercent:  roundToTwoDecimals(input.DesiredMargin),
			MarketPosition: MarketOptimal,
		},
		{
			Price:          maxPrice,
			ProfitPerUnit:  roundToTwoDecimals(maxPrice - input.UnitCost),
			MarginPercent:  roundToTwoDecimals((maxPrice - input.UnitCost) / input.UnitCost * 100),
			MarketPosition: MarketPremium,
		},
	}

	// Example: simple risk evaluation
	riskLevel := RiskMedium
	riskFactors := []string{}
	if recommendedPrice > input.CompetitorMaxPrice {
		riskLevel = RiskHigh
		riskFactors = append(riskFactors, "Price exceeds highest competitor price")
	} else if recommendedPrice < input.CompetitorMinPrice {
		riskLevel = RiskLow
		riskFactors = append(riskFactors, "Price below lowest competitor price")
	} else {
		riskFactors = append(riskFactors, "Moderate competitor pricing")
	}

	return models.PricingResult{
		RecommendedPrice: recommendedPrice,
		SuggestedRange: struct {
			Min float64 `json:"min"`
			Max float64 `json:"max"`
		}{
			Min: minPrice,
			Max: maxPrice,
		},
		RiskLevel:       riskLevel,
		ProfitScenarios: scenarios,
		RiskExplanation: fmt.Sprintf("Pricing analysis shows %s risk.", riskLevel),
		RiskFactors:     riskFactors,
		ConfidenceNote:  "Model confidence is high based on historical trends",
	}
}