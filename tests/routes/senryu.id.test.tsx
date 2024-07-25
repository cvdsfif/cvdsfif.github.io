import { getByTestId, render, waitFor } from "@testing-library/react"
import { setupTestedRoute } from "./util/setup-tested-route"
import "@testing-library/jest-dom"

describe("Testing the parameterized senruy page", () => {
    const routeSetup = setupTestedRoute("../../src/routes/senryu.$id.lazy")

    test("Should show the initial state of the page", async () => {
        // GIVEN the route is loaded and set up
        const { routeContextMock, extractedComponent, useParamsMock } = routeSetup

        // AND we don't give a correct card number to make it default
        useParamsMock.mockReturnValue({ id: "default" })

        // AND the language is French
        routeContextMock.mockReturnValue({ lang: "fr" })

        // WHEN we display the component
        const Component = extractedComponent!.component
        const { container } = render(<Component />)

        // THEN the Previous button is disabled
        await waitFor(() => expect(getByTestId(container, "prevButton")).toHaveAttribute("disabled", ""))
    })

    test("Should be able to navigate backwards", async () => {
        // GIVEN the route is loaded and set up
        const { routeContextMock, extractedComponent, useParamsMock, navigateMock: useNavigateMock } = routeSetup

        // AND we are on the card number 1
        useParamsMock.mockReturnValue({ id: "1" })

        // AND the language is French
        routeContextMock.mockReturnValue({ lang: "fr" })

        // AND we display the component
        const Component = extractedComponent!.component
        const { container } = render(<Component />)

        // WHEN the Previous button is clicked
        const prevButton = getByTestId(container, "prevButton")
        prevButton.click()

        // THEN we navigate to the card number 0
        expect(useNavigateMock).toHaveBeenCalledWith({ to: "/senryu/$id", params: { id: "0" } })
    })

    test("Should navigate forward when clicking on the main zone", async () => {
        // GIVEN the route is loaded and set up
        const { routeContextMock, extractedComponent, useParamsMock, navigateMock: useNavigateMock } = routeSetup

        // AND we are on the card number 1
        useParamsMock.mockReturnValue({ id: "0" })

        // AND the language is French
        routeContextMock.mockReturnValue({ lang: "fr" })

        // AND we display the component
        const Component = extractedComponent!.component
        const { container } = render(<Component />)

        // WHEN the main zone is clicked
        const prevButton = getByTestId(container, "mainZone")
        prevButton.click()

        // THEN we navigate to the card number 1
        expect(useNavigateMock).toHaveBeenCalledWith({ to: "/senryu/$id", params: { id: "1" } })
    })

    test("Should navigate forward when clicking on the next button", async () => {
        // GIVEN the route is loaded and set up
        const { routeContextMock, extractedComponent, useParamsMock, navigateMock: useNavigateMock } = routeSetup

        // AND we are on the card number 1
        useParamsMock.mockReturnValue({ id: "0" })

        // AND the language is French
        routeContextMock.mockReturnValue({ lang: "fr" })

        // AND we display the component
        const Component = extractedComponent!.component
        const { container } = render(<Component />)

        // WHEN the next button is clicked
        const prevButton = getByTestId(container, "nextButton")
        prevButton.click()

        // THEN we navigate to the card number 1
        expect(useNavigateMock).toHaveBeenCalledWith({ to: "/senryu/$id", params: { id: "1" } })
    })

    test("Should cycling the main zone when reaching the last card", async () => {
        // GIVEN the route is loaded and set up
        const {
            routeContextMock,
            extractedComponent,
            useParamsMock,
            navigateMock: useNavigateMock,
            importedModule
        } = routeSetup

        // AND we are on the card number 1
        useParamsMock.mockReturnValue({ id: `${importedModule.cards.length - 1}` })

        // AND the language is French
        routeContextMock.mockReturnValue({ lang: "fr" })

        // AND we display the component
        const Component = extractedComponent!.component
        const { container } = render(<Component />)

        // WHEN the main zone is clicked
        const prevButton = getByTestId(container, "mainZone")
        prevButton.click()

        // THEN we navigate to the card number 0
        expect(useNavigateMock).toHaveBeenCalledWith({ to: "/senryu/$id", params: { id: "0" } })
    })
})