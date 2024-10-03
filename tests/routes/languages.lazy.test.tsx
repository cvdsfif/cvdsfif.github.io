import { RouteComponent } from "@tanstack/react-router"
import { render, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { act, useEffect, useState } from "react"

describe("Testing the languages presentation page", () => {
    let extractedComponent: any
    const routeContextMock = jest.fn()
    const loaderDataMock = jest.fn()
    const windowOpenSpy = jest.fn()

    beforeAll(async () => {
        jest.mock(
            "@tanstack/react-router",
            () => ({
                createLazyFileRoute: jest.fn().mockImplementation(
                    () =>
                        (param: RouteComponent<any> | undefined) => {
                            extractedComponent = param
                            return ({
                                useRouteContext: routeContextMock,
                                useLoaderData: loaderDataMock
                            })
                        }
                ),
                Link: () => <></>,
                Await: ({ children, promise }: { children: any, promise: Promise<any> }) => {
                    const [childComponent, setChildComponents] = useState(<>...</>)

                    const load = async () => {
                        const data = await promise.then(data => data)
                        setChildComponents(children(data))
                    }

                    useEffect(() => { load() }, [])
                    return <>{childComponent}</>
                },
                defer: (p: Promise<any>) => p
            })
        )

        await import("../../src/routes/languages.lazy")
    })

    const basicLoaderObject = {
        username: "Username",
        streak: 100,
        totalXp: 50000,
        creationDate: new Date().getTime(),
        currentCourseId: "DUOLINGO_ES_EN",
        courses: [
            {
                id: "DUOLINGO_ZH-CN_EN",
                title: "Chinese - English",
                xp: 10,
                level: 1,
                creationDate: new Date().getTime()
            },
            {
                id: "DUOLINGO_ES_EN",
                title: "Spanish - English",
                xp: 100,
                level: 1,
                creationDate: new Date().getTime()
            }
        ]
    }

    const basicLoaderPromise = {
        deferred: Promise.resolve(basicLoaderObject)
    }

    let fetchData = {}
    let fetchError: string | undefined = undefined

    beforeEach(() => {
        jest.resetAllMocks()
        routeContextMock.mockReturnValue({ lang: "" })
        jest.spyOn(window, "open").mockImplementation(windowOpenSpy)

        loaderDataMock.mockReturnValue(basicLoaderPromise)

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => fetchError ?
                    Promise.reject(new Error(fetchError)) :
                    Promise.resolve({ data: JSON.stringify(JSON.stringify({ users: [fetchData] })) })
            })
        ) as any
    })

    afterEach(() => {
        fetchData = {}
        fetchError = undefined
    })

    test("Should load the page", async () => {
        // GIVEN Russian is selected as a language
        routeContextMock.mockReturnValue({ lang: "ru" })
        const Component = extractedComponent!.component

        // WHEN we render the component
        const { getByTestId } = await act(() => render(<Component />))

        // THEN we have the language display shown in bold for cyrillic
        expect(getByTestId("lang-0")).toHaveClass("font-bold")

        //await new Promise(res => process.nextTick(res))

        // AND the target language is Chinese
        await waitFor(() => expect(getByTestId("lang-0")).toHaveTextContent("Китайский"))

        // AND the source language is Chinese
        expect(getByTestId("source-lang-0")).toHaveTextContent("(en)")
    })

    test("Should load the page without bold display for non-slavic text", async () => {
        // GIVEN French is selected as a language
        routeContextMock.mockReturnValue({ lang: "fr" })
        const Component = extractedComponent!.component

        // WHEN we render the component
        const { getByTestId } = await act(() => render(<Component />))

        // THEN we don't have the language display shown in bold for cyrillic
        expect(getByTestId("lang-0")).not.toHaveClass("font-bold")
    })

    test("Should load the error page if the error is returned from the loader", async () => {
        // GIVEN English is selected as a language
        routeContextMock.mockReturnValue({ lang: "en" })
        const Component = extractedComponent!.component

        // AND the loader returns an error
        loaderDataMock.mockReturnValue({ deferred: Promise.resolve({ error: "Error" }) })

        // WHEN we render the component
        const { getByTestId } = await act(() => render(<Component />))

        // THEN we have the error information displayed when needed
        expect(getByTestId("duoError")).toHaveTextContent("Error loading data from Duolingo")
    })
})