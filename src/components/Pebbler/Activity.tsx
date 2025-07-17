"use client"

import { FC, useState, useEffect } from "react";
import { SimpleBout } from "@/types/bouts";
import { Bout } from "@/components/Bout/SmallBout";
import { Flex, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GeneralDatePicker } from "@/components/Headers/GeneralDatePicker";
import axios from "axios";

export const Activity: FC<{ pebblerName: string }> =
    ({ pebblerName }) => {
        async function fetchActivity(month: number, year: number) {
            try {
                console.log("Fetching pebbler bout information...");
                const response = await axios.get(`http://127.0.0.1:8000/api/bouts/${pebblerName}/${month}/${year}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                return {};
            }
        }

        let largeScreen = useMediaQuery('(min-width: 56em)')
        largeScreen = largeScreen === undefined ? true : largeScreen


        const date = new Date()
        const curMonth = date.getMonth() + 1 // getMonth() returns 0-11, so we add 1
        const curYear = date.getFullYear()

        const [month, setMonth] = useState<number>(curMonth)
        const [year, setYear] = useState<number>(curYear)
        const [bouts, setBouts] = useState<SimpleBout[]>([]);

        useEffect(() => {
            fetchActivity(month, year).then((data) => {
                setBouts(data.bouts);
            });
        }, [month, year]);

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
                        bouts.length === 0 ? (
                            <div>No bouts found.</div>
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