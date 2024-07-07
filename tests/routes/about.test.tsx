import { RouteComponent } from "@tanstack/react-router"
import { getByTestId, render } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Testing the about page", () => {
    let extractedComponent: any
    const routeContextMock = jest.fn()

    beforeAll(async () => {
        jest.mock(
            "@tanstack/react-router",
            // Unlike the root route, at this level we have a second-order function, so we have to return it at the second level
            () => ({
                // We extract the route definition to get access to its functionality in the tests
                createLazyFileRoute: jest.fn().mockImplementation(
                    () =>
                        (param: RouteComponent<any> | undefined) => {
                            extractedComponent = param
                            return ({
                                useRouteContext: routeContextMock,
                            })
                        }
                ),
            })
        )
        await import("../../src/routes/about.lazy")
    })

    beforeEach(() => {
        jest.resetAllMocks()
    })

    test("Should load the translated page", () => {
        // GIVEN French selected as language
        routeContextMock.mockReturnValue({ lang: "fr" })
        const component = extractedComponent!.component()

        // WHEN we render the component
        const { container } = render(component)

        // THEN the contents are displayed in the correct language
        expect(getByTestId(container, "content")).toHaveTextContent("A propos")
    })
})