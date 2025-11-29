import { FC } from "react";
import { Stack, Card, Title } from "@mantine/core";
import { MonthPicker, DatePicker, YearPicker } from "@mantine/dates";
import { leagueStart } from "@/vars";
import { getTime } from "@/functions";
import classes from "./Header.module.css";

interface DatePickerProps {
    title: string;
    curDay?: number;
    curMonth?: number;
    curYear: number;
    onChange: (date: string) => void;
}

export const GeneralDatePicker: FC<DatePickerProps> =
    ({ title, curDay, curMonth, curYear, onChange }) => {
        const t = getTime()
        return (
            <Card mt="sm" radius="lg" bg="black">
                <Title ta="center" c="white" mb="md" order={6} >
                    {title}
                </Title >

                {curDay !== undefined ? (
                    <Stack h={300} justify="center">
                        <DatePicker
                            classNames={{
                                day: classes.ghostButtonOrange,
                            }}
                            excludeDate={(date) => new Date(date).getUTCDate() > 25}
                            style={{ color: "orange" }}
                            value={`${curYear}-${curMonth}-${curDay}`}
                            defaultDate={`${curYear}-${curMonth}-${curDay}`}
                            minDate={leagueStart}
                            maxDate={t.split('-')[0] + "-" + t.split('-')[1] + "-25"}
                            maxLevel="month"
                            onChange={onChange}
                        />
                    </Stack>
                ) : (
                    curMonth !== undefined ? (<MonthPicker
                        classNames={{
                            monthsListControl: classes.ghostButtonOrange,
                        }}
                        style={{ color: "orange" }}
                        value={`${curYear}-${curMonth}-1`}
                        defaultDate={`${curYear}-${curMonth}-1`}
                        minDate={leagueStart}
                        maxDate={t}
                        maxLevel="year"
                        onChange={onChange}
                    />) : (
                        <YearPicker
                            classNames={{
                                yearsListControl: classes.ghostButtonOrange,
                            }}
                            style={{ color: "orange" }}
                            value={`${curYear}-1-1`}
                            defaultDate={`${curYear}-1-1`}
                            minDate={leagueStart}
                            maxDate={t}
                            onChange={onChange}
                        />
                    )
                )}
            </Card>
        )
    }