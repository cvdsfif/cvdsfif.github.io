import { createLazyFileRoute } from '@tanstack/react-router'
import { Panel } from 'primereact/panel'
import { translate } from '../util/translate'

export const Route = createLazyFileRoute('/about')({
    component: () => {
        const context = Route.useRouteContext()
        const lang = context.lang
        console.log("About lang", lang)
        return <div className="flex flex-grow-1 align-items-center justify-content-center overflow-y-scroll">
            <Panel header={translate("About", lang)} style={{ maxWidth: "75vh" }} data-testid="content">
                <p>{translate("About presentation p1", lang)}</p>
                <p>{translate("About presentation p2", lang)}</p>
                <p>{translate("About presentation p3", lang)}</p>
                <p>{translate("About presentation p4", lang)}</p>
            </Panel>
        </div>
    }
})