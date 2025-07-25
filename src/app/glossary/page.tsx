"use client"

import React from "react";
import {
    Center,
    Stack,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DivisionTable } from "@/components/Rankings/DivisionTable";
import { QuirkTable } from "@/components/Rankings/QuirkTable";
import { AbilityTable } from "@/components/Rankings/AbilityTable";
import { TermTable } from "@/components/Rankings/TermTable";

export default function GlossaryPage() {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    return (
        <Center mt="sm" mb="sm">
            <Stack w={largeScreen ? 500 : 300} gap="lg">
                <DivisionTable />
                <QuirkTable />
                <AbilityTable />
                <TermTable />
            </Stack>
        </Center>
    )
}