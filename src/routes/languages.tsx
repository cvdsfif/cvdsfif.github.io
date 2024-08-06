import { createFileRoute } from '@tanstack/react-router'
import { Card } from 'primereact/card'
import { DateTime } from "luxon";
import { translate } from '../util/translate'

export type ErrorMessage = { error: string }

const isErrorMessage = (data: ErrorMessage | unknown): data is ErrorMessage => (data as any).error

export const Route = createFileRoute('/languages')({
    loader: async () => {
        try {
            const loading = await fetch("https://www.duolingo.com/2017-06-30/users?username=6JvX6",
                {
                    method: "GET",
                    mode: "no-cors"
                })
                .then(data => {
                    console.log(data)
                    return data.json()
                })
                .then(data => data)
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
    },
    component: () => {
        const data = Route.useLoaderData()
        const context = Route.useRouteContext()
        const lang = context.lang

        const duoHeader = <a
            href='http://www.duolingo.com'
            key={"duoLink"}
            target='_blank'
        ><img
                src='/duolingo.svg'
                alt='Duolingo'
                key={"duoLogo"}
                className='p-4'
            /></a>

        return <div
            className='grid flex-grow-1 overflow-y-scroll p-4 min-w-0 min-h-0 w-full'
            key={"langMain"}
        >
            <Card
                key={"intro"}
                title={translate("Languages", lang)}
                className='m-2'
                style={{ minWidth: "300px", maxWidth: "300px" }}
            >
                <div className='p-2' key={"langP1"}>{translate("Languages p1", lang)}</div>
                <div className='p-2' key={"langP2"}>{translate("Languages p2", lang)}</div>
                <div className='p-2' key={"langP3"}>{translate("Languages p3", lang)}</div>
            </Card>
            {isErrorMessage(data) ? <div
                className='p-2 text-red-600'
                data-testid="duoError"
            >{translate("duolingo.error", lang)}</div> :
                (<><Card
                    key={"duo"}
                    className='m-2 text-xl'
                    header={duoHeader}
                    style={{ minWidth: "300px", maxWidth: "300px" }}
                >
                    <div
                        className='flex m-3 p-2 shadow-6 border-round-lg border-1'
                        key={"duoUsername"}
                    >
                        <div className='flex flex-row'>
                            <div
                                className='p-2 vertical-align-middle align-content-center'
                                key={"duoUsernameImg"}
                            ><img src='/duo-profile.png' /></div>
                            <div
                                className='flex flex-column'
                                key={"duoUsernameTop"}
                            >
                                <div
                                    className='p-1'
                                    style={{ fontFamily: "DIN Next Rounded Bold,sans-serif" }}
                                    key={"duoUsernameVal"}
                                >{data.username}</div>
                                <div
                                    className='p-1'
                                    style={{ fontFamily: "DIN Next Rounded Regular,sans-serif" }}
                                    key={"duoUsernameId"}
                                >{translate("User ID", lang)}</div>
                            </div>
                        </div>
                    </div>

                    <div
                        className='flex m-3 p-2 shadow-6 border-round-lg border-1'
                        key={"duoStreak"}
                    >
                        <div className='flex flex-row'>
                            <div
                                className='p-2 vertical-align-middle align-content-center'
                                key={"duoStreakImg"}
                            ><img src='/streak.svg' /></div>
                            <div
                                className='flex flex-column'
                                key={"duoStreakTop"}
                            >
                                <div
                                    className='p-1'
                                    style={{ fontFamily: "DIN Next Rounded Bold,sans-serif" }}>{Intl.NumberFormat(translate("codepage", lang)).format(data.streak)}</div>
                                <div
                                    className='p-1'
                                    style={{ fontFamily: "DIN Next Rounded Regular,sans-serif" }}>{translate("Day streak", lang)}</div>
                            </div>
                        </div>
                    </div>

                    <div
                        className='flex m-3 p-2 shadow-6 border-round-lg border-1'
                        key={"duoUsernameXp"}
                    >
                        <div className='flex flex-row'>
                            <div
                                className='p-2 vertical-align-middle align-content-center'
                                key={"duoStreakImg"}
                            ><img src='/total-xp.svg' /></div>
                            <div
                                className='flex flex-column'
                                key={"duoStreakTop"}
                            >
                                <div
                                    className='p-1'
                                    style={{ fontFamily: "DIN Next Rounded Bold" }}>{Intl.NumberFormat(translate("codepage", lang)).format(data.totalXp)}</div>
                                <div
                                    className='p-1'
                                    style={{ fontFamily: "DIN Next Rounded Regular,sans-serif" }}
                                    key={"duoStreakId"}
                                >{translate("Total XP", lang)}</div>
                            </div>
                        </div>

                    </div>

                    <div
                        className='flex m-3 p-2 shadow-6 border-round-lg border-1'
                        key={"duoUsernameDat"}
                    >
                        <div className='flex flex-row'>
                            <div
                                className='p-2 vertical-align-middle align-content-center'
                                key={"duoUsernameDatImg"}
                            ><img src='/gafas.svg' /></div>
                            <div
                                className='flex flex-column'
                                key={"duoUsernameDatTop"}
                            >
                                <div
                                    className='p-1'
                                    style={{ fontFamily: "DIN Next Rounded Regular,sans-serif" }}>{translate("Joined Duolingo on", lang)}</div>
                                <div
                                    className='p-1'
                                    style={{ fontFamily: "DIN Next Rounded Bold,sans-serif" }}>{DateTime.fromMillis(data.creationDate * 1000).toFormat("dd.MM.yyyy")}</div>
                            </div>
                        </div>
                    </div>
                </Card>
                    <Card
                        key={"idiomas"}
                        className='m-0 text-xl'
                        style={{ minWidth: "300px", maxWidth: "400px" }}
                    >
                        <div
                            className='flex flex-column m-1 p-1 shadow-6 border-round-lg border-1'
                        >
                            {data.courses.map(({ id, xp }: { id: string, xp: number }, idx: number) => {
                                const courseCode = id.substring(9)
                                const sourceLanguage = courseCode.length === 8 ? courseCode.substring(0, 5) : courseCode.substring(0, 2)
                                const targetLanguage = courseCode.length === 8 ? courseCode.substring(6) : courseCode.substring(3)

                                return <div
                                    className={`flex flex-row ${id === data.currentCourseId ? "border-3 border-blue-200" : "border-bottom-1"}`}
                                    key={`langContainer${idx}`}
                                >
                                    <div
                                        className='flex flex-grow-0 p-1 align-items-center'
                                        key={`langFlag${idx}`}
                                    ><img
                                            src={`/flags/${sourceLanguage}.webp`}
                                            style={{ width: "40px" }}
                                        /></div>
                                    <div
                                        className='flex flex-grow-0 p-1 align-items-center'
                                        key={`langName${idx}`}
                                    ><span
                                        style={{ fontFamily: 'DIN Next Rounded Bold,sans-serif' }}
                                        className={lang === "ru" ? 'font-bold' : ''}
                                        data-testid={`lang-${idx}`}
                                    >{translate(`lang.${sourceLanguage}`, lang)}</span>
                                        <span
                                            style={{ fontFamily: "DIN Next Rounded Regular" }}
                                            data-testid={`source-lang-${idx}`}
                                        >&nbsp;({targetLanguage.toLocaleLowerCase()})</span></div>
                                    <div
                                        className='flex flex-grow-1 p-1 justify-content-end align-items-center'
                                        style={{ fontFamily: "DIN Next Rounded Regular" }}
                                        key={`langXp${idx}`}
                                    >{Intl.NumberFormat(translate("codepage", lang)).format(xp)}&nbsp;XP</div>
                                </div>
                            })}
                        </div>
                    </Card >
                    <div
                        className='p-2 text-xs bg-white shadow-1 border-round-lg'
                    >Icons made from <a href="https://www.onlinewebfonts.com/icon">svg icons</a> is licensed by CC BY 4.0</div>
                </>)
            }
        </div >
    }
})