import { createRootRoute, Link, Outlet, useRouter } from '@tanstack/react-router'
import { translate } from '../util/translate'

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

        const LanguageItem = ({ language }: { language: string }) => {
            if (lang.toLowerCase().startsWith(language))
                return <b
                    data-testid={`showLanguage${language}`}
                >{language.toUpperCase()}</b>
            return <Link
                data-testid={`linkToLanguage${language}`}
                onClick={e => {
                    e.preventDefault()
                    localStorage.setItem("userLanguage", language)
                    router.invalidate()
                }}>{language.toUpperCase()}</Link>
        }

        return <div data-testid="routeRoot">
            <nav>
                <Link to="/">{translate("Home", lang)}</Link>
                |
                <Link to="/about">{translate("About", lang)}</Link>
            </nav>
            <Outlet />
            <nav>
                <LanguageItem language="en" />
                |
                <LanguageItem language="fr" />
            </nav>
        </div>
    },
})