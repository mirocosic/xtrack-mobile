import store from "../store"
const state = store.getState();

const translations = {
  eng: {

  },

  "hrv": {
    "Language": "Jezik",
    "Welcome to XTrack!" : "Dobrodošli u XTrack!",
    "Go to app" : "Kreni",
    "Dashboard" : "Pregled",
    "Total": "Ukupno"
  },

}

const translate = (string) => {
  const language = state.common.language.code;
  if (!language) { return string; }
  if (!translations[language][string]) { return string; }

  return translations[language][string];

}

export default translate;
