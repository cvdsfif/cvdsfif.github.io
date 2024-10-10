export const getValueFromStorage = <T>(key: string, defaultValue: T) => {
    const saved = localStorage?.getItem(key)
    return saved ? JSON.parse(saved) : defaultValue
}

export const putValueToStorage = <T>(key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
}   