import { Header } from "@/components/header"
import { FooterDisclaimer } from "@/components/footer-disclaimer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  Brain,
  Shield,
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About Smart Investor Lite
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Understanding how our pricing advisor works and why it matters
          </p>

          <div className="mt-12 space-y-8">
            {/* Problem Statement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  What Problem This Solves
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground">
                  Micro-businesses and small entrepreneurs often struggle with pricing
                  their products and services. Without access to expensive market research
                  or business consultants, they frequently underprice their offerings
                  (leaving money on the table) or overprice them (losing customers to
                  competitors).
                </p>
                <p className="text-sm leading-relaxed text-foreground">
                  FortuneTeller AI provides accessible, data-driven pricing guidance to help small
                  businesses make informed decisions that support sustainable growth.
                </p>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  How the Agent Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {[
                    {
                      step: 1,
                      title: "Validates Inputs",
                      description:
                        "Checks that all provided data is complete and makes sense (e.g., costs are positive, price ranges are valid)",
                    },
                    {
                      step: 2,
                      title: "Applies Pricing Rules",
                      description:
                        "Uses cost-plus and competitive pricing methodologies to calculate baseline recommendations",
                    },
                    {
                      step: 3,
                      title: "Calculates Profit Scenarios",
                      description:
                        "Generates multiple price points showing trade-offs between margin, competitiveness, and market position",
                    },
                    {
                      step: 4,
                      title: "Scores Risk",
                      description:
                        "Evaluates each scenario against market data to identify potential risks and opportunities",
                    },
                    {
                      step: 5,
                      title: "Explains Decisions",
                      description:
                        "Provides clear, plain-language explanations for all recommendations so you understand the reasoning",
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-4">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                        {item.step}
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* AI Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Usage & Transparency
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground">What the AI does:</h4>
                  <ul className="mt-2 space-y-2">
                    {[
                      "Processes your input data to calculate pricing recommendations",
                      "Generates human-readable explanations of pricing logic",
                      "Identifies and articulates risk factors in plain language",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-foreground">What the AI does NOT do:</h4>
                  <ul className="mt-2 space-y-2">
                    {[
                      "Access external market databases or real-time competitor data",
                      "Make decisions without showing you the reasoning",
                      "Store or share your business data with third parties",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* SDG Alignment */}
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  SDG 8: Decent Work & Economic Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-foreground">
                  FortuneTeller AI aligns with UN Sustainable Development Goal 8 by helping
                  small businesses make sustainable pricing decisions. By providing
                  accessible financial guidance, we support entrepreneurship and help
                  create conditions for decent work and economic growth in communities
                  that need it most.
                </p>
              </CardContent>
            </Card>

            {/* Limitations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning-foreground" />
                  Limitations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {[
                    "Assumes input data is accurate and complete",
                    "Does not account for brand value, customer loyalty, or seasonal trends",
                    "Market data is user-provided, not from live sources",
                    "Cannot predict future market changes or economic shifts",
                    "Should be used as guidance, not as the sole basis for business decisions",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-muted-foreground" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <FooterDisclaimer />
    </div>
  )
}
