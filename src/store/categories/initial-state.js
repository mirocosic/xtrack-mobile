import * as Localization from 'expo-localization';

// gets the system locale, 2 char code with modifiers, we extract the 2 char code only
const defaultLocaleCode = Localization.locale.substring(0,2)

const defaultCatName = {
  en: "General",
  hr: "Općenito"
}


export default {
  items: [{id: "da42d4ba-b9ba-4d84-a82b-b029f15f1733", name: defaultCatName[defaultLocaleCode], icon: "shoppingBasket", color: "#0097A7", defaultCategory: true}],
  selectedCategory: {},
  categoryFilter: false,
}
