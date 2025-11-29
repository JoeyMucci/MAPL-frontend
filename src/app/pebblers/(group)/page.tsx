"use client"

import { useEffect, useState } from "react";
import { OverviewCarousel } from "@/components/Pebbler/OverviewCarousel";
import { PersonalPebbler } from "@/types/pebblers";
import { Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { toCamelCase } from "@/functions";
import { SearchableSelect } from "@/components/Headers/SearchableSelect";
import axios from "axios";
import Loading from "@/components/loading";

export default function PebblersPage() {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    async function fetchRecentWinners() {
        try {
            // console.log("Fetching recent winners...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rankings/winners`)
            return response.data
        }
         catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error)
            return {}
        }
    }

    async function fetchCurrentBookends() {
        try {
            // console.log("Fetching rankings bookends...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rankings/bookends`)
            return response.data
        }
         catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error)
            return {}
        }
    }

    async function fetchYTDStats() {
        try {
            // console.log("Fetching year to date stats...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pebblers/ytd`)
            return response.data
        }
         catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error)
            return {}
        }
    }

    const [recentWinners, setRecentWinners] = useState<PersonalPebbler[]>([])
    const [currentLeaders, setCurrentLeaders] = useState<PersonalPebbler[]>([])
    const [currentTrailers, setCurrentTrailers] = useState<PersonalPebbler[]>([])
    const [ytdPebbleLeaders, setYTDPebblesLeaders] = useState<PersonalPebbler[]>([])
    const [ytdQuirkLeaders, setYTDQuirkLeaders] = useState<PersonalPebbler[]>([])
    const [ytdAbilityLeaders, setYTDAbilityLeaders] = useState<PersonalPebbler[]>([])
    const [winnersFinished, setWinnersFinished] = useState<boolean>(false)
    const [bookendsFinished, setBookendsFinished] = useState<boolean>(false)
    const [ytdFinished, setYTDFinished] = useState<boolean>(false)

    useEffect(() => {
        fetchRecentWinners().then((data) => {
            setRecentWinners(data)
            setWinnersFinished(true)
        })

        fetchCurrentBookends().then((data) => {
            setCurrentLeaders(data.leaders)
            setCurrentTrailers(data.trailers)
            setBookendsFinished(true)
        })

        fetchYTDStats().then((data) => {
            setYTDPebblesLeaders(data.pebbles)
            setYTDQuirkLeaders(data.quirks)
            setYTDAbilityLeaders(data.abilities)
            setYTDFinished(true)
        })
    }, [])

    if(
        !winnersFinished ||
        !bookendsFinished ||
        !ytdFinished
    ) {
        return <Loading />
    }

    return (
        <Stack align="center" mt="sm" mb="sm">
            <SearchableSelect
            defaultValue=""
            disabledName=""
            setParentAction={(value) => window.location.href = `/pebblers/${toCamelCase(value)}`}
            />
            <OverviewCarousel label="Recent Champs" pebblers={recentWinners} largeScreen={largeScreen} hasData={recentWinners !== undefined && recentWinners.length > 0} />
            <OverviewCarousel label="Current Leaders" pebblers={currentLeaders} largeScreen={largeScreen} hasData={currentLeaders !== undefined && currentLeaders.length > 0} />
            <OverviewCarousel label="Current Trailers" pebblers={currentTrailers} largeScreen={largeScreen} hasData={currentTrailers !== undefined && currentTrailers.length > 0} />
            <OverviewCarousel label="Year to Date Pebble Leaders" pebblers={ytdPebbleLeaders} largeScreen={largeScreen} hasData={ytdPebbleLeaders !== undefined && ytdPebbleLeaders.length > 0} />
            <OverviewCarousel label="Year to Date Quirk Pebble Leaders" pebblers={ytdQuirkLeaders} largeScreen={largeScreen} hasData={ytdQuirkLeaders !== undefined && ytdQuirkLeaders.length > 0} />
            <OverviewCarousel label="Year to Date Ability Trigger Leaders" pebblers={ytdAbilityLeaders} largeScreen={largeScreen} hasData={ytdAbilityLeaders !== undefined && ytdAbilityLeaders.length > 0} />
        </Stack>
    )
}