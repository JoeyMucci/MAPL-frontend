import { Rankings } from "@/components/Rankings/Rankings";
import axios from "axios";

export default async function RankingsPage({
    params,
}: {
    params: Promise<{ month: number, year: number }>
}) {
    async function fetchRankings(month: number, year: number) {
        try {
            console.log("Fetching rankings...")
            const response = await axios.get(`http://127.0.0.1:8000/api/rankings/${month}/${year}`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    const { month, year } = await params

    const data = await fetchRankings(month, year)
    const rankings = data.rankings

    if (!rankings || Object.keys(rankings).length === 0) {
        return <div>Error: Rankings not found</div>
    }

    return (
        <>
            <Rankings rankings={rankings} month={month} year={year} />
        </>
    )
}