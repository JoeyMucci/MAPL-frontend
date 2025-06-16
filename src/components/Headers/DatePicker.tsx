import { FC } from "react";
import { Card, Title } from "@mantine/core";
import { MonthPicker, YearPicker } from "@mantine/dates";
import { leagueStart } from "@/vars";
import { getTime } from "@/functions";
import classes from "./Header.module.css";

interface DatePickerProps {
    title: string;
    curMonth?: number;
    curYear: number;
    onChange: (date: string) => void;
}

export const DatePicker: FC<DatePickerProps> =
    ({ title, curMonth, curYear, onChange }) => {
        return (
            <Card mt="sm" radius="lg" bg="black">
                <Title ta="center" c="white" mb="md" order={6} >
                    {title}
                </Title >
                {curMonth !== undefined ? (<MonthPicker
                    classNames={{
                        monthsListControl: classes.ghostButtonOrange,
                    }}
                    style={{ color: "orange" }}
                    value={`${curYear}-${curMonth}-1`}
                    defaultDate={`${curYear}-${curMonth}-1`}
                    minDate={leagueStart}
                    maxDate={getTime()}
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
                        maxDate={getTime()}
                        onChange={onChange}
                    />
                )}
            </Card>
        )
    }