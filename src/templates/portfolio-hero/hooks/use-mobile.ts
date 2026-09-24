import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIsMobile = () => window.innerWidth < MOBILE_BREAKPOINT
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      setIsMobile(checkIsMobile())
    }
    
    mql.addEventListener("change", onChange)
    
    // Defer state update to avoid cascading render concerns
    let timerId = setTimeout(() => {
        setIsMobile(checkIsMobile());
    }, 0);
    
    return () => {
      clearTimeout(timerId);
      mql.removeEventListener("change", onChange);
    }
  }, [])

  return !!isMobile
}
