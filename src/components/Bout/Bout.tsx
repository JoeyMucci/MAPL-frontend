"use client"

import { FC } from "react";
import { Anchor, Badge, Card, CardSection, Flex, Radio, Stack, Text, Image, Tooltip } from "@mantine/core"
import { SimpleBout } from "@/types/bouts";
import { SimplePebbler } from "@/types/pebblers";
import { SimplePebblerStats } from "@/types/stats";
import { colorMap, divisions } from "@/vars";
import { toCamelCase } from "@/functions";
import classes from "./Bout.module.css";

interface BoutLineProps {
    pebbler: SimplePebbler;
    stats: SimplePebblerStats;
    hasBoutOccurred: boolean;
    bottom: boolean;
}

export const Bout: FC<{ bout: SimpleBout, showDate?: boolean }> = ({ bout, showDate }) => {
    const BoutLine: FC<BoutLineProps> = ({ pebbler, stats, hasBoutOccurred, bottom }) => {
        return (
            <Flex justify="space-between">
                <Flex gap="xs" align="center">
                    <Image
                        ml={12}
                        src={"/pebblers/" + toCamelCase(pebbler.name) + ".png"}
                        alt={"Image of " + pebbler.name + " the pebbler"}
                        h={25}
                        w={25}
                    />
                    <Anchor href={`/pebblers/${toCamelCase(pebbler.name)}`} c="black" underline="hover">
                        <Text span size="sm" >{pebbler.name}</Text>
                    </Anchor>
                </Flex>

                {hasBoutOccurred && (
                    <Flex gap="xs" align="center">
                        <Tooltip
                            label={stats.quirk_activated ? "Quirk Activated" : ""}
                            color={stats.quirk_activated ? "purple" : "transparent"}
                            position={bottom ? "bottom" : "top"}
                            transitionProps={bottom ? { transition: 'fade-down', duration: 300 } : { transition: 'fade-up', duration: 300 }}
                        >
                            <Radio color="purple" iconColor="purple" size="xs" checked={stats.quirk_activated} readOnly />
                        </Tooltip>
                        {bout.division !== divisions[divisions.length - 1] && (
                            <Tooltip
                                label={stats.ability_triggered ? "Ability Triggered" : ""}
                                color={stats.ability_triggered ? "pink" : "transparent"}
                                position={bottom ? "bottom" : "top"}
                                transitionProps={bottom ? { transition: 'fade-down', duration: 300 } : { transition: 'fade-up', duration: 300 }}
                            >
                                <Radio color="pink" iconColor="pink" size="xs" checked={stats.ability_triggered} readOnly />
                            </Tooltip>
                        )}
                        <Text w={5} span size="sm">{stats.roll_final}</Text>
                        <Text w={25} span size="sm">{"+"}{stats.score}</Text>
                    </Flex>
                )}
            </Flex>
        )
    }

    const awayStats: SimplePebblerStats = {
        quirk_activated: bout.away_quirk,
        ability_triggered: bout.away_ability,
        roll_final: bout.away_roll_final,
        score: bout.away_score,
    }

    const homeStats: SimplePebblerStats = {
        quirk_activated: bout.home_quirk,
        ability_triggered: bout.home_ability,
        roll_final: bout.home_roll_final,
        score: bout.home_score,
    }

    const hasTimePassed: boolean = new Date(bout.time).getTime() < Date.now();
    const hasBoutOccurred: boolean = bout.away_roll_final !== null && bout.home_roll_final !== null;
    let timeDisplay: string = ""
    timeDisplay = hasTimePassed ? (hasBoutOccurred ? "FINAL" : "LIVE 🔴") :
        new Date(bout.time).toLocaleTimeString([], {
            hour: "2-digit", minute: "2-digit",
        })

    if (showDate) {
        timeDisplay = new Date(bout.time).toLocaleDateString([], {
            month: "2-digit", day: "2-digit", year: "2-digit",
        })
    }

    return (
        <Card
            w={250}
            radius="lg"
            onClick={() => window.location.href = `/bouts/${bout.id}`}
            className={classes.cursorPointer}
            bg="orange"
        >
            <CardSection>
                <Flex justify={"space-between"} align="center">
                    <Badge w={125} color={colorMap[bout.division]} ml="xs">{bout.division}</Badge>
                    <Text span mr="xs">{timeDisplay}</Text>
                </Flex>
            </CardSection>

            <CardSection>
                <Stack gap="sm">
                    <BoutLine
                        pebbler={bout.away}
                        stats={awayStats}
                        hasBoutOccurred={hasBoutOccurred}
                        bottom={false}
                    />
                    <BoutLine
                        pebbler={bout.home}
                        stats={homeStats}
                        hasBoutOccurred={hasBoutOccurred}
                        bottom={true}
                    />
                </Stack>
            </CardSection>
            <CardSection h={3} />
        </Card>
    );
};
