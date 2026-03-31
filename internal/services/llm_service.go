package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

type ORClient struct {
	ApiKey string
}

type ORMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type ORRequest struct {
	Model     string      `json:"model"`
	Messages  []ORMessage `json:"messages"`
	MaxTokens int         `json:"max_tokens,omitempty"`
}

type ORChoice struct {
	Message ORMessage `json:"message"`
}

type ORResponse struct {
	Choices []ORChoice `json:"choices"`
}

type ORErrorResponse struct {
	Error struct {
		Message string `json:"message"`
		Code    int    `json:"code"`
	} `json:"error"`
}

func NewORClient() *ORClient {
	apiKey := os.Getenv("OPENROUTER_API_KEY")
	if apiKey == "" {
		fmt.Println("Warning: OPENROUTER_API_KEY environment variable is not set")
	}
	return &ORClient{ApiKey: apiKey}
}

func (c *ORClient) ExplainPricing(prompt string) (string, string, error) {
	// Check if API key is set
	if c.ApiKey == "" {
		return "", "", fmt.Errorf("OPENROUTER_API_KEY environment variable is not set")
	}

	reqBody := ORRequest{
		Model: "google/gemini-3-flash-preview",
		Messages: []ORMessage{
			{
				Role:    "user",
				Content: prompt,
			},
		},
		MaxTokens: 200,
	}

	body, err := json.Marshal(reqBody)
	if err != nil {
		return "", "", fmt.Errorf("failed to marshal request: %w", err)
	}

	// fmt.Printf("Debug - Request body: %s\n", string(body))
	// fmt.Printf("Debug - API Key present: %v\n", c.ApiKey != "")

	req, err := http.NewRequest(
		"POST",
		"https://openrouter.ai/api/v1/chat/completions",
		bytes.NewBuffer(body),
	)
	if err != nil {
		return "", "", fmt.Errorf("failed to create request: %w", err)
	}

	// Set required headers
	req.Header.Set("Content-Type", "application/json")

	// OpenRouter sometimes requires this format for API key
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.ApiKey))

	// These headers are required by OpenRouter
	req.Header.Set("HTTP-Referer", "http://localhost:8080")
	req.Header.Set("X-Title", "PricingExplainer")

	// Alternative: Try with just the API key in Authorization header
	// req.Header.Set("Authorization", c.ApiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", "", fmt.Errorf("failed to make request: %w", err)
	}
	defer resp.Body.Close()

	// Read the response body first
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", "", fmt.Errorf("failed to read response body: %w", err)
	}

	// fmt.Printf("Debug - Response Status: %d\n", resp.StatusCode)
	// fmt.Printf("Debug - Response Body: %s\n", string(respBody))

	// Check for non-200 status codes
	if resp.StatusCode != http.StatusOK {
		// Try to parse error response
		var errorResp ORErrorResponse
		if err := json.Unmarshal(respBody, &errorResp); err == nil && errorResp.Error.Message != "" {
			return "", "", fmt.Errorf("API error (status %d): %s", resp.StatusCode, errorResp.Error.Message)
		}

		// Fallback error
		return "", "", fmt.Errorf("API error (status %d): %s", resp.StatusCode, string(respBody))
	}

	var result ORResponse
	if err := json.Unmarshal(respBody, &result); err != nil {
		return "", "", fmt.Errorf("failed to decode response: %w, body: %s", err, string(respBody))
	}

	if len(result.Choices) == 0 {
		return "", "", fmt.Errorf("no choices in response")
	}

	output := result.Choices[0].Message.Content

	riskExplanation := extractBetween(
		output,
		"<<RISK_EXPLANATION>>",
		"<</RISK_EXPLANATION>>",
	)

	confidenceNote := extractBetween(
		output,
		"<<CONFIDENCE_NOTE>>",
		"<</CONFIDENCE_NOTE>>",
	)

	if riskExplanation == "" || confidenceNote == "" {
		// For debugging, print the raw output
		// fmt.Printf("Debug - Raw LLM output: %s\n", output)
		return "", "", fmt.Errorf("invalid LLM response format - markers not found")
	}

	return riskExplanation, confidenceNote, nil
}

func extractBetween(text, start, end string) string {
	startIdx := strings.Index(text, start)
	if startIdx == -1 {
		return ""
	}
	startIdx += len(start)

	endIdx := strings.Index(text[startIdx:], end)
	if endIdx == -1 {
		return ""
	}

	return strings.TrimSpace(text[startIdx : startIdx+endIdx])
}
