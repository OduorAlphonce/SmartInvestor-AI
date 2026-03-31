"use client"

import { queryClient } from "@/api-conf"
import { ExplanationBox } from "@/components/explanation-box"
import { FooterDisclaimer } from "@/components/footer-disclaimer"
import { Header } from "@/components/header"
import { LoadingState } from "@/components/loading-state"
import { PricingForm } from "@/components/pricing-form"
import { ProfitTable } from "@/components/profit-table"
import { ResultCard, type PricingResult } from "@/components/result-card"
import { Badge } from "@/components/ui/badge"
import { QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export default function HomePage() {
  const [result, setResult] = useState<PricingResult | null>(null)
   const [isPending,setIsPending] = useState(false)

  return (
     <QueryClientProvider client={queryClient}>
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <Badge variant="secondary" className="mb-4">
              Economic Growth
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Smart, fair pricing for micro-businesses
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Get AI-powered pricing recommendations based on your costs and market data
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Form */}
            <div>
              <PricingForm setResult={setResult} isLoading={isPending} setIsPending={setIsPending} />
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {isPending && <LoadingState />}

              {!isPending && !result && (
                <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border p-12 text-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Enter your pricing data
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Results will appear here after analysis
                    </p>
                  </div>
                </div>
              )}

              {!isPending && result && <ResultCard result={result} />}
            </div>
          </div>

          {/* Full Width Results Section */}
          {!isPending && result && (
            <div className="mt-8 space-y-6">
              <ProfitTable
                scenarios={result.profitScenarios}
                recommendedPrice={result.recommendedPrice}
              />
              <ExplanationBox
                explanation={result.riskExplanation}
                riskFactors={result.riskFactors}
                confidenceNote={result.confidenceNote}
              />
            </div>
          )}
        </div>
      </main>

      <FooterDisclaimer />
    </div>
        </QueryClientProvider>
  )
}
