import { TonTransactionsList } from '../../../components/TonTransactionsList'
import { translate } from '../../../util/translate'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'

export const Route = createLazyFileRoute('/it/ton/xlist/$network')({
    component: () => {
        const { network } = Route.useParams()
        const [contractAddress, setContractAddress] = useState("")
        useEffect(() => {
            setContractAddress("")
        }, [network])

        const context = Route.useRouteContext()
        const lang = context.lang
        return <>
            <div className="grid flex-grow-1 overflow-y-scroll p-4 min-w-0 min-h-0 w-full">
                <div className="flex flex-column w-full">
                    <h1>{translate("Transactions list", lang)}</h1>
                    <div className='w-full'>
                        <InputText
                            className="p-3 w-full"
                            placeholder={`${translate("Contract address on", lang)} ${network}`}
                            value={contractAddress}
                            data-testid="contractAddressInput"
                            onChange={e => {
                                setContractAddress(e.target.value)
                            }}
                        />
                    </div>
                    <div className='w-full text-sm pb-4'>
                        <Link
                            to={`/it/ton/xlist/${network === "testnet" ? "./mainnet" : "./testnet"}`}
                            data-testid="otherNetworkLink"
                        >{translate("Switch to", lang)} {network === "testnet" ? "mainnet" : "testnet"}</Link>
                    </div>
                    <div className='w-full p-2'>
                        <TonTransactionsList
                            network={network as "mainnet" | "testnet"}
                            contractAddress={contractAddress}
                            lang={lang}
                        />
                    </div>
                </div>
            </div>
        </>
    }
})