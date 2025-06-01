import { RankingsTable } from "@/components/RankingsTable/RankingsTable";
import { divisions } from "@/vars/divisions";
import axios from "axios";

export default async function Rankings() {
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

    const rankings = await fetchRankings(6, 2025)

    return (
        <>
            {divisions.map((division, i) => (
                <RankingsTable key={i} pebblerRows={rankings[division]} division={division} />
            ))}
        </>
    )
}