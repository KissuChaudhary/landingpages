export type ProblemSummary = {
  id: string
  slug: string
  statement: string
  target_product_name: string | null
  switch_condition: string | null
  category: string
  origin: "curated" | "user" | "founder"
  support_count: number
  answer_count: number
  supports_24h: number
  trending_score: number
  answers: ProblemAnswer[]
  created_at: string
}

export type ProblemAnswer = {
  offer_id: string
  product_id: string
  name: string
  registrable_domain: string
  destination_url: string
  tagline: string
  solves_text: string
  switch_incentive: string | null
  verified: boolean
}

export type ProblemSectionId = "trending" | "answered" | "fresh" | "unanswered"

export type ProblemSection = {
  id: ProblemSectionId
  title: string
  blurb: string
  problems: ProblemSummary[]
}

export type PublicTrafficStats = {
  total_visitors: number
  total_days: number
}
