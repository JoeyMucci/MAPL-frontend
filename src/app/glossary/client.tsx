"use client"

import React from "react";
import {
    Center,
    Stack,
    Title,
    Flex,
    Anchor,
    Image,
    Text,
    rem,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DivisionTable } from "@/components/Rankings/DivisionTable";
import { TraitTable } from "@/components/Rankings/TraitTable";
import { QuirkTable } from "@/components/Rankings/QuirkTable";
import { AbilityTable } from "@/components/Rankings/AbilityTable";
import { TermTable } from "@/components/Rankings/TermTable";
import { BasePebbleGraphic } from "@/components/Rankings/BasePebbleGraphic";
import { FullPebbleGraphic } from "@/components/Rankings/FullPebbleGraphic";
import { TiebreakTable } from "@/components/Rankings/TiebreakTable";
import { toCamelCase } from "@/functions";

export default function GlossaryPage() {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    const RefereeComponentStack = () => (
        <Stack align="center" mb="lg">
            <Title order={6} style={{ "textDecoration": "underline" }}>Brought to you by the referee team</Title>
            {["Shaun", "Neville", "Tickle"].map((ref, i) => (
                <Flex key={i} align="center" gap={rem(2)}>
                    <Anchor href={`/format/${toCamelCase(ref)}`}>
                        <Image
                            src={"/referees/" + toCamelCase(ref) + ".png"}
                            alt={"Image of " + ref + " the referee"}
                            h={35}
                            w={35}
                        />
                    </Anchor>
                    <Anchor href={`/format/${toCamelCase(ref)}`} c="black" underline="hover">
                        <Text>
                            {ref}
                        </Text>
                    </Anchor>
                </Flex>
            ))}
        </Stack>
    )

    const RefereeComponentFlex = () => (
        <Stack align="center" mb="lg">
            <Title order={6} style={{ "textDecoration": "underline" }}>Brought to you by the referee team</Title>
            <Flex gap="xl">
                {["Shaun", "Neville", "Tickle"].map((ref, i) => (
                    <Flex key={i} align="center" gap={rem(2)}>
                        <Anchor href={`/format/${toCamelCase(ref)}`}>
                            <Image
                                src={"/referees/" + toCamelCase(ref) + ".png"}
                                alt={"Image of " + ref + " the referee"}
                                h={35}
                                w={35}
                            />
                        </Anchor>
                        <Anchor href={`/format/${toCamelCase(ref)}`} c="black" underline="hover">
                            <Text>
                                {ref}
                            </Text>
                        </Anchor>
                    </Flex>
                ))}
            </Flex>
        </Stack>
    )

    return (
        <Center mt="sm" mb="sm">
            <Stack w={largeScreen ? 500 : 300} gap="lg">
                {largeScreen ? <RefereeComponentFlex /> : <RefereeComponentStack />}
                <BasePebbleGraphic />
                <FullPebbleGraphic />
                <TraitTable />
                <QuirkTable />
                <AbilityTable />
                <DivisionTable />
                <TiebreakTable />
                <TermTable />
            </Stack>
        </Center>
    )
}