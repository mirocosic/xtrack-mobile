export function formatCurrency(input = 0, currency = "HRK", digits = 2) {

  const formats = {
    HRK: "hr-HR",
    EUR: "de-DE",
    USD: "en-US",
  }


  const formatter = new Intl.NumberFormat(formats[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: digits,
    currencyDisplay: "symbol",
  });

  return formatter.format(input); /* $2,500.00 */

}

export const miro = "miro"
