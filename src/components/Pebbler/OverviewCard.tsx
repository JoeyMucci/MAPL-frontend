"use client"

import { FC } from "react";
import { PersonalPebbler } from "@/types/pebblers";
import { Card, Stack, Image, Flex, Title, Text, Badge, Tooltip } from "@mantine/core";
import { toCamelCase } from "@/functions";
import { traitMap, quirkMap, abilityMap, colorMap, divisions } from "@/vars";
import classes from "./Pebbler.module.css";

export const OverviewCard: FC<{ pebbler: PersonalPebbler }> = ({ pebbler }) => {
    const TraitIcon = traitMap[pebbler.trait]
    const QuirkIcon = quirkMap[pebbler.quirk]
    const AbilityIcon = abilityMap[pebbler.ability]

    const DescriptionLine: FC<{ description: string }> = ({ description }) => {
        for (let i = 0; i < divisions.length; i++) {
            if (description.indexOf(divisions[i]) === 0) {
                return (
                    <Stack h={50} gap={0} align="center" justify="center">
                        <Badge w={125} color={colorMap[divisions[i]]}>{divisions[i]}</Badge>
                        <Text>{description.slice(divisions[i].length + 1)}</Text>
                    </Stack>
                )
            }
        }
        return (
            <Stack h={50} justify="center">
                <Text size="md">{description}</Text>
            </Stack>
        )
    }

    return (
        <Card
            w={180}
            h={300}
            radius="md"
            bg="orange"
            onClick={() => window.location.href = `/pebblers/${toCamelCase(pebbler.name)}`}
            className={classes.cursorPointer}
        >
            <Stack gap="xs" align="center">
                <Title order={4}>
                    {pebbler.name}
                </Title>
                <DescriptionLine description={pebbler.description} />
                <Image
                    src={"/pebblers/" + toCamelCase(pebbler.name) + ".png"}
                    alt={"Image of " + pebbler.name + " the pebbler"}
                    h={150}
                    w={150}
                />
                <Flex gap="xs">
                    <Tooltip
                        label={pebbler.trait}
                        color={colorMap[pebbler.trait]}
                        transitionProps={{ transition: 'fade-up', duration: 300 }}
                    >
                        <TraitIcon color={colorMap[pebbler.trait]} />
                    </Tooltip>
                    <Tooltip
                        label={pebbler.quirk}
                        color="purple"
                        transitionProps={{ transition: 'fade-up', duration: 300 }}
                    >
                        <QuirkIcon color="purple" />
                    </Tooltip>
                    <Tooltip
                        label={pebbler.ability}
                        color="pink"
                        transitionProps={{ transition: 'fade-up', duration: 300 }}
                    >
                        <AbilityIcon color="pink" />
                    </Tooltip>
                </Flex>
            </Stack >
        </Card >
    )
}