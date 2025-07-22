"use client"

import { useEffect, useState, JSX } from "react"
import { useWindowScroll } from "@mantine/hooks"
import { Card, Stack, Flex, Image } from "@mantine/core"
import { FullBout } from "@/components/Bout/FullBout"
import NoSsr from "@/components/nossr"

export default function FormatPage(): JSX.Element {
    return (
        <NoSsr><FormatPageHelper /></NoSsr>
    )
}

function FormatPageHelper() {
    const [scroll, scrollTo] = useWindowScroll()
    const [lastPos, setLastPos] = useState(0)

    useEffect(() => {
        let lastPosRef = lastPos

        const handleScroll = () => {
            console.log(window.scrollY)
            console.log(lastPosRef)
            console.log(Math.round(lastPosRef) % 2000)
            let finalPos = window.scrollY

            if (Math.round(lastPosRef) % 2000 < 250) {
                if (window.scrollY % 2000 >= 1750) {
                    scrollTo({ y: Math.floor(window.scrollY / 2000) * 2000 })

                }
                else if (window.scrollY % 2000 >= 250) {
                    scrollTo({ y: Math.ceil(window.scrollY / 2000) * 2000 })
                }
            }

            lastPosRef = finalPos
            setLastPos(() => finalPos)
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Stack align="center" gap={0}>
            {Array.from({ length: 10 }).map((_, i) => {
                return (
                    <Card key={i} w={300} h={2000} px={0} py={0} withBorder>
                        <Card h={500} w={300} bg="red">
                            {scroll.y}
                        </Card>
                        {/* <FullBout
                                bout={
                                    {
                                        away: {
                                            name: "Gregory",
                                            description: "orb",
                                            trait: "Skill",
                                            quirk: "Even Temper",
                                            ability: "Miracle",
                                        },
                                        home: {
                                            name: "Marcel",
                                            description: "orb",
                                            trait: "Speed",
                                            quirk: "Proud Pebble",
                                            ability: "Will to Win",
                                        },
                                        division: "Master",
                                        year: 2026,
                                        month: 3,
                                        day: 14,
                                        away_roll: 1,
                                        home_roll: 3,
                                        away_quirk: true,
                                        home_quirk: true,
                                        away_ability: true,
                                        home_ability: true,
                                        away_roll_half: 3,
                                        home_roll_half: 3,
                                        away_roll_final: 3,
                                        home_roll_final: 6,
                                        away_score: 2,
                                        home_score: 29,
                                    }
                                }
                            /> */}
                    </Card>
                )
            })}
        </Stack>
    )
}