"use client"

import { FC, useState, useEffect } from 'react';
import { Title, Stack, Flex, Badge, Text, Divider } from '@mantine/core';
import { useMediaQuery } from "@mantine/hooks";
import { HomeHeader } from "@/components/Headers/HomeHeader";
import { OverviewCard } from '@/components/Pebbler/OverviewCard';
import { Bout } from '@/components/Bout/SmallBout';
import { SmallReport } from '@/components/Reports/SmallReport';
import { getTime } from '@/functions';
import { PersonalPebbler } from '@/types/pebblers';
import { SimpleBout } from '@/types/bouts';
import { ReportPreview } from '@/types/reports';
import { FullRivalryStats } from '@/types/stats';
import { divisions, colorMap } from '@/vars';
import {
    IconArrowsUp,
    IconArrowUp,
    IconArrowsRightLeft
} from "@tabler/icons-react";
import axios from "axios";
import { RivalryCard } from '@/components/Rivalry/RivalryCard';

export default function HomePage() {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    async function fetchHotPebblers(month: number, year: number) {
        try {
            console.log("Fetching hot pebblers...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hot/pebblers/${month}/${year}`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    async function fetchHotBouts() {
        try {
            console.log("Fetching hot bouts...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hot/bouts`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    async function fetchHotPress() {
        try {
            console.log("Fetching hot press...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hot/news`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    async function fetchHotRivalries() {
        try {
            console.log("Fetching hot rilalries...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hot/rivalries`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    let month = parseInt(getTime().split("-")[1])
    let year = parseInt(getTime().split("-")[0])

    const [hotPebblers, setHotPebblers] = useState<{ [division: string]: PersonalPebbler[] }>({})
    const [hotBouts, setHotBouts] = useState<SimpleBout[]>([])
    const [hotPress, setHotPress] = useState<ReportPreview[]>([])
    const [hotRivalries, setHotRivalries] = useState<FullRivalryStats[]>([])

    useEffect(() => {
        fetchHotPebblers(month, year).then((data) => {
            setHotPebblers(data)
        })

        fetchHotBouts().then((data) => {
            setHotBouts(data)
        })

        fetchHotPress().then((data) => {
            setHotPress(data)
        })

        fetchHotRivalries().then((data) => {
            setHotRivalries(data)
        })
    }, [])

    const CustomDescription: FC<{ description: string }> = ({ description }) => {
        const splits = description.split(' ')
        const oldPebbles = parseInt(splits[0].split('UP')[0])
        const newPebbles = parseInt(splits[0].split('UP')[1])
        const oldRank = parseInt(splits[1].split('UP')[0])
        const newRank = parseInt(splits[1].split('UP')[1])

        const pebbleDifference = newPebbles - oldPebbles
        const rankDifference = oldRank - newRank

        return (
            <Stack gap={0} align='center'>
                <Flex gap='md' align='center'>
                    <Text size='lg'>+{pebbleDifference} pebbles</Text>
                    <Flex gap={0} align='center'>
                        <Text size='lg'>{newPebbles}</Text>
                        {pebbleDifference >= 20 && <IconArrowsUp color={colorMap['W']} />}
                        {pebbleDifference < 20 && pebbleDifference > 0 && <IconArrowUp color={colorMap['W']} />}
                        {pebbleDifference === 0 && <IconArrowsRightLeft color={colorMap['T']} />}
                    </Flex>
                </Flex>

                <Flex gap='md' align='center'>
                    <Text size='lg'>+{rankDifference} ranking</Text>
                    <Flex gap={0} align='center'>
                        <Text size='lg'>{newRank}</Text>
                        {rankDifference >= 3 && <IconArrowsUp color={colorMap['W']} />}
                        {rankDifference < 3 && rankDifference > 0 && <IconArrowUp color={colorMap['W']} />}
                        {rankDifference === 0 && <IconArrowsRightLeft color={colorMap['T']} />}
                    </Flex>
                </Flex>
            </Stack>
        )
    }

    const HotPebblers = () => (
        <>
            {Object.keys(hotPebblers).length > 0 && <Title order={3}>🔥   Hot Pebblers   🔥</Title>}
            < Flex gap="md" >
                {
                    Object.keys(hotPebblers).length > 0 ? (
                        divisions.map((division, i) => (
                            <Stack key={i} align='center'>
                                <Badge w={125} color={colorMap[division]}>{division}</Badge>
                                <OverviewCard pebbler={hotPebblers[division][0]} hideDescription />
                                <CustomDescription description={hotPebblers[division][0].description} />
                            </Stack>
                        ))
                    ) : (
                        <div> no data</div>
                    )
                }
            </Flex >
        </>
    )

    const HotBouts = () => (
        <>
            {hotBouts.length > 0 && <Title order={3}>🔥   Hot Bouts   🔥</Title>}

            <Stack align="center">
                {
                    hotBouts.length === 0 ? (
                        <div>No bouts found.</div>
                    ) :
                        largeScreen ? (
                            Array.from({ length: Math.ceil(hotBouts.length / 3) }).map((_, rowIdx) => (
                                <Flex key={rowIdx} gap="md">
                                    {hotBouts.slice(rowIdx * 3, rowIdx * 3 + 3).map((bout, colIdx) => (
                                        <Bout key={rowIdx * 3 + colIdx} bout={bout} showDate />
                                    ))}
                                </Flex>
                            ))
                        ) : (
                            hotBouts.map((bout, i) => (
                                <Bout key={i} bout={bout} showDate />
                            ))
                        )
                }
            </Stack>
        </>
    )

    const HotPress = () => (
        <>
            {hotPress.length > 0 && <Title order={3}>🔥   Hot of the Press   🔥</Title>}

            {
                Object.keys(hotPress).length === 0 || hotPress.length === 0 ? (
                    <div>No reports found.</div>
                ) :

                    largeScreen ? (
                        Array.from({ length: Math.ceil(hotPress.length / 3) }).map((_, rowIdx) => (
                            <Flex key={rowIdx} gap="md">
                                {hotPress.slice(rowIdx * 3, rowIdx * 3 + 3).map((report, colIdx) => (
                                    <SmallReport key={rowIdx * 3 + colIdx} article={report} />
                                ))}
                            </Flex>
                        ))
                    ) : (
                        hotPress.map((report, i) => (
                            <SmallReport key={i} article={report} />
                        ))
                    )
            }
        </>
    )

    const HotRivalries = () => (
        <>
            {hotRivalries.length > 0 && <Title order={3}>🔥   Heated Rivalries   🔥</Title>}

            {
                Object.keys(hotRivalries).length === 0 || hotRivalries.length === 0 ? (
                    <div>No rivalries found.</div>
                ) :

                    largeScreen ? (
                        Array.from({ length: Math.ceil(hotRivalries.length / 3) }).map((_, rowIdx) => (
                            <Flex key={rowIdx} gap="md">
                                {hotRivalries.slice(rowIdx * 3, rowIdx * 3 + 3).map((rivalry, colIdx) => (
                                    <RivalryCard key={rowIdx * 3 + colIdx} stats={rivalry} />
                                ))}
                            </Flex>
                        ))
                    ) : (
                        hotRivalries.map((rivalry, i) => (
                            <RivalryCard key={i} stats={rivalry} />
                        ))
                    )
            }
        </>
    )


    return (
        <>
            <HomeHeader largeScreen={largeScreen} />
            <Stack align='center' mt='md' mb='md' gap='lg'>
                <HotPebblers />
                {Object.keys(hotPebblers).length > 0 && <Divider w={largeScreen ? 1000 : 300} />}
                <HotBouts />
                {hotBouts.length > 0 && <Divider w={largeScreen ? 1000 : 300} />}
                <HotPress />
                {hotPress.length > 0 && <Divider w={largeScreen ? 1000 : 300} />}
                <HotRivalries />
            </Stack>
        </>
    )
}