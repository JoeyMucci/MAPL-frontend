"use client"

import { FC, useState, useEffect } from "react";
import { ComplicatedBout } from "@/types/bouts";
import { FullBout } from "@/components/Bout/FullBout";
import { ScrollArea, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DatePicker } from "@/components/Headers/DatePicker";
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

        let largeScreen = useMediaQuery('(min-width: 56em)');
        largeScreen = largeScreen === undefined ? true : largeScreen;


        const date = new Date()
        const curMonth = date.getMonth() + 1 // getMonth() returns 0-11, so we add 1
        const curYear = date.getFullYear()

        const [month, setMonth] = useState<number>(curMonth)
        const [year, setYear] = useState<number>(curYear)
        const [bouts, setBouts] = useState<ComplicatedBout[]>([]);

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
                <DatePicker
                    title={`${pebblerName}: Activity Archive`}
                    curMonth={month}
                    curYear={year}
                    onChange={toggleDate}
                />
                {
                    bouts.map((bout, i) => (
                        <ScrollArea type="auto" w={largeScreen ? 1000 : 300} key={i}>
                            <FullBout key={i} bout={bout} />
                        </ScrollArea>
                    ))
                }
            </Stack >
        )
    }