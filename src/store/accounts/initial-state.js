export default {
  items: [
    { id: 1, name: "Main", color: "#673AB7", icon: "creditCard", defaultAccount: true, startingBalance: 0, currency: "HRK" },
    { id: 2, name: "Savings", color: "#0097A7", icon: "creditCard", defaultAccount: false, startingBalance: 0, currency: "HRK" },
  ],
  toAccount: { id: 0, name: "Savings" },
  fromAccount: {},
  accountFilter: false,
};
