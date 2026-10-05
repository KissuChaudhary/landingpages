"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { ArrowLeft, Compass } from "lucide-react"
import { useParams } from "next/navigation"

interface NotFoundProps {
  title: string
  description: string
  quote: string
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction?: {
    label: string
    href: string
  }
}

export function NotFound({ title, description, quote, primaryAction, secondaryAction }: NotFoundProps) {
  const params = useParams()
  const locale = params.locale as string

  // Add locale to hrefs if they don't already include it and we're in a localized route
  const getPrefixedHref = (href: string) => {
    if (locale && href.startsWith("/") && !href.startsWith(`/${locale}`)) {
      return `/${locale}${href}`
    }
    return href
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary text-foreground px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          className="text-9xl font-extrabold text-primary mb-4"
          initial={{ scale: 0.5, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {description}
        </motion.p>
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-md text-muted-foreground italic">&ldquo;{quote}&rdquo;</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-semibold">
              <Link href={getPrefixedHref(primaryAction.href)} className="flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5" />
                {primaryAction.label}
              </Link>
            </Button>
            {secondaryAction && (
              <Button asChild variant="outline" size="lg" className="font-semibold">
                <Link href={getPrefixedHref(secondaryAction.href)}>{secondaryAction.label}</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.8, duration: 1, type: "spring" }}
      >
        <Compass className="w-40 h-40 text-primary animate-pulse" />
      </motion.div>
    </div>
  )
}

