"use client"

import { FC } from "react"
import { ComplicatedBout } from "@/types/bouts"
import { Anchor, Card, Center, Flex, Image, rem, Stack, Text, Title, Tooltip } from "@mantine/core"
import { toCamelCase } from "@/functions/pebblers"
import { abilityActionMap, abilityDescMap, abilityMap, colorMap, quirkDescMap, quirkMap, quirkMultMap, traitDescMap, traitMap } from "@/vars"
import classes from "./Bout.module.css";

export const FullBout: FC<{ bout: ComplicatedBout }> = ({ bout }) => {
    const awayPebbler = bout.away
    const homePebbler = bout.home

    const bullets = [
        `${awayPebbler.name} rolled a ${bout.away_roll} with a ${awayPebbler.trait} die`,
        `${homePebbler.name} rolled a ${bout.home_roll} with a ${homePebbler.trait} die`,
        `${bout.away_roll} - ${bout.home_roll}`,
    ]

    const quirkPebbles = quirkMultMap[bout.division]
    const AwayTraitIcon = traitMap[awayPebbler.trait]
    const HomeTraitIcon = traitMap[homePebbler.trait]
    const AwayQuirkIcon = quirkMap[awayPebbler.quirk]
    const HomeQuirkIcon = quirkMap[homePebbler.quirk]
    const AwayAbilityIcon = abilityMap[awayPebbler.ability]
    const HomeAbilityIcon = abilityMap[homePebbler.ability]
    const awayNet = bout.away_score - (bout.away_quirk ? quirkPebbles : 0)
    const homeNet = bout.home_score - (bout.home_quirk ? quirkPebbles : 0)
    let awayResult = ""
    let homeResult = ""

    if (bout.away_roll_final !== null && bout.home_roll_final !== null) {
        if (bout.away_roll_final > bout.home_roll_final) {
            awayResult = "winning"
        }
        else if (bout.away_roll_final < bout.home_roll_final) {
            homeResult = "winning"
        }
        else {
            awayResult = "drawing"
            homeResult = "drawing"
        }
    }

    const finished = awayResult !== "" || homeResult !== ""

    const DoneBlock = () => (
        <Stack w={550} gap="xs">
            <Flex justify="flex-start" gap={rem(4)}>
                <Text span>{awayPebbler.name} rolls a {bout.away_roll} with</Text>
                <Flex gap={rem(4)}>
                    <AwayTraitIcon color={colorMap[awayPebbler.trait]} />
                    {awayPebbler.trait}
                </Flex>
            </Flex>

            <Flex justify="flex-end" gap={rem(4)}>
                <Text span>{homePebbler.name} rolls a {bout.home_roll} with</Text>
                <Flex gap={rem(4)}>
                    <HomeTraitIcon color={colorMap[homePebbler.trait]} />
                    {homePebbler.trait}
                </Flex>
            </Flex>

            <Text ta="center" size="xl">{bout.away_roll}-{bout.home_roll}</Text>

            {bout.away_quirk &&
                <Flex justify="flex-start" gap={rem(4)}>
                    <Text span>{awayPebbler.name} gains {quirkPebbles} pebble{quirkPebbles !== 1 ? "s " : " "} with</Text>
                    <Flex gap={rem(4)}>
                        <AwayQuirkIcon color="purple" />
                        {awayPebbler.quirk}
                    </Flex>
                </Flex>
            }

            {bout.home_quirk &&
                <Flex justify="flex-end" gap={rem(4)}>
                    <Text span>{homePebbler.name} gains {quirkPebbles} pebble{quirkPebbles !== 1 ? "s " : " "} with</Text>
                    <Flex gap={rem(4)}>
                        <HomeQuirkIcon color="purple" />
                        {homePebbler.quirk}
                    </Flex>
                </Flex>
            }

            {bout.away_ability &&
                <>
                    <Flex justify="flex-start" gap={rem(4)}>
                        <Text span>{awayPebbler.name} {abilityActionMap[awayPebbler.ability]} with</Text>
                        <Flex gap={rem(4)}>
                            <AwayAbilityIcon color="pink" />
                            {awayPebbler.ability}
                        </Flex>
                    </Flex>
                    {/* Generosity does not change rolls so do not display them again */}
                    {awayPebbler.ability !== "Generosity" && <Text ta="center" size="xl">{bout.away_roll_half}-{bout.home_roll_half}</Text>}
                </>
            }

            {bout.home_ability &&
                <>
                    <Flex justify="flex-end" gap={rem(4)}>
                        <Text span>{homePebbler.name} {abilityActionMap[homePebbler.ability]} with</Text>
                        <Flex gap={rem(4)}>
                            <HomeAbilityIcon color="pink" />
                            {homePebbler.ability}
                        </Flex>
                    </Flex>
                    {/* Generosity does not change rolls so do not display them again */}
                    {homePebbler.ability !== "Generosity" && <Text ta="center" size="xl">{bout.away_roll_final}-{bout.home_roll_final}</Text>}
                </>
            }

            {awayNet > 0 && <Text ta="left">{awayPebbler.name} gains {awayNet} pebbles from {awayResult}</Text>}
            {homeNet > 0 && <Text ta="right">{homePebbler.name} gains {homeNet} pebbles from {homeResult}</Text>}

        </Stack>
    )

    const PreviewBlock = () => (
        <Stack w={550} gap="xl">
            <Flex justify="space-between">
                <Text span size="xl" >{awayPebbler.name}</Text>
                <Text span size="xl">vs.</Text>
                <Text span size="xl" >{homePebbler.name}</Text>
            </Flex>
            <Flex justify="space-between">
                <Tooltip label={traitDescMap[awayPebbler.trait]} color={colorMap[awayPebbler.trait]}>
                    <Flex gap={rem(4)}>
                        <AwayTraitIcon color={colorMap[awayPebbler.trait]} />
                        {awayPebbler.trait}
                    </Flex>
                </Tooltip>
                <Tooltip label={traitDescMap[homePebbler.trait]} color={colorMap[homePebbler.trait]}>
                    <Flex gap={rem(4)}>
                        <HomeTraitIcon color={colorMap[homePebbler.trait]} />
                        {homePebbler.trait}
                    </Flex>
                </Tooltip>

            </Flex>
            <Flex justify="space-between">
                <Tooltip label={quirkDescMap[awayPebbler.quirk]} color="purple">
                    <Flex gap={rem(4)}>
                        <AwayQuirkIcon color="purple" />
                        {awayPebbler.quirk}
                    </Flex>
                </Tooltip>
                <Tooltip label={quirkDescMap[homePebbler.quirk]} color="purple">
                    <Flex gap={rem(4)}>
                        <HomeQuirkIcon color="purple" />
                        {homePebbler.quirk}
                    </Flex>
                </Tooltip>
            </Flex>
            <Flex justify="space-between">
                <Tooltip label={abilityDescMap[awayPebbler.ability]} color="pink">
                    <Flex gap={rem(4)}>
                        <AwayAbilityIcon color="pink" />
                        {awayPebbler.ability}
                    </Flex>
                </Tooltip>
                <Tooltip label={abilityDescMap[homePebbler.ability]} color="pink">
                    <Flex gap={rem(4)}>
                        <HomeAbilityIcon color="pink" />
                        {homePebbler.ability}
                    </Flex>
                </Tooltip>
            </Flex>
        </Stack>
    )

    return (
        <Card w={1000} radius="md" withBorder style={{ minHeight: 300 }} bg="orange">
            <Center>
                <Stack align="center" gap={rem(4)} mb="lg">
                    <Flex gap="md">
                        <Anchor href={`/pebblers/${toCamelCase(awayPebbler.name)}`} c="black" underline="hover">
                            <Title order={2} w={200} ta="right">{awayPebbler.name}</Title>
                        </Anchor>
                        <Title order={2}>@</Title>
                        <Anchor href={`/pebblers/${toCamelCase(homePebbler.name)}`} c="black" underline="hover">
                            <Title order={2} w={200} ta="left">{homePebbler.name}</Title>
                        </Anchor>
                    </Flex>
                    <Flex gap="lg">
                        <Title ta="right" w={200} order={4} c={colorMap[bout.division]}>{bout.division}</Title>
                        <Title ta="left" w={200} order={4}>
                            {"     "}{bout.month.toString().padStart(2, "0")}/{bout.day.toString().padStart(2, "0")}/{bout.year}
                        </Title>
                    </Flex>
                </Stack>
            </Center>
            <Flex align="center" justify="space-between" style={{ minHeight: 300 }}>
                <Stack align="center">
                    <Image
                        onClick={() => window.location.href = `/pebblers/${toCamelCase(awayPebbler.name)}`}
                        src={"/pebblers/" + toCamelCase(awayPebbler.name) + ".png"}
                        alt={"Image of " + awayPebbler.name + " the pebbler"}
                        h={200}
                        w={200}
                    />
                </Stack>
                {finished ? <DoneBlock /> : <PreviewBlock />}
                <Stack align="center">
                    <Image
                        className={classes.flipY}
                        onClick={() => window.location.href = `/pebblers/${toCamelCase(homePebbler.name)}`}
                        src={"/pebblers/" + toCamelCase(homePebbler.name) + ".png"}
                        alt={"Image of " + homePebbler.name + " the pebbler"}
                        h={200}
                        w={200}
                    />
                </Stack>
            </Flex>
        </Card>
    )
}