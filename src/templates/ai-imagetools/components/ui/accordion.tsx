"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/templates/ai-imagetools/lib/utils"

interface AccordionContextType {
  openItem: string | null
  toggleItem: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextType | null>(null)

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string
}

export function Accordion({
  defaultValue,
  children,
  className,
  ...props
}: AccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(defaultValue || null)

  const toggleItem = React.useCallback((value: string) => {
    setOpenItem((prev) => (prev === value ? null : value))
  }, [])

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionItemContext = React.createContext<{ value: string; isOpen: boolean }>({
  value: "",
  isOpen: false,
})

export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const ctx = React.useContext(AccordionContext)
    const isOpen = ctx?.openItem === value

    return (
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        <div
          ref={ref}
          className={cn("border-b", className)}
          data-state={isOpen ? "open" : "closed"}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    )
  }
)
AccordionItem.displayName = "AccordionItem"

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(AccordionContext)
  const itemCtx = React.useContext(AccordionItemContext)

  return (
    <div className="flex">
      <button
        ref={ref}
        type="button"
        onClick={() => ctx?.toggleItem(itemCtx.value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
          className
        )}
        data-state={itemCtx.isOpen ? "open" : "closed"}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            itemCtx.isOpen ? "rotate-180" : ""
          )}
        />
      </button>
    </div>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const itemCtx = React.useContext(AccordionItemContext)

  if (!itemCtx.isOpen) return null

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden text-sm transition-all pb-4 pt-0", className)}
      data-state={itemCtx.isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"
