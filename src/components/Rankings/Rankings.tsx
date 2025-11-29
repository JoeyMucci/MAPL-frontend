"use client"

import { FC, useState } from "react";
import { PebblerRowStats } from "@/types/stats";
import { RankingsHeader } from "../Headers/RankingsHeader";
import { useMediaQuery } from "@mantine/hooks";
import { RankingsTable } from "./RankingsTable";
import { RankingsFooter } from "./RankingsFooter";
import { Badge, Center, Space, Flex, Title, rem } from "@mantine/core";
import { colorMap, divisions, MATCHES_PER_ROUND } from "@/vars";
import { NoData } from "../nodata";

export const Rankings: FC<{
    rankings: { [division: string]: PebblerRowStats[] },
    month: number,
    year: number
    setMonthAction: (month: number) => void,
    setYearAction: (year: number) => void,
}> =
    ({ rankings, month, year, setMonthAction, setYearAction }) => {
        const [division, setDivision] = useState<string>(divisions[0])
        let largeScreen = useMediaQuery('(min-width: 56em)')
        largeScreen = largeScreen === undefined ? true : largeScreen

        function toggleDate(setMonth: (a: number) => void, setYear: (a: number) => void, newDate: string): void {
            setMonth(parseInt(newDate.split('-')[1], 10))
            setYear(parseInt(newDate.split('-')[0], 10))
        }

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
                <Center>
                    {!largeScreen &&
                        <Flex align="center" gap={rem(10)}>
                            <Badge w={125} color={colorMap[division]}>{division}</Badge>
                            <Title order={3}>Division</Title>
                        </Flex>}
                </Center>
                {rankings !== undefined && rankings[division].length > 0 ? (
                    <>
                        <RankingsTable 
                          pebblerRows={rankings[division]} 
                          division={division}
                          updated={rankings[divisions[divisions.length - 1]]?.reduce((sum, row) => sum + row.played, 0) % (2 * MATCHES_PER_ROUND) === 0}
                        />
                        <Space h="lg" />
                        <RankingsFooter division={division} />
                    </>) : (
                    <NoData />
                )
                }
            </>
        )
    }


