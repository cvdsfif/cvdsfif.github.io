import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Tooltip } from "primereact/tooltip"
import { toTon } from "../util/to-ton"
import { Tag } from "primereact/tag"
import { useEffect, useRef, useState } from "react"
import { Address } from "@ton/core"
import { DateTime } from "luxon"
import { translate } from "../util/translate"

type TransactionInfo = {
    ts?: Date,
    amount: bigint,
    fees: bigint,
    direction: "in" | "out",
    startTs?: Date,
    otherAddress?: string
    endStatus?: string,
    lt: bigint,
    amountBefore?: bigint,
    amountAfter?: bigint,
    successful?: boolean
}

export const TONWEB_MAINNET_API = "https://toncenter.com/api/v3"
export const TONWEB_TESTNET_API = "https://testnet.toncenter.com/api/v3"

type InvalidRecordsList = { valid: false }
type ValidRecordsList = {
    valid: true,
    records: any[]
}

const transactionRequest = async (
    apiAddress: string,
    apiCall: string,
    request: string,
    apiKey: string
): Promise<ValidRecordsList | InvalidRecordsList> => {
    const url = `${apiAddress}/${apiCall}?${request}&limit=5`
    try {
        const fetchResponse = await fetch(
            url,
            {
                headers: {
                    "X-API-Key": apiKey
                }
            }
        )
        const result = await fetchResponse.json()
        if (!result || (!result.messages && !result.transactions) || result.error) return { valid: false }
        return {
            valid: true,
            records: result.messages ?? result.transactions
        }
    } catch (e) {
        console.error(`Error fetching transactions for ${url}`, e)
        return { valid: false }
    }
}

const convertTransactionRecord = (record: any, direction: "in" | "out") => {
    const otherAddressString = (direction == "in" ? record.in_msg.source : record.account)
    const otherAddress = otherAddressString && (Address.isFriendly(otherAddressString) || Address.isRaw(otherAddressString)) ?
        Address.parse(otherAddressString).toString() : undefined
    return {
        direction,
        ts: new Date(Math.round(Number(record.now) * 1_000)),
        fees: BigInt(record.total_fees),
        amount: BigInt(record.in_msg.value ?? 0),
        otherAddress,
        startTs: !record.in_msg.created_at ? undefined : new Date(Math.round(Number(record.in_msg.created_at) * 1_000)),
        lt: record.in_msg.created_lt,
        amountBefore: direction === "in" ? BigInt(record.account_state_before?.balance ?? "0") : undefined,
        amountAfter: direction === "in" ? BigInt(record.account_state_after?.balance ?? "0") : undefined,
        successful: record?.description?.action?.valid && !record?.description?.aborted
    }
}

const convertInTransactionRecord = (record: any) => convertTransactionRecord(record, "in")
const convertOutTransactionRecord = (record: any) => convertTransactionRecord(record, "out")

export type ValidTransactionsList = {
    valid: true,
    records: TransactionInfo[]
}
export type OtherTransactionList = {
    valid: false | null
}
export type AnyTransactionsList = {
    valid: boolean | null,
    records: TransactionInfo[]
}

const loadTransactionsForAddress = async (
    contractAddress: string,
    isTestnet: boolean,
    tonwebApiKey: string
): Promise<ValidTransactionsList | OtherTransactionList> => {
    const apiAddress = isTestnet ?
        TONWEB_TESTNET_API :
        TONWEB_MAINNET_API

    const transactions = await transactionRequest(
        apiAddress,
        "transactions",
        `account=${contractAddress}`,
        tonwebApiKey
    )
    //console.log("Transactions", transactions)
    if (!transactions.valid) return { valid: false }
    const inboundTransactions = transactions.records.map(convertInTransactionRecord)

    const messages = await transactionRequest(
        apiAddress,
        "messages",
        `source=${contractAddress}`,
        tonwebApiKey
    )
    //console.log("Messages", messages)

    if (!messages.valid) return { valid: false }

    const peerAddresses = messages.records.reduce((acc: Set<string>, message: any) => {
        acc.add(message.destination)
        return acc
    }, new Set<string>())

    const peerTransactions = new Map<string, ValidRecordsList>()
    for (const peerAddress of peerAddresses) {
        const outboundTransactions = await transactionRequest(
            apiAddress,
            "transactions",
            `account=${peerAddress}`,
            tonwebApiKey
        )
        if (!outboundTransactions.valid) return { valid: false }
        peerTransactions.set(peerAddress, outboundTransactions)
    }

    const outboundTransactions: TransactionInfo[] = messages.records.map(message => {
        const outboundSeries = peerTransactions.get(message.destination)!
        //console.log("Outbound transactions", outboundSeries)
        const matchingTransaction = outboundSeries.records.find((record: any) => message.hash === record.in_msg.hash)
        if (matchingTransaction) {
            return convertOutTransactionRecord(matchingTransaction)
        } else {
            return {
                direction: "out",
                fees: BigInt(message.fwd_fee ?? 0),
                amount: BigInt(message.value ?? 0),
                otherAddress: Address.parse(message.destination).toString(),
                startTs: new Date(Number(message.created_at) * 1_000),
                lt: message.created_lt,
            }
        }
    })

    return {
        valid: true,
        records: Array.from([
            ...inboundTransactions,
            ...outboundTransactions
        ]).toSorted((a: TransactionInfo, b: TransactionInfo) => (b.startTs ? b.startTs.getTime() : 0) - (a.startTs ? a.startTs!.getTime() : 0))
    }
}

export type TonTransactionsListProps = {
    contractAddress: string,
    network: "mainnet" | "testnet",
    lang: string
}


