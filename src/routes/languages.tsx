import { createFileRoute, defer } from '@tanstack/react-router'
import { DuolingoData, ErrorMessage } from '../util/duolingo-data-types';

const loadDuolingoData = async (): Promise<DuolingoData | ErrorMessage> => {
    try {
        const source = await fetch(
            `https://telegraf-api.yazino.com/telegraf/proxy?ts=${new Date().getTime()}`, { method: "POST" })
            //`https://www.duolingo.com/2017-06-30/users?username=6JvX6&ts=${new Date().getTime()}`, { method: "GET" })
            .then(data => {
                return data.json()
            })
            .then(data => data)
        const loading = JSON.parse(JSON.parse(source.data))
        return {
            username: loading.users[0].username,
            streak: loading.users[0].streak,
            totalXp: loading.users[0].totalXp,
            creationDate: loading.users[0].creationDate,
            currentCourseId: loading.users[0].currentCourseId,
            courses: loading
                .users[0]
                .courses
                .filter((c: { xp: number }) => c.xp > 0)
                .toSorted((c1: { xp: number }, c2: { xp: number }) => c2.xp - c1.xp),
        }
    } catch (e) {
        console.error("Error loading Duolingo data", e)
        return { error: "Error loading Duolingo data" }
    }
}

export const Route = createFileRoute('/languages')({
    loader: async () => {
        return { deferred: defer(loadDuolingoData()) }
    }
})