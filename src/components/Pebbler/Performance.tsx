"use client"

import { FC, useState, useEffect } from "react";
import { PerformanceSummary } from "@/types/stats";
import { Stack, Center, ScrollArea, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GeneralDatePicker } from "@/components/Headers/GeneralDatePicker";
import { RankingSummary } from "@/components/Rankings/RankingSummary";
import { LineChart } from "@mantine/charts";
import axios from "axios";

export const Performance: FC<{ pebblerName: string }> =
    ({ pebblerName }) => {
        async function fetchHistory(year: number) {
            try {
                console.log("Fetching pebbler performance history...");
                const response = await axios.get(`http://127.0.0.1:8000/api/pebblers/history/${pebblerName}/${year}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                return {};
            }
        }

        let largeScreen = useMediaQuery('(min-width: 56em)')
        largeScreen = largeScreen === undefined ? true : largeScreen

        const curYear = new Date().getFullYear()
        const [year, setYear] = useState<number>(curYear)
        const [performances, setPerformances] = useState<PerformanceSummary[]>([]);

        const data = performances.slice().reverse().map((perf: PerformanceSummary) => ({
            date: new Date(year, perf.month - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' }),
            Pebbles: perf.pebbles,
            Division: perf.division,
            Rank: perf.rank,
        }));

        useEffect(() => {
            fetchHistory(year).then((data) => {
                setPerformances(data.performances);
            });
        }, [year]);

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

                <Title order={4} ta="center" mt="xl">Pebble Plot</Title>

                {performances.length == 0 ? (
                    <div>No Data for {year}</div>
                ) : (
                    <>
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
                        <Stack gap="sm" mb="sm">
                            {performances.slice().map((perf, i) => (
                                <RankingSummary
                                    key={i}
                                    division={perf.division}
                                    rank={perf.rank}
                                    dateString={new Date(year, perf.month - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' })}
                                />
                            ))}
                        </Stack>
                    </>
                )}

            </Stack >
        )
    }