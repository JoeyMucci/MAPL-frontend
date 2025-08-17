"use client"

import { useState, useEffect, use } from "react";
import { Flex, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { RivalryHeader } from "@/components/Headers/RivalryHeader";
import { Bout } from "@/components/Bout/SmallBout";
import { SimpleBout } from "@/types/bouts";
import { RivalryPebbles, RivalryResults } from "@/types/stats";
import { pebblerNameList } from "@/vars";
import { fromCamelCase } from "@/functions";
import axios from "axios";

export default function RivalryPage({
    params,
}: {
    params: Promise<{ one: string, two: string }>
}) {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    async function fetchRivalry(pebblerOne: string, pebblerTwo: string) {
        try {
            console.log("Fetching rivalry...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rivalry/${pebblerOne}/${pebblerTwo}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    const unwrapped = use(params)
    const { one, two } = unwrapped

    const [pebblerOne, setPebblerOne] = useState<string>(fromCamelCase(one))
    const [pebblerTwo, setPebblerTwo] = useState<string>(fromCamelCase(two))
    const [pebbleBreakdown, setPebbleBreakdown] = useState<{ [division: string]: RivalryPebbles }>({})
    const [resultBreakdown, setResultBreakdown] = useState<{ [division: string]: RivalryResults }>({})
    const [bouts, setBouts] = useState<SimpleBout[]>([])

    useEffect(() => {
        if (pebblerOne.length > 0) {
            fetchRivalry(pebblerOne, pebblerTwo).then((data) => {
                setPebbleBreakdown(data.division_pebbles)
                setResultBreakdown(data.division_wtl)
                setBouts(data.bouts)
            })
        }
    }, [pebblerOne, pebblerTwo]);

    return (
        <>
            {pebblerOne.length > 0 &&
                <>
                    <RivalryHeader
                        pebblerOne={pebblerOne}
                        pebblerTwo={pebblerTwo}
                        rp={pebbleBreakdown}
                        rr={resultBreakdown}
                        toggleOneAction={setPebblerOne}
                        toggleTwoAction={setPebblerTwo}
                        largeScreen={largeScreen}
                    />

                    <Stack align="center" mt="md" mb="md">
                        {Object.keys(pebbleBreakdown).length == 0 ? (
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
            }
        </>
    )
}