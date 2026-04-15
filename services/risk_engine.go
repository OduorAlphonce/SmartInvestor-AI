package services

// internal/services/risk_engine.
import (
	"fmt"
	"strings"
)

// RiskInput holds the data needed for risk evaluation
type RiskInput struct {
	UnitCost           float64
	CompetitorMinPrice float64
	CompetitorMaxPrice float64
	RecommendedPrice   float64
	MarginPercent      float64
}

// RiskResult is the output of EvaluateRisk
type RiskResult struct {
	RiskLevel   string   // low | medium | high
	RiskFactors []string // human-readable explanations
}

// EvaluateRisk is the main entry point
func EvaluateRisk(input RiskInput) RiskResult {
	var factors []string

	// Check all rules and collect triggered factors
	if factor := checkAboveMarketMax(input.RecommendedPrice, input.CompetitorMaxPrice); factor != "" {
		factors = append(factors, factor)
	}

	if factor := checkLowMargin(input.MarginPercent); factor != "" {
		factors = append(factors, factor)
	}

	if factor := checkNearCompetitorMin(input.RecommendedPrice, input.CompetitorMinPrice); factor != "" {
		factors = append(factors, factor)
	}

	if factor := checkCostCloseToMarketMin(input.UnitCost, input.CompetitorMinPrice); factor != "" {
		factors = append(factors, factor)
	}

	// Resolve final risk level based on triggered factors
	riskLevel := resolveRiskLevel(factors)

	return RiskResult{
		RiskLevel:   riskLevel,
		RiskFactors: factors,
	}
}

// -----------------------
// Rule Functions
// -----------------------

// HIGH risk if recommended price exceeds competitor max
func checkAboveMarketMax(recommended, competitorMax float64) string {
	if recommended > competitorMax {
		return fmt.Sprintf("Recommended price %.2f exceeds highest competitor price %.2f", recommended, competitorMax)
	}
	return ""
}

// HIGH risk if margin < 10%
func checkLowMargin(marginPercent float64) string {
	if marginPercent < 10.0 {
		return fmt.Sprintf("Profit margin %.2f%% is below sustainable threshold", marginPercent)
	}
	return ""
}

// LOW risk if recommended price is near competitor min (within 5%)
func checkNearCompetitorMin(recommended, competitorMin float64) string {
	if competitorMin == 0 {
		return ""
	}
	threshold := competitorMin * 0.05 // 5%
	if recommended >= competitorMin && recommended <= competitorMin+threshold {
		return fmt.Sprintf("Price %.2f is near market minimum %.2f", recommended, competitorMin)
	}
	return ""
}

// MEDIUM risk if unit cost is very close to competitor min (within 5%)
func checkCostCloseToMarketMin(unitCost, competitorMin float64) string {
	if competitorMin == 0 {
		return ""
	}
	threshold := competitorMin * 0.05 // 5%
	if unitCost >= competitorMin-threshold && unitCost <= competitorMin+threshold {
		return fmt.Sprintf("Unit cost %.2f is close to competitor minimum %.2f", unitCost, competitorMin)
	}
	return ""
}

// -----------------------
// Risk Level Resolution
// -----------------------
func resolveRiskLevel(factors []string) string {
	for _, f := range factors {
		if isHighRisk(f) {
			return "high"
		}
	}
	for _, f := range factors {
		if isMediumRisk(f) {
			return "medium"
		}
	}
	return "low"
}

// Helper to determine if a factor indicates HIGH risk
func isHighRisk(factor string) bool {
	highRiskKeywords := []string{"exceeds", "below sustainable"}
	for _, kw := range highRiskKeywords {
		if containsIgnoreCase(factor, kw) {
			return true
		}
	}
	return false
}

// Helper to determine if a factor indicates MEDIUM risk
func isMediumRisk(factor string) bool {
	mediumRiskKeywords := []string{"close to competitor"}
	for _, kw := range mediumRiskKeywords {
		if containsIgnoreCase(factor, kw) {
			return true
		}
	}
	return false
}

// Case-insensitive substring match
func containsIgnoreCase(str, substr string) bool {
	return strings.Contains(strings.ToLower(str), strings.ToLower(substr))
}
