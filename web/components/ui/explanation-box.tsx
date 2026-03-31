import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface ExplanationBoxProps {
  explanation: string
  riskFactors: string[]
  confidenceNote: string
}

export function ExplanationBox({
  explanation,
  riskFactors,
  confidenceNote,
}: ExplanationBoxProps) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <AlertCircle className="h-4 w-4 text-primary" />
          Risk Assessment
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Explanation */}
        <p className="text-sm leading-relaxed text-foreground">
          {explanation}
        </p>

        {/* Risk Factors */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Key Risk Factors
          </h4>

          <ul className="space-y-2">
            {riskFactors.map((factor, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/70" />
                <span className="leading-relaxed">{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Confidence Note */}
        <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              Confidence level:
            </span>{" "}
            {confidenceNote}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}