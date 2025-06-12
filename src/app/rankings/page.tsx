import { Rankings } from "@/components/Rankings/Rankings";
import axios from "axios";

export default async function RankingsPage() {
    async function fetchRankings() {
        try {
            console.log("Fetching rankings...")
            const response = await axios.get(`http://127.0.0.1:8000/api/rankings`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    const data = await fetchRankings()
    const rankings = data.rankings
    const month = data.month
    const year = data.year

    if (!rankings || Object.keys(rankings).length === 0) {
        return <div>Error: Rankings not found</div>
    }

    return (
        <>
            <Rankings rankings={rankings} maxMonth={month} maxYear={year} />
        </>
    )
}