import { RouteComponent } from "@tanstack/react-router"
import { fireEvent, getByTestId, render, waitFor } from "@testing-library/react"
import { screen } from '@testing-library/dom'
import "@testing-library/jest-dom"

describe("Testing the root route", () => {
    let extractedComponent: any
    const routerInvalidateMock = jest.fn()
    const routeContextMock = jest.fn()
    let invalidateContext = false

    const mockGetItem = jest.fn()
    const mockSetItem = jest.fn()
    const mockRedirect = jest.fn()

    let LANGUAGE_SELECTED_KEY = ""

    beforeAll(async () => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: (...args: string[]) => mockGetItem(...args),
                setItem: (...args: string[]) => mockSetItem(...args),
            },
        })

        jest.mock(
            "@tanstack/react-router",
            () => ({
                // We extract the route definition to get access to its functionality in the tests
                createRootRoute: jest.fn().mockImplementation((param: RouteComponent<any> | undefined) => {
                    extractedComponent = param
                    return ({
                        useRouteContext: () => invalidateContext ? undefined : routeContextMock(),
                    })
                }),
                // We simply stub the outlet component
                Outlet: () => <></>,
                Link: (props: { "data-testid": string, onClick: any }) => <span
                    data-testid={props["data-testid"]}
                    onClick={props.onClick}
                ></span>,
                useRouter: () => ({ invalidate: routerInvalidateMock }),
                redirect: mockRedirect
            })
        )

        jest.mock(
            "primereact/dropdown",
            () => ({
                Dropdown: (props: { "data-testid": string, onChange: any }) => <select
                    data-testid={props["data-testid"]}
                    onChange={e => { props.onChange(e.target) }}
                ><option>fr</option></select>
            })
        )

        const rootImported = await import("../../src/routes/__root")
        LANGUAGE_SELECTED_KEY = rootImported.LANGUAGE_SELECTED_KEY
    })

    let languageFront: any

    beforeEach(() => {
        jest.useFakeTimers()
        jest.resetAllMocks()

        routeContextMock.mockReturnValue({ lang: "" })
        languageFront = jest.spyOn(window.navigator, "language", "get")
    })

    afterEach(() => {
        jest.useRealTimers()
        invalidateContext = false
    })

    test("Should load the component without exceptions", async () => {
        // GIVEN the root route's main component
        const Component = extractedComponent!.component

        // WHEN we render the main component
        const { container } = render(<Component />)

        // THEN it renders without exceptions and we get the root element in it
        expect(getByTestId(container, "routeRoot")).toBeDefined()
    })

    test("Should return English as a default language on context creation", async () => {
        // GIVEN we extract the beforeLoad function from the route's root component
        const beforeLoadFunction = extractedComponent!.beforeLoad

        // WHEN we call beforeLoad
        const returnValue = await beforeLoadFunction({ location: "" })

        // THEN the context value returned reflects the language
        expect(returnValue).toEqual({ lang: "en" })
    })

    test("Should detect the language from navigator property", async () => {
        // GIVEN navigator returns default language value
        languageFront.mockReturnValue("fr-FR")

        // AND we extract the beforeLoad function from the route's root component
        const beforeLoadFunction = extractedComponent!.beforeLoad

        // WHEN we call beforeLoad
        const returnValue = await beforeLoadFunction({ location: "" })

        // THEN the context value returned reflects the brower's language
        expect(returnValue).toEqual({ lang: "fr" })
    })

    test("If no language value is returned, should set English by default", async () => {
        // GIVEN navigator returns empty language value
        languageFront.mockReturnValue(null)

        // AND we extract the beforeLoad function from the route's root component
        const beforeLoadFunction = extractedComponent!.beforeLoad

        // WHEN we call beforeLoad
        const returnValue = await beforeLoadFunction({ location: "" })

        // THEN the context value returned reflects the language
        expect(returnValue).toEqual({ lang: "en" })
    })

    test("Should show the contents in the selected language", async () => {
        // GIVEN English is selected as a language
        routeContextMock.mockReturnValue({ lang: "en" })

        // AND the root route's main component
        const Component = extractedComponent!.component

        // WHEN we render the main component
        const { container } = render(<Component />)

        // THEN the page is displayed in English
        await waitFor(() => expect(getByTestId(container, "languageValue")).toHaveTextContent("en"))
    })

    test("Should change the language when the matching component is selected", async () => {
        // GIVEN English is selected as a language
        routeContextMock.mockReturnValue({ lang: "en" })

        // AND the root route's main component rendered
        const Component = extractedComponent!.component
        const { container } = render(<Component />)

        // WHEN the link to change the language is clicked
        const link = getByTestId(container, "languageSelector")
        await fireEvent.change(link, { target: { value: "fr" } })

        // THEN it invalidates the router to show the page with a correct language
        await waitFor(() => expect(routerInvalidateMock).toHaveBeenCalled())

        // AND the menu is correctly displayed
        const menu = getByTestId(container, "menuButton")
        await fireEvent.click(menu)
        await waitFor(() => expect(screen.getByTestId("homeLink")).toBeDefined())
    })

    test("Should catch the Tanstack Router's invalid context bug", async () => {
        // GIVEN the component receives an undefined context
        invalidateContext = true

        // WHEN loading the route component
        const Component = extractedComponent!.component
        const { container } = render(<Component />)

        // THEN the "Loading..." placeholder is loaded
        expect(getByTestId(container, "loadingPlaceholder")).toBeDefined()

        // AND after a certain waiting time the router is
        jest.advanceTimersToNextTimer()
        expect(routerInvalidateMock).toHaveBeenCalled()
    })

    test("Should recover after the Tanstack's router context bug and correctly set the language", async () => {
        // GIVEN the component receives an undefined context
        invalidateContext = true
        const Component = extractedComponent!.component

        // AND the component is rendered once
        const { container, rerender } = render(<Component />)

        // AND the context is validated and a language is set
        invalidateContext = false
        routeContextMock.mockReturnValue({ lang: "en" })

        // WHEN rerendering the component
        rerender(<Component />)

        // THEN the "Loading..." placeholder is loaded
        await waitFor(() => expect(getByTestId(container, "languageValue")).toHaveTextContent("en"))
    })

    test("Should load the language value from local storage in priority", async () => {
        // GIVEN the language value loaded from local storage
        mockGetItem.mockReturnValue("\"hu\"")

        // AND we extract the beforeLoad function from the route's root component
        const beforeLoadFunction = extractedComponent!.beforeLoad

        // WHEN we call beforeLoad
        const returnValue = await beforeLoadFunction({ location: "" })

        // THEN the context value returned reflects the language
        expect(returnValue).toEqual({ lang: "hu" })
    })

    test("Should show the senryu link when Russian is selected", async () => {
        // GIVEN the root route's main component
        const Component = extractedComponent!.component

        // AND the language value loaded
        routeContextMock.mockReturnValue({ lang: "ru" })

        // AND we render the main component
        const { container } = render(<Component />)

        // WHEN the menu is displayed
        const menu = getByTestId(container, "menuButton")
        await fireEvent.click(menu)

        // THEN it renders without exceptions and we get the root element in it
        await waitFor(() => expect(screen.getByTestId("senryuLink")).toBeDefined())
    })

    test("Should change the language when page path starts with language code", async () => {
        // GIVEN  we extract the beforeLoad function from the route's root component
        const beforeLoadFunction = extractedComponent!.beforeLoad

        // WHEN we call beforeLoad
        // THEN an internal exception is thrown
        expect(() => beforeLoadFunction({ location: { pathname: "/FR/page" } })).toThrow()

        // THEN the call is redirected to a correct page
        expect(mockRedirect).toHaveBeenCalledWith({ to: "/page" })

        // AND the context value returned reflects the language
        expect(mockSetItem).toHaveBeenCalledWith(LANGUAGE_SELECTED_KEY, `"fr"`)
    })
})