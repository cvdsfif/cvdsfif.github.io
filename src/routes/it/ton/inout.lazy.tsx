import { NzComTact } from '../../../contracts/tact_NzComTact'
import { createLazyFileRoute } from '@tanstack/react-router'
import { TonConnectButton, TonConnectUIProvider } from '@tonconnect/ui-react'
import { useEffect, useRef, useState } from 'react'
import { translate } from '../../../util/translate'
import { InputNumber } from 'primereact/inputnumber'
import { Button } from 'primereact/button'
import { toNano } from '@ton/core'
import { RadioButton } from "primereact/radiobutton"
import { useTonConnectSender, useTonContract } from 'use-ton-connect-sender'
import { toTon } from '../../../util/to-ton'
import { TonTransactionsList } from '../../../components/TonTransactionsList'

export const AMOUNT_FOR_GAS = toNano("0.02")
export const CONTRACT_TESTNET_ADDRESS = "EQA9dUWjN-Q_rPJv1e2SVs1WCYue0Llz9VYgty3ih14wRPF5"
export const CONTRACT_MAINNET_ADDRESS = "EQA83ZyoAmxP9EkKddsK4JK3yExB_G4EkNblgXb85kqEL0dj"
const manifestUrl = "https://www.zykov.com/manifest.json"
export const NANO_IN_TON = 1_000_000_000n


