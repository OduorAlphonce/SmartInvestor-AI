package services

import (
	"fmt"
	"strings"
)

// PricingPromptInput holds the data for generating a pricing explanation prompt.
type PricingPromptInput struct {
	UnitCost           float64
	RecommendedPrice   float64
	CompetitorMinPrice float64
	CompetitorMaxPrice float64
	RiskLevel          string
	RiskFactors        []string
}

// BuildPricingExplanationPrompt generates a prompt strictly for explaining
// a recommended price to a business owner. The LLM must not calculate prices or suggest alternatives.
func BuildPricingExplanationPrompt(input PricingPromptInput) string {
	riskFactors := "None"
	if len(input.RiskFactors) > 0 {
		riskFactors = strings.Join(input.RiskFactors, "; ")
	}

	const promptTemplate = `
You are a pricing explanation assistant for small business owners.

IMPORTANT RULES:
- Do NOT calculate prices.
- Do NOT suggest alternative prices.
- ONLY explain the provided recommendation.
- Use simple, non-technical language.
- Do NOT add extra sections or commentary.

Pricing Context:
- Unit cost: %.2f
- Recommended price: %.2f
- Competitor price range: %.2f – %.2f
- Risk level: %s
- Risk factors: %s

Your task:
Return EXACTLY two sections using the delimiters below.

FORMAT (must follow exactly):

<<RISK_EXPLANATION>>
One short paragraph explaining the risk.
<</RISK_EXPLANATION>>

<<CONFIDENCE_NOTE>>
One short sentence expressing confidence or uncertainty.
<</CONFIDENCE_NOTE>>
`

	return fmt.Sprintf(promptTemplate,
		input.UnitCost,
		input.RecommendedPrice,
		input.CompetitorMinPrice,
		input.CompetitorMaxPrice,
		input.RiskLevel,
		riskFactors,
	)
}