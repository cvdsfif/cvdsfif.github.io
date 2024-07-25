import { RouteComponent } from "@tanstack/react-router"

describe("Testing rerouting from senruy root", () => {
    let component: any
    const redirectMock = jest.fn()

    beforeAll(async () => {
        jest.mock(
            "@tanstack/react-router",
            () => ({
                createFileRoute: jest.fn().mockImplementation(
                    () => (param: RouteComponent<any>) => {
                        component = param
                    }
                ),
                redirect: redirectMock
            })
        )

        await import("../../src/routes/senryu")
    })

    test("Should reroute to the first card on parameterized senryu", async () => {
        // GIVEN the component loaded and the before load handler set
        const beforeLoadFunction = component.beforeLoad

        // WHEN calling the beforeLoad handler
        // THEN an exception is thrown
        expect(() => beforeLoadFunction({ location: { pathname: "/senryu" } })).toThrow()

        // AND the redirect function is called with a masked part of path
        expect(redirectMock).toHaveBeenCalledWith({ to: "/senryu/$id", mask: { to: "/senryu" }, params: { id: "0" } })
    })

    test("Should reroute to the first card on parameterized senryu with a trailing slash", async () => {
        // GIVEN the component loaded and the before load handler set
        const beforeLoadFunction = component.beforeLoad

        // WHEN calling the beforeLoad handler
        // THEN an exception is thrown
        expect(() => beforeLoadFunction({ location: { pathname: "/senryu/" } })).toThrow()

        // AND the redirect function is called with a masked part of path
        expect(redirectMock).toHaveBeenCalledWith({ to: "/senryu/$id", mask: { to: "/senryu" }, params: { id: "0" } })
    })
})