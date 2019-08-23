export function formatCurrency(input = 0, digits = 2) {

  const formatter = new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "HRK",
    minimumFractionDigits: digits,
    currencyDisplay: "symbol",
  });

  return formatter.format(input); /* $2,500.00 */

}

export const miro = "miro"
