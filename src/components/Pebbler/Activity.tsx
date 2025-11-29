"use client"

import { FC, useState, useEffect } from "react";
import { SimpleBout } from "@/types/bouts";
import { Bout } from "@/components/Bout/SmallBout";
import { Flex, Stack, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GeneralDatePicker } from "@/components/Headers/GeneralDatePicker";
import { NoData } from "@/components/nodata";
import { getTime } from "@/functions";
import axios from "axios";

export const Activity: FC<{ pebblerName: string }> =
    ({ pebblerName }) => {

        let largeScreen = useMediaQuery('(min-width: 56em)')
        largeScreen = largeScreen === undefined ? true : largeScreen

        const t = getTime()
        const curMonth = parseInt(t.split("-")[1])
        const curYear = parseInt(t.split("-")[0])

        const [month, setMonth] = useState<number>(curMonth)
        const [year, setYear] = useState<number>(curYear)
        const [bouts, setBouts] = useState<SimpleBout[]>([])

        useEffect(() => {
            async function fetchActivity(month: number, year: number) {
                try {
                    // console.log("Fetching pebbler bout information...");
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bouts/${pebblerName}/${month}/${year}`);
                    return response.data;
                }  catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
                    // console.error("Error fetching data:", error);
                    return null;
                }
            }

            fetchActivity(month, year).then((data) => {
                setBouts(data.bouts);
            });
        }, [month, year, pebblerName]);

        const toggleDate = (newDate: string) => {
            setMonth(parseInt(newDate.split('-')[1], 10))
            setYear(parseInt(newDate.split('-')[0], 10))
        }

        return (
            <Stack align="center" mt="md" mb="md" >
                <GeneralDatePicker
                    title={`${pebblerName}: Activity Archive`}
                    curMonth={month}
                    curYear={year}
                    onChange={toggleDate}
                />
                
                <Stack align="center">
                    {
                        bouts === undefined || !bouts || bouts.length === 0 ? (
                            <>
                                <Title ta="center" order={1} mt="xl">
                                    {new Date(year, month - 1).toLocaleString("en-US", { month: "short" })}{" "}{year}{" Activity"}
                                </Title>
                                <NoData />
                            </>
                        ) :
                            largeScreen ? (
                                Array.from({ length: Math.ceil(bouts.length / 3) }).map((_, rowIdx) => (
                                    <Flex key={rowIdx} gap="md">
                                        {bouts.slice(rowIdx * 3, rowIdx * 3 + 3).map((bout, colIdx) => (
                                            <Bout key={rowIdx * 3 + colIdx} bout={bout} showDate />
                                        ))}
                                    </Flex>
                                ))
                            ) : (
                                bouts.map((bout, i) => (
                                    <Bout key={i} bout={bout} showDate />
                                ))
                            )
                    }
                </Stack>
            </Stack >
        )
    }