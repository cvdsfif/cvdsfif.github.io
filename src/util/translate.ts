const tableFr: { [key: string]: string } = {
    "Home": "Accueil",
    "About": "A propos"
}

const languages = [
    { lang: "fr", table: tableFr }
]

export const translate = (str: string, lang: string) =>
    languages.find(l => l.lang.startsWith(lang))?.table[str] ?? str