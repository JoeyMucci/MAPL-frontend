"use client"

import { FC } from "react"
import { ComplicatedBout } from "@/types/bouts"
import { Anchor, Badge, Card, Center, Flex, Image, rem, Stack, Text, Title, Tooltip } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { toCamelCase } from "@/functions"
import { abilityActionMap, abilityDescMap, abilityMap, abilityMultMap, colorMap, quirkDescMap, quirkMap, quirkMultMap, traitDescMap, traitMap } from "@/vars"
import { theme } from "@/theme"
import classes from "./Bout.module.css";

export const FullBout: FC<{ bout: ComplicatedBout }> = ({ bout }) => {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    const awayPebbler = bout.away
    const homePebbler = bout.home
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
            awayResult = "tying"
            homeResult = "tying"
        }
    }

    const finished = awayResult !== "" || homeResult !== ""

    type AllScoreProps = {
        away_roll: string
        home_roll: string
        away_name: string
        home_name: string
    }

    const AllScore: FC<AllScoreProps> = ({ away_roll, home_roll, away_name, home_name }) => (
        <Center>
            <Flex gap="sm" align="center">
                <Anchor href={`/pebblers/${toCamelCase(away_name)}`}>
                    <Image
                        src={"/pebblers/" + toCamelCase(away_name) + ".png"}
                        alt={"Image of " + away_name + " the pebbler"}
                        h={25}
                        w={25}
                    />
                </Anchor>
                <Text ta="center" size="xl">{away_roll}-{home_roll}</Text>
                <Anchor href={`/pebblers/${toCamelCase(home_name)}`}>
                    <Image
                        className={classes.flipY}
                        src={"/pebblers/" + toCamelCase(home_name) + ".png"}
                        alt={"Image of " + home_name + " the pebbler"}
                        h={25}
                        w={25}
                    />
                </Anchor>
            </Flex>
        </Center>
    )

    const AllBlockDone = () => (
        <Stack w={300} gap="xs">
            <Flex justify="flex-start" gap={rem(4)}>
                <Flex gap={rem(4)} align="center">
                    <Anchor href={`/pebblers/${toCamelCase(awayPebbler.name)}`}>
                        <Image
                            src={"/pebblers/" + toCamelCase(awayPebbler.name) + ".png"}
                            alt={"Image of " + awayPebbler.name + " the pebbler"}
                            h={25}
                            w={25}
                        />
                    </Anchor>
                    <Text span>rolls a {bout.away_roll} with</Text>
                </Flex>

                <Tooltip
                    label={traitDescMap[awayPebbler.trait]}
                    color={colorMap[awayPebbler.trait]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <AwayTraitIcon color={colorMap[awayPebbler.trait]} />
                        {awayPebbler.trait}
                    </Flex>
                </Tooltip>
            </Flex>

            <Flex justify="flex-end" gap={rem(4)}>
                <Flex gap={rem(4)} align="center">
                    <Anchor href={`/pebblers/${toCamelCase(homePebbler.name)}`}>
                        <Image
                            className={classes.flipY}
                            src={"/pebblers/" + toCamelCase(homePebbler.name) + ".png"}
                            alt={"Image of " + homePebbler.name + " the pebbler"}
                            h={25}
                            w={25}
                        />
                    </Anchor>
                    <Text span>rolls a {bout.home_roll} with</Text>
                </Flex>

                <Tooltip
                    label={traitDescMap[homePebbler.trait]}
                    color={colorMap[homePebbler.trait]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <HomeTraitIcon color={colorMap[homePebbler.trait]} />
                        {homePebbler.trait}
                    </Flex>
                </Tooltip>
            </Flex>

            <AllScore
                away_roll={bout.away_roll!.toString()}
                home_roll={bout.home_roll!.toString()}
                away_name={awayPebbler.name}
                home_name={homePebbler.name}
            />

            {bout.away_quirk &&
                <Flex justify="flex-start" gap={rem(4)}>
                    <Flex gap={rem(4)} align="center">
                        <Anchor href={`/pebblers/${toCamelCase(awayPebbler.name)}`}>
                            <Image
                                src={"/pebblers/" + toCamelCase(awayPebbler.name) + ".png"}
                                alt={"Image of " + awayPebbler.name + " the pebbler"}
                                h={25}
                                w={25}
                            />
                        </Anchor>
                        <Text span>+{quirkPebbles} with</Text>
                    </Flex>

                    <Tooltip
                        label={quirkDescMap[awayPebbler.quirk]}
                        color={theme.colors!.purple![6]}
                        transitionProps={{ transition: 'fade-up', duration: 300 }}

                    >
                        <Flex gap={rem(4)}>
                            <AwayQuirkIcon color={theme.colors!.purple![6]} />
                            {awayPebbler.quirk}
                        </Flex>
                    </Tooltip>
                </Flex>
            }

            {bout.home_quirk &&
                <Flex justify="flex-end" gap={rem(4)}>
                    <Flex gap={rem(4)} align="center">
                        <Anchor href={`/pebblers/${toCamelCase(homePebbler.name)}`}>
                            <Image
                                className={classes.flipY}
                                src={"/pebblers/" + toCamelCase(homePebbler.name) + ".png"}
                                alt={"Image of " + homePebbler.name + " the pebbler"}
                                h={25}
                                w={25}
                            />
                        </Anchor>
                        <Text span>+{quirkPebbles} with</Text>
                    </Flex>

                    <Tooltip
                        label={quirkDescMap[homePebbler.quirk]}
                        color={theme.colors!.purple![6]}
                        transitionProps={{ transition: 'fade-up', duration: 300 }}
                    >
                        <Flex gap={rem(4)}>
                            <HomeQuirkIcon color={theme.colors!.purple![6]} />
                            {homePebbler.quirk}
                        </Flex>
                    </Tooltip>
                </Flex>
            }

            {bout.away_ability &&
                <>
                    <Flex justify="flex-start" gap={rem(4)}>
                        <Flex gap={rem(4)} align="center">
                            <Anchor href={`/pebblers/${toCamelCase(awayPebbler.name)}`}>
                                <Image
                                    src={"/pebblers/" + toCamelCase(awayPebbler.name) + ".png"}
                                    alt={"Image of " + awayPebbler.name + " the pebbler"}
                                    h={25}
                                    w={25}
                                />
                            </Anchor>
                            <Text span>triggers </Text>
                        </Flex>

                        <Tooltip
                            label={abilityDescMap[awayPebbler.ability]}
                            color={theme.colors!.pink![6]}
                            transitionProps={{ transition: 'fade-up', duration: 300 }}
                        >
                            <Flex gap={rem(4)}>
                                <AwayAbilityIcon color={theme.colors!.pink![6]} />
                                {awayPebbler.ability}
                            </Flex>
                        </Tooltip>
                    </Flex>
                    {/* Generosity does not change rolls so do not display them again */}
                    {awayPebbler.ability !== "Generosity" && (
                        <AllScore
                            away_roll={bout.away_roll_half!.toString()}
                            home_roll={bout.home_roll_half!.toString()}
                            away_name={awayPebbler.name}
                            home_name={homePebbler.name}
                        />
                    )}
                </>
            }

            {bout.home_ability &&
                <>
                    <Flex justify="flex-end" gap={rem(4)}>
                        <Flex gap={rem(4)} align="center">
                            <Anchor href={`/pebblers/${toCamelCase(homePebbler.name)}`}>
                                <Image
                                    className={classes.flipY}
                                    src={"/pebblers/" + toCamelCase(homePebbler.name) + ".png"}
                                    alt={"Image of " + homePebbler.name + " the pebbler"}
                                    h={25}
                                    w={25}
                                />
                            </Anchor>
                            <Text span>triggers </Text>
                        </Flex>

                        <Tooltip
                            label={abilityDescMap[homePebbler.ability]}
                            color={theme.colors!.pink![6]}
                            transitionProps={{ transition: 'fade-up', duration: 300 }}
                        >
                            <Flex gap={rem(4)}>
                                <HomeAbilityIcon color={theme.colors!.pink![6]} />
                                {homePebbler.ability}
                            </Flex>
                        </Tooltip>
                    </Flex>
                    {/* Generosity does not change rolls so do not display them again */}
                    {homePebbler.ability !== "Generosity" && (
                        <AllScore
                            away_roll={bout.away_roll_final!.toString()}
                            home_roll={bout.home_roll_final!.toString()}
                            away_name={awayPebbler.name}
                            home_name={homePebbler.name}
                        />
                    )}
                </>
            }

            {awayNet > 0 && (
                <Flex gap={rem(4)} align="center" justify="flex-start">
                    <Anchor href={`/pebblers/${toCamelCase(awayPebbler.name)}`}>
                        <Image
                            src={"/pebblers/" + toCamelCase(awayPebbler.name) + ".png"}
                            alt={"Image of " + awayPebbler.name + " the pebbler"}
                            h={25}
                            w={25}
                        />
                    </Anchor>
                    <Text span>+{awayNet} from {awayResult}</Text>
                </Flex>
            )}
            {homeNet > 0 && (
                <Flex gap={rem(4)} align="center" justify="flex-end">
                    <Anchor href={`/pebblers/${toCamelCase(homePebbler.name)}`}>
                        <Image
                            className={classes.flipY}
                            src={"/pebblers/" + toCamelCase(homePebbler.name) + ".png"}
                            alt={"Image of " + homePebbler.name + " the pebbler"}
                            h={25}
                            w={25}
                        />
                    </Anchor>
                    <Text span>+{homeNet} from {homeResult}</Text>
                </Flex>
            )}

        </Stack>
    )

    const AllBlockPreview = () => (
        <Stack w={300} gap="xl">
            <Flex justify="space-between">
                <Image
                    src={"/pebblers/" + toCamelCase(awayPebbler.name) + ".png"}
                    alt={"Image of " + awayPebbler.name + " the pebbler"}
                    h={50}
                    w={50}
                />
                <Image
                    className={classes.flipY}
                    src={"/pebblers/" + toCamelCase(homePebbler.name) + ".png"}
                    alt={"Image of " + homePebbler.name + " the pebbler"}
                    h={50}
                    w={50}
                />
            </Flex>
            <Flex justify="space-between">
                <Tooltip
                    label={traitDescMap[awayPebbler.trait]}
                    color={colorMap[awayPebbler.trait]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Stack gap={rem(4)} align="center">
                        <AwayTraitIcon color={colorMap[awayPebbler.trait]} />
                        {awayPebbler.trait}
                    </Stack>
                </Tooltip>
                <Tooltip
                    label={traitDescMap[homePebbler.trait]}
                    color={colorMap[homePebbler.trait]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Stack gap={rem(4)} align="center">
                        <HomeTraitIcon color={colorMap[homePebbler.trait]} />
                        {homePebbler.trait}
                    </Stack>
                </Tooltip>

            </Flex>
            <Flex justify="space-between">
                <Tooltip
                    label={quirkDescMap[awayPebbler.quirk]}
                    color={theme.colors!.purple![6]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Stack gap={rem(4)} align="center">
                        <AwayQuirkIcon color={theme.colors!.purple![6]} />
                        {awayPebbler.quirk}
                    </Stack>
                </Tooltip>
                <Tooltip
                    label={quirkDescMap[homePebbler.quirk]}
                    color={theme.colors!.purple![6]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Stack gap={rem(4)} align="center">
                        <HomeQuirkIcon color={theme.colors!.purple![6]} />
                        {homePebbler.quirk}
                    </Stack>
                </Tooltip>
            </Flex>
            <Flex justify="space-between">
                <Tooltip
                    label={abilityDescMap[awayPebbler.ability]}
                    color={theme.colors!.pink![6]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Stack gap={rem(4)} align="center">
                        <AwayAbilityIcon color={theme.colors!.pink![6]} />
                        {awayPebbler.ability}
                    </Stack>
                </Tooltip>
                <Tooltip
                    label={abilityDescMap[homePebbler.ability]}
                    color={theme.colors!.pink![6]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Stack gap={rem(4)} align="center">
                        <HomeAbilityIcon color={theme.colors!.pink![6]} />
                        {homePebbler.ability}
                    </Stack>
                </Tooltip>
            </Flex>
        </Stack>
    )

    const DoneBlock = () => (
        <Stack w={550} gap="xs">
            <Flex justify="flex-start" gap={rem(4)}>
                <Text span>{awayPebbler.name} rolls a {bout.away_roll} with</Text>
                <Tooltip
                    label={traitDescMap[awayPebbler.trait]}
                    color={colorMap[awayPebbler.trait]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <AwayTraitIcon color={colorMap[awayPebbler.trait]} />
                        {awayPebbler.trait}
                    </Flex>
                </Tooltip>
            </Flex>

            <Flex justify="flex-end" gap={rem(4)}>
                <Text span>{homePebbler.name} rolls a {bout.home_roll} with</Text>
                <Tooltip
                    label={traitDescMap[homePebbler.trait]}
                    color={colorMap[homePebbler.trait]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <HomeTraitIcon color={colorMap[homePebbler.trait]} />
                        {homePebbler.trait}
                    </Flex>
                </Tooltip>
            </Flex>

            <Text ta="center" size="xl">{bout.away_roll}-{bout.home_roll}</Text>

            {bout.away_quirk &&
                <Flex justify="flex-start" gap={rem(4)}>
                    <Text span>{awayPebbler.name} gains {quirkPebbles} pebble{quirkPebbles !== 1 ? "s " : " "} with</Text>
                    <Tooltip
                        label={quirkDescMap[awayPebbler.quirk]}
                        color={theme.colors!.purple![6]}
                        transitionProps={{ transition: 'fade-up', duration: 300 }}

                    >
                        <Flex gap={rem(4)}>
                            <AwayQuirkIcon color={theme.colors!.purple![6]} />
                            {awayPebbler.quirk}
                        </Flex>
                    </Tooltip>
                </Flex>
            }

            {bout.home_quirk &&
                <Flex justify="flex-end" gap={rem(4)}>
                    <Text span>{homePebbler.name} gains {quirkPebbles} pebble{quirkPebbles !== 1 ? "s " : " "} with</Text>
                    <Tooltip
                        label={quirkDescMap[homePebbler.quirk]}
                        color={theme.colors!.purple![6]}
                        transitionProps={{ transition: 'fade-up', duration: 300 }}
                    >
                        <Flex gap={rem(4)}>
                            <HomeQuirkIcon color={theme.colors!.purple![6]} />
                            {homePebbler.quirk}
                        </Flex>
                    </Tooltip>
                </Flex>
            }

            {bout.away_ability &&
                <>
                    <Flex justify="flex-start" gap={rem(4)}>
                        <Text span>{awayPebbler.name} {abilityActionMap[awayPebbler.ability]} with</Text>
                        <Tooltip
                            label={abilityDescMap[awayPebbler.ability]}
                            color={theme.colors!.pink![6]}
                            transitionProps={{ transition: 'fade-up', duration: 300 }}
                        >
                            <Flex gap={rem(4)}>
                                <AwayAbilityIcon color={theme.colors!.pink![6]} />
                                {awayPebbler.ability}
                            </Flex>
                        </Tooltip>
                    </Flex>
                    {/* Generosity does not change rolls so do not display them again */}
                    {awayPebbler.ability !== "Generosity" && <Text ta="center" size="xl">{bout.away_roll_half}-{bout.home_roll_half}</Text>}
                </>
            }

            {bout.home_ability &&
                <>
                    <Flex justify="flex-end" gap={rem(4)}>
                        <Text span>{homePebbler.name} {abilityActionMap[homePebbler.ability]} with</Text>
                        <Tooltip
                            label={abilityDescMap[homePebbler.ability]}
                            color={theme.colors!.pink![6]}
                            transitionProps={{ transition: 'fade-up', duration: 300 }}
                        >
                            <Flex gap={rem(4)}>
                                <HomeAbilityIcon color={theme.colors!.pink![6]} />
                                {homePebbler.ability}
                            </Flex>
                        </Tooltip>
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
                <Tooltip
                    label={traitDescMap[awayPebbler.trait]}
                    color={colorMap[awayPebbler.trait]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <AwayTraitIcon color={colorMap[awayPebbler.trait]} />
                        {awayPebbler.trait}
                    </Flex>
                </Tooltip>
                <Tooltip
                    label={traitDescMap[homePebbler.trait]}
                    color={colorMap[homePebbler.trait]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <HomeTraitIcon color={colorMap[homePebbler.trait]} />
                        {homePebbler.trait}
                    </Flex>
                </Tooltip>

            </Flex>
            <Flex justify="space-between">
                <Tooltip
                    label={quirkDescMap[awayPebbler.quirk]}
                    color={theme.colors!.purple![6]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <AwayQuirkIcon color={theme.colors!.purple![6]} />
                        {awayPebbler.quirk}
                    </Flex>
                </Tooltip>
                <Tooltip
                    label={quirkDescMap[homePebbler.quirk]}
                    color={theme.colors!.purple![6]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <HomeQuirkIcon color={theme.colors!.purple![6]} />
                        {homePebbler.quirk}
                    </Flex>
                </Tooltip>
            </Flex>
            <Flex justify="space-between">
                <Tooltip
                    label={abilityDescMap[awayPebbler.ability]}
                    color={theme.colors!.pink![6]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <AwayAbilityIcon color={theme.colors!.pink![6]} />
                        {awayPebbler.ability}
                    </Flex>
                </Tooltip>
                <Tooltip
                    label={abilityDescMap[homePebbler.ability]}
                    color={theme.colors!.pink![6]}
                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                >
                    <Flex gap={rem(4)}>
                        <HomeAbilityIcon color={theme.colors!.pink![6]} />
                        {homePebbler.ability}
                    </Flex>
                </Tooltip>
            </Flex>
        </Stack>
    )

    if (!largeScreen) {
        return (

            <Card w={300} radius="md" style={{ minHeight: 300 }} bg="orange">
                <Center>
                    <Stack align="center" gap={rem(4)} mb="lg">
                        <Badge w={125} color={colorMap[bout.division]}>{bout.division}</Badge>
                        <Flex gap="sm">
                            <Text size="xs" span c="purple">
                                Quirk Factor={quirkMultMap[bout.division]}
                            </Text>
                            <Text size="xs" span c="pink">
                                Ability Factor={abilityMultMap[bout.division]}
                            </Text>
                        </Flex>
                        <Stack gap="md" align="center">
                            <Flex gap={rem(4)} align="center">
                                <Anchor href={`/pebblers/${toCamelCase(awayPebbler.name)}`}>
                                    <Image
                                        src={"/pebblers/" + toCamelCase(awayPebbler.name) + ".png"}
                                        alt={"Image of " + awayPebbler.name + " the pebbler"}
                                        h={50}
                                        w={50}
                                    />
                                </Anchor>
                                <Anchor href={`/pebblers/${toCamelCase(awayPebbler.name)}`} c="black" underline="hover">
                                    <Title order={2}>{awayPebbler.name}</Title>
                                </Anchor>
                            </Flex>

                            <Title order={2}>@</Title>

                            <Flex gap={rem(4)} align="center">
                                <Anchor href={`/pebblers/${toCamelCase(homePebbler.name)}`}>
                                    <Image
                                        className={classes.flipY}
                                        src={"/pebblers/" + toCamelCase(homePebbler.name) + ".png"}
                                        alt={"Image of " + homePebbler.name + " the pebbler"}
                                        h={50}
                                        w={50}
                                    />
                                </Anchor>
                                <Anchor href={`/pebblers/${toCamelCase(homePebbler.name)}`} c="black" underline="hover">
                                    <Title order={2}>{homePebbler.name}</Title>
                                </Anchor>
                            </Flex>
                        </Stack>
                        <Title ta="left" order={4}>
                            {bout.month.toString()}/{bout.day.toString()}/{bout.year}
                        </Title>
                    </Stack>
                </Center>
                <Center>
                    {finished ? <AllBlockDone /> : <AllBlockPreview />}
                </Center>
            </Card>
        )
    }

    return (
        <Card w={1000} radius="md" style={{ minHeight: 300 }} bg="orange">
            <Center>
                <Stack align="center" gap={rem(4)} mb="lg">
                    <Badge w={125} color={colorMap[bout.division]}>{bout.division}</Badge>
                    <Flex gap="sm">
                        <Text size="xs" span c="purple">
                            Quirk Factor={quirkMultMap[bout.division]}
                        </Text>
                        <Text size="xs" span c="pink">
                            Ability Factor={abilityMultMap[bout.division]}
                        </Text>
                    </Flex>
                    <Flex gap="md">
                        <Anchor href={`/pebblers/${toCamelCase(awayPebbler.name)}`} c="black" underline="hover">
                            <Title order={2} w={200} ta="right">{awayPebbler.name}</Title>
                        </Anchor>
                        <Title order={2}>@</Title>
                        <Anchor href={`/pebblers/${toCamelCase(homePebbler.name)}`} c="black" underline="hover">
                            <Title order={2} w={200} ta="left">{homePebbler.name}</Title>
                        </Anchor>
                    </Flex>
                    <Title ta="left" order={4}>
                        {bout.month.toString()}/{bout.day.toString()}/{bout.year}
                    </Title>
                </Stack>
            </Center>
            <Flex align="center" justify="space-between" style={{ minHeight: 300 }}>
                <Stack align="center">
                    <Anchor href={`/pebblers/${toCamelCase(awayPebbler.name)}`}>
                        <Image
                            src={"/pebblers/" + toCamelCase(awayPebbler.name) + ".png"}
                            alt={"Image of " + awayPebbler.name + " the pebbler"}
                            h={200}
                            w={200}
                        />
                    </Anchor>
                </Stack>
                {finished ? <DoneBlock /> : <PreviewBlock />}
                <Stack align="center">
                    <Anchor href={`/pebblers/${toCamelCase(homePebbler.name)}`}>
                        <Image
                            className={classes.flipY}
                            src={"/pebblers/" + toCamelCase(homePebbler.name) + ".png"}
                            alt={"Image of " + homePebbler.name + " the pebbler"}
                            h={200}
                            w={200}
                        />
                    </Anchor>
                </Stack>
            </Flex>
        </Card>
    )
}