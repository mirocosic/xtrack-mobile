import * as Localization from 'expo-localization';

// gets the system locale, 2 char code with modifiers, we extract the 2 char code only
const defaultLocaleCode = Localization.locale.substring(0,2)

const defaultAccName = {
  en: "Main",
  hr: "Glavni"
}


export default {
  items: [{id: "c4526cb8-f0eb-4af6-ac09-b0b1f504ea85", name: defaultAccName[defaultLocaleCode], icon: "creditCard", color: "#2196F3", startingBalance: 0, currency: "HRK", defaultAccount: true}],
  toAccount: { id: 0, name: "Savings" },
  fromAccount: {},
  accountFilter: false,
}
