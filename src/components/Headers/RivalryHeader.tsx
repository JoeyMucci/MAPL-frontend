"use client"

import { FC } from "react";
import { Anchor, Badge, Flex, Container, Stack, Image, Title, rem } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import { SearchableSelect } from "./SearchableSelect";
import { toCamelCase } from "@/functions"
import { RivalryPebbles, RivalryResults } from "@/types/stats";
import { divisions, colorMap } from "@/vars";
import classes from "./Header.module.css";

export const RivalryHeader: FC<{
    pebblerOne: string,
    pebblerTwo: string,
    rp: { [division: string]: RivalryPebbles },
    rr: { [division: string]: RivalryResults },
    toggleOneAction: (a: string) => void,
    toggleTwoAction: (a: string) => void,
    largeScreen: boolean,
}> = (
    {
        pebblerOne,
        pebblerTwo,
        rp,
        rr,
        toggleOneAction,
        toggleTwoAction,
        largeScreen,
    }) => {
        // Totals across the divisions
        let one_score = 0
        let two_score = 0
        let one_wins = 0
        let two_wins = 0
        let ties = 0
        const validDivisions: string[] = []

        divisions.forEach((division, _) => {
            one_score += rp[division]?.one_score
            two_score += rp[division]?.two_score
            one_wins += rr[division]?.one_wins
            two_wins += rr[division]?.two_wins
            ties += rr[division]?.ties
            if (rp[division]?.one_score + rp[division]?.two_score > 0) {
                validDivisions.push(division)
            }
        })


        const MiddleBlock = () => (
            <Stack align="center" gap="xl">
                <Stack align="center">
                    <Title ta="center" order={1}>Pebble Breakdown</Title>
                    <Flex gap="md">
                        <Title order={3} c="goodGreen">{one_score}</Title>
                        <Title order={3}>-</Title>
                        <Title order={3} c="alarmRed">{two_score}</Title>
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
                                { name: pebblerOne, value: one_score, color: "goodGreen" },
                                { name: pebblerTwo, value: two_score, color: "alarmRed" },
                            ]}
                        />
                    </Stack>

                    {largeScreen ? (
                        Array.from({ length: Math.ceil(validDivisions.length / 2) }).map((_, rowIdx) => (
                            <Flex key={rowIdx} gap="md">
                                {validDivisions.slice(rowIdx * 2, rowIdx * 2 + 2).map((division, colIdx) => (
                                    <Stack key={colIdx} align="center" gap={rem(0)}>
                                        <Badge w={125} color={colorMap[division]}>{division}</Badge>
                                        <Flex gap="md">
                                            <Title order={6} c="goodGreen">{rp[division].one_score}</Title>
                                            <Title order={6}>-</Title>
                                            <Title order={6} c="alarmRed">{rp[division].two_score}</Title>
                                        </Flex>
                                    </Stack>
                                ))}
                            </Flex>
                        ))
                    ) : (
                        validDivisions.map((division, i) => (
                            <Stack key={i} align="center" gap={rem(0)}>
                                <Badge w={125} color={colorMap[division]}>{division}</Badge>
                                <Flex gap="md">
                                    <Title order={6} c="goodGreen">{rp[division].one_score}</Title>
                                    <Title order={6}>-</Title>
                                    <Title order={6} c="alarmRed">{rp[division].two_score}</Title>
                                </Flex>
                            </Stack>
                        ))
                    )}
                </Stack>

                <Stack align="center">
                    <Title ta="center" order={1}>Result Breakdown</Title>
                    <Flex gap="md">
                        <Title order={3} c="goodGreen">{one_wins}</Title>
                        <Title order={3}>-</Title>
                        <Title order={3} c="midBlue">{ties}</Title>
                        <Title order={3}>-</Title>
                        <Title order={3} c="alarmRed">{two_wins}</Title>
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
                                { name: pebblerOne, value: one_wins, color: "goodGreen" },
                                { name: "ties", value: ties, color: "midBlue" },
                                { name: pebblerTwo, value: two_wins, color: "alarmRed" },
                            ]}
                        />
                    </Stack>
                    {largeScreen ? (
                        Array.from({ length: Math.ceil(validDivisions.length / 2) }).map((_, rowIdx) => (
                            <Flex key={rowIdx} gap="md">
                                {validDivisions.slice(rowIdx * 2, rowIdx * 2 + 2).map((division, colIdx) => (
                                    <Stack key={colIdx} align="center" gap={rem(0)}>
                                        <Badge w={125} color={colorMap[division]}>{division}</Badge>
                                        <Flex gap="md">
                                            <Title order={6} c="goodGreen">{rr[division].one_wins}</Title>
                                            <Title order={6}>-</Title>
                                            <Title order={6} c="midBlue">{rr[division].ties}</Title>
                                            <Title order={6}>-</Title>
                                            <Title order={6} c="alarmRed">{rr[division].two_wins}</Title>
                                        </Flex>
                                    </Stack>
                                ))}
                            </Flex>
                        ))
                    ) : (
                        validDivisions.map((division, i) => (
                            <Stack key={i} align="center" gap={rem(0)}>
                                <Badge w={125} color={colorMap[division]}>{division}</Badge>
                                <Flex gap="md">
                                    <Title order={6} c="goodGreen">{rr[division].one_wins}</Title>
                                    <Title order={6}>-</Title>
                                    <Title order={6} c="midBlue">{rr[division].ties}</Title>
                                    <Title order={6}>-</Title>
                                    <Title order={6} c="alarmRed">{rr[division].two_wins}</Title>
                                </Flex>
                            </Stack>
                        ))
                    )}
                </Stack >
            </Stack >
        )

        const SearchBlock: FC<{ pebbler: string, opp: string, left: boolean }> = ({ pebbler, opp, left }) => (
            <Stack>
                <Anchor href={`/pebblers/${toCamelCase(pebbler)}`}>
                    <Image
                        src={"/pebblers/" + toCamelCase(pebbler) + ".png"}
                        alt={"Image of " + toCamelCase(pebbler) + " the pebbler"}
                        w="auto"
                        h={300}
                        className={left ? "" : classes.flipY}
                    />
                </Anchor>
                <SearchableSelect
                    defaultValue={pebbler}
                    disabledName={opp}
                    setParentAction={left ? toggleOneAction : toggleTwoAction}
                    flip={!left}
                />
            </Stack>
        )

        return (
            <Container fluid className={classes.header} pt="md" pb="md">
                {largeScreen ? (
                    <Flex justify="space-evenly" align="center">
                        <SearchBlock pebbler={pebblerOne} opp={pebblerTwo} left={true} />
                        {one_score + two_score > 0 && <MiddleBlock />}
                        <SearchBlock pebbler={pebblerTwo} opp={pebblerOne} left={false} />
                    </Flex>
                ) : (
                    <Stack align="center">
                        <SearchBlock pebbler={pebblerOne} opp={pebblerTwo} left={true} />
                        {one_score + two_score > 0 && <MiddleBlock />}
                        <SearchBlock pebbler={pebblerTwo} opp={pebblerOne} left={false} />
                    </Stack>
                )}
            </Container>
        )
    }