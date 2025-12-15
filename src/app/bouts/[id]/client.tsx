"use client"

import axios from "axios";
import Loading from "@/components/loading";
import { use, useState, useEffect } from 'react';
import { Stack, Title, Flex, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { RivalryPebbles, RivalryResults } from "@/types/stats";
import { ComplicatedBout } from "@/types/bouts";
import { FullBout } from "@/components/Bout/FullBout";
import { NoData } from "@/components/nodata";
import { RivalryCard } from "@/components/Rivalry/RivalryCard";
import { ReportPreview } from "@/types/reports";
import { SmallReport } from "@/components/Reports/SmallReport";
import { getTime } from "@/functions"

export default function BoutPage({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    async function fetchBout(id: number) {
        try {
            // console.log("Fetching bout...");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bout/${id}`);
            return response.data;
        }
        catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error);
            return {};
        }
    }

    async function fetchRivalry(pebblerOne: string, pebblerTwo: string) {
        try {
            // console.log("Fetching rivalry...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rivalry/${pebblerOne}/${pebblerTwo}`)
            return response.data
        } catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error)
            return {}
        }
    }
    async function fetchReport(month: number, year: number, day: number) {
        try {
            // console.log("Fetching reports...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${month}/${day}/${year}`)
            return [response.data]
        }
        catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error)
            return []
        }
    }

    const { id } = use(params)
    const [bout, setBout] = useState<ComplicatedBout>()
    const [rivalryFinished, setRivalryFinished] = useState<boolean>(false)
    const [reportFinished, setReportFinished] = useState<boolean>(false)
    const [pebbleBreakdown, setPebbleBreakdown] = useState<{ [division: string]: RivalryPebbles }>({})
    const [resultBreakdown, setResultBreakdown] = useState<{ [division: string]: RivalryResults }>({})
    const [reports, setReports] = useState<ReportPreview[]>([])

    useEffect(() => {
        fetchBout(id).then((data) => {
            setBout(data)

            if (data && data.away && data.away.name && data.home && data.home.name) {
                fetchRivalry(data.away.name, data.home.name).then((data) => {
                    setPebbleBreakdown(data.division_pebbles)
                    setResultBreakdown(data.division_wtl)
                    setRivalryFinished(true)
                })
            }
            else {
                setRivalryFinished(true)
            }

            if (data && data.month && data.year && data.month) {
                fetchReport(data.month, data.year, data.day).then((data) => {
                    setReports(data)
                })
                setReportFinished(true)
            }
            else {
                setReportFinished(true)
            }
        });
    }, [id]);

    if (!rivalryFinished || !reportFinished) {
        return <Loading />
    }

    if (!bout || Object.keys(bout).length === 0) {
        return <NoData />
    }

    const Stacks = () => {
        const getAuthor = (m: number, d: number, y: number): string => {
            const weekday = new Date(y, m - 1, d).getDay() // 0 = Sun, 1 = Mon, ..., 6 = Sat
            if (weekday === 2 || weekday === 4) return "Patrick" // Tue or Thu
            if (weekday === 0 || weekday === 6) return "Lippo"   // Sun or Sat
            return "Ari"
        }

        return (
            <>
                {/* Only show the report if it is there or the date has not passed (coming soon) */}
                {(reports.length > 0 || getTime() === `${bout.year}-${bout.month}-${bout.day}`) &&
                    <Stack align="center">
                        <Title order={5}>
                            Report
                        </Title>
                        <Text size="xs">
                            Did this bout make the daily recap?
                        </Text>

                        {reports.length > 0 ?
                            <SmallReport article={reports[0]} />
                            :
                            <SmallReport
                                article={{
                                    "day": bout.day,
                                    "month": bout.month,
                                    "year": bout.year,
                                    "author": getAuthor(bout.month, bout.day, bout.year),
                                    "id": null,
                                    "title": null,
                                }}
                            />
                        }
                    </Stack>
                }

                {pebbleBreakdown && resultBreakdown &&
                    <Stack align="center">
                        <Title order={5}>
                            Rivalry
                        </Title>
                        <Text size="xs">
                            Browse all bouts between these pebblers
                        </Text>

                        <RivalryCard
                            stats={{
                                "one": bout.away.name,
                                "two": bout.home.name,
                                "data": {
                                    "division_pebbles": pebbleBreakdown,
                                    "division_wtl": resultBreakdown,
                                },
                            }}
                        />
                    </Stack>
                }
            </>
        )
    }

    return (
        <Stack align="center" mt="md" mb="md">
            <FullBout bout={bout} />
            {((pebbleBreakdown && resultBreakdown) ||
            (reports.length > 0 || getTime() === `${bout.year}-${bout.month}-${bout.day}`)) &&
                <Title order={3}>
                    More About This Bout
                </Title>
            }
            {largeScreen ?
                <Flex gap="xl">
                    <Stacks />
                </Flex> : (
                    <Stacks />
                )}
        </Stack>
    )
}