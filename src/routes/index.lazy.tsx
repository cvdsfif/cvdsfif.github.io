import { createLazyFileRoute } from '@tanstack/react-router'
import { translate } from '../util/translate'

export const Route = createLazyFileRoute('/')({
    component: () => {
        const context = Route.useRouteContext()
        const lang = context.lang
        return <div data-testid="content">{translate("Home", lang)}</div>
    }
})