const ConnectedComponent = () => {
    const [contractAddress, setContractAddress] = useState(CONTRACT_MAINNET_ADDRESS)
    const [contractAmount, setContractAmount] = useState<bigint | undefined>(undefined)
    const [depositAmount, setDepositAmount] = useState<number | null | undefined>(0)
    const [withdrawAmount, setWithdrawAmount] = useState<number | null | undefined>(0)
    const [ownerConnected, setOwnerConnected] = useState(false)

    const context = Route.useRouteContext()
    const lang = context.lang
    const isTestnet = useRef(false)
    isTestnet.current = contractAddress !== CONTRACT_MAINNET_ADDRESS

    const mainContract = useTonContract(
        isTestnet.current ? "testnet" : "mainnet",
        contractAddress,
        NzComTact
    )
    const mainContractRef = useRef<typeof mainContract | undefined>()
    mainContractRef.current = mainContract

    const refreshContract = async () => {
        const contract = mainContractRef.current
        if (!contract) return
        const contractAmount = await contract.getBalance()
        setContractAmount(contractAmount)
    }

    const { sender, setOptions } = useTonConnectSender()
    setOptions({ language: lang === "ru" ? "ru" : "en" })

    const sendDeposit = async () => {
        try {
            await mainContract?.send(
                sender!,
                {
                    value: toNano(`${depositAmount}`),
                },
                {
                    $$type: 'Deposit'
                }
            )
        } catch (e) {
            console.error("Error depositing funds", e)
        }
        setDepositAmount(0)
    }

    const readOwner = async () => {
        try {
            const contractOwner = await mainContract?.getOwner()
            setOwnerConnected(!!sender?.address && sender?.address?.toString() === contractOwner?.toString())
        } catch (e) {
            console.error("Error reading owner", e)
            setOwnerConnected(false)
        }
    }

    useEffect(() => {
        readOwner()
    }, [mainContract, sender])

    useEffect(() => {
        refreshContract()
    }, [mainContract])

    useEffect(() => {
        const REFRESH_INTERVAL = 15_000
        const handler = setInterval(() => {
            refreshContract()
        }, REFRESH_INTERVAL)
        refreshContract()
        return () => clearInterval(handler)
    }, [])

    const sendWithdraw = async () => {
        try {
            await mainContract?.send(
                sender!,
                {
                    value: AMOUNT_FOR_GAS,
                },
                {
                    $$type: 'Withdrawal',
                    amount: toNano(`${withdrawAmount}`)
                }
            )
        } catch (e) {
            console.error("Error withdrawing funds", e)
        }
        setWithdrawAmount(0)
    }

    return <div
        className='grid flex-grow-1 overflow-y-scroll p-4 min-w-0 min-h-0 w-full'
    >
        <div className="flex flex-column w-full">
            <h1>{translate("deposit-withdrawal", lang)}</h1>
            <div className="grid w-full">
                <div className="col-2 col-offset-1">{translate("Current amount:", lang)}</div>
                <div className="col-9 font-bold" data-testid="contractAmount">{contractAmount ?
                    toTon(contractAmount, lang) : translate("Loading...", lang)}</div>
                <div className="col-2 col-offset-1 align-content-center">{translate("Network:", lang)}</div>
                <div className="col-9 font-bold gap-3">
                    <RadioButton
                        inputId='mainNetSelector'
                        data-testid='mainNetSelector'
                        name='network'
                        value={CONTRACT_MAINNET_ADDRESS}
                        onChange={() => {
                            setContractAddress(CONTRACT_MAINNET_ADDRESS)
                        }}
                        checked={!isTestnet.current}
                        className='ml-2'
                    />
                    <label htmlFor='mainNetSelector' className='ml-2'>Mainnet</label>
                    <RadioButton
                        inputId='testNetSelector'
                        data-testid='testNetSelector'
                        name='network'
                        value={CONTRACT_TESTNET_ADDRESS}
                        onChange={() => {
                            setContractAddress(CONTRACT_TESTNET_ADDRESS)
                        }}
                        checked={isTestnet.current}
                        className='ml-2'
                    />
                    <label htmlFor='testNetSelector' className='ml-2'>Testnet</label>
                </div>
                <div className="col-2 col-offset-1 align-content-center">{translate("Deposit TON:", lang)}</div>
                <div className="col-9 font-bold"><InputNumber
                    disabled={!sender}
                    value={depositAmount}
                    min={0}
                    suffix=' TON'
                    maxFractionDigits={9}
                    onValueChange={e => setDepositAmount(e.value)}
                    data-testid="depositInput"
                /><Button
                    disabled={!sender || !depositAmount}
                    data-testid="depositButton"
                    onClick={() => sendDeposit()}
                >{translate("Send", lang)}</Button></div>
                <div className="col-2 col-offset-1 align-content-center">{translate("Withdraw TON:", lang)}</div>
                <div className="col-9 font-bold"><InputNumber
                    disabled={!ownerConnected}
                    value={withdrawAmount}
                    min={0}
                    suffix=' TON'
                    maxFractionDigits={9}
                    onValueChange={e => setWithdrawAmount(e.value)}
                    data-testid="withdrawInput"
                /><Button
                    disabled={!ownerConnected || !withdrawAmount}
                    onClick={() => sendWithdraw()}
                    data-testid="withdrawButton"
                >{translate("Send", lang)}</Button></div>
                <div
                    className="col-11 col-offset-1 align-content-center text-xs text-red-500"
                    hidden={ownerConnected}
                >{translate("owner-only", lang)}</div>
                <div className="col-2 col-offset-1">{translate("Contract address:", lang)}</div>
                <div className="col-9">{contractAddress}</div>
                <div className="col-11 col-offset-1"><TonConnectButton /></div>
                <div className="col-11 col-offset-1">
                    {translate("about-contract", lang)} <a
                        href='https://blog.stackademic.com/ton-contracts-made-easier-an-example-in-tact-language-5a4dd812ecfd?sk=51a74ca49c99b0126fd8ae7ed4d37dd5'
                        target='_blank'>{translate("this article", lang)}</a>.
                </div>
                <div
                    className='col-12'
                >
                    <h3>Contract's transactions</h3>
                </div>
                <div
                    className='col-12'
                >
                    <TonTransactionsList
                        contractAddress={contractAddress}
                        network={isTestnet.current ? "testnet" : "mainnet"}
                        lang={lang}
                    />
                </div>
            </div>
        </div>
    </div>
}

export const Route = createLazyFileRoute('/it/ton/inout')({
    component: () => {
        return <TonConnectUIProvider manifestUrl={manifestUrl}>
            <ConnectedComponent />
        </TonConnectUIProvider>
    }
})