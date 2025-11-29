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

    const threshold = Date.UTC(year, monthIndex, 25, 20, 0, 0) // 25th 20:00:00 UTC

    if (now.getTime() > threshold) {
        // return first day of next month (UTC)
        let nextYear = year
        let nextMonthIndex = monthIndex + 1
        if (nextMonthIndex > 11) {
            nextMonthIndex = 0
            nextYear++
        }
        return `${nextYear}-${nextMonthIndex + 1}-1`
    }

    return `${year}-${monthIndex + 1}-${day}`
}