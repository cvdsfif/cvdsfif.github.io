import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from 'primereact/button'

type Card = {
    content: JSX.Element,
    picture: string,
    bigSize?: boolean
}

export const cards = [
    {
        content: <>
            Баюн (梅雨), принадлежащий к малоизвестной в России гильдии строительных философов, одной из продвинутых каст арбайтеров, приехав туда как по работе, так и просто из дружелюбного любопытства, вдруг обнаружил, что единственным жанром, способным адекватно выразить его офигение от странных обычаев этой страны, являются привычные ему семнадцатисложные сэнрю. Причем русский язык, как одно из двух его родных наречий, оказался весьма подходящим для выражения вышеупомянутых чувств в этой сжатой, но все же менее строгой по сравнению с хайку форме. Некоторые результаты этого синтеза мы вам и представляем на этой странице.
            <br /><br />О жанре: сэнрю отличается от хайку в основном необязательностью сезонного слова (одного или нескольких слов, указывающих на сезон, который описывает хайку) и наличием угачи - которое можно определить как некое выражение нестандартности восприятия. Обе этих особенности могут описать два сэнрю:
            <br /><br />сочинял хайку
            <br />с сезонным словом
            <br />слова не нашел. замерз.
            <br /><br />слово "угачи"
            <br />перевести непросто
            <br />а мне просто лень
        </>,
        bigSize: true,
        picture: 'jap/cat1.jpeg'
    },
    {
        content: <>
            <b>Эпиграф</b>
            <br /><br />У тебя, драгоценный, мания
            <br />Вот придумаешь три строки
            <br />И бежишь искать понимания
            <br />Разумению вопреки...
            <br /><br />Ты ведь всё-таки не в Японии,
            <br />Где чаи с лепестками пьют.
            <br />Лучше радуйся, что не поняли
            <br />Потому что поймут - убьют.
            <br /><br /><i>Евгений Лукин</i>
            <br /><br /><img src='/jap/logo.png' style={{ height: "100px" }} />
        </>,
        bigSize: true,
        picture: 'jap/beauty1.jpeg'
    },
    {
        content: <>
            пишу о своем
            <br />изредка цитирую
            <br />немногословных
        </>,
        picture: 'jap/writerAlone.jpeg'
    },
    {
        content: <>
            суета сует
            <br />давно не был в отпуске
            <br />уйду-ка в себя
        </>,
        picture: 'jap/zen.jpeg'
    },
    {
        content: <>
            раз непонятно
            <br />как это назвать скажи
            <br />что это счастье
        </>,
        picture: 'jap/happiness.jpeg'
    },
    {
        content: <>
            смена сезона
            <br />в ожидании снега
            <br />забыть про стихи
        </>,
        picture: 'jap/beauty3.jpeg'
    },
    {
        content: <>
            пиши не пиши
            <br />не видят смысла в хайку
            <br />просто не сезон
        </>,
        picture: 'jap/beauty2.jpeg'
    },
    {
        content: <>
            вернейший способ
            <br />убедить кота сбежать
            <br />это поводок
        </>,
        picture: 'jap/catLeash.jpeg'
    },
    {
        content: <>
            вот скажут правду
            <br />и вдруг поймешь что это
            <br />и правда правда
        </>,
        picture: 'jap/amazedDog.jpeg'
    },
    {
        content: <>
            решать самому
            <br />монетка и бутерброд
            <br />падают ребром
        </>,
        picture: 'jap/divinationCoin.jpeg'
    },
    {
        content: <>
            странное чувство
            <br />когда мизантропия -
            <br />без взаимности
        </>,
        picture: 'jap/misantrope.jpeg'
    },
    {
        content: <>
            большая польза
            <br />в хорошей компании
            <br />для людоеда
        </>,
        picture: 'jap/dining.jpeg'
    },
    {
        content: <>
            учиться писать
            <br />тогда эти глупости
            <br />точно запомнят
        </>,
        picture: 'jap/writer.jpeg'
    },
    {
        content: <>
            ищем умного
            <br />грамотного критика
            <br />без бревна в глазу
        </>,
        picture: 'jap/bookTree.jpeg'
    },
    {
        content: <>
            вместе мы точно
            <br />не можем соскучиться
            <br />я и мой сарказм
        </>,
        picture: 'jap/sarcasticFox.jpeg'
    },
    {
        content: <>
            что ни неделя
            <br />не уйти от дня сурка
            <br />всегда семь пятниц
        </>,
        picture: 'jap/surok.jpeg'
    },
    {
        content: <>
            праздники в Москве
            <br />подробностей не помним
            <br />интеллигенты
        </>,
        picture: 'jap/moscow.jpeg'
    },
    {
        content: <>
            оригинальность
            <br />просто необходима
            <br />чтобы быть как все
        </>,
        picture: 'jap/crowd.jpeg'
    },
    {
        content: <>
            чтоб с гарантией
            <br />потерять время
            <br />привези его в Москву
        </>,
        picture: 'jap/moscowCityCrowd.jpeg'
    },
    {
        content: <>
            не империя
            <br />всего-то долговая
            <br />тюрьма народов
        </>,
        picture: 'jap/prison.jpeg'
    },
    {
        content: <>
            делающее
            <br />нас сильней обычно нас
            <br />не убивает
        </>,
        picture: 'jap/samurai.jpeg'
    },
    {
        content: <>
            упростит выбор
            <br />буриданову ослу
            <br />овца панурга
        </>,
        picture: 'jap/buridan.jpeg'
    },
    {
        content: <>
            чтоб идти вперед
            <br />просто обменять испуг
            <br />на любопытство
        </>,
        picture: 'jap/curiousFox.jpeg'
    },
    {
        content: <>
            стоит ли по капле
            <br />выдавливать из себя
            <br />тода раба
        </>,
        picture: 'jap/menorah.jpeg'
    },
    {
        content: <>
            сижу под пальмой
            <br />размышляю о важном
            <br />купить ли ёлку
        </>,
        picture: 'jap/yolka.jpeg'
    },
    {
        content: <>
            столько хороших
            <br />и добрых людей вокруг
            <br />не надел очки
        </>,
        picture: 'jap/happy-buddha1.jpeg'
    },
    {
        content: <>
            вся наша жизнь - спорт
            <br />все только и думают
            <br />кого бы кинуть
        </>,
        picture: 'jap/mafiosi.jpeg'
    },
    {
        content: <>
            высоким чувствам
            <br />сложно конкурировать
            <br />с новым айфоном
        </>,
        picture: 'jap/girliphone.jpeg'
    },
    {
        content: <>
            если спрашивать
            <br />за что любишь? назовут
            <br />точную цену
        </>,
        picture: 'jap/money.jpeg'
    },
    {
        content: <>
            напившись воды
            <br />не грусти что колодцу
            <br />на тебя плевать
        </>,
        picture: 'jap/fountain.jpeg'
    },
    {
        content: <>
            какая радость
            <br />вопрос какой ставить знак
            <br />препинания
        </>,
        picture: 'jap/joy.jpeg'
    },
    {
        content: <>
            в дружеском кругу
            <br />рассуждаем о счастье
            <br />жертв не так много
        </>,
        picture: 'jap/happyBad.jpeg'
    },
    {
        content: <>
            тепло ли, снег ли
            <br />любое время года
            <br />перезимуем
        </>,
        picture: 'jap/winterFlowers.jpeg'
    },
    {
        content: <>
            семнадцать слогов
            <br />чтоб случайно не сказать
            <br />что-то лишнее
        </>,
        picture: 'jap/kanji.jpeg'
    },
    {
        content: <>
            с грубым будь вежлив
            <br />спроси - были ли вкусны
            <br />вчера желуди
        </>,
        picture: 'jap/boar.jpeg'
    },
    {
        content: <>
            о русской душе
            <br />правду можно рассказать
            <br />только на идиш
        </>,
        picture: 'jap/japaneseJew.jpeg'
    },
    {
        content: <>
            любят добрые
            <br />человечные
            <br />жертвоприношения
        </>,
        picture: 'jap/sacrifice.jpeg'
    },
    {
        content: <>
            что за времена
            <br />трое пьют в подворотне
            <br />грейпфрутовый сок
        </>,
        picture: 'jap/threeDrunkards.jpeg'
    },
    {
        content: <>
            увидев фигу
            <br />ищут скрытый смысл
            <br />а он не в этой книге
        </>,
        picture: 'jap/bookPaint.jpeg'
    },
    {
        content: <>
            вел себя как лох,
            <br />верил, боялся, просил
            <br />плюнул, уехал
        </>,
        picture: 'jap/departure.jpeg'
    },
    {
        content: <>
            опять худею
            <br />за обедом меньше ем
            <br />четвертый завтрак
        </>,
        picture: 'jap/fatBuddha.jpeg'
    },
    {
        content: <>
            просто как с кошкой
            <br />любит тепло и ласку
            <br />а вы ей пофиг
        </>,
        picture: 'jap/independentCat.jpeg'
    },
    {
        content: <>
            тут в Москве-реке
            <br />вода такая
            <br />что два раза не войдешь
        </>,
        picture: 'jap/dirtyRiver.jpeg'
    },
    {
        content: <>
            ножом и вилкой
            <br />можно ведь съесть даже суп
            <br />только вот зачем?
        </>,
        picture: 'jap/crazySoup.jpeg'
    },
    {
        content: <>
            вопрос опыта:
            <br />не писать на злобу дня
            <br />делать день добрым
        </>,
        picture: 'jap/happyJournalist.jpeg'
    },
    {
        content: <>
            в зеркале видно
            <br />какие мы разные
            <br />хамелеону
        </>,
        picture: 'jap/chameleon.jpeg'
    },
    {
        content: <>
            вся Одиссея
            <br />ровно семь слогов
            <br />додомудохатился
        </>,
        picture: 'jap/backHome.jpeg'
    },
    {
        content: <>
            не давать места
            <br />разочарованию
            <br />верить в худшее
        </>,
        picture: 'jap/pessimist.jpeg'
    },
    {
        content: <>
            быстроту ума
            <br />и хитрость тренируем
            <br />самообманом
        </>,
        picture: 'jap/smartFox.jpeg'
    },
    {
        content: <>
            здесь много людей
            <br />удобно оставаться
            <br />в одиночестве
        </>,
        picture: 'jap/aloneInCrowd.jpeg'
    },
    {
        content: <>
            любящим людей
            <br />предупреждающий знак
            <br />опасно - дети
        </>,
        picture: 'jap/bewareOfChildren.jpeg'
    },
    {
        content: <>
            про бесплатный сыр
            <br />идея правильная
            <br />нам и заплатят
        </>,
        picture: 'jap/thatcher.jpeg'
    },
    {
        content: <>
            в диктат закона
            <br />поверишь - привидится
            <br />призрак опера
        </>,
        picture: 'jap/lawyerPoliceman.jpeg'
    },
    {
        content: <>
            громко крестятся
            <br />перечисляют грехи
            <br />церковный нудизм
        </>,
        picture: 'jap/japaneseChristian.jpeg'
    },
    {
        content: <>
            новое время
            <br />забор, и вместо мата
            <br />иероглифы
        </>,
        picture: 'jap/grafitti.jpeg'
    },
    {
        content: <>
            все совпадает
            <br />гармония полная
            <br />в противофазе
        </>,
        picture: 'jap/north.jpeg'
    },
    {
        content: <>
            место для мыслей
            <br />весьма глубоких
            <br />эскалатор в Питере
        </>,
        picture: 'jap/escalator.jpeg'
    },
    {
        content: <>
            умей убеждать
            <br />воздушному шарику
            <br />скажи - не дуйся
        </>,
        picture: 'jap/baloon.jpeg'
    },
    {
        content: <>
            все без ошибок
            <br />надежно и навсегда
            <br />третья попытка
        </>,
        picture: 'jap/pedantic.jpeg'
    },
    {
        content: <>
            кальмар похож на ктулху
            <br />надо съесть его
            <br />чтоб не проснулся
        </>,
        picture: 'jap/cthulhu.jpeg'
    },
    {
        content: <>
            ведь попробовал
            <br />и вепрево колено
            <br />пятачкоедство
        </>,
        picture: 'jap/pooh.jpeg'
    },
    {
        content: <>
            снова чистый лист
            <br />даже ежиков извел
            <br />на рукавицы
        </>,
        picture: 'jap/hedgehog.jpeg'
    },
    {
        content: <>
            все так делают
            <br />понимаю что и вы
            <br />соболезную
        </>,
        picture: 'jap/conformist.jpeg'
    },
    {
        content: <>
            все обдумали
            <br />совместно починили
            <br />зачем ломалась?
        </>,
        picture: 'jap/feelingSorry.jpeg'
    },
    {
        content: <>
            сильные крылья
            <br />могу сказать о цветке
            <br />опять росянка
        </>,
        picture: 'jap/sundew.jpeg'
    },
    {
        content: <>
            японский кëнинг
            <br />назовем кальян
            <br />туман курящей рыбы
        </>,
        picture: 'jap/smokingFish.jpeg'
    },
    {
        content: <>
            наконец весна
            <br />жизнь налаживается
            <br />с первым апреля
        </>,
        picture: 'jap/showJoke.jpeg'
    },
    {
        content: <>
            какой чистый взгляд
            <br />а оказалось
            <br />что поняла буквально
        </>,
        picture: 'jap/badAngel.jpeg'
    },
    {
        content: <>
            любишь говорить
            <br />и для тебя - аскеза
            <br />на Фейсбуке - пост
        </>,
        picture: 'jap/monastery.jpeg'
    },
    {
        content: <>
            пою как вижу
            <br />вдруг с музыкой красивей?
            <br />сломал гитару
        </>,
        picture: 'jap/guitar.jpeg'
    },
    {
        content: <>
            хотел о вечном
            <br />спросили о погоде
            <br />вечно под руку
        </>,
        picture: 'jap/weatherRound.jpeg'
    },
    {
        content: <>
            Россия в теме
            <br />здесь целый город
            <br />согласился быть нижним
        </>,
        picture: 'jap/nijni.jpeg'
    },
    {
        content: <>
            апрель на носу
            <br />и на нём романтично
            <br />висят сосули
        </>,
        picture: 'jap/snow-icicles.jpeg'
    },
    {
        content: <>
            и друг хороший
            <br />вроде и жена его
            <br />вот ведь задача
        </>,
        picture: 'jap/lovers.jpeg'
    },
    {
        content: <>
            смогли увидеть
            <br />а сантиары
            <br />так и не заметили
        </>,
        picture: 'jap/psy.jpeg'
    },
    {
        content: <>
            здесь ни птиц, ни прохожих
            <br />и еле видна
            <br />ветвь переписки
        </>,
        picture: 'jap/branchKanji.jpeg'
    },
] as Card[]


