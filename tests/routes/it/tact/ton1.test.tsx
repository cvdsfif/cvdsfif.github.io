import "@testing-library/jest-dom"
import { randomAddress } from "@ton/test-utils"
import { act, fireEvent, render, waitFor } from "@testing-library/react"
import { RouteComponent } from "@tanstack/react-router"
import { toNano } from "@ton/core"

const makeImportsSpyable = (toCheck: { path: string, componentsToMock?: string[] }[]) =>
    toCheck.forEach(({ path, componentsToMock: propsToMock }) => jest.mock(path, () => ({
        __esModule: true,
        ...jest.requireActual(path),
        ...propsToMock?.reduce((acc: any, curr) => {
            acc[curr] = jest.fn()
            return acc
        }, {})
    })))

makeImportsSpyable([
    { path: "@tanstack/react-router", componentsToMock: ["Link"] },
    { path: "use-ton-connect-sender" },
    { path: "@tonconnect/ui-react", componentsToMock: ["TonConnectUIProvider", "TonConnectButton"] },
    { path: "primereact/inputnumber", componentsToMock: ["InputNumber"] },
    { path: "primereact/radiobutton", componentsToMock: ["RadioButton"] },
])

describe("Testing simple deposit/withdrawal contract", () => {
    const getBalanceMock = jest.fn()
    const clientSenderMock = jest.fn()
    const getOwnerMock = jest.fn()
    const routeContextMock = jest.fn()
    const setOptionsMock = jest.fn()

    let useTonContractMock = jest.fn()

    const TON_CONTRACT_ADDRESS = randomAddress().toString()
    const TON_DIFFERENT_ADDRESS = randomAddress().toString()
    let contractTestnetAddress: string
    let contractMainnetAddress: string
    let amountForGas: bigint

    let extractedComponent: any
    let senderAvailable: boolean
    let tonOwnerAddress: string

    const tonContractStub = {
        getBalance: getBalanceMock,
        getOwner: getOwnerMock,
        send: clientSenderMock
    } as any

    const senderStub = {
        address: TON_CONTRACT_ADDRESS,
        send: jest.fn() as any
    } as any


    beforeEach(async () => {
        jest.clearAllMocks()
        jest.useRealTimers()

        routeContextMock.mockReturnValue({ lang: "fr" })
        senderAvailable = true

        tonOwnerAddress = TON_CONTRACT_ADDRESS
        getOwnerMock.mockImplementation(() => Promise.resolve(tonOwnerAddress))

        const reactRouterImport = await import("@tanstack/react-router")
        jest.spyOn(reactRouterImport, "createLazyFileRoute")
            .mockImplementation(
                (() =>
                    (param: RouteComponent<any> | undefined) => {
                        extractedComponent = param
                        return ({
                            useRouteContext: routeContextMock,
                        })
                    }) as any
            )
        jest.spyOn(reactRouterImport, "Link").mockReturnValue(<></>)

        jest.spyOn(await import("use-ton-connect-sender"), "useTonConnectSender")
            .mockImplementation(() => ({
                sender: senderAvailable ? senderStub : undefined,
                tonConnectUI: jest.fn() as any,
                setOptions: setOptionsMock
            }))
        useTonContractMock = jest.spyOn(await import("use-ton-connect-sender"), "useTonContract")
            .mockReturnValue(tonContractStub) as any

        const uiReactImport = await import("@tonconnect/ui-react")
        jest.spyOn(uiReactImport, "TonConnectUIProvider")
            .mockImplementation(({ children }: { children: any }) => {
                return <>{children}</>
            })
        jest.spyOn(uiReactImport, "TonConnectButton").mockReturnValue(<></>)

        jest.spyOn(await import("primereact/inputnumber"), "InputNumber")
            .mockImplementation(
                ((props: {
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
                }) as any
            )
        jest.spyOn(await import("primereact/radiobutton"), "RadioButton")
            .mockImplementation(
                ((props: {
                    "data-testid"?: string,
                    onChange?: (value: { value: string }) => void
                }) => {
                    return <span
                        data-testid={props["data-testid"]}
                        onClick={e => props.onChange?.({ value: "" })}
                    />
                }) as any
            )

        const underTest = await import("../../../../src/routes/it/tact/ton1.lazy")
        contractTestnetAddress = underTest.CONTRACT_TESTNET_ADDRESS
        contractMainnetAddress = underTest.CONTRACT_MAINNET_ADDRESS
        amountForGas = underTest.AMOUNT_FOR_GAS
    })

    test("Should display loading message when the component is not yet loaded", async () => {
        // GIVEN the contract reports 1 TON balance
        useTonContractMock.mockReturnValue(undefined)

        // WHEN rendering the component
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // THEN the contract balance is shown
        expect(getByTestId("contractAmount")).toHaveTextContent("Chargement...")
    })

    test("Should load component with correct initial data", async () => {
        // GIVEN the contract reports 1 TON balance
        getBalanceMock.mockReturnValue(1_000_000_000n)

        // WHEN rendering the component
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

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
        await act(() => act(() => act(() => render(<Component />))))

        // THEN it sets English as a language even if French is chosen by default
        expect(setOptionsMock).toHaveBeenCalledWith({ language: "ru" })
    })

    test("Should enable the deposit button if the contract is connected and a positive deposit value is entered", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // WHEN entering a positive deposit value
        await act(() => fireEvent.change(getByTestId("depositInput"), { target: { value: 1.5 } }))

        // THEN the deposit button is enabled
        await waitFor(() => expect(getByTestId("depositButton")).not.toBeDisabled())
    })

    test("Should disable the deposit button if the contract is not connected", async () => {
        // GIVEN the contract is not connected
        senderAvailable = false

        // AND the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // WHEN entering a positive deposit value
        await act(() => fireEvent.change(getByTestId("depositInput"), { target: { value: 1.5 } }))

        // THEN the deposit button is not enabled
        await waitFor(() => expect(getByTestId("depositButton")).toBeDisabled())
    })

    test("Should enable the withdrawal button if the contract is connected and a positive deposit value is entered", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // WHEN entering a positive deposit value
        fireEvent.change(getByTestId("withdrawInput"), { target: { value: 1.5 } })

        // THEN the deposit button is enabled
        await waitFor(() => expect(getByTestId("withdrawButton")).not.toBeDisabled())
    })

    test("Should disable the withdrawal button if the contract is not connected", async () => {
        // GIVEN the contract is not connected
        senderAvailable = false

        // AND the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // WHEN entering a positive deposit value
        await act(() => fireEvent.change(getByTestId("withdrawInput"), { target: { value: 1.5 } }))

        // THEN the deposit button is not enabled
        await waitFor(() => expect(getByTestId("withdrawButton")).toBeDisabled())
    })

    test("Should disable the withdrawal button if the conected wallet is not the owner of the contract", async () => {
        // GIVEN the wallet is not the owner of the contract
        tonOwnerAddress = TON_DIFFERENT_ADDRESS

        // AND the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // WHEN entering a positive deposit value
        await act(() => fireEvent.change(getByTestId("withdrawInput"), { target: { value: 1.5 } }))

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
        const { getByTestId } = await act(() => act(() => render(<Component />)))

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
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // WHEN clicking the testnet button
        await act(() => fireEvent.click(getByTestId("testNetSelector")))

        // THEN the testnet connection is initialized
        expect(useTonContractMock).toHaveBeenCalledWith(
            "testnet",
            contractTestnetAddress,
            expect.anything()
        )
    })

    test("Should initialize the mainnet connection when the corresponding button is selected after the testnet one", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // WHEN clicking the testnet testnet button
        await act(() => act(() => fireEvent.click(getByTestId("testNetSelector"))))

        // AND forgetting the previous contract initialization history
        useTonContractMock.mockClear()

        // AND clicking the mainnet button
        await act(() => act(() => fireEvent.click(getByTestId("mainNetSelector"))))

        // THEN the mainnet connection is initialized
        expect(useTonContractMock).toHaveBeenCalledWith(
            "mainnet",
            contractMainnetAddress,
            expect.anything()
        )
    })

    test("Should send a deposit on button click", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

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

    test("Should intercept exceptions on sending deposit transactions", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

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
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // THEN the component renders without errors and the withdraw input is disabled because ownerConnected is false
        expect(getByTestId("withdrawInput")).toBeDisabled()
    })

    test("Should send a withdrawal on button click", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

        // WHEN entering a positive deposit value
        fireEvent.change(getByTestId("withdrawInput"), { target: { value: 1.5 } })

        // AND clicking the deposit button
        await act(() => act(() => fireEvent.click(getByTestId("withdrawButton"))))

        // THEN the deposit transaction is sent
        expect(clientSenderMock).toHaveBeenCalledWith(
            expect.anything(),
            { value: amountForGas },
            {
                "$$type": "Withdrawal",
                amount: toNano("1.5")
            }
        )
    })

    test("Should intercept exceptions on sending withdrawal transactions", async () => {
        // GIVEN the component is rendered
        const Component = extractedComponent!.component
        const { getByTestId } = await act(() => act(() => render(<Component />)))

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