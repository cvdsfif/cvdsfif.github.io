import { RouteComponent } from "@tanstack/react-router"
import { makeImportsSpyable } from "../../util/make-imports-spyable"
import "@testing-library/jest-dom"

makeImportsSpyable([
    { path: "@tanstack/react-router", componentsToMock: ["Link"] },
    { path: "use-ton-connect-sender" },
    { path: "@tonconnect/ui-react", componentsToMock: ["TonConnectUIProvider", "TonConnectButton"] },
    { path: "primereact/inputtext", componentsToMock: ["InputText"] },
])

describe("Testing TON transactions lists rerouting routine", () => {
    let component: any
    let network: string
    const redirectMock = jest.fn()

    beforeEach(async () => {
        network = "mainnet"

        const reactRouterImport = await import("@tanstack/react-router")
        jest.spyOn(reactRouterImport, "createFileRoute")
            .mockImplementation(
                (() =>
                    (param: RouteComponent<any> | undefined) => {
                        component = param
                        return ({
                            useParams: () => ({
                                network
                            })
                        })
                    }) as any
            )
        jest.spyOn(reactRouterImport, "redirect").mockImplementation(redirectMock)

        await import("../../../../src/routes/it/ton/xlist.$network")
        const tonTransListImport = await import("../../../../src/components/TonTransactionsList")
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

})