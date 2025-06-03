'use client'

import { FC, useState } from "react";
import { PebblerRowStats } from "@/types/pebblers";
import { divisions } from "@/vars/divisions";
import { RankingsHeader } from "../Headers/RankingsHeader";
import { useMediaQuery } from "@mantine/hooks";
import { RankingsTable } from "./RankingsTable";
import { RankingsFooter } from "./RankingsFooter";
import { Space } from "@mantine/core";

export const Rankings: FC<{ rankings: { [key: string]: PebblerRowStats[] } }> = ({ rankings }) => {
    const [division, setDivision] = useState<string>(divisions[0])
    let largeScreen = useMediaQuery('(min-width: 56em)');
    largeScreen = largeScreen === undefined ? true : largeScreen;

    const toggleDivision = (newDivision: string) => {
        setDivision(newDivision)
    }

    return (
        <>
            <RankingsHeader divisionSelected={division} toggler={toggleDivision} largeScreen={largeScreen} />
            <RankingsTable pebblerRows={rankings[division]} division={division} />
            <Space h="lg" />
            <RankingsFooter division={division} />
        </>
    )
}


