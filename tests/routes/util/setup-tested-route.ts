import { RouteComponent } from "@tanstack/react-router"

export const setupTestedRoute = (route: string) => {
    const setupContainer = {
        extractedComponent: undefined as any,
        routeContextMock: jest.fn()
    }

    beforeAll(async () => {
        jest.mock(
            "@tanstack/react-router",
            // Unlike the root route, at this level we have a second-order function, so we have to return it at the second level
            () => ({
                // We extract the route definition to get access to its functionality in the tests
                createLazyFileRoute: jest.fn().mockImplementation(
                    () =>
                        (param: RouteComponent<any> | undefined) => {
                            setupContainer.extractedComponent = param
                            return ({
                                useRouteContext: setupContainer.routeContextMock,
                            })
                        }
                ),
            })
        )
        await import(`../${route}`)
    })

    beforeEach(() => {
        jest.resetAllMocks()
    })

    return setupContainer
}