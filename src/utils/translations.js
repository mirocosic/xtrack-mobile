import { get, map } from "lodash"
import { store } from "../store"

const translations = {
  eng: {},

  hrv: {
    "Language": "Jezik",
    "Please choose your preferred language": "Odaberi svoj preferirani jezik aplikacije",
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
    "Account": "Račun",
    "account name": "ime računa",
    "Balance: ": "Bilanca: ",
    "Savings Rate: ": "Stopa štednje: ",
    "Net worth: ": "Neto vrijednost: ",
    "Category": "Kategorija",
    "category name": "naziv kategorije",
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

    "Theme": "Tema",
    "Light": "Svijetla",
    "light": "Svijetla",
    "Dark": "Tamna",
    "dark": "Tamna",
    "System": "Sistemska",
    "system": "Sistemska",
    "Select app theme": "Odaberi temu aplikacije",

    "Default account": "Zadani račun",
    "enter note...": "unesi bilješku...",
    "Recurring": "Ponavljajuća",
    "Add Tags": "Dodaj oznake",
    "Add new tag": "Dodaj novu oznaku",
    "Add new category": "Dodaj novu kategoriju",
    "Add new account": "Dodaj novi račun",
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

    "Select language": "Odaberi jezik",


    "Become a master of your finances": "Postani majstor svojih financija",
    "Secure your financial future": "Osiguraj svoju financijsku budućnost",
    "Track all your expenses in one place": "Prati sve troškove na jednom mjestu",
    "Let's go!": "Kreni!",

    "Customize categories to group your transactions": "Prilagodi kategorije za lakše grupiranje transakcija",
    "Create separate accounts for your transactions": "Kreiraj odvojene račune za svoje transakcije",
    "Tag your transactions with labels for easy tracking": "Označi svoje transakcije za lakši pregled",
    "Make a local backup of your data and restore it if you delete the app": "Napravi lokalnu kopiju podataka i vrati podatke u slučaju brisanja aplikacije",
    "Check out the onboarding carousel!": "Pogledaj uvodni opis aplikacije",
    "Generate Demo Dummy Transactions (x100)": "Generiraj Demo transakcije (x100)",

    "Create Backup": "Kreiraj kopiju",
    "Restore backup": "Vrati kopiju",
    "Are you sure?": "Sigurno?",
    "Delete": "Obriši",
    "Do you want to restore this backup? Make sure you have the current state backed up or it will be lost.": "Da li želiš vratiti ovu kopiju? Budi siguran da imaš kopiju trenutnog stanja.",
    "Do you want to delete this backup? This action cannot be undone.": "Da li želiš obrisati ovu kopiju?",



  },

}

const state = store.getState();
const language = get(state, "common.language.code")
console.log("state lng: ", language)

const translate = (string) => {
  const state = store.getState();
const language = get(state, "common.language.code")
  
  if (!language) { return string; }
  return get(translations, [language, string], string)
}

export default translate;
