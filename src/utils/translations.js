import { get, map } from "lodash"
import { store } from "../store"

const translations = {
  eng: {},

  hrv: {
    Language: "Jezik",
    "Welcome to XTrack!": "Dobrodošli u XTrack!",
    "Go to app": "Kreni",
    Dashboard: "Kontrola",
    Overview: "Pregled",
    Transactions: "Transakcije",
    "Transaction form": "Transakcija",
    Total: "Ukupno",
    Type: "Tip",
    Amount: "Iznos",
    Income: "Prihodi",
    INCOME: "PRIHOD",
    EXPENSE: "TROŠAK",
    TRANSFER: "PRIJENOS",
    "Income: ": "Prihodi: ",
    Expenses: "Troškovi",
    Expense: "Trošak",
    Transfer: "Prijenos",
    "Expenses: ": "Troškovi: ",
    Balance: "Bilanca",
    Account: "Račun",
    "Balance: ": "Bilanca: ",
    "Savings Rate: ": "Stopa štednje: ",
    "Net worth: ": "Neto vrijednost: ",
    Category: "Kategorija",
    Categories: "Kategorije",
    Accounts: "Računi",
    Tags: "Oznake",
    Date: "Datum",
    Note: "Bilješka",
    Settings: "Postavke",
    "Enable Location Tracking": "Omogući praćenje lokacije",
    "Open app on transaction form": "Otvori aplikaciju na transakciji",
    Add: "Dodaj",
    "Starting Balance: ": "Početno stanje: ",
    "Starting Balance": "Početno stanje",
    "More Options": "Više opcija",
    "Less Options": "Manje opcija",
    "From Account:": "Sa Računa:",
    "To ": "Na ",
    Save: "Spremi",
    Name: "Naziv",
    Color: "Boja",
    Icon: "Ikona",
    "Default category": "Zadana kategorija",
    Yes: "Da",
    No: "Ne",
    Currency: "Valuta",
    "Default account": "Zadani račun",
    "enter note...": "unesi bilješku...",
    "Recurring": "Ponavljajuća",
    "Add Tags": "Dodaj oznake",
    "Add new tag": "Dodaj novu oznaku",
    "Every": "Svaki",
    "End Date": "Krajnji datum",
    "Day": "Dan",
    "Week": "Tjedan",
    "Month": "Mjesec",
    "Year": "Godina",
    "Cancel": "Odustani",
    "Select occurence interval": "Odaberi interval ponavljanja",
    "All time breakdown": "Ukupni raspis",
    "Filters": "Filteri",
    "Clear": "Očisti",
    "Monthly Budget": "Mjesečni budžet",
    "add budget": "unesi budžet",

    "Become a master of your finances": "Postani majstor svojih financija",
    "Secure your financial future": "Osiguraj svoju financijsku budućnost",
    "Track all your expenses in one place": "Prati sve troškove na jednom mjestu",
    "Let's go!": "Krenimo!"
  },

}

const translate = (string) => {
  const state = store.getState();
  const language = get(state, "common.language.code")
  if (!language) { return string; }
  if (!get(translations, [language, string])) { return string; }

  return get(translations, [language, string])

}

export default translate;
