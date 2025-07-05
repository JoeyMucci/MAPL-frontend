"use client"

import { Rankings } from "@/components/Rankings/Rankings";
import { useState, useEffect } from "react";
import { PebblerRowStats } from "@/types/stats";
import { getTime } from "@/functions"
import axios from "axios";

export default function RankingsPage() {
    async function fetchRankings(month: number, year: number) {
        try {
            console.log("Fetching rankings...")
            const response = await axios.get(`http://127.0.0.1:8000/api/rankings/${month}/${year}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    const curMonth = parseInt(getTime().split("-")[1])
    const curYear = parseInt(getTime().split("-")[0])

    const [month, setMonth] = useState<number>(curMonth)
    const [year, setYear] = useState<number>(curYear)
    const [rankings, setRankings] = useState<{ [division: string]: PebblerRowStats[] }>({})

    useEffect(() => {
        fetchRankings(month, year).then((data) => {
            setRankings(data.rankings);
        });
    }, [month, year]);


    if (!rankings) {
        return <div>Error: Rankings not found</div>
    }

    if (Object.keys(rankings).length === 0) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Rankings
                rankings={rankings}
                month={month}
                year={year}
                setMonthAction={setMonth}
                setYearAction={setYear}
            />
        </>
    )
}