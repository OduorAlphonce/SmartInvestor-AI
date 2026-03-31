import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <Card className="border border-border/60 bg-card/50">
      <CardContent className="flex flex-col items-center justify-center py-14 text-center">
        
        <Loader2 className="h-8 w-8 animate-spin text-primary" />

        <p className="mt-5 text-sm font-medium text-foreground">
          Running pricing analysis
        </p>

        <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
          Evaluating price sensitivity, demand signals, and associated risk factors.
        </p>
      </CardContent>
    </Card>
  )
}