"use client"

import { useState, useEffect } from "react";
import { Flex, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { RivalryHeader } from "@/components/Headers/RivalryHeader";
import { Bout } from "@/components/Bout/Bout";
import { SimpleBout } from "@/types/bouts";
import { RivalryPebbles, RivalryResults } from "@/types/stats";
import { divisions } from "@/vars";
import axios from "axios";
import { pebblerNameList } from "@/vars";

export default function RivalryPage() {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    async function fetchRivalry(pebblerOne: string, pebblerTwo: string) {
        try {
            console.log("Fetching rivalry...")
            const response = await axios.get(`http://127.0.0.1:8000/api/rivalry/${pebblerOne}/${pebblerTwo}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    const [pebblerOne, setPebblerOne] = useState<string>("Cream");
    const [pebblerTwo, setPebblerTwo] = useState<string>("Flapper")
    const [pebbleBreakdown, setPebbleBreakdown] = useState<{ [division: string]: RivalryPebbles }>()
    const [resultBreakdown, setResultBreakdown] = useState<{ [division: string]: RivalryResults }>({})
    const [bouts, setBouts] = useState<SimpleBout[]>([])

    let oneScore = 0
    let twoScore = 0
    let oneWins = 0
    let twoWins = 0
    let ties = 0

    const dataFetched = (
        pebbleBreakdown &&
        Object.keys(pebbleBreakdown).length > 0 &&
        resultBreakdown &&
        Object.keys(resultBreakdown).length > 0
    )

    if (dataFetched)
        divisions.forEach((division) => {
            oneScore += pebbleBreakdown[division]?.one_score || 0
            twoScore += pebbleBreakdown[division]?.two_score || 0
            oneWins += resultBreakdown[division]?.one_wins || 0
            twoWins += resultBreakdown[division]?.two_wins || 0
            ties += resultBreakdown[division]?.ties || 0
        })

    useEffect(() => {
        fetchRivalry(pebblerOne, pebblerTwo).then((data) => {
            console.log(data)
            setPebbleBreakdown(data.division_pebbles)
            setResultBreakdown(data.division_wtl)
            setBouts(data.bouts)
        });
    }, [pebblerOne, pebblerTwo]);

    return (
        <>
            <RivalryHeader
                pebblerOne={pebblerOne}
                pebblerTwo={pebblerTwo}
                rp={{ "one_score": oneScore, "two_score": twoScore }}
                rr={{ "one_wins": oneWins, "two_wins": twoWins, "ties": ties }}
                toggleOneAction={setPebblerOne}
                toggleTwoAction={setPebblerTwo}
            />

            <Stack align="center" mt="md" mb="md">
                {!dataFetched ? (
                    <div>loading</div>
                ) : (
                    bouts.length === 0 ? (
                        <div>No bouts found.</div>
                    ) :

                        largeScreen ? (
                            Array.from({ length: Math.ceil(bouts.length / 3) }).map((_, rowIdx) => (
                                <Flex key={rowIdx} gap="md">
                                    {bouts.slice(rowIdx * 3, rowIdx * 3 + 3).map((bout, colIdx) => (
                                        <Bout key={rowIdx * 3 + colIdx} bout={bout} showDate />
                                    ))}
                                </Flex>
                            ))
                        ) : (
                            bouts.map((bout, i) => (
                                <Bout key={i} bout={bout} showDate />
                            ))
                        )

                )}
            </Stack>
        </>
    )
}