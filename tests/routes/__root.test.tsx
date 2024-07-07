import { RouteComponent } from "@tanstack/react-router"
import { fireEvent, getByTestId, render } from "@testing-library/react"
import "@testing-library/jest-dom"


describe("Testing the root route", () => {
    let extractedComponent: any
    const routerInvalidateMock = jest.fn()
    const routeContextMock = jest.fn()

    beforeAll(async () => {
        jest.mock(
            "@tanstack/react-router",
            () => ({
                // We extract the route definition to get access to its functionality in the tests
                createRootRoute: jest.fn().mockImplementation((param: RouteComponent<any> | undefined) => {
                    extractedComponent = param
                    return ({
                        useRouteContext: routeContextMock,
                    })
                }),
                // We simply stub the outlet component
                Outlet: () => <></>,
                Link: (props: { "data-testid": string, onClick: any }) => <span
                    data-testid={props["data-testid"]}
                    onClick={props.onClick}
                ></span>,
                useRouter: () => ({ invalidate: routerInvalidateMock })
            })
        )
        await import("../../src/routes/__root")
    })

    let languageFront: any
    let localStorageGetter: any
    let localStorageSetter: any

    beforeEach(() => {
        jest.resetAllMocks()
        routeContextMock.mockReturnValue({ lang: "" })
        languageFront = jest.spyOn(window.navigator, "language", "get")
        localStorageGetter = jest.spyOn(Storage.prototype, "getItem")
        localStorageSetter = jest.spyOn(Storage.prototype, "setItem")
    })

    test("Should load the component without exceptions", async () => {
        // GIVEN the root route's main component
        const component = extractedComponent!.component()

        // WHEN we render the main component
        const { container } = render(component)

        // THEN it renders without exceptions and we get the root element in it
        expect(getByTestId(container, "routeRoot")).toBeDefined()
    })

    test("Should detect the language from navigator property", async () => {
        // GIVEN navigator returns default language value
        languageFront.mockReturnValue("fr-FR")

        // AND we extract the beforeLoad function from the route's root component
        const beforeLoadFunction = extractedComponent!.beforeLoad

        // WHEN we call beforeLoad
        const returnValue = beforeLoadFunction()

        // THEN the context value returned reflects the language
        expect(returnValue).toEqual({ lang: "fr-FR" })
    })

    test("Should load the language value from local storage in priority", async () => {
        // GIVEN the language value loaded from local storage
        localStorageGetter.mockReturnValue("fr-FR")

        // AND navigator returns different language value
        languageFront.mockReturnValue("de-DE")

        // AND we extract the beforeLoad function from the route's root component
        const beforeLoadFunction = extractedComponent!.beforeLoad

        // WHEN we call beforeLoad
        const returnValue = beforeLoadFunction()

        // THEN the context value returned reflects the language
        expect(returnValue).toEqual({ lang: "fr-FR" })
    })

    test("If no language value is returned, should set English by default", async () => {
        // GIVEN navigator returns empty language value
        languageFront.mockReturnValue(null)

        // AND we extract the beforeLoad function from the route's root component
        const beforeLoadFunction = extractedComponent!.beforeLoad

        // WHEN we call beforeLoad
        const returnValue = beforeLoadFunction()

        // THEN the context value returned reflects the language
        expect(returnValue).toEqual({ lang: "en" })
    })

    test("Should show the language change controls", async () => {
        // GIVEN English is selected as a language
        routeContextMock.mockReturnValue({ lang: "en" })

        // AND the root route's main component
        const component = extractedComponent!.component()

        // WHEN we render the main component
        const { container } = render(component)

        // THEN the option for English is shown but is not clickable
        expect(getByTestId(container, "showLanguageen")).toBeDefined()

        // AND the option for French is shown and is clickable
        expect(getByTestId(container, "linkToLanguagefr")).toBeDefined()
    })

    test("Should change the language when the link to change is clicked", async () => {
        // GIVEN English is selected as a language
        routeContextMock.mockReturnValue({ lang: "en" })

        // AND the root route's main component rendered
        const component = extractedComponent!.component()
        const { container } = render(component)

        // WHEN the link to change the language is clicked
        const link = getByTestId(container, "linkToLanguagefr")
        await fireEvent.click(link)

        // THEN the handler changes the language in the local storage
        expect(localStorageSetter).toHaveBeenCalledWith("userLanguage", "fr")

        // AND it invalidates the router to show the page with a correct language
        expect(routerInvalidateMock).toHaveBeenCalled()
    })
})