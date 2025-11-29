"use client"

import { FC } from "react";
import { PersonalPebbler } from "@/types/pebblers";
import { Card, Stack, Image, Flex, Title, Text, Badge, Tooltip } from "@mantine/core";
import { toCamelCase } from "@/functions";
import { traitMap, quirkMap, abilityMap, colorMap, divisions } from "@/vars";
import { theme } from "@/theme";
import classes from "./Pebbler.module.css";

export const OverviewCard: FC<{ pebbler: PersonalPebbler, hideText?: boolean, hideDescription?: boolean }> = ({ pebbler, hideText, hideDescription }) => {
    const TraitIcon = traitMap[pebbler.trait]
    const QuirkIcon = quirkMap[pebbler.quirk]
    const AbilityIcon = abilityMap[pebbler.ability]

    const DescriptionLine: FC<{ description: string }> = ({ description }) => {
        for (let i = 0; i < divisions.length; i++) {
            if (description.indexOf(divisions[i]) === 0) {
                return (
                    <Stack h={50} gap={0} align="center" justify="center">
                        <Badge w={125} color={colorMap[divisions[i]]}>{divisions[i]}</Badge>
                        {!hideText && <Text>{description.slice(divisions[i].length + 1)}</Text>}
                    </Stack>
                )
            }
        }
        return (
            <Stack h={50} justify="center">
                <Text size={description.length < 5 ? "xl" : "md"}>{description}</Text>
            </Stack>
        )
    }

    return (
        <Stack w={180} h={hideDescription ? 275 : 325} align="center">
            <Card
                w={180}
                h={250}
                radius="md"
                withBorder
                onClick={() => window.location.href = `/pebblers/${toCamelCase(pebbler.name)}`}
                className={`${classes.cursorPointer} ${classes.orangeHover}`}
            >
                <Stack gap="xs" align="center" mb="xl">
                    <Title order={4}>
                        {pebbler.name}
                    </Title>
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
                            color={theme.colors!.purple![6]}
                            transitionProps={{ transition: 'fade-up', duration: 300 }}
                        >
                            <QuirkIcon color={theme.colors!.purple![6]} />
                        </Tooltip>
                        <Tooltip
                            label={pebbler.ability}
                            color={theme.colors!.pink![6]}
                            transitionProps={{ transition: 'fade-up', duration: 300 }}
                        >
                            <AbilityIcon color={theme.colors!.pink![6]} />
                        </Tooltip>
                    </Flex>
                </Stack >
            </Card >
            {!hideDescription && <DescriptionLine description={pebbler.description} />}
        </Stack>

    )
}