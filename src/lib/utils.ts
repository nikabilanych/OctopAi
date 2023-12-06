import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function formatPrice(
  price:number|string, 
  options:{ 
    currency?: 'USD'|'EUR'|'GBP'|'CZK',
    // "standard" | "scientific" | "engineering" | "compact"
    notation?: Intl.NumberFormatOptions['notation']} = {}) 
    {
      // convert string to number
      const priceNumber = typeof price === 'string' ? parseFloat(price) : price
      const { currency = 'USD', notation='compact' } = options
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:currency,
        notation:notation,
        maximumFractionDigits: 2 // show 2 decimal places
      })
      return formatter.format(priceNumber)
    }  
  