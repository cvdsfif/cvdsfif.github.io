import { RouteComponent } from "@tanstack/react-router"
import { render, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import { act, useEffect, useState } from "react"

describe("Testing the languages presentation page's loader component", () => {
    let extractedComponent: any
    const windowOpenSpy = jest.fn()

    beforeAll(async () => {
        jest.mock(
            "@tanstack/react-router",
            () => ({
                createFileRoute: jest.fn().mockImplementation(
                    () =>
                        (param: RouteComponent<any> | undefined) => {
                            extractedComponent = param
                            return ({})
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

        await import("../../src/routes/languages")
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

    let fetchData = {}
    let fetchError: string | undefined = undefined

    beforeEach(() => {
        jest.resetAllMocks()
        jest.spyOn(window, "open").mockImplementation(windowOpenSpy)

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

    test("Should sort source courses list", async () => {
        // GIVEN fetch returns an unsorted list of courses
        fetchData = basicLoaderObject

        // WHEN launching the loader
        const loaderObj = await extractedComponent!.loader()

        // THEN in the loaded data, the source courses are sorted
        const loaded = await loaderObj.deferred.then((d: any) => d)

        // THEN in the loaded data, the source courses are sorted
        expect(loaded.courses[0].id).toEqual("DUOLINGO_ES_EN")
    })

    test("Should return error message from loader on fetch exception", async () => {
        // GIVEN fetch throws an ex
        fetchError = "Mistake"

        // WHEN launching the loader
        const loaderObj = await extractedComponent!.loader()

        // THEN in the loaded data, the source courses are sorted
        const loaded = await loaderObj.deferred.then((d: any) => d)

        // THEN in the loaded data, the source courses are sorted
        expect(loaded.error).toBeDefined()
    })

})