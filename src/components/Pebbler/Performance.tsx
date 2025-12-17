"use client"

import { FC, useState, useEffect } from "react";
import { PerformanceSummary } from "@/types/stats";
import { Stack, Center, ScrollArea, Title, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GeneralDatePicker } from "@/components/Headers/GeneralDatePicker";
import { RankingSummary } from "@/components/Rankings/RankingSummary";
import { LineChart } from "@mantine/charts";
import { NoData } from "@/components/nodata";
import { getLocalTime } from "@/functions";
import axios from "axios";

export const Performance: FC<{ pebblerName: string }> =
    ({ pebblerName }) => {

        let largeScreen = useMediaQuery('(min-width: 56em)')
        largeScreen = largeScreen === undefined ? true : largeScreen

        const curYear = parseInt(getLocalTime().split("-")[0])
        const [year, setYear] = useState<number>(curYear)
        const [performances, setPerformances] = useState<PerformanceSummary[]>([])

        const data = performances.slice().reverse().map((perf: PerformanceSummary) => ({
            date: new Date(year, perf.month - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' }),
            Pebbles: perf.pebbles,
            Division: perf.division,
            Rank: perf.rank,
        }));

        useEffect(() => {
            async function fetchHistory(year: number) {
                try {
                    // console.log("Fetching pebbler performance history...");
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pebblers/history/${pebblerName}/${year}`);
                    return response.data;
                }  catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
                    // console.error("Error fetching data:", error);
                    return null;
                }
            }

            fetchHistory(year).then((data) => {
                setPerformances(data.performances);
            });
        }, [year, pebblerName]);

        const toggleDate = (newDate: string) => {
            setYear(parseInt(newDate.split('-')[0], 10))
        }

        return (
            <Stack align="center" mt="md">
                <GeneralDatePicker
                    title={`${pebblerName}: Performance Archive`}
                    curYear={year}
                    onChange={toggleDate}
                />


                {performances === undefined || !performances || performances.length === 0 ? (
                    <>
                        <Title ta="center" order={1} mt="xl">
                            {year}{" Performance"}
                        </Title>
                        <NoData />
                    </>
                ) : (
                    <>
                        <Title order={4} ta="center" mt="xl">Pebble Plot</Title>
                        <Center>
                            <ScrollArea type="auto" w={largeScreen ? 1000 : 300}>
                                <LineChart
                                    h={300}
                                    w={1000}
                                    p={10}
                                    data={data}
                                    dataKey="date"
                                    xAxisProps={{ angle: -45 }}
                                    xAxisLabel="Date"
                                    yAxisLabel="Pebbles"
                                    series={[
                                        { name: 'Pebbles', color: "orange" },
                                    ]}
                                />
                            </ScrollArea>
                        </Center >

                        <Title order={4} ta="center" mt="xl">Promotion/Demotion Record</Title>
                        <Stack gap="sm" mb="sm" align="center">
                            {largeScreen ? (
                                Array.from({ length: Math.ceil(performances.length / 3) }).map((_, rowIdx) => (
                                    <Flex key={rowIdx} gap="md">
                                        {performances.slice(rowIdx * 3, rowIdx * 3 + 3).map((perf, colIdx) => (
                                            <RankingSummary
                                              key={rowIdx * 3 + colIdx} 
                                              division={perf.division}
                                              rank={perf.rank}
                                              dateString={new Date(year, perf.month - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' })}
                                            />
                                        ))}
                                    </Flex>
                                ))
                            ) : (
                                performances.map((perf, i) => (
                                    <RankingSummary
                                        key={i}
                                        division={perf.division}
                                        rank={perf.rank}
                                        dateString={new Date(year, perf.month - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' })}
                                    />
                                ))
                            )}
                        </Stack>
                    </>
                )}

            </Stack >
        )
    }