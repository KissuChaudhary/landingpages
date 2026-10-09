export function planQuote(
  plan: { monthly: number; annual: number },
  annual: boolean,
) {
  const monthlyRate = annual ? plan.annual : plan.monthly;
  return {
    monthlyRate,
    due: annual ? monthlyRate * 12 : monthlyRate,
    cadence: annual ? "year" : "month",
    free: monthlyRate === 0,
  };
}
