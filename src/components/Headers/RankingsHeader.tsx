import { FC } from "react";
import { Container, Title, Stack } from "@mantine/core";
import { HeaderButtons } from "./HeaderButtons";
import { GeneralDatePicker } from "./GeneralDatePicker";
import { divisions } from "@/vars";
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
                    <GeneralDatePicker
                        title="Rankings Archive"
                        curMonth={month}
                        curYear={year}
                        onChange={toggleDate}
                    />
                    <Title ta="center" order={1} mt="xl">
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