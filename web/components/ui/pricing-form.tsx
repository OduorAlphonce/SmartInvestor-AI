"use client"

import { makeRequest } from "@/api-conf"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useMutation } from "@tanstack/react-query"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { PricingResult } from "./result-card"

export interface PricingInputs {
  unitCost: number
  desiredMargin: number
  competitorMinPrice: number
  competitorMaxPrice: number
}

interface PricingFormProps {
  isLoading: boolean
  setIsPending: Dispatch<SetStateAction<boolean>>
  setResult: Dispatch<SetStateAction<PricingResult | null>>
}

export function PricingForm({ isLoading, setIsPending, setResult }: PricingFormProps) {
  const [unitCost, setUnitCost] = useState("")
  const [desiredMargin, setDesiredMargin] = useState([30])
  const [competitorMinPrice, setCompetitorMinPrice] = useState("")
  const [competitorMaxPrice, setCompetitorMaxPrice] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<PricingInputs | null>(null)

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!unitCost || Number(unitCost) <= 0) {
      newErrors.unitCost = "Enter a valid unit cost greater than 0"
    }
    if (!competitorMinPrice || Number(competitorMinPrice) <= 0) {
      newErrors.competitorMinPrice = "Enter a valid minimum market price"
    }
    if (!competitorMaxPrice || Number(competitorMaxPrice) <= 0) {
      newErrors.competitorMaxPrice = "Enter a valid maximum market price"
    }
    if (
      competitorMinPrice &&
      competitorMaxPrice &&
      Number(competitorMinPrice) > Number(competitorMaxPrice)
    ) {
      newErrors.competitorMaxPrice = "Maximum price must exceed minimum price"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { mutate, isPending, data } = useMutation({
    mutationFn: makeRequest.bind(null, formData),
  })

  useEffect(() => {
    setIsPending(isPending)
  }, [isPending])

  useEffect(() => {
    if (data) setResult(data)
  }, [data])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const input = {
      unitCost: Number(unitCost),
      desiredMargin: desiredMargin[0],
      competitorMinPrice: Number(competitorMinPrice),
      competitorMaxPrice: Number(competitorMaxPrice),
    }

    if (validate()) {
      setResult(null)
      setFormData(input)
      mutate()
    }
  }

  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">
          Pricing Model Inputs
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Provide cost structure and market benchmarks to generate pricing recommendations.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-7">
          
          {/* Unit Cost */}
          <div className="space-y-2">
            <Label htmlFor="unitCost">Unit Cost</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                KES
              </span>
              <Input
                id="unitCost"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Direct cost per unit (production or acquisition)
            </p>
            {errors.unitCost && (
              <p className="text-xs text-destructive">{errors.unitCost}</p>
            )}
          </div>

          {/* Margin */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Target Margin</Label>
              <span className="text-sm font-medium text-primary">
                {desiredMargin[0]}%
              </span>
            </div>

            <Slider
              value={desiredMargin}
              onValueChange={setDesiredMargin}
              max={100}
              min={5}
              step={1}
            />

            <p className="text-xs text-muted-foreground">
              Desired profit margin before market adjustments
            </p>
          </div>

          {/* Market Range */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Market Price Range
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Min */}
              <div className="space-y-2">
                <Label htmlFor="competitorMinPrice">Minimum</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    KES
                  </span>
                  <Input
                    id="competitorMinPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={competitorMinPrice}
                    onChange={(e) => setCompetitorMinPrice(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.competitorMinPrice && (
                  <p className="text-xs text-destructive">
                    {errors.competitorMinPrice}
                  </p>
                )}
              </div>

              {/* Max */}
              <div className="space-y-2">
                <Label htmlFor="competitorMaxPrice">Maximum</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    KES
                  </span>
                  <Input
                    id="competitorMaxPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={competitorMaxPrice}
                    onChange={(e) => setCompetitorMaxPrice(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.competitorMaxPrice && (
                  <p className="text-xs text-destructive">
                    {errors.competitorMaxPrice}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing analysis..." : "Run Pricing Analysis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}