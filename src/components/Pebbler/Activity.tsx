"use client"

import { FC, useState, useEffect } from "react";
import { ComplicatedBout } from "@/types/bouts";
import { FullBout } from "@/components/Bout/FullBout";
import { Card, Stack, Title } from "@mantine/core";
import { MonthPicker } from "@mantine/dates";
import { leagueStart } from "@/vars";
import classes from "@/components/Headers/Header.module.css";
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
                <Card radius="lg" bg="black">
                    <Title c="white" ta="center" mb="md" order={6}>
                        {pebblerName}: Activity Archive
                    </Title>
                    <MonthPicker
                        classNames={{
                            monthsListControl: classes.ghostButtonOrange,
                        }}
                        style={{ color: "orange" }}
                        maxLevel="year"
                        value={`${year}-${month}-1`}
                        defaultDate={`${year}-${month}-1`}
                        minDate={leagueStart}
                        maxDate={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}
                        onChange={toggleDate}
                    />
                </Card>
                {
                    bouts.map((bout, i) => (
                        <FullBout key={i} bout={bout} />
                    ))
                }
            </Stack >
        )
    }