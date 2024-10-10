import { translate } from '../../util/translate'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

type Repository = {
    id?: number
    about: string
    url: string
}

const RepositoryCard = ({ title, subtitle, repositories }: { title: string, subtitle?: string, repositories: Repository[] }) => {
    const context = Route.useRouteContext()
    const lang = context.lang

    return <div className="col-12"><Card
        key={`repCard${Math.round(Math.random() * 1_000_000)}`}
        title={title}
        subTitle={subtitle}
        className='m-2 ml-6'
        style={{ width: "90%" }}
    >{repositories.map(repository => <div
        key={`repLine${Math.round(Math.random() * 1_000_000)}`}
        className='flex align-items-center flex-wrap vertical-align-middle flex-row'
    >
        <div><Button
            data-testid={repository.id ? `repositoryLink${repository.id} ` : undefined}
            onClick={() => window.open(repository.url, "_blank")}
            text
        >{repository.url.split("/").pop()}</Button></div>
        <div>{translate(repository.about, lang)}</div>
    </div>
    )}</Card></div>
}

export const Route = createLazyFileRoute('/it/repositories')({
    component: () => {
        const context = Route.useRouteContext()
        const lang = context.lang
        return <>
            <h1 className='w-full pl-3' data-testid="title">{translate("Code repositories", lang)}</h1>
            <div className='grid flex-grow-1 overflow-y-visible bg-white min-w-0 min-h-0 w-full'>
                <RepositoryCard
                    title={translate("This site", lang)}
                    repositories={[
                        { about: "repositories.thisSite.about", url: "https://github.com/cvdsfif/cvdsfif.github.io" },
                        { about: "repositories.thisSite.tact-example", url: "https://github.com/cvdsfif/nzcom-tact" },
                    ]}
                /><br />
                <RepositoryCard
                    title={translate("React hook libs", lang)}
                    repositories={[
                        { id: 1, about: "repositories.usetonconnect.about", url: "https://github.com/cvdsfif/use-ton-connect-sender" },
                        { about: "repositories.idbhook.about", url: "https://github.com/cvdsfif/use-indexed-db" },
                    ]}
                /><br />
                <RepositoryCard
                    title={translate("Telegram bots examples", lang)}
                    subtitle={translate("repositories.tgbot.subtitle", lang)}
                    repositories={[
                        { about: "repositories.tgbot.plain", url: "https://github.com/cvdsfif/tg-cdk-plain" },
                        { about: "repositories.tgbot.lib", url: "https://github.com/cvdsfif/tg-cdk-lib" },
                    ]}
                /><br />
                <RepositoryCard
                    title={translate("Typizator", lang)}
                    subtitle={translate("repositories.typizator.subtitle", lang)}
                    repositories={[
                        { about: "repositories.typizator.about", url: "https://github.com/cvdsfif/typizator" },
                        { about: "repositories.typizator-handler.about", url: "https://github.com/cvdsfif/typizator-handler" },
                        { about: "repositories.cdk-typescript-lib.about", url: "https://github.com/cvdsfif/cdk-typescript-lib" },
                        { about: "repositories.typizator-client.about", url: "https://github.com/cvdsfif/typizator-client" },
                        { about: "repositories.typizator-test.about", url: "https://github.com/cvdsfif/typizator-test" },
                    ]}
                />
            </div>
        </>
    }
})