package models

// Input sent by UI
type PricingInputs struct {
	UnitCost           float64 `json:"unitCost" binding:"required"`
	DesiredMargin      float64 `json:"desiredMargin" binding:"required"`
	CompetitorMinPrice float64 `json:"competitorMinPrice" binding:"required"`
	CompetitorMaxPrice float64 `json:"competitorMaxPrice" binding:"required"`
}

type SuggestedRange struct {
	Min float64 `json:"min"`
	Max float64 `json:"max"`
}

type ProfitScenario struct {
	Price          float64 `json:"price"`
	ProfitPerUnit  float64 `json:"profitPerUnit"`
	MarginPercent  float64 `json:"marginPercent"`
	MarketPosition string  `json:"marketPosition"`
}

// Response expected to be sent to UI
type PricingResult struct {
	RecommendedPrice float64          `json:"recommendedPrice"`
	SuggestedRange   SuggestedRange   `json:"suggestedRange"`
	RiskLevel        string           `json:"riskLevel"` // low | medium | high
	ProfitScenarios  []ProfitScenario `json:"profitScenarios"`
	RiskExplanation  string           `json:"riskExplanation"`
	RiskFactors      []string         `json:"riskFactors"`
	ConfidenceNote   string           `json:"confidenceNote"`
}
