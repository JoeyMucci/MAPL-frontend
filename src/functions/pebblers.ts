export function toCamelCase(name: string): string {
    const words = name.split(" ");
    if (words.length === 0) return "";
    return (
        words[0].charAt(0).toLowerCase() + words[0].slice(1) +
        words.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")
    );
}