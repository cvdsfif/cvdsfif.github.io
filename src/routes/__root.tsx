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
import { useRef, useState } from 'react'

export const Route = createRootRoute({
    beforeLoad: () => {
        const defaultLang =
            localStorage.getItem("userLanguage") ||
            window.navigator.language ||
            "en"

        return { lang: defaultLang }
    },
    component: () => {
        const router = useRouter()
        const context = Route.useRouteContext()
        const lang = context.lang

        const languages = [
            { value: "en", label: "EN" },
            { value: "fr", label: "FR" },
            { value: "ru", label: "RU" },
        ]
        const [selectedLang, setSelectedLang] = useState(languages.find(l => lang.startsWith(l.value))?.value ?? "en")

        const menu = useRef(null as TieredMenu | null)
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
                template: () =>
                    <Link to="/about" className="flex align-items-center p-menuitem-link">
                        <span className="pi pi-info-circle" />
                        <span className="mx-2">{translate("About", lang)}</span>
                    </Link>
            }
        ] as MenuItem[]

        const barStart = () => (<div>
            <TieredMenu popup model={menuItems} ref={menu} breakpoint="767px" />
            <Button
                data-testid="menuButton"
                label=""
                className="m-0 hover:text-blue bg-grey-100 text-black"
                icon="pi pi-align-justify"
                onClick={e => menu.current!.toggle(e)} />
            <span data-testid="languageValue" style={{ display: "none" }}>{selectedLang}</span>
        </div>)

        const barEnd = () => (<Dropdown
            data-testid="languageSelector"
            value={selectedLang}
            options={languages}
            optionLabel="label"
            onChange={e => {
                setSelectedLang(e.value)
                localStorage.setItem("userLanguage", e.value)
                router.invalidate()
            }}
        />)

        return <div
            data-testid="routeRoot"
            className="flex flex-column h-full w-full bg-gray-100 align-items-center justify-content-center">
            <div className="flex flex-grow-0 w-full">
                <Toolbar
                    className="p-2 w-full"
                    start={barStart} end={barEnd}
                />
            </div>
            <div className="flex flex-grow-1 align-items-center justify-content-center">
                <Outlet />
            </div>
            <div className="flex flex-grow-0 w-full">
                <a
                    href='https://www.facebook.com/nzykov'
                    target='_blank'
                ><img src='fbstd.png' style={{ maxHeight: "20px" }} /></a>
                &nbsp;
                <a
                    href='https://www.instagram.com/nz_cvds'
                    target='_blank'
                ><img src='instastd.png' style={{ maxHeight: "20px" }} /></a>
            </div>
        </div>
    },
})