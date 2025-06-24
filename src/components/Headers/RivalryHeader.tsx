"use client"

import { FC } from "react";
import { Flex, Container, Stack, Image, Title } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import { SearchableSelect } from "./SearchableSelect";
import { toCamelCase } from "@/functions"
import classes from "./Header.module.css";
import { RivalryPebbles, RivalryResults } from "@/types/stats";

export const RivalryHeader: FC<{
    pebblerOne: string,
    pebblerTwo: string,
    rp: RivalryPebbles,
    rr: RivalryResults,
    toggleOneAction: (a: string) => void,
    toggleTwoAction: (a: string) => void,
}> = (
    {
        pebblerOne,
        pebblerTwo,
        rp,
        rr,
        toggleOneAction,
        toggleTwoAction,
    }) => {
        return (
            <Container fluid className={classes.header} pt="md">
                <Flex justify="space-evenly" align="center">
                    <Stack>
                        <Image
                            src={"/pebblers/" + toCamelCase(pebblerOne) + ".png"}
                            alt={"Image of " + toCamelCase(pebblerOne) + " the pebbler"}
                            width={300}
                            height={300}
                        />
                        <SearchableSelect
                            defaultValue={pebblerOne}
                            disabledName={pebblerTwo}
                            setParentAction={toggleOneAction}
                        />
                    </Stack>
                    <Stack align="center">
                        <Stack align="center">
                            <Title order={1}>Pebble Breakdown</Title>
                            <Flex gap="md">
                                <Title order={3} c="goodGreen">{rp.one_score}</Title>
                                <Title order={3}>-</Title>
                                <Title order={3} c="alarmRed">{rp.two_score}</Title>
                            </Flex>
                            <Stack h={75}>
                                <DonutChart
                                    startAngle={180}
                                    endAngle={0}
                                    size={150}
                                    strokeWidth={0}
                                    thickness={25}
                                    withTooltip={false}
                                    data={[
                                        { name: pebblerOne, value: rp.one_score, color: "goodGreen" },
                                        { name: pebblerTwo, value: rp.two_score, color: "alarmRed" },
                                    ]}
                                />
                            </Stack>
                        </Stack>


                        <Stack align="center" mb="xl">
                            <Title order={1}>Result Breakdown</Title>
                            <Flex gap="md">
                                <Title order={3} c="goodGreen">{rr.one_wins}</Title>
                                <Title order={3}>-</Title>
                                <Title order={3} c="midBlue">{rr.ties}</Title>
                                <Title order={3}>-</Title>
                                <Title order={3} c="alarmRed">{rr.two_wins}</Title>
                            </Flex>
                            <Stack h={75}>
                                <DonutChart
                                    startAngle={180}
                                    endAngle={0}
                                    size={150}
                                    strokeWidth={0}
                                    thickness={25}
                                    withTooltip={false}
                                    data={[
                                        { name: pebblerOne, value: rr.one_wins, color: "goodGreen" },
                                        { name: "ties", value: rr.ties, color: "midBlue" },
                                        { name: pebblerTwo, value: rr.two_wins, color: "alarmRed" },
                                    ]}
                                />
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack>
                        <Image
                            src={"/pebblers/" + toCamelCase(pebblerTwo) + ".png"}
                            alt={"Image of " + toCamelCase(pebblerTwo) + " the pebbler"}
                            width={300}
                            height={300}
                            className={classes.flipY}
                        />
                        <SearchableSelect
                            defaultValue={pebblerTwo}
                            disabledName={pebblerOne}
                            setParentAction={toggleTwoAction}
                            flip
                        />
                    </Stack>
                </Flex>
            </Container>
        )
    }