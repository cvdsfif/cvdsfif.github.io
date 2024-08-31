import { translate } from '../../util/translate'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

const MediumArticle = ({ url, img, title, id }: { url: string, img: string, title: string, id?: number }) => {
    const context = Route.useRouteContext()
    const lang = context.lang

    return <Card
        key={`mediumCard${Math.round(Math.random() * 1_000_000)}`}
        title={title}
        className='m-2'
        style={{ maxWidth: "300px", minHeight: "350px" }}
        header={() => <img src={img} style={{ maxWidth: "300px" }} />}
        footer={() => <Button
            data-testid={id ? `link${id}` : undefined}
            label={translate("Read", lang)}
            onClick={() => window.open(url, "_blank")}
        />
        }
    />
}

export const Route = createLazyFileRoute('/it/articles')({
    component: () => {
        const context = Route.useRouteContext()
        const lang = context.lang
        return <>
            <h1 className='w-full pl-3' data-testid="title">{translate("Publications", lang)}</h1>
            <div className='flex flex-row flex-wrap flex-grow-1 overflow-y-visible bg-white min-w-0 min-h-0'>
                <MediumArticle
                    url='https://blog.stackademic.com/ton-contracts-made-easier-an-example-in-tact-language-5a4dd812ecfd?sk=51a74ca49c99b0126fd8ae7ed4d37dd5'
                    img='https://miro.medium.com/v2/resize:fit:1400/format:webp/1*8wdsMJIo_uDtAG4cTTUpGA.jpeg'
                    title='TON contracts made easier: an example in Tact language'
                />
                <MediumArticle
                    url='https://medium.com/stackademic/use-useindexeddb-instead-of-using-the-localstorage-3c867a2d1d45?sk=a7745615fd71fefbce97c45c22fbac61'
                    img='https://miro.medium.com/v2/resize:fit:1400/format:webp/1*F8fkHp_ustg3T0lH1IV6GA.jpeg'
                    title='Use useIndexedDb instead of using the localStorage'
                />
                <MediumArticle
                    url='https://medium.com/stackademic/telegram-bot-test-develop-and-host-on-aws-with-cdk-8a744a71cc0e?sk=5df9c6cd47135b8dbda30a3004019fe8'
                    img='https://miro.medium.com/v2/resize:fit:1280/format:webp/1*lKCGsCrqnY7DPCXmgrJYAg.jpeg'
                    title='Telegram bot: test, develop and host on AWS with CDK'
                />
                <MediumArticle
                    url='https://medium.com/stackademic/using-tanstack-router-in-react-spas-tdd-way-0aa7d2aabfff?sk=3b859aa49e74398655f3383ad00b25af'
                    img='https://miro.medium.com/v2/resize:fit:1280/format:webp/1*3-50g8IzTqO6zxCkdUfi3w.jpeg'
                    title='Using TanStack Router in React: A TDD way'
                    id={1}
                />
                <MediumArticle
                    url='https://medium.com/stackademic/creating-and-deploying-a-typescript-react-web-app-with-vite-quick-memo-5e99323cf63d?sk=72672b0e1277ee3516727f5f4298da31'
                    img='https://miro.medium.com/v2/resize:fit:1280/format:webp/1*tCS4ga8_5QL3agXd_54AAg.jpeg'
                    title='Creating and deploying a Typescript React web app with Vite: quick memo'
                />
                <MediumArticle
                    url='https://medium.com/stackademic/always-test-your-code-before-you-write-it-0e8ea9af8fec?sk=3f3cc201ab0bcf36d3251cece2f94406'
                    img='https://miro.medium.com/v2/resize:fit:1280/format:webp/1*MOkFj0oqhepFO0B9V0B1cA.jpeg'
                    title='Always test your code before you write it'
                />
                <MediumArticle
                    url='https://medium.com/stackademic/react-not-refreshing-array-data-524e44ce890a?sk=e22102b1008c25ebf2cacbbb6e0a2d15'
                    img='https://miro.medium.com/v2/resize:fit:1280/format:webp/1*-MZBk4oTwF7oj_xTeGBkfA.jpeg'
                    title='React Not Refreshing Array Data'
                />
                <MediumArticle
                    url='https://medium.com/stackademic/aws-http-api-host-it-on-your-domain-973c0d599643?sk=3d0bbc815e31297826612c0822aae7ef'
                    img='https://miro.medium.com/v2/resize:fit:1280/format:webp/1*cCoQn5dpZN0XpET0MXazHQ.jpeg'
                    title='AWS HTTP API: host it on your domain'
                />
                <MediumArticle
                    url='https://medium.com/stackademic/building-your-bastion-access-aws-rds-database-from-outside-your-vpc-1dc5c7463c31?sk=38eb601d737565ad4caec4902ae19c82'
                    img='https://miro.medium.com/v2/resize:fit:1280/format:webp/1*3drVk-0g6wh6r_BOgnDOng.jpeg'
                    title='Building your bastion: access the AWS RDS database from outside your VPC'
                />
                <MediumArticle
                    url='https://medium.com/stackademic/connect-aws-lambda-api-to-a-postgres-database-4f649b807414?sk=10d0b662035a328207c9ab3a4279ff15'
                    img='https://miro.medium.com/v2/resize:fit:1280/format:webp/1*OkAOscXaOi5AotU6I1Aj-A.jpeg'
                    title='Connect AWS Lambda API to a Postgres Database'
                />
                <MediumArticle
                    url='https://medium.com/stackademic/typescript-api-implementing-with-aws-cdk-and-using-on-a-web-client-2e3fe55a2f7b?sk=7f56e4bae87f46f4d774220d2f6ea95d'
                    img='https://miro.medium.com/v2/resize:fit:1280/format:webp/1*RaGR_58OWc49NhQ7-m179g.jpeg'
                    title='TypeScript API: Implementing with AWS CDK and Using on a Web Client'
                />
                <MediumArticle
                    url='https://medium.com/@cvds.eu/runtime-types-serialization-and-validation-the-magic-of-typescript-type-model-869579ba1bbf'
                    img='https://miro.medium.com/v2/resize:fit:1400/format:webp/1*eduV3p_6ulUu82rC9FlKow.jpeg'
                    title='Runtime types, serialization and validation: the magic of Typescript type model'
                />
                <MediumArticle
                    url='https://medium.com/@cvds.eu/publish-a-typescript-library-on-npm-simple-tutorial-14d931087f82'
                    img='https://miro.medium.com/v2/resize:fit:1400/format:webp/1*n-m5eozTCAXBqgjR289TQQ.jpeg'
                    title='Publish a Typescript library on npm: simple tutorial'
                />
            </div>
        </>
    }
})