import { RouteComponent } from "@tanstack/react-router"
import { act, fireEvent, render, waitFor } from "@testing-library/react"
import { randomAddress } from "@ton/test-utils"
import "@testing-library/jest-dom"
import { Sender, toNano } from "@ton/core"
import { Deploy, Deposit, Withdrawal } from "@/src/contracts/tact_NzComTact"

describe("Testing simple deposit/withdrawal contract", () => {
    let extractedComponent: any
    const routeContextMock = jest.fn()
    const sendTransactionMock = jest.fn()
    const getHttpEndpointMock = jest.fn()
    const clientSenderMock = jest.fn()
    const getOwnerMock = jest.fn()
    const setOptionsMock = jest.fn()
    let connectSenderExtracted: Sender
    let AMOUNT_FOR_GAS: bigint

    const TON_OWNER_ADDRESS = randomAddress().toString()
    const TON_DIFFERENT_ADDRESS = randomAddress().toString()
    let tonClientAddress: string

    const getBalanceMock = jest.fn()
    const tonClientStub = {
        getBalance: getBalanceMock,
        getOwner: getOwnerMock,
        send: clientSenderMock
    }

    beforeAll(async () => {
        jest.mock(
            "@tanstack/react-router",
            () => ({
                createLazyFileRoute: jest.fn().mockImplementation(
                    () =>
                        (param: RouteComponent<any> | undefined) => {
                            extractedComponent = param
                            return ({
                                useRouteContext: routeContextMock,
                            })
                        }
                ),
                Link: () => <></>
            })
        )

        jest.mock(
            "@orbs-network/ton-access",
            () => ({
                getHttpEndpoint: getHttpEndpointMock
            })
        )

        jest.mock(
            "@ton/ton",
            () => ({
                TonClient: jest.fn().mockImplementation(
                    () => ({
                        open: () => () => tonClientStub
                    })
                )
            })
        )

        jest.mock(
            "@tonconnect/ui-react",
            () => ({
                TonConnectUIProvider: ({ children }: { children: any }) => {
                    return <>{children}</>
                },
                TonConnectButton: () => <></>,
                useTonConnectUI: () => ([
                    {
                        sendTransaction: sendTransactionMock
                    },
                    setOptionsMock
                ]),
                useTonAddress: () => tonClientAddress
            })
        )

        jest.mock(
            "primereact/inputnumber",
            () => ({
                InputNumber: (props: {
                    disabled?: boolean,
                    "data-testid"?: string,
                    onValueChange?: (value: { value: string }) => void,
                    value?: number
                }) => {
                    return <input
                        data-testid={props["data-testid"]}
                        disabled={props.disabled ?? undefined}
                        onChange={e => props.onValueChange?.({ value: e.target.value })}
                        value={props.value}
                    />
                }
            })
        )

        jest.mock(
            "primereact/radiobutton",
            () => ({
                RadioButton: (props: {
                    "data-testid"?: string,
                    onChange?: (value: { value: string }) => void
                }) => {
                    return <span
                        data-testid={props["data-testid"]}
                        onClick={e => props.onChange?.({ value: "" })}
                    />
                }
            })
        )

        const imported = await import("../../../../src/routes/it/tact/ton1.lazy")
        AMOUNT_FOR_GAS = imported.AMOUNT_FOR_GAS
    })

    beforeEach(async () => {
        jest.clearAllMocks()
        jest.useRealTimers()
        routeContextMock.mockReturnValue({ lang: "fr" })
        clientSenderMock.mockImplementation((via: Sender, args: { value: bigint }, message: Deposit | Withdrawal | Deploy) => {
            connectSenderExtracted = via
        })
        getOwnerMock.mockImplementation(() => Promise.resolve(TON_OWNER_ADDRESS))
        tonClientAddress = TON_OWNER_ADDRESS
    })

    test("Should load component with correct initial data", async () => {
        // GIVEN the contract reports 1 TON balance
        getBalanceMock.mockReturnValue(1_000_000_000n)

        // WHEN rendering the component
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // THEN the contract balance is shown
        expect(getByTestId("contractAmount")).toHaveTextContent("1 TON 0 nano")

        // AND the Deposit and Withraw buttons are disabled because of zero amounts chosen
        expect(getByTestId("depositButton")).toBeDisabled()
        expect(getByTestId("withdrawButton")).toBeDisabled()

        // AND sets English as a language even if French is chosen by default
        expect(setOptionsMock).toHaveBeenCalledWith({ language: "en" })
    })

    test("Should change the TON connecton language to Russian when selected", async () => {
        // GIVEN Russian selected
        routeContextMock.mockReturnValue({ lang: "ru" })

        // WHEN rendering the component
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // THEN it sets English as a language even if French is chosen by default
        expect(setOptionsMock).toHaveBeenCalledWith({ language: "ru" })
    })


    test("Should enable the deposit button if the contract is connected and a positive deposit value is entered", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // WHEN entering a positive deposit value
        fireEvent.change(getByTestId("depositInput"), { target: { value: 1.5 } })

        // THEN the deposit button is enabled
        await waitFor(() => expect(getByTestId("depositButton")).not.toBeDisabled())
    })

    test("Should disable the deposit button if the contract is not connected", async () => {
        // GIVEN the contract is not connected
        tonClientAddress = ""

        // AND the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // WHEN entering a positive deposit value
        fireEvent.change(getByTestId("depositInput"), { target: { value: 1.5 } })

        // THEN the deposit button is not enabled
        await waitFor(() => expect(getByTestId("depositButton")).toBeDisabled())
    })

    test("Should enable the withdrawal button if the contract is connected and a positive deposit value is entered", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // WHEN entering a positive deposit value
        fireEvent.change(getByTestId("withdrawInput"), { target: { value: 1.5 } })

        // THEN the deposit button is enabled
        await waitFor(() => expect(getByTestId("withdrawButton")).not.toBeDisabled())
    })

    test("Should disable the withdrawal button if the contract is not connected", async () => {
        // GIVEN the contract is not connected
        tonClientAddress = ""

        // AND the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // WHEN entering a positive deposit value
        fireEvent.change(getByTestId("withdrawInput"), { target: { value: 1.5 } })

        // THEN the deposit button is not enabled
        await waitFor(() => expect(getByTestId("withdrawButton")).toBeDisabled())
    })

    test("Should disable the withdrawal button if the conected wallet is not the owner of the contract", async () => {
        // GIVEN the wallet is not the owner of the contract
        tonClientAddress = TON_DIFFERENT_ADDRESS

        // AND the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // WHEN entering a positive deposit value
        fireEvent.change(getByTestId("withdrawInput"), { target: { value: 1.5 } })

        // THEN the deposit button is not enabled
        await waitFor(() => expect(getByTestId("withdrawButton")).toBeDisabled())
    })

    test("Should refresh the wallet on timer", async () => {
        // GIVEN using the test timers
        jest.useFakeTimers()

        // AND the contract reports 1 TON balance
        getBalanceMock.mockReturnValue(1_000_000_000n)

        // AND rendering the component
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // WHEN changing the wallet balance
        getBalanceMock.mockReturnValue(2_000_000_000n)

        // AND advancing the timer to the next waiting point
        jest.advanceTimersToNextTimer()

        // THEN the contract balance is shown
        await waitFor(() => expect(getByTestId("contractAmount")).toHaveTextContent("2 TON 0 nano"))
    })

    test("Should initialize the testnet connection when the corresponding button is selected", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // WHEN clicking the testnet button
        await act(() => act(() => fireEvent.click(getByTestId("testNetSelector"))))

        // THEN the testnet connection is initialized
        expect(getHttpEndpointMock).toHaveBeenCalledWith({ network: "testnet" })
    })

    test("Should initialize the mainnet connection when the corresponding button is selected after the testnet one", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // WHEN clicking the testnet-mainnet buttons sequenqse
        await act(() => act(() => fireEvent.click(getByTestId("testNetSelector"))))
        await act(() => act(() => fireEvent.click(getByTestId("mainNetSelector"))))

        // THEN the mainnet connection is initialized after
        await waitFor(() => expect(getHttpEndpointMock).toHaveBeenNthCalledWith(3, { network: "mainnet" }))
    })

    test("Should send a deposit on button click", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // WHEN entering a positive deposit value
        fireEvent.change(getByTestId("depositInput"), { target: { value: 1.5 } })

        // AND clicking the deposit button
        await act(() => act(() => fireEvent.click(getByTestId("depositButton"))))

        // THEN the deposit transaction is sent
        expect(clientSenderMock).toHaveBeenCalledWith(
            expect.anything(),
            { value: toNano("1.5") },
            { "$$type": "Deposit" }
        )
    })

    test("Should translate sending message to a transaction on connect UI", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // AND entering a positive deposit value
        fireEvent.change(getByTestId("depositInput"), { target: { value: 1.5 } })

        // AND clicking the deposit button
        await act(() => act(() => fireEvent.click(getByTestId("depositButton"))))

        // WHEN calling the extracted sender
        connectSenderExtracted.send({
            to: TON_OWNER_ADDRESS,
            value: toNano("1.5"),
            data: { "$$type": "Deposit" }
        } as any)

        // THEN the transaction is sent via TON connect UI
        expect(sendTransactionMock).toHaveBeenCalledWith(expect.objectContaining({
            messages: [{
                address: TON_OWNER_ADDRESS,
                amount: "1500000000"
            }]
        }))
    })

    test("Should intercept exceptions on sending deposit transactions", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // AND entering a positive deposit value
        const depositInput = getByTestId("depositInput")
        await act(() => act(() => fireEvent.change(depositInput, { target: { value: 1.5 } })))

        // AND the sender throws an exception
        clientSenderMock.mockImplementation(() => { throw new Error() })

        // WHEN clicking the deposit button
        await act(() => act(() => fireEvent.click(getByTestId("depositButton"))))

        // THEN the call passes without errors and the deposit input value is set back to zero
        expect(depositInput).toHaveAttribute("value", "0")
    })

    test("Should treat exception on getting the contract ownner", async () => {
        // GIVEN the contract getOwner throws an exception
        getOwnerMock.mockImplementation(() => { throw new Error() })

        // AND the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // THEN the component renders without errors and the withdraw input is disabled because ownerConnected is false
        expect(getByTestId("withdrawInput")).toBeDisabled()
    })

    test("Should send a withdrawal on button click", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // WHEN entering a positive deposit value
        fireEvent.change(getByTestId("withdrawInput"), { target: { value: 1.5 } })

        // AND clicking the deposit button
        await act(() => act(() => fireEvent.click(getByTestId("withdrawButton"))))

        // THEN the deposit transaction is sent
        expect(clientSenderMock).toHaveBeenCalledWith(
            expect.anything(),
            { value: AMOUNT_FOR_GAS },
            {
                "$$type": "Withdrawal",
                amount: toNano("1.5")
            }
        )
    })

    test("Should intercept exceptions on sending withdrawal transactions", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => render(<Component />))

        // AND entering a positive deposit value
        const withdrawInput = getByTestId("withdrawInput")
        fireEvent.change(withdrawInput, { target: { value: 1.5 } })

        // AND the sender throws an exception
        clientSenderMock.mockImplementation(() => { throw new Error() })

        // WHEN clicking the deposit button
        await act(() => act(() => fireEvent.click(getByTestId("withdrawButton"))))

        // THEN the call passes without errors and the deposit input value is set back to zero
        expect(withdrawInput).toHaveAttribute("value", "0")
    })
})