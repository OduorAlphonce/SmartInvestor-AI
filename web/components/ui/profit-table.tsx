import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn, toTwoDecimalPlaces } from "@/lib/utils"

interface ProfitScenario {
  price: number
  profitPerUnit: number
  marginPercent: number
  marketPosition: string
}

interface ProfitTableProps {
  scenarios: ProfitScenario[]
  recommendedPrice: number
}

export function ProfitTable({ scenarios, recommendedPrice }: ProfitTableProps) {
  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Pricing Scenarios
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Comparative view of pricing strategies across margin, profitability, and market positioning.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-xs uppercase tracking-wide text-muted-foreground">
                <TableHead>Price (KES)</TableHead>
                <TableHead>Profit / Unit</TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Positioning</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {scenarios.map((scenario, index) => {
                const isRecommended = scenario.price === recommendedPrice

                return (
                  <TableRow
                    key={index}
                    className={cn(
                      "transition-colors",
                      isRecommended && "bg-primary/5"
                    )}
                  >
                    {/* Price */}
                    <TableCell className="font-medium text-foreground">
                      {toTwoDecimalPlaces(scenario.price).toLocaleString()}

                      {isRecommended && (
                        <span className="ml-2 rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                          Recommended
                        </span>
                      )}
                    </TableCell>

                    {/* Profit */}
                    <TableCell className="text-foreground">
                      {toTwoDecimalPlaces(scenario.profitPerUnit).toLocaleString()}
                    </TableCell>

                    {/* Margin */}
                    <TableCell className="text-foreground">
                      {scenario.marginPercent.toFixed(1)}%
                    </TableCell>

                    {/* Market Position */}
                    <TableCell>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          {
                            "text-success": scenario.marketPosition === "Competitive",
                            "text-muted-foreground": scenario.marketPosition === "Average",
                            "text-warning": scenario.marketPosition === "Premium",
                            "text-destructive": scenario.marketPosition === "High Risk",
                          }
                        )}
                      >
                        {scenario.marketPosition}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}