export const TonTransactionsList = (props: TonTransactionsListProps) => {
    const lang = props.lang
    const [contractTransactions, setContractTransactions] = useState<AnyTransactionsList>({ valid: null, records: [] })

    const tonwebKeyRef = useRef<string>(import.meta.env?.VITE_TONWEB_MAINNET_KEY)
    const contractAddressRef = useRef(props.contractAddress)

    const isTestnet = useRef(false)
    isTestnet.current = props.network === "testnet"
    tonwebKeyRef.current = isTestnet.current ? import.meta.env?.VITE_TONWEB_TESTNET_KEY : import.meta.env?.VITE_TONWEB_MAINNET_KEY

    const refreshContract = async () => {
        const contract = contractAddressRef.current
        const contractTransactionsToSet = await loadTransactionsForAddress(
            contract,
            isTestnet.current,
            tonwebKeyRef.current!
        )
        // console.log("Contract transactions", contractTransactionsToSet)
        setContractTransactions(actualTransactions => contractTransactionsToSet.valid ? contractTransactionsToSet :
            { valid: false, records: actualTransactions.records }
        )
    }

    const REFRESH_MS = 15_000
    useEffect(() => {
        contractAddressRef.current = props.contractAddress
        if (!Address.isFriendly(props.contractAddress) && !Address.isRaw(props.contractAddress)) {
            setContractTransactions({ valid: null, records: [] })
            return
        }
        const timer = setInterval(() => {
            refreshContract()
        }, REFRESH_MS);
        refreshContract()
        return () => clearInterval(timer)
    }, [props.contractAddress])

    useEffect(() => {
        isTestnet.current = props.network === "testnet"
    }, [props.network])

    return <>
        {contractTransactions.valid ? <Tag
            data-testid="connectedTag"
            severity={"success"} value={translate("Connected", lang)} /> :
            contractTransactions.valid === null ? <Tag
                data-testid="waitingTag"
                severity={"info"} value={translate("Waiting...", lang)} /> :
                <Tag
                    data-testid="errorTag"
                    severity={"danger"} value={translate("Connection error", lang)} />}
        <DataTable
            size='small'
            className="p-3"
            showGridlines stripedRows scrollable
            value={contractTransactions.records}
        >
            <Column
                key={"direction"}
                body={(transaction: TransactionInfo) => <>
                    <Tooltip
                        target={`.directionOf${transaction.lt}`}
                    />
                    {!transaction.ts ? <Tag
                        data-testid={`xProcessingTag${transaction.lt}`}
                        severity={"info"} value={translate("Processing...", lang)} /> :
                        transaction.successful ? <Tag
                            data-testid={`xSuccessfulTag${transaction.lt}`}
                            severity={"success"} value={translate("Success", lang)} /> :
                            <Tag
                                data-testid={`xFailedTag${transaction.lt}`}
                                severity={"danger"} value={translate("Failed", lang)} />}&nbsp;
                    <Tag
                        className={`directionOf${transaction.lt}`}
                        data-pr-tooltip={`${transaction.direction === "in" ? translate("From ", lang) : translate("To ", lang)
                            }${transaction.otherAddress}`}
                        data-pr-position="right"
                        data-pr-at="right+5 top"
                        data-pr-my="left center-2"
                        style={{ cursor: 'pointer' }}
                        value={translate(transaction.direction, lang)}
                        severity={transaction.direction === "in" ? "info" : "warning"}
                    />
                </>}
                header={translate("Status", lang)}
            />
            <Column
                key={"startTs"}
                body={(transaction: TransactionInfo) => <>
                    <Tooltip
                        target={`.tsOf${transaction.lt}`}
                    />
                    <span
                        className={`tsOf${transaction.lt}`}
                        data-pr-tooltip={`Transaction completed: ${transaction.ts ? DateTime
                            .fromJSDate(transaction.ts)
                            .toFormat("dd/MM/yy HH:mm") : "-"}`}
                        data-pr-position="right"
                        data-pr-at="right+5 top"
                        data-pr-my="left center-2"
                        style={{ cursor: 'pointer' }}>{transaction.ts ? DateTime
                            .fromJSDate(transaction.ts)
                            .toFormat("dd/MM/yy HH:mm") : "-"}
                    </span>
                </>}
                header={translate("Time", lang)}
            />
            <Column
                key={"amount"}
                body={(transaction: TransactionInfo) => <>
                    <Tooltip
                        target={`.amountOf${transaction.lt}`}
                    />
                    <span
                        className={`amountOf${transaction.lt}`}
                        data-pr-tooltip={transaction.amountBefore !== undefined &&
                            transaction.amountAfter !== undefined ?
                            `${toTon(transaction.amountBefore, lang)} -> ${toTon(transaction.amountAfter, lang)}` : "-"}
                        data-pr-position="right"
                        data-pr-at="right+5 top"
                        data-pr-my="left center-2"
                        data-testid={`testedAmount${transaction.lt}`}
                        style={{ cursor: 'pointer' }}>{toTon(transaction.amount, lang)}</span>
                </>}
                header={translate("Amount", lang)}
            />
            <Column
                key={"timeElapsed"}
                body={(transaction: TransactionInfo) => <>
                    {transaction.startTs && transaction.ts ?
                        (transaction.ts.getTime() - transaction.startTs.getTime()) / 1_000 : "-"} sec.
                </>}
                header={translate("Time elapsed", lang)}
            />
            <Column
                key={"fees"}
                body={(transaction: TransactionInfo) => <>
                    <Tooltip
                        target={`.amountOf${transaction.lt}`}
                    />
                    <span
                        style={{ cursor: 'pointer' }}>{toTon(transaction.fees, lang)}</span>
                </>}
                header={translate("Fees", lang)}
            />
        </DataTable>
    </>
}