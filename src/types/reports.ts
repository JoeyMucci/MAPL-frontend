export interface Report {
    author: string
    title: string
    content: string
    id: number
    month: number
    day: number
    year: number
}

export interface ReportPreview {
    author: string
    title: string | null
    id: number | null
    month: number
    day: number
    year: number
}