'use client'

import { FC, useState } from "react";
import { PebblerRowStats } from "@/types/stats";
import { divisions } from "@/vars";
import { RankingsHeader } from "../Headers/RankingsHeader";
import { useMediaQuery } from "@mantine/hooks";
import { RankingsTable } from "./RankingsTable";
import { RankingsFooter } from "./RankingsFooter";
import { Space, Title } from "@mantine/core";
import { toggleDate } from "@/functions";

type RankingsDict = {
    [year: number]: {
        [month: number]: {
            [division: string]: PebblerRowStats[]
        }
    }
}

export const Rankings: FC<{ rankings: RankingsDict, maxMonth: number, maxYear: number }> =
    ({ rankings, maxMonth, maxYear }) => {
        const [division, setDivision] = useState<string>(divisions[0])
        const [month, setMonth] = useState<number>(maxMonth)
        const [year, setYear] = useState<number>(maxYear)
        let largeScreen = useMediaQuery('(min-width: 56em)');
        largeScreen = largeScreen === undefined ? true : largeScreen;

        const toggleDivision = (newDivision: string) => {
            setDivision(newDivision)
        }

        return (
            <>
                <RankingsHeader
                    divisionSelected={division}
                    maxMonth={maxMonth}
                    maxYear={maxYear}
                    month={month}
                    year={year}
                    toggleDivision={toggleDivision}
                    toggleDate={(value) => toggleDate(setMonth, setYear, value)}
                    largeScreen={largeScreen}
                />
                {!largeScreen && <Title ta="center" order={3}>{division} Division</Title>}
                <RankingsTable pebblerRows={rankings[month][year][division]} division={division} />
                <Space h="lg" />
                <RankingsFooter division={division} />
            </>
        )
    }


