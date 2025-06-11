import { FC } from "react";
import { Container, Title, Stack } from "@mantine/core";
import { MonthPicker } from "@mantine/dates";
import { HeaderButtons } from "./HeaderButtons";
import { divisions } from "@/vars";
import classes from "./Header.module.css";

export const RankingsHeader: FC<{
    divisionSelected: string,
    month: number,
    year: number,
    largeScreen: boolean,
    toggler: (a: string) => void
}> =
    ({
        divisionSelected,
        month,
        year,
        largeScreen,
        toggler,
    }) => {

        return (
            <Container fluid className={classes.header}>
                <Stack align="center">
                    <Title order={6}>
                        Rankings Archive
                    </Title>
                    <MonthPicker
                        classNames={{
                            monthsListControl: classes.ghostButtonOrange,
                        }}
                        style={{ color: "orange" }}
                        maxLevel="year"
                        value={`${year}-${month}-01`}
                        defaultDate={`${year}-${month}-01`}
                        onChange={(value) => window.location.href = `/rankings/${value.split('-')[1]}/${value.split('-')[0]}`}
                    />
                    <Title ta="center" order={1}>
                        {new Date(year, month - 1).toLocaleString("en-US", { month: "short" })}{" "}{year}{" Rankings"}
                    </Title>
                    <HeaderButtons
                        options={divisions}
                        selected={divisionSelected}
                        largeScreen={largeScreen}
                        toggler={toggler}
                    />
                </Stack>
            </Container>
        )
    }