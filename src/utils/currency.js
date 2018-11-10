export function formatCurrency(input = 0, digits = 2) {

  let formatter = new Intl.NumberFormat('hr-HR', {
    style: 'currency',
    currency: 'HRK',
    minimumFractionDigits: digits,
  });

  return formatter.format(input); /* $2,500.00 */

}