export const Route = createLazyFileRoute('/senryu/$id')({
    component: () => {
        const { id } = Route.useParams()
        const navigate = useNavigate()

        const idNumber = Number(id)
        const currentCard = idNumber >= 0 && idNumber < cards.length ? idNumber : 0

        const goToCard = (card: number) => {
            navigate({ to: "/senryu/$id", params: { id: `${card}` } })
        }

        return <div className="flex flex-wrap flex-grow-1 align-items-center justify-content-center">
            <Button
                data-testid="prevButton"
                onClick={() => { goToCard(currentCard - 1) }}
                disabled={currentCard == 0}
                text>&lt;&lt;&lt;</Button>
            <div
                className='flex bg-contain align-items-center justify-content-center'
                data-testid="mainZone"
                onClick={() => {
                    goToCard(currentCard === cards.length - 1 ? 0 : currentCard + 1)
                }}
                style={{
                    backgroundImage: `url(${cards[currentCard].picture})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: "center",
                    minWidth: '70vh',
                    maxWidth: '90vh',
                    minHeight: '50vh',
                    maxHeight: '90vh'
                }}
            >
                <div
                    className='bg-white opacity-80 p-2 shadow-8 border-round-lg align-content-center'
                    style={{
                        maxWidth: "70%",
                        height: cards[currentCard].bigSize ? "200px" : "80px",
                        width: cards[currentCard].bigSize ? "200px" : "190px",
                        overflow: "auto"
                    }}
                >
                    {cards[currentCard].content}
                </div>
            </div>
            <Button
                data-testid="nextButton"
                onClick={() => { goToCard(currentCard + 1) }}
                disabled={currentCard == cards.length - 1}
                text>&gt;&gt;&gt;</Button>
        </div>
    }
})