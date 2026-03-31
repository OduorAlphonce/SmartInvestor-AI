import { Badge } from "@/components/ui/badge"

interface RiskBadgeProps {
  level: "low" | "medium" | "high"
}

const riskStyles: Record<RiskBadgeProps["level"], string> = {
  low: "bg-emerald-100 text-emerald-800 border-transparent",
  medium: "bg-amber-100 text-amber-800 border-transparent",
  high: "bg-red-100 text-red-800 border-transparent",
}

export function RiskBadge({ level }: RiskBadgeProps) {
  return <Badge className={riskStyles[level]}>{level} risk</Badge>
}
