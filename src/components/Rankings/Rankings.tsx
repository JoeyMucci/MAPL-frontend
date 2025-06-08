'use client'

import { FC, useState } from "react";
import { PebblerRowStats } from "@/types/stats";
import { divisions } from "@/vars";
import { RankingsHeader } from "../Headers/RankingsHeader";
import { useMediaQuery } from "@mantine/hooks";
import { RankingsTable } from "./RankingsTable";
import { RankingsFooter } from "./RankingsFooter";
import { Space, Title } from "@mantine/core";

export const Rankings: FC<{ rankings: { [key: string]: PebblerRowStats[] }, month: number, year: number }> =
    ({ rankings, month, year }) => {
        const [division, setDivision] = useState<string>(divisions[0])
        let largeScreen = useMediaQuery('(min-width: 56em)');
        largeScreen = largeScreen === undefined ? true : largeScreen;

        const toggleDivision = (newDivision: string) => {
            setDivision(newDivision)
        }

        return (
            <>
                <RankingsHeader
                    divisionSelected={division}
                    month={month}
                    year={year}
                    toggler={toggleDivision}
                    largeScreen={largeScreen}
                />
                {!largeScreen && <Title ta="center" order={3}>{division} Division</Title>}
                <RankingsTable pebblerRows={rankings[division]} division={division} />
                <Space h="lg" />
                <RankingsFooter division={division} />
            </>
        )
    }


