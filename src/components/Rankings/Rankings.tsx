"use client"

import { FC, useState } from "react";
import { PebblerRowStats } from "@/types/stats";
import { divisions } from "@/vars";
import { RankingsHeader } from "../Headers/RankingsHeader";
import { useMediaQuery } from "@mantine/hooks";
import { RankingsTable } from "./RankingsTable";
import { RankingsFooter } from "./RankingsFooter";
import { Space, Title } from "@mantine/core";
import { toggleDate } from "@/functions";

export const Rankings: FC<{
    rankings: { [division: string]: PebblerRowStats[] },
    month: number,
    year: number
    setMonthAction: (month: number) => void,
    setYearAction: (year: number) => void,
}> =
    ({ rankings, month, year, setMonthAction, setYearAction }) => {
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
                    toggleDivision={toggleDivision}
                    toggleDate={(value) => toggleDate(setMonthAction, setYearAction, value)}
                    largeScreen={largeScreen}
                />
                {!largeScreen && <Title ta="center" order={3}>{division} Division</Title>}
                <RankingsTable pebblerRows={rankings[division]} division={division} />
                <Space h="lg" />
                <RankingsFooter division={division} />
            </>
        )
    }


