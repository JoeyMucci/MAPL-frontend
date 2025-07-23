"use client"

import { useEffect, useState, JSX } from "react"
import { useWindowScroll } from "@mantine/hooks"
import { Card, Stack, Flex, Image, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import { FormatFooter } from "@/components/Headers/FormatFooter"
import { toCamelCase } from "@/functions"
import { BasePebbleGraphic } from "@/components/Rankings/BasePebbleGraphic";
import NoSsr from "@/components/nossr"

export default function FormatPage(): JSX.Element {
    return (
        <NoSsr><FormatPageHelper /></NoSsr>
    )
}

function FormatPageHelper() {
    const [scroll, scrollTo] = useWindowScroll()
    const [lastPos, setLastPos] = useState(0)
    const maxScroll = 18000

    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    useEffect(() => {
        let lastPosRef = lastPos

        const handleScroll = () => {
            if (Math.round(lastPosRef) % 2000 < 250) {
                if (window.scrollY % 2000 >= 1750) {
                    scrollTo({ y: Math.floor(window.scrollY / 2000) * 2000 })

                }
                else if (window.scrollY % 2000 >= 250) {
                    scrollTo({ y: Math.ceil(window.scrollY / 2000) * 2000 })
                }
            }

            lastPosRef = window.scrollY
            setLastPos(() => window.scrollY)
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Stack align="center" gap={0}>
                <Card w={largeScreen ? 1000 : 350} h={2000} px={0} py={0} mt="md">
                    <Flex justify="center" align="center">
                        <Image
                            src={"/authors/" + toCamelCase("Ari") + ".png"}
                            alt={"Image of " + "Ari" + " the reporter"}
                            h={300}
                            w={300}
                        />
                        <Text ta="center" w={300} size="sm">
                            {"H-hi... I'm Shaun. I am going first because I wanted to get this over with. I will be telling you all about the art of " +
                                "pebbling to get us started."}
                        </Text>
                    </Flex>
                </Card>
                <Card w={1000} h={2000} px={0} py={0} mt="md">
                    <Stack>
                        <Flex justify="center" align="center">
                            <Image
                                src={"/authors/" + toCamelCase("Ari") + ".png"}
                                alt={"Image of " + "Ari" + " the reporter"}
                                h={300}
                                w={300}
                            />
                            <Text ta="center" w={300} size="sm">
                                {"Pebbling is a one-on-one dice rolling competition in which the g-goal is to accumulate as many pebbles as possible. The base " +
                                    "formula to calculate pebbles depending on whether a pebbler wins (higher roll), loses (smaller roll), or ties (same roll) are as follows."}
                            </Text>
                        </Flex>
                        <BasePebbleGraphic />
                    </Stack>
                </Card>
                <Card w={1000} h={2000} px={0} py={0} mt="md">
                    <Flex justify="center" align="center">
                        <Image
                            src={"/authors/" + toCamelCase("Ari") + ".png"}
                            alt={"Image of " + "Ari" + " the reporter"}
                            h={300}
                            w={300}
                        />
                        <Text ta="center" w={300} size="sm">
                            {"Over the years, pebbling has taken many forms. There have even been team elements incorporated at times. " +
                                "The largest scale pebble competition prior to the MAPL was the 2022 Super Pebble Circuit. Now, my p-pal Neville will " +
                                "explain how the MAPL is truly a revolution in the world of pebbling. Phew..."}
                        </Text>
                    </Flex>
                </Card>
                <Card w={1000} h={2000} px={0} py={0} mt="md">
                    4
                </Card>
                <Card w={1000} h={2000} px={0} py={0} mt="md">
                    5
                </Card>
                <Card w={1000} h={2000} px={0} py={0} mt="md">
                    6
                </Card>
                <Card w={1000} h={2000} px={0} py={0} mt="md">
                    7
                </Card>
                <Card w={1000} h={2000} px={0} py={0} mt="md">
                    8
                </Card>
                <Card w={1000} h={2000} px={0} py={0} mt="md">
                    9
                </Card>
                <Card w={1000} h={2000} px={0} py={0} mt="md">
                    10
                </Card>
            </Stack>
            <FormatFooter fraction={scroll.y / maxScroll * 100} />
        </>

    )
}


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
                                        year: 2025,
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
