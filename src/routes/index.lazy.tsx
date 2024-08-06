import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { Card } from 'primereact/card'
import { translate } from '../util/translate'
import { styled } from "styled-components";
import { Button } from 'primereact/button';
import pj from "../../package.json"

const Wrapper = styled.div`
            .p-card-title {
                font-size: 1.2rem
            }
        `

export const Route = createLazyFileRoute('/')({
    component: () => {
        const context = Route.useRouteContext()
        const lang = context.lang

        const cardHeader = () => <Link to="/about">
            <img
                src="/nztransp2407.png"
                alt="NZ"
                title={`Copyright © 2024, Nikit Zykov, version ${pj.version}`}
                style={{ maxWidth: "70vh", maxHeight: "50vh" }} />
        </Link>
        return <div className="flex flex-grow-1 align-items-center justify-content-center overflow-y-scroll">
            <Wrapper>
                <Card title={translate("Nikit Zykov", lang)} header={cardHeader} data-testid="nameDisplay">
                    <Button
                        data-testid="linkToMail"
                        icon="pi pi-envelope"
                        tooltip={translate("E-mail address", lang)}
                        text
                        onClick={() => window.open("mailto:nikit@zykov.com", "_blank")}
                    >&nbsp;nikit@zykov.com</Button>
                    <Button
                        data-testid="linkToTG"
                        icon="pi pi-telegram"
                        tooltip={translate("Telegram", lang)}
                        text
                        onClick={() => window.open("https://t.me/nz_cvds", "_blank")}
                    >&nbsp;nz_cvds</Button>
                </Card>
            </Wrapper>
        </div >

    }
})