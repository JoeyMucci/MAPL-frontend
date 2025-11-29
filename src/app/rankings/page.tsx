"use client"

import { Rankings } from "@/components/Rankings/Rankings";
import { useState, useEffect } from "react";
import { PebblerRowStats } from "@/types/stats";
import { getTime } from "@/functions";
import Loading from "@/components/loading";
import axios from "axios";

export default function RankingsPage() {
    async function fetchRankings(month: number, year: number) {
        try {
            // console.log("Fetching rankings...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rankings/${month}/${year}`)
            return response.data
        }  catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error)
            return {}
        }
    }

    const t = getTime()
    const curMonth = parseInt(t.split("-")[1])
    const curYear = parseInt(t.split("-")[0])

    const [month, setMonth] = useState<number>(curMonth)
    const [year, setYear] = useState<number>(curYear)
    const [rankings, setRankings] = useState<{ [division: string]: PebblerRowStats[] }>({})
    const [isReady, setIsReady] = useState<boolean>(false)

    useEffect(() => {
        fetchRankings(month, year).then((data) => {
            setRankings(data.rankings)
            setIsReady(true)
        });
    }, [month, year]);

    if (!isReady) {
        return <Loading />
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