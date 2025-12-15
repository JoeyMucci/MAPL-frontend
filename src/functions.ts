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

// Can change to mock other scenarios, return format is D-M-Y
export function getTime(): string {
    const now = new Date()
    const year = now.getUTCFullYear()
    const monthIndex = now.getUTCMonth() // 0-based
    const day = now.getUTCDate()

    let nextDay = Math.min(day, 25) // Competition ends on the 25th
    let nextMonthIndex = monthIndex
    let nextYear = year

    const threshold = Date.UTC(year, monthIndex, day, 20, 5, 0) // 20:05:00 UTC
    if (now.getTime() > threshold) {
        nextDay++
        if(nextDay === 26) {
            nextDay = 1
            nextMonthIndex++
            if (nextMonthIndex === 12) {
                nextMonthIndex = 0
                nextYear++
            }
        }
    }

    return `${nextYear}-${nextMonthIndex + 1}-${nextDay}`
}