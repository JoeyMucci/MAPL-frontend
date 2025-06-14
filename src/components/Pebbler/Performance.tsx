"use client"

import { FC, useState, useEffect } from "react";
import { DivisionCounts, PerformanceSummary } from "@/types/stats";
import { Badge, Flex, Stack, Center, ScrollArea, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DatePicker } from "@/components/Headers/DatePicker";
import { RankingSummary } from "@/components/Rankings/RankingSummary";
import { LineChart, DonutChart } from "@mantine/charts";
import { colorMap, divisions } from "@/vars";
import axios from "axios";
import classes from "./Pebbler.module.css";

export const Performance: FC<{ pebblerName: string }> =
    ({ pebblerName }) => {
        async function fetchDistribution() {
            try {
                console.log("Fetching pebbler division distribution...");
                const response = await axios.get(`http://127.0.0.1:8000/api/pebblers/distribution/${pebblerName}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                return {};
            }
        }

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

        let largeScreen = useMediaQuery('(min-width: 56em)');
        largeScreen = largeScreen === undefined ? true : largeScreen;

        const colorClasses = [classes.master, classes.allstar, classes.professional, classes.learner]
        const curYear = new Date().getFullYear()
        const [year, setYear] = useState<number>(curYear)
        const [distribution, setDistribution] = useState<DivisionCounts>({ masters: 0, all_stars: 0, professionals: 0, learners: 0 });
        const [performances, setPerformances] = useState<PerformanceSummary[]>([]);

        const data = performances.slice().reverse().map((perf: PerformanceSummary) => ({
            date: new Date(year, perf.month - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' }),
            Pebbles: perf.pebbles,
            Division: perf.division,
            Rank: perf.rank,
        }));

        useEffect(() => {
            fetchDistribution().then((data) => {
                setDistribution(data.distribution);
            });
        }, []);

        useEffect(() => {
            fetchHistory(year).then((data) => {
                setPerformances(data.performances);
            });
        }, [year]);

        const toggleDate = (newDate: string) => {
            setYear(parseInt(newDate.split('-')[0], 10))
        }

        const DonutBlock = () => (
            <Flex wrap="wrap" align="center" gap="xl">
                <Stack>
                    {divisions.map((division, i) => (
                        <Badge key={i} className={colorClasses[i]} radius="xs" py="md" color="white" style={{ color: "black" }}>
                            {division}
                        </Badge>
                    ))}
                </Stack>

                <DonutChart
                    size={300}
                    strokeWidth={2}
                    thickness={40}
                    tooltipDataSource="segment"
                    data={[
                        { name: 'Master', value: distribution.masters, color: colorMap['Master'] },
                        { name: 'All-Star', value: distribution.all_stars, color: colorMap['All-Star'] },
                        { name: 'Professional', value: distribution.professionals, color: colorMap['Professional'] },
                        { name: 'Learner', value: distribution.learners, color: colorMap['Learner'] },
                    ]}
                    chartLabel="Division Distribution"
                />
            </Flex>
        )

        return (
            <Stack align="center" mt="md">
                <DonutBlock />
                <DatePicker
                    title={`${pebblerName}: Performance Archive`}
                    curYear={year}
                    onChange={toggleDate}
                />

                <Title order={4} ta="center" mt="xl">Pebble Plot</Title>
                <Center>
                    <ScrollArea w={largeScreen ? 1000 : 300}>
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
                </Center>

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
            </Stack>
        )
    }