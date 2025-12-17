export function toCamelCase(name: string): string {
    const words = name.split(" ");
    if (words.length === 0) return "";
    return (
        words[0].charAt(0).toLowerCase() + words[0].slice(1) +
        words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")
    );
}

export function fromCamelCase(name: string): string {
    let res: string = name.charAt(0).toUpperCase() + ""

    for (let i = 1; i < name.length; i++) {
        if (name[i] >= 'A' && name[i] <= 'Z') {
            res += ' '
        }

        res += name[i]
    }

    return res
}

export function isComingSoon(m: number, d: number, y: number): boolean {
    const now = new Date()
    const nowTime = now.getTime()
    const minTime = Date.UTC(y, m - 1, d, 12, 0, 0)
    const maxTime = Date.UTC(y, m - 1, d, 20, 5 ,0)
    return nowTime >= minTime && nowTime <= maxTime
}

export function getLocalTime(): string {
    const now = new Date()
    const year = now.getFullYear()
    const monthIndex = now.getMonth() // 0-based
    const day = now.getDate()
    return `${year}-${monthIndex + 1}-${day}`
}

// Can change to mock other scenarios, return format is D-M-Y
export function getMaxTime(): string {
    const now = new Date()
    const year = now.getUTCFullYear()
    const monthIndex = now.getUTCMonth() // 0-based

    let nextMonthIndex = monthIndex
    let nextYear = year

    const threshold = Date.UTC(year, monthIndex, 25, 20, 0, 0) // 20:00:00 UTC
    if (now.getTime() > threshold) {
        nextMonthIndex++
        if (nextMonthIndex === 12) {
            nextMonthIndex = 0
            nextYear++
        }
    }

    return `${nextYear}-${nextMonthIndex + 1}-25`
}