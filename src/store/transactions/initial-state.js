import moment from "moment"

export default {
  total: 0,
  expenses: 0,
  income: 0,
  selectedTransaction: { labels: [], account: {}, fromAccount: {}, amount: 0, recurring: false, currency: "HRK" },
  entries: [],
  transferMode: false,
  monthFilter: "may",
  currentMonth: moment().format("YYYY-MM-DD"),
};
