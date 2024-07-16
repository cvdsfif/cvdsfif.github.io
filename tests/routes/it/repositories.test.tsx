import { getByTestId, render } from "@testing-library/react"
import { setupTestedRoute } from "../util/setup-tested-route"
import "@testing-library/jest-dom"

describe("Testing the code repositories page", () => {
    const routeSetup = setupTestedRoute("../../src/routes/it/repositories.lazy")

    test("Should load the translated page", () => {
        // GIVEN Russian selected as language
        const { routeContextMock, extractedComponent } = routeSetup
        routeContextMock.mockReturnValue({ lang: "ru" })
        const component = extractedComponent!.component()

        // WHEN we render the component
        const { container } = render(component)

        // THEN the contents are displayed in the correct language
        expect(getByTestId(container, "title")).toHaveTextContent("Репозитории кода")
    })

    test("Should follow link on click", async () => {
        // GIVEN the component is loaded
        const { routeContextMock, extractedComponent } = routeSetup
        routeContextMock.mockReturnValue({ lang: "en" })
        const component = extractedComponent!.component()
        const { container } = render(component)

        // AND there is a mocked response to window.open
        const openSpy = jest.spyOn(window, "open").mockImplementation(() => null)

        // WHEN we click on one of the Read links
        await getByTestId(container, "repositoryLink1").click()

        // THEN a related link if opened in a new window
        expect(openSpy).toHaveBeenCalledWith(expect.any(String), "_blank")
    })
})