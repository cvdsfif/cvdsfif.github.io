export type ErrorMessage = { error: string }

type DuolingoCourse = {
    title: string,
    xp: number,
    id: string,
}

export type DuolingoData = {
    username: string,
    streak: number,
    totalXp: number,
    creationDate: number,
    currentCourseId: string,
    courses: DuolingoCourse[]
}

export const isErrorMessage = (data: ErrorMessage | unknown): data is ErrorMessage => (data as any).error