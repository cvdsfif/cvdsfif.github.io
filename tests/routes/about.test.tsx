import { getByTestId, render } from "@testing-library/react"
import "@testing-library/jest-dom"
import { setupTestedRoute } from "./util/setup-tested-route"

describe("Testing the about page", () => {
    const routeSetup = setupTestedRoute("../../src/routes/about.lazy")

    test("Should load the translated page", () => {
        // GIVEN French selected as language
        const { routeContextMock, extractedComponent } = routeSetup
        routeContextMock.mockReturnValue({ lang: "fr" })
        const component = extractedComponent!.component()

        // WHEN we render the component
        const { container } = render(component)

        // THEN the contents are displayed in the correct language
        expect(getByTestId(container, "content")).toHaveTextContent("Andalousie")
    })
})