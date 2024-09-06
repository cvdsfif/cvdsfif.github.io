import { translate } from "./translate";

export const toTon = (amount: bigint, lang: string) => `${Math.round(Number(amount / 1_000_000_000n))
    } TON ${Intl.NumberFormat(translate("codepage", lang), {
        minimumIntegerDigits: 9
    }).format(amount % 1_000_000_000n)} nano`