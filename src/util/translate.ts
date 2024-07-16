const tableEn: { [key: string]: string } = {
    "About presentation p1": `
        Currently living and working in Marbella (Andalusia, Spain) after many years in London, I am an IT consultant with over thirty years 
        experience of leading projects and business analysis in different areas, 
        particularly in online gaming, logistics and document management.
    `,
    "About presentation p2": `
        Specialist in cloud computing (in particular, FaaS and SaaS architectures), I organize agile development teams around distributed 
        platforms such as AWS with a complete production cycle based on test and behavior oriented development (TDD/BDD) and continuous integration.
    `,
    "About presentation p3": `
        Blockchain is finally coming to the age of maturity with the arrival of TON.
        It’s the right time to dive into this ecosystem. The development of token contracts, 
        NFTs and SBTs is one of my main areas of interest currently.
    `,
    "About presentation p4": `
    Outside of the professional field, I am interested in the study of languages, travel, music and numismatics. 
    As for literature, it is more a meaning of life than a simple passion...
    `,
}

const tableFr: { [key: string]: string } = {
    "Home": "Accueil",
    "About": "A propos",
    "Nikit Zykov": "Nikit Zykov",
    "E-mail address": "Adresse E-mail",
    "About presentation p1": `
        Vivant et travaillant actuellement à Marbella (Andalousie, Espagne) après plusieurs années à Londres, 
        je suis consultant informatique avec plus de trente ans d'expérience de direction et d'analyse des projets 
        dans différents domaines, en particulier dans les jeux en ligne, la logistique et la gestion documentaire.
    `,
    "About presentation p2": `
        Spécialiste en cloud computing (en particulier, des architectures FaaS and SaaS), j'organise des équipes de développement 
        agiles autour des plateformes distribuées tels que AWS avec un cycle complet de production basé sur le développement orienté 
        test et comportement (TDD/BDD) et l'intégration continue.
    `,
    "About presentation p3": `
    Le blockchain arrive enfin à maturité avec l'arrivée de TON. 
        C'est le juste temps pour plonger dans cet écosystème. Le développement des contrats de jetons, des NFT et des SBT est un de 
        mes domaines d'intérêts principaux actuellement.
    `,
    "About presentation p4": `
    En dehors du domaine professionnel, je m'intéresse à l'étude des langues, aux voyages, à la musique et à la numismatique. 
    Quant à la littérature, c'est plus un mode de vie qu'une simple passion...
    `,
    "Articles": "Publications",
    "Read": "Lire"
}

const tableRu: { [key: string]: string } = {
    "Home": "Старт",
    "About": "Обо мне",
    "Nikit Zykov": "Никита Зыков",
    "E-mail address": "Адрес электронной почты",
    "Telegram": "Телеграм",
    "About presentation p1": `
        В настоящее время живу и работаю в Марбелье (Андалузия, Испания) после многолетней работы в Лондоне.
        IT-консультант с более чем тридцатилетним опытом управления проектами и бизнес-аналитики в различных областях,
        в частности в онлайн-играх, логистике и системах обработки документов.
    `,
    "About presentation p2": `
        Специализируюсь на облачных системах (в частности, FaaS и SaaS), координирую команды agile-разработчиков
        на распределённых платформах (в основном AWS) с полным циклом разработки (TDD и BDD) и постоянной интеграции.
    `,
    "About presentation p3": `
        Технологии блокчейна выходят на уровень технологической зрелости с приходом TON. Сейчас идеальное время для того, для 
        глубокого ознакомления с этой экосистемой. Разработка контрактов токенов, NFT и SBT - один из моих основных интересов в 
        настоящее время.
    `,
    "About presentation p4": `
        Кроме собственно работы, я изучаю языки, путешествую, интересуюсь музыкой и нумизматикой. Что же касается литературы,
        то это больше, чем увлечение, это скорее образ жизни...
    `,
    "Àrticles": "Публикации",
    "Read": "Читать",
    "Publications": "Публикации"
}

const languages = [
    { lang: "en", table: tableEn },
    { lang: "fr", table: tableFr },
    { lang: "ru", table: tableRu }
]

export const translate = (str: string, lang: string) =>
    languages.find(l => l.lang?.startsWith(lang))?.table[str] ??
    languages.find(l => l.lang?.startsWith("en"))?.table[str] ??
    str