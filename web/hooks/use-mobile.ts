import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Listen to resize events
    window.addEventListener('resize', handleResize)

    // Optional: use matchMedia for better performance
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const handleMediaChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handleMediaChange)

    // Set initial value
    setIsMobile(mql.matches)

    return () => {
      window.removeEventListener('resize', handleResize)
      mql.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return isMobile
}