import { RouteComponent } from "@tanstack/react-router"
import { fireEvent, getByTestId, render } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Testing the home page", () => {
    let extractedComponent: any
    const routeContextMock = jest.fn()
    const windowOpenSpy = jest.fn()

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
                Link: () => <></>
            })
        )

        await import("../../src/routes/index.lazy")
    })

    beforeEach(() => {
        jest.resetAllMocks()
        routeContextMock.mockReturnValue({ lang: "" })
        jest.spyOn(window, "open").mockImplementation(windowOpenSpy)
    })

    test("Should load the translated page", () => {
        // GIVEN French selected as language
        routeContextMock.mockReturnValue({ lang: "ru" })
        const Component = extractedComponent!.component

        // WHEN we render the component
        const { container } = render(<Component />)

        // THEN the contents are displayed in the correct language
        expect(getByTestId(container, "nameDisplay")).toHaveTextContent("Никита")
    })

    test("Should open a link to mail when requested", async () => {
        // GIVEN the page rendered
        const Component = extractedComponent!.component
        const { container } = render(<Component />)

        // WHEN clicking on the mail link
        await fireEvent.click(getByTestId(container, "linkToMail"))

        // THEN the right mail address is chosen as destination
        expect(windowOpenSpy).toHaveBeenCalledWith("mailto:nikit@zykov.com", "_blank")
    })

    test("Should open a link to Telegram when requested", async () => {
        // GIVEN the page rendered
        const Component = extractedComponent!.component
        const { container } = render(<Component />)

        // WHEN clicking on the telegram link
        await fireEvent.click(getByTestId(container, "linkToTG"))

        // THEN the right telegram id is chosen as destination
        expect(windowOpenSpy).toHaveBeenCalledWith("https://t.me/nz_cvds", "_blank")
    })
})