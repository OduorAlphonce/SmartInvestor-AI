import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names and merges Tailwind classes intelligently.
 * Supports falsy values safely.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Rounds a number to two decimal places.
 * Returns 0 if input is not a valid number.
 */
export function toTwoDecimalPlaces(value: number | null | undefined): number {
  if (typeof value !== 'number' || isNaN(value)) return 0
  return Math.round((value + Number.EPSILON) * 100) / 100
}