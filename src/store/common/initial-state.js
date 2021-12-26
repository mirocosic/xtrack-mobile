import * as Localization from 'expo-localization';

// gets the system locale, 2 char code with modifiers, we extract the 2 char code only
const defaultLocaleCode = Localization.locale.substring(0,2)

//keep the 3 char code for some backwards compatibility
const defaultLanguage = {
  en: {
    code: "eng",
    name: "English"
  },
  hr: {
    code: "hrv",
    name: "Hrvatski"
  }
}

export default {
  deviceToken: null,
  drawerOpen: false,
  drawerContent: "filters",
  drawerIsCanceled: false,
  darkMode: false,
  theme: "system",
  openOnForm: false,
  allTrans: false,
  language: defaultLanguage[defaultLocaleCode],
  appVersion: "v1.0.22 (58)"
}
