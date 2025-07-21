import { FC } from "react";
import { Container, Stack } from "@mantine/core";
import { HeaderButtons } from "./HeaderButtons";
import { GeneralDatePicker } from "./GeneralDatePicker";
import classes from "./Header.module.css";

export const ReportsHeader: FC<{
    reporterSelected: string,
    month: number,
    year: number,
    largeScreen: boolean,
    toggleReporter: (a: string) => void
    toggleDate: (a: string) => void
}> =
    ({
        reporterSelected,
        month,
        year,
        largeScreen,
        toggleReporter,
        toggleDate,
    }) => {
        return (
            <Container fluid className={classes.header}>
                <Stack align="center">
                    <GeneralDatePicker
                        title="Reports Archive"
                        curMonth={month}
                        curYear={year}
                        onChange={toggleDate}
                    />
                    <HeaderButtons
                        options={["Merged", "Ari", "Patrick", "Lippo"]}
                        selected={reporterSelected}
                        largeScreen={largeScreen}
                        toggler={toggleReporter}
                    />
                </Stack>
            </Container >
        )
    }