import { RouteComponent } from "@tanstack/react-router"
import { makeImportsSpyable } from "../../util/make-imports-spyable"
import { act, fireEvent, render, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { randomAddress } from "@ton/test-utils"

makeImportsSpyable([
    { path: "@tanstack/react-router", componentsToMock: ["Link"] },
    { path: "use-ton-connect-sender" },
    { path: "@tonconnect/ui-react", componentsToMock: ["TonConnectUIProvider", "TonConnectButton"] },
    { path: "primereact/inputtext", componentsToMock: ["InputText"] },
])

describe("Testing TON transactions lists", () => {
    let component: any
    let network: string
    const redirectMock = jest.fn()
    const routeContextStub = () => ({
        lang: "en"
    })

    let tonwebMainnetApiImported: string
    let tonwebTestnetApiImported: string

    let fetchData = [{}]
    let fetchIndex = 0
    let fetchError: string | undefined = undefined
    let fetchMock: jest.Mock

    beforeEach(async () => {
        network = "mainnet"
        jest.clearAllMocks()
        jest.useRealTimers()

        fetchData = [{}]
        fetchIndex = 0
        fetchError = undefined

        global.fetch = fetchMock = jest.fn().mockImplementation(() =>
            Promise.resolve({
                json: () => {
                    fetchIndex = fetchIndex >= fetchData.length ? 0 : fetchIndex
                    return fetchError ?
                        Promise.reject(new Error(fetchError)) :
                        Promise.resolve(fetchData[fetchIndex++])
                }
            })
        ) as any

        const reactRouterImport = await import("@tanstack/react-router")
        jest.spyOn(reactRouterImport, "createFileRoute")
            .mockImplementation(
                (() =>
                    (param: RouteComponent<any> | undefined) => {
                        component = param
                        return ({
                            useRouteContext: routeContextStub,
                            useParams: () => ({
                                network
                            })
                        })
                    }) as any
            )
        jest.spyOn(reactRouterImport, "redirect").mockImplementation(redirectMock)
        jest.spyOn(reactRouterImport, "Link").mockImplementation(((props: {
            children: any,
            "data-testid": string
        }) => {
            return <span data-testid={props["data-testid"]}>{props.children}</span>
        }) as any)

        jest.spyOn(await import("primereact/inputtext"), "InputText")
            .mockImplementation(
                ((props: {
                    disabled?: boolean,
                    "data-testid"?: string,
                    onChange?: (value: { target: { value: string } }) => void,
                    value?: number
                }) => {
                    return <input
                        data-testid={props["data-testid"]}
                        disabled={props.disabled ?? undefined}
                        onChange={e => props.onChange?.(e)}
                        value={props.value}
                    />
                }) as any
            )

        await import("../../../../src/routes/it/ton/xlist.$network")
        const tonTransListImport = await import("../../../../src/components/TonTransactionsList")
        tonwebMainnetApiImported = tonTransListImport.TONWEB_MAINNET_API
        tonwebTestnetApiImported = tonTransListImport.TONWEB_TESTNET_API
    })

    test("Should reroute to the mainnet version from any unlisted route", async () => {
        // GIVEN the component loaded and the before load handler set
        const beforeLoadFunction = component.beforeLoad

        // WHEN calling the beforeLoad handler with an unlisted network
        // THEN an exception is thrown
        expect(() => beforeLoadFunction({ location: { pathname: "/it/ton/xlist/unlisted" } })).toThrow()

        // AND the redirect function is called with a masked part of path
        expect(redirectMock).toHaveBeenCalledWith({ to: "/it/ton/xlist/$network", params: { network: 'mainnet' } })
    })

    test("Should show link to testnet when mainnet selected", async () => {
        // GIVEN the page initialized
        const Component = component!.component

        // WHEN the component is rendered
        const { getByTestId } = render(<Component />)

        // THEN the link to testnet is shown
        expect(getByTestId("otherNetworkLink")).toHaveTextContent("Switch to testnet")
    })

    test("Should show link to mainnet when testnet selected", async () => {
        // GIVEN the page initialized on Testnet
        network = "testnet"
        const Component = component!.component

        // WHEN the component is rendered
        const { getByTestId } = render(<Component />)

        // THEN the link to testnet is shown
        expect(getByTestId("otherNetworkLink")).toHaveTextContent("Switch to mainnet")
    })

    test("Should show transactions after successful load", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have a valid but empty transactions list
        fetchData = [{ transactions: [] }]

        // WHEN setting the input to a valid address
        await act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } }))

        // THEN the transactions are fetched from the API
        expect(fetchMock).toHaveBeenCalledWith(
            `${tonwebMainnetApiImported}/transactions?account=${addressSet}&limit=5`, {
            headers: {
                "X-API-Key": "mainnet_key"
            }
        })

        // AND the dataset is tagged as connected
        expect(getByTestId("connectedTag")).toBeInTheDocument()
    })

    test("Should show empty transactions list after successful load", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have a valid but empty transactions list
        fetchData = [{ transactions: [] }]

        // WHEN setting the input to a valid address
        await act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } }))

        // THEN the transactions are fetched from the API
        expect(fetchMock).toHaveBeenCalledWith(
            `${tonwebMainnetApiImported}/transactions?account=${addressSet}&limit=5`, {
            headers: {
                "X-API-Key": "mainnet_key"
            }
        })

        // AND the dataset is tagged as connected
        expect(getByTestId("connectedTag")).toBeInTheDocument()
    })

    test("Should show error tag after unsuccessful load", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have an invalid transactions list
        fetchData = [{}]

        // WHEN setting the input to a valid address
        await act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } }))

        // THEN the dataset is tagged as invalid
        expect(getByTestId("errorTag")).toBeInTheDocument()
    })

    test("Should show error tag after unsuccessful messages load", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have a valid transactions list and an invalid messages list
        fetchData = [{ transactions: [] }, {}]

        // WHEN setting the input to a valid address
        await act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } }))

        // THEN the dataset is tagged as invalid
        expect(getByTestId("errorTag")).toBeInTheDocument()
    })

    test("Should show error tag after fetch throwing error", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND fetch throws an error
        fetchError = "Connection error"

        // WHEN setting the input to a valid address
        await act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } }))

        // THEN the dataset is tagged as invalid
        expect(getByTestId("errorTag")).toBeInTheDocument()
    })

    const transactionsList = (
        { address, peerAddress, baseHash, defaultValue, emptyBalances, wrongOutbounds,
            emptyOutbounds, invalidate, emptyStartTime }: {
                address?: string,
                peerAddress?: string,
                baseHash?: string,
                defaultValue?: bigint | null,
                emptyBalances?: boolean,
                wrongOutbounds?: boolean,
                emptyOutbounds?: boolean,
                invalidate?: boolean,
                emptyStartTime?: boolean
            }
    ) => [
            {
                transactions: [{
                    ts: new Date().getTime() / 1_000,
                    total_fees: 100_000,
                    in_msg: {
                        hash: baseHash,
                        source: address,
                        value: defaultValue === null ? null : defaultValue ?? 1_000_000_000,
                        created_at: emptyStartTime ? undefined : new Date().getTime() / 1_000 - 1_000,
                        created_lt: 1,
                    },
                    account_state_before: {
                        balance: emptyBalances ? undefined : 2,
                    },
                    account_state_after: {
                        balance: emptyBalances ? undefined : 3,
                    },
                    description: {
                        action: {
                            valid: !invalidate
                        }
                    }
                }]
            },
            {
                messages: [{
                    destination: peerAddress,
                    hash: baseHash,
                }, {
                    destination: randomAddress().toString(),
                    fwd_fee: 5,
                    hash: Math.random().toString(36),
                    ihr_fee: 5,
                    value: 500_000_000,
                    created_at: emptyStartTime ? undefined : new Date().getTime() / 1_000 - 1_000,
                    created_lt: 42
                }]
            },
            wrongOutbounds ? {} : emptyOutbounds ? { transactions: [] } : {
                transactions: [{
                    ts: new Date().getTime() / 1_000,
                    total_fees: 100_000,
                    in_msg: {
                        hash: baseHash,
                        source: peerAddress,
                        value: 1_000_000_000,
                        created_at: emptyStartTime ? undefined : new Date().getTime() / 1_000 - 1_000,
                        created_lt: 3,
                    },
                    account_state_before: {
                        balance: 2,
                    },
                    account_state_after: {
                        balance: 3,
                    },
                    description: {
                        action: {
                            valid: true
                        }
                    }
                }]
            },
        ]

    test("Should show non-empty transactions list after successful load", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have a valid non-empty transactions list
        const inboundAddress = randomAddress().toString()
        const baseHash = Math.random().toString(36)
        fetchData = transactionsList({ address: randomAddress.toString(), baseHash, peerAddress: inboundAddress })

        // WHEN setting the input to a valid address
        await act(() => act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } })))

        // THEN the transactions are fetched from the API
        expect(fetchMock).toHaveBeenCalledWith(
            `${tonwebMainnetApiImported}/transactions?account=${addressSet}&limit=5`, {
            headers: {
                "X-API-Key": "mainnet_key"
            }
        })

        // AND the dataset is tagged as connected
        expect(getByTestId("connectedTag")).toBeInTheDocument()

        // AND the correct amount is shown
        await waitFor(() => expect(getByTestId(`testedAmount1`)).toHaveTextContent("1 TON"))

        // AND a successful transaction is shown
        await waitFor(() => expect(getByTestId(`xSuccessfulTag1`)).toBeInTheDocument())
    })

    test("Should show a transaction list with a transaction in process", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have a valid non-empty transactions list
        const inboundAddress = randomAddress().toString()
        const baseHash = Math.random().toString(36)
        fetchData = transactionsList({ address: randomAddress.toString(), baseHash, peerAddress: inboundAddress, emptyOutbounds: true })

        // WHEN setting the input to a valid address
        await act(() => act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } })))

        // THEN a pending transaction is shown
        await waitFor(() => expect(getByTestId(`xProcessingTag42`)).toBeInTheDocument())
    })

    test("Should show a transaction list with a failed transaction", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have a valid non-empty transactions list
        const inboundAddress = randomAddress().toString()
        const baseHash = Math.random().toString(36)
        fetchData = transactionsList({
            address: randomAddress.toString(), baseHash, peerAddress: inboundAddress,
            invalidate: true, emptyStartTime: true
        })

        // WHEN setting the input to a valid address
        await act(() => act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } })))

        // THEN a pending transaction is shown
        await waitFor(() => expect(getByTestId(`xFailedTag1`)).toBeInTheDocument())
    })

    test("Should refresh transactions after a given time", async () => {
        // GIVEN the component is rendered
        jest.useFakeTimers()
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have a valid non-empty transactions list
        const inboundAddress = randomAddress().toString()
        const baseHash = Math.random().toString(36)
        fetchData = [
            ...transactionsList({ address: randomAddress.toString(), baseHash, peerAddress: inboundAddress }),
            { transactions: [] }, { transactions: [] }, { transactions: [] },
        ]

        // AND setting the input to a valid address
        await act(() => act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } })))

        // WHEN going to the next timer set
        await act(() => jest.advanceTimersToNextTimer())

        // THEN there are two series of three API calls recorded
        expect(fetchMock).toHaveBeenCalledTimes(6)
    })

    test("Should accept transactions with empty peer address", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND we have an invalid non-empty transactions list
        const inboundAddress = randomAddress().toString()
        const baseHash = Math.random().toString(36)
        fetchData = transactionsList({ baseHash, peerAddress: inboundAddress })

        // WHEN setting the input to a valid address
        await act(() => act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: randomAddress().toString() } })))

        // THEN the dataset is tagged as connected
        await waitFor(() => expect(getByTestId("connectedTag")).toBeInTheDocument())
    })

    test("Should accept transactions with malformed peer address", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND we have an invalid non-empty transactions list
        const inboundAddress = randomAddress().toString()
        const baseHash = Math.random().toString(36)
        fetchData = transactionsList({ address: "badAddress", baseHash, peerAddress: inboundAddress })

        // WHEN setting the input to a valid address
        await act(() => act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: randomAddress().toString() } })))

        // THEN the dataset is tagged as connected
        await waitFor(() => expect(getByTestId("connectedTag")).toBeInTheDocument())
    })

    test("Should accept transactions with raw peer address", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND we have an invalid non-empty transactions list
        const inboundAddress = randomAddress().toRawString()
        const baseHash = Math.random().toString(36)
        fetchData = transactionsList({ address: inboundAddress, baseHash, peerAddress: inboundAddress })

        // WHEN setting the input to a valid address
        await act(() => act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: randomAddress().toString() } })))

        // THEN the dataset is tagged as connected
        await waitFor(() => expect(getByTestId("connectedTag")).toBeInTheDocument())
    })

    test("Should accept transactions with empty value and empty balances", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND we have an invalid non-empty transactions list
        const inboundAddress = randomAddress().toString()
        const baseHash = Math.random().toString(36)
        fetchData = transactionsList({ address: inboundAddress, baseHash, peerAddress: inboundAddress, defaultValue: null, emptyBalances: true })

        // WHEN setting the input to a valid address
        await act(() => act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: randomAddress().toString() } })))

        // THEN the dataset is tagged as connected
        await waitFor(() => expect(getByTestId("connectedTag")).toBeInTheDocument())
    })

    test("Should show non-empty transactions list after successful load on testnet", async () => {
        // GIVEN the network is testnet
        network = "testnet"

        // AND the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have a valid non-empty transactions list
        const inboundAddress = randomAddress().toString()
        const baseHash = Math.random().toString(36)
        fetchData = transactionsList({ address: randomAddress.toString(), baseHash, peerAddress: inboundAddress })

        // WHEN setting the input to a valid address
        await act(() => act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } })))

        // THEN the transactions are fetched from the API
        expect(fetchMock).toHaveBeenCalledWith(
            `${tonwebTestnetApiImported}/transactions?account=${addressSet}&limit=5`, {
            headers: {
                "X-API-Key": "testnet_key"
            }
        })

        // AND the dataset is tagged as connected
        expect(getByTestId("connectedTag")).toBeInTheDocument()

        await waitFor(() => expect(getByTestId(`testedAmount1`)).toHaveTextContent("1 TON"))
    })

    test("Should show error tag after unsuccessful outbound transactions load", async () => {
        // GIVEN the component is rendered
        const Component = component!.component
        const { getByTestId } = render(<Component />)

        // AND the contract address is set to a random but valid one
        const addressSet = randomAddress().toString()

        // AND we have a valid transactions list and an invalid messages list
        const inboundAddress = randomAddress().toString()
        const baseHash = Math.random().toString(36)
        fetchData = transactionsList({ address: inboundAddress, baseHash, peerAddress: inboundAddress, wrongOutbounds: true })

        // WHEN setting the input to a valid address
        await act(() => fireEvent.change(getByTestId("contractAddressInput"), { target: { value: addressSet } }))

        // THEN the dataset is tagged as invalid
        expect(getByTestId("errorTag")).toBeInTheDocument()
    })

})