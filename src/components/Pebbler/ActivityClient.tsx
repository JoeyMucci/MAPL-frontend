"use client"

import { FC, useState } from "react";
import { ComplicatedBout } from "@/types/bouts";
import { FullBout } from "@/components/Bout/FullBout";
import { Card, Stack, Title } from "@mantine/core";
import { MonthPicker } from "@mantine/dates";
import { leagueStart } from "@/vars";
import classes from "@/components/Headers/Header.module.css";

type BoutsDict = {
    [year: number]: {
        [month: number]: ComplicatedBout[]
    }
}

export const ActivityClient: FC<{ bouts: BoutsDict, maxMonth: number, maxYear: number, pebblerName: string }> =
    ({ bouts, maxMonth, maxYear, pebblerName }) => {
        const [month, setMonth] = useState<number>(maxMonth)
        const [year, setYear] = useState<number>(maxYear)

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
                        maxDate={`${maxYear}-${maxMonth}-1`}
                        onChange={toggleDate}
                    />
                </Card>
                {
                    bouts[month][year].map((bout, i) => (
                        <FullBout key={i} bout={bout} />
                    ))
                }
            </Stack >
        )
    }