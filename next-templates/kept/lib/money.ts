const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const dollarsExact = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

/** "$18,240". Change the currency here and every amount on the page follows. */
export function money(value: number) {
  return dollars.format(value);
}

/** "$1,152.00", for the invoice sheet. */
export function moneyExact(value: number) {
  return dollarsExact.format(value);
}
