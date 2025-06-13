import { FC } from "react";
import { Card, Container, Title, Stack } from "@mantine/core";
import { MonthPicker } from "@mantine/dates";
import { HeaderButtons } from "./HeaderButtons";
import { divisions, leagueStart } from "@/vars";
import classes from "./Header.module.css";

export const RankingsHeader: FC<{
    divisionSelected: string,
    month: number,
    year: number,
    largeScreen: boolean,
    toggleDivision: (a: string) => void
    toggleDate: (a: string) => void
}> =
    ({
        divisionSelected,
        month,
        year,
        largeScreen,
        toggleDivision,
        toggleDate,
    }) => {

        return (
            <Container fluid className={classes.header}>
                <Stack align="center">
                    <Card mt="sm" radius="lg" bg="black">
                        <Title ta="center" c="white" mb="md" order={6}>
                            Rankings Archive
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
                    <Title ta="center" order={1}>
                        {new Date(year, month - 1).toLocaleString("en-US", { month: "short" })}{" "}{year}{" Rankings"}
                    </Title>
                    <HeaderButtons
                        options={divisions}
                        selected={divisionSelected}
                        largeScreen={largeScreen}
                        toggler={toggleDivision}
                    />
                </Stack>
            </Container >
        )
    }