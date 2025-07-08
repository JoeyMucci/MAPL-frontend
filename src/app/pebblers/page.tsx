"use client"

import { OverviewCarousel } from "@/components/Pebbler/OverviewCarousel";
import { PersonalPebbler } from "@/types/pebblers";
import { Center } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function PebblersPage() {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    const p: PersonalPebbler = {
        name: "Dominic Bluey",
        description: "Professional 21",
        trait: "Grace",
        quirk: "Untouchable",
        ability: "Tip the Scales",
    }
    const ps = [p, p, p, p, p, p, p, p, p, p]

    return (
        <>
            <Center pt="md">
                <OverviewCarousel pebblers={ps} largeScreen={largeScreen} />
            </Center>
        </>
    )
}