export function toCamelCase(name: string): string {
    const words = name.split(" ");
    if (words.length === 0) return "";
    return (
        words[0].charAt(0).toLowerCase() + words[0].slice(1) +
        words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")
    );
}

// Can change to mock other scenarios, return format is D-M-Y
export function getTime() {
    // return '2023-10-01'

    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    let day = new Date().getDate()

    if (day <= 25) {
        return `${year}-${month}-${day}`
    }
    else {
        month += 1
        if (month === 13) {
            month = 1
            year += 1
        }
        return `${year}-${month}-${day}`
    }
}