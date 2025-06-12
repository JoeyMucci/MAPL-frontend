"use client"

import { DivisionCounts, PerformanceSummary } from "@/types/stats";
import { useState, FC } from "react";
import { Card, Title, Badge, Flex, Stack, Center, ScrollArea } from "@mantine/core";
import { YearPicker } from "@mantine/dates";
import { LineChart, DonutChart } from "@mantine/charts";
import { colorMap, divisions } from "@/vars";
import { leagueStart } from "@/vars";
import classes from "./Pebbler.module.css";
import pickerClasses from "@/components/Headers/Header.module.css";

type PerformancesDict = {
    [year: number]: PerformanceSummary[]
}

export const PerformanceClient: FC<{ performances: PerformancesDict, distribution: DivisionCounts, maxYear: number, pebblerName: string }> =
    ({ performances, distribution, maxYear, pebblerName }) => {
        const [year, setYear] = useState<number>(maxYear)
        const colorClasses = [classes.master, classes.allstar, classes.professional, classes.learner]

        const data = performances[year].slice().reverse().map((perf: PerformanceSummary) => ({
            date: new Date(year, perf.month - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' }),
            Pebbles: perf.pebbles,
            Division: perf.division,
            Rank: perf.rank,
        }));

        const toggleDate = (newDate: string) => {
            setYear(parseInt(newDate.split('-')[0], 10))
        }

        const DonutBlock = () => (
            <Flex wrap="wrap" align="center" gap="xl">
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

                <Stack>
                    {divisions.map((division, i) => (
                        <Badge key={i} className={colorClasses[i]} radius="xs" py="md" color="white" style={{ color: "black" }}>
                            {division}
                        </Badge>
                    ))}
                </Stack>
            </Flex>
        )

        return (
            <Stack align="center" mt="md">
                <DonutBlock />

                <Card radius="lg" bg="black">
                    <Title c="white" ta="center" mb="md" order={6}>
                        {pebblerName}: Performance Archive
                    </Title>
                    <YearPicker
                        classNames={{
                            yearsListControl: pickerClasses.ghostButtonOrange,
                        }}
                        style={{ color: "orange" }}
                        value={`${year}-1-1`}
                        defaultDate={`${year}-1-1`}
                        minDate={leagueStart}
                        maxDate={`${maxYear}-1-1`}
                        onChange={toggleDate}
                    />
                </Card>

                <Center>
                    <ScrollArea h={310}>
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
                                { name: 'Rank', color: "transparent" },
                                { name: 'Division', color: "transparent" },
                            ]}
                        />
                    </ScrollArea>
                </Center>

                <Stack w={1000} gap="xs">
                    {performances[year].slice().map((perf, idx) => (
                        <Card key={idx} radius="md" withBorder mb="xs" bg="gray.0">
                            <Flex justify="space-between" align="center">
                                <Title order={6}>
                                    {new Date(year, perf.month - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' })}
                                </Title>
                                <Badge className={colorClasses[divisions.indexOf(perf.division)]} radius="xs" color="white" style={{ color: "black" }}>
                                    {perf.division}
                                </Badge>
                            </Flex>
                            <Flex gap="md" mt="xs">
                                <Badge color="orange" variant="light">Pebbles: {perf.pebbles}</Badge>
                                <Badge color="blue" variant="light">Rank: {perf.rank}</Badge>
                            </Flex>
                        </Card>
                    ))}
                </Stack>
            </Stack>
        )
    }