export const makeImportsSpyable = (toCheck: { path: string, componentsToMock?: string[] }[]) =>
    toCheck.forEach(({ path, componentsToMock: propsToMock }) => jest.mock(path, () => ({
        __esModule: true,
        ...jest.requireActual(path),
        ...propsToMock?.reduce((acc: any, curr) => {
            acc[curr] = jest.fn()
            return acc
        }, {})
    })))
