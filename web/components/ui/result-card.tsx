import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RiskBadge } from "@/components/risk-badge"
import { toTwoDecimalPlaces } from "@/lib/utils"

export interface PricingResult {
  recommendedPrice: number
  suggestedRange: { min: number; max: number }
  riskLevel: "low" | "medium" | "high"
  profitScenarios: Array<{
    price: number
    profitPerUnit: number
    marginPercent: number
    marketPosition: string
  }>
  riskExplanation: string
  riskFactors: string[]
  confidenceNote: string
}

interface ResultCardProps {
  result: PricingResult
}

export function ResultCard({ result }: ResultCardProps) {
  return (
    <Card className="border border-border/60 bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base font-semibold">
          <span>Recommended Pricing</span>
          <RiskBadge level={result.riskLevel} />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Primary Price */}
        <div className="text-center">
          <p className="text-4xl font-semibold tracking-tight text-primary">
            KES {toTwoDecimalPlaces(result.recommendedPrice).toLocaleString()}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Optimal price based on cost structure, margin target, and market conditions
          </p>
        </div>

        {/* Suggested Range */}
        <div className="rounded-md border border-border/60 bg-muted/30 px-4 py-3 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Suggested Range
          </p>
          <p className="mt-1 text-sm font-medium text-foreground">
            KES {toTwoDecimalPlaces(result.suggestedRange.min).toLocaleString()} –{" "}
            KES {toTwoDecimalPlaces(result.suggestedRange.max).toLocaleString()}
          </p>
        </div>

      </CardContent>
    </Card>
  )
}