import type { ProblemSection, ProblemSummary } from "./types"

export function buildProblemSections(problems: ProblemSummary[]): ProblemSection[] {
  const answered = problems.filter((problem) => problem.answer_count > 0)
  const unanswered = problems.filter((problem) => problem.answer_count === 0)
  const fresh = [...problems].reverse()

  return [
    {
      id: "trending",
      title: "Trending problems",
      blurb: "Where people are agreeing fastest right now.",
      problems,
    },
    {
      id: "answered",
      title: "Answered",
      blurb: "Products have said how they solve these, and what they will do for someone switching.",
      problems: answered,
    },
    {
      id: "fresh",
      title: "New pains",
      blurb: "Recently posted by people who ran into the problem themselves.",
      problems: fresh,
    },
    {
      id: "unanswered",
      title: "No answer yet",
      blurb: "Real demand that nobody has offered to solve. If you build one of these, this is your queue.",
      problems: unanswered,
    },
  ]
}
