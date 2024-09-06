import { RouteComponent } from "@tanstack/react-router"
import { makeImportsSpyable } from "../../util/make-imports-spyable"

makeImportsSpyable([
    { path: "@tanstack/react-router", componentsToMock: ["Link"] },
])

describe("Test the default page routing for the TON transaction list", () => {
    let component: any
    const redirectMock = jest.fn()

    beforeEach(async () => {
        const reactRouterImport = await import("@tanstack/react-router")
        jest.spyOn(reactRouterImport, "createFileRoute")
            .mockImplementation(
                (() =>
                    (param: RouteComponent<any> | undefined) => {
                        component = param
                    }) as any
            )
        jest.spyOn(reactRouterImport, "redirect").mockImplementation(redirectMock)

        await import("../../../../src/routes/it/ton/xlist")
    })

    test("Should reroute to mainnet version by default", async () => {
        // GIVEN the component loaded and the before load handler set
        const beforeLoadFunction = component.beforeLoad

        // WHEN calling the beforeLoad handler
        // THEN an exception is thrown
        expect(() => beforeLoadFunction({ location: { pathname: "/it/ton/xlist" } })).toThrow()

        // AND the redirect function is called with a masked part of path
        expect(redirectMock).toHaveBeenCalledWith({ to: "/it/ton/xlist/$network", mask: { to: "/it/ton/xlist" }, params: { network: 'mainnet' } })
    })

    test("Should reroute to mainnet version by default with trailing slash", async () => {
        // GIVEN the component loaded and the before load handler set
        const beforeLoadFunction = component.beforeLoad

        // WHEN calling the beforeLoad handler
        // THEN an exception is thrown
        expect(() => beforeLoadFunction({ location: { pathname: "/it/ton/xlist/" } })).toThrow()

        // AND the redirect function is called with a masked part of path
        expect(redirectMock).toHaveBeenCalledWith({ to: "/it/ton/xlist/$network", mask: { to: "/it/ton/xlist" }, params: { network: 'mainnet' } })
    })
})