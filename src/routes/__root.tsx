import { createRootRoute, Link, Outlet, useRouter } from '@tanstack/react-router'
import { translate } from '../util/translate'
import { Toolbar } from "primereact/toolbar"
import { TieredMenu } from "primereact/tieredmenu"
import { Button } from "primereact/button"
import { Dropdown } from 'primereact/dropdown'
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import 'primeicons/primeicons.css'
import "primeflex/primeflex.css"
import { MenuItem } from 'primereact/menuitem'
import { useRef } from 'react'
import { loadStoredData, useIndexedDbState } from "use-indexed-db-state";

const languages = [
    { value: "en", label: "EN" },
    { value: "fr", label: "FR" },
    { value: "ru", label: "RU" },
]

export const LANGUAGE_SELECTED_KEY = "languageSelected"

const browserOrDefaultLanguage = () => languages.find(language => window.navigator.language?.startsWith(language.value))?.value ?? "en"

export const Route = createRootRoute({
    beforeLoad: async () => {
        return {
            lang: await loadStoredData(LANGUAGE_SELECTED_KEY) as string | undefined ?? browserOrDefaultLanguage()
        }
    },
    component: () => {
        const router = useRouter()
        const context = Route.useRouteContext()
        const menu = useRef(null as TieredMenu | null)

        const [lang, setLang, langLoaded] = useIndexedDbState(
            LANGUAGE_SELECTED_KEY,
            browserOrDefaultLanguage(),
            {
                storedCallback() {
                    router.invalidate()
                }
            }
        )

        if (!context) {
            console.warn("Invalidating due to empty context")
            setTimeout(() => router.invalidate(), 100)
            return <div data-testid="loadingPlaceholder">Loading...</div>
        }

        const menuItems = [
            {
                template: () =>
                    <Link to="/" className="flex align-items-center p-menuitem-link"
                        data-testid="homeLink">
                        <span className="pi pi-home" />
                        <span className="mx-2">{translate("Home", lang)}</span>
                    </Link>
            },
            {
                label: "IT",
                icon: "pi pi-desktop",
                items: [
                    {
                        template: () =>
                            <Link to="/it/articles" className="flex align-items-center p-menuitem-link">
                                <span className="pi pi-pencil" />
                                <span className="mx-2">{translate("Articles", lang)}</span>
                            </Link>
                    },
                    {
                        template: () =>
                            <Link to="/it/repositories" className="flex align-items-center p-menuitem-link">
                                <span className="pi pi-code" />
                                <span className="mx-2">{translate("Code repositories", lang)}</span>
                            </Link>
                    }
                ]
            },
            {
                template: () =>
                    <Link
                        to="/languages"
                        className="flex align-items-center p-menuitem-link">
                        <span className="pi pi-language" />
                        <span className="mx-2">{translate("Languages", lang)}</span>
                    </Link>
            },
            ...(lang === "ru" ? [
                {
                    template: () =>
                        <Link
                            data-testid="senryuLink"
                            to="/senryu"
                            className="flex align-items-center p-menuitem-link">
                            <span className="pi pi-compass" />
                            <span className="mx-2">Сэнрю</span>
                        </Link>
                }
            ] : []),
            {
                template: () =>
                    <Link to="/about" className="flex align-items-center p-menuitem-link">
                        <span className="pi pi-info-circle" />
                        <span className="mx-2">{translate("About", lang)}</span>
                    </Link>
            },
        ] as MenuItem[]

        const barStart = () => (<div>
            <TieredMenu popup model={menuItems} ref={menu} breakpoint="767px" />
            <Button
                data-testid="menuButton"
                label=""
                className="m-0 hover:text-blue bg-grey-100 text-black"
                icon="pi pi-align-justify"
                onClick={e => menu.current!.toggle(e)} />
            <span data-testid="languageValue" style={{ display: "none" }}>{lang}</span>
        </div>)

        const barEnd = () => (<Dropdown
            data-testid="languageSelector"
            value={lang}
            options={languages}
            optionLabel="label"
            disabled={!langLoaded}
            onChange={e => {
                setLang(e.value)
            }}
        />)

        return <div
            data-testid="routeRoot"
            className="flex flex-column h-full w-full bg-gray-100 align-items-center justify-content-center">
            <div className="flex w-full flex-grow-0">
                <Toolbar
                    className="p-2 w-full"
                    start={barStart} end={barEnd}
                />
            </div>
            <Outlet />
        </div>
    },
})