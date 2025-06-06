import { History, PerformanceSummary } from "@/types/stats";
import { Badge, Stack, Flex, ScrollArea, Center } from "@mantine/core";
import { DonutChart, LineChart } from '@mantine/charts';
import { FC } from "react";
import { divisions, colorMap } from "@/vars";
import classes from "./Pebbler.module.css";
import axios from "axios";

export const Performance: FC<{ pebblerName: string }> = async ({ pebblerName }) => {
    async function fetchHistory() {
        try {
            console.log("Fetching pebbler performance information...");
            const response = await axios.get(`http://127.0.0.1:8000/api/history/${pebblerName}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }

    const history: History = await fetchHistory()

    const colorClasses = [classes.master, classes.allstar, classes.professional, classes.learner]

    const data = history.performances.map((perf: PerformanceSummary) => ({
        date: new Date(perf.year, perf.month - 1, 1).toLocaleString('default', { month: 'short', year: 'numeric' }),
        Pebbles: perf.pebbles,
        Division: perf.division,
        Rank: perf.rank,
    }));

    return (
        <>
            <Stack mt="md">
                <Center>
                    <ScrollArea h={310}>
                        <LineChart
                            h={300}
                            w={1000}
                            p={10}
                            data={data}
                            dataKey="date"
                            xAxisProps={{ angle: -45 }}
                            series={[
                                { name: 'Pebbles', color: "orange" },
                                { name: 'Rank', color: "transparent" },
                                { name: 'Division', color: "transparent" },
                            ]}
                        />
                    </ScrollArea>
                </Center>
                <Flex wrap="wrap" align="center" justify="space-evenly">
                    <DonutChart
                        size={300}
                        strokeWidth={2}
                        thickness={40}
                        tooltipDataSource="segment"
                        data={[
                            { name: 'Master', value: history.distribution.masters, color: colorMap['Master'] },
                            { name: 'All-Star', value: history.distribution.all_stars, color: colorMap['All-Star'] },
                            { name: 'Professional', value: history.distribution.professionals, color: colorMap['Professional'] },
                            { name: 'Learner', value: history.distribution.learners, color: colorMap['Learner'] },
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
            </Stack>
        </>
    )
}