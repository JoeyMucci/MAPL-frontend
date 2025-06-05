import { History } from "@/types/stats";
import { Badge, Stack, Flex, resolveClassNames } from "@mantine/core";
import { DonutChart } from '@mantine/charts';
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

    return (
        <>
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
        </>
    )
}