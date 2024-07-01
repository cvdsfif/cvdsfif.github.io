import { getByTestId, render } from "@testing-library/react";
import App from "../src/App"
import "@testing-library/jest-dom";

describe("Testing the main app page", () => {
    test("Should render the main app page without exceptions", () => {
        // GIVEN the default React context

        // WHEN loading the main app component
        const { container } = render(<App />)

        // THEN the component is successfully loaded and the root element is present on the page
        expect(getByTestId(container, "root")).toBeDefined()
    })
})