"use client"

import { useEffect, useState } from "react";
import { OverviewCarousel } from "@/components/Pebbler/OverviewCarousel";
import { PersonalPebbler } from "@/types/pebblers";
import { Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getTime, toCamelCase } from "@/functions";
import { SearchableSelect } from "@/components/Headers/SearchableSelect";
import axios from "axios";

export default function PebblersPage() {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    async function fetchRecentWinners(month: number, year: number) {
        try {
            console.log("Fetching recent winners...")
            const response = await axios.get(`http://127.0.0.1:8000/api/rankings/winners/${month}/${year}`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    async function fetchCurrentBookends() {
        try {
            console.log("Fetching rankings bookends...")
            const response = await axios.get(`http://127.0.0.1:8000/api/rankings/bookends`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    async function fetchYTDStats() {
        try {
            console.log("Fetching year to date stats...")
            const response = await axios.get(`http://127.0.0.1:8000/api/pebblers/ytd`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    let month = parseInt(getTime().split("-")[1])
    let year = parseInt(getTime().split("-")[0])

    month -= 1

    if (month == 0) {
        month = 12
        year -= 1
    }

    const [recentWinners, setRecentWinners] = useState<PersonalPebbler[]>([])
    const [currentLeaders, setCurrentLeaders] = useState<PersonalPebbler[]>([])
    const [currentTrailers, setCurrentTrailers] = useState<PersonalPebbler[]>([])
    const [ytdPebbleLeaders, setYTDPebblesLeaders] = useState<PersonalPebbler[]>([])
    const [ytdQuirkLeaders, setYTDQuirkLeaders] = useState<PersonalPebbler[]>([])
    const [ytdAbilityLeaders, setYTDAbilityLeaders] = useState<PersonalPebbler[]>([])

    useEffect(() => {
        fetchRecentWinners(month, year).then((data) => {
            setRecentWinners(data)
        })

        fetchCurrentBookends().then((data) => {
            setCurrentLeaders(data.leaders)
            setCurrentTrailers(data.trailers)
        })

        fetchYTDStats().then((data) => {
            setYTDPebblesLeaders(data.pebbles)
            setYTDQuirkLeaders(data.quirks)
            setYTDAbilityLeaders(data.abilities)
        })
    }, [])

    return (
        <Stack align="center" mt="sm" mb="sm">
            <SearchableSelect
                defaultValue=""
                disabledName=""
                setParentAction={(value) => window.location.href = `/pebblers/${toCamelCase(value)}`}
            />
            {recentWinners.length > 0 &&
                <OverviewCarousel label="Recent Winners" pebblers={recentWinners} largeScreen={largeScreen} />
            }
            <OverviewCarousel label="Current Leaders" pebblers={currentLeaders} largeScreen={largeScreen} />
            <OverviewCarousel label="Current Trailers" pebblers={currentTrailers} largeScreen={largeScreen} />
            <OverviewCarousel label="Year to Date Pebble Leaders" pebblers={ytdPebbleLeaders} largeScreen={largeScreen} />
            <OverviewCarousel label="Year to Date Quirk Pebble Leaders" pebblers={ytdQuirkLeaders} largeScreen={largeScreen} />
            <OverviewCarousel label="Year to Date Ability Trigger Leaders" pebblers={ytdAbilityLeaders} largeScreen={largeScreen} />
        </Stack>
    )
}