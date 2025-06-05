import { FC } from "react";
import { Container, Title, Stack } from "@mantine/core";
import { HeaderButtons } from "./HeaderButtons";
import { divisions } from "@/vars";
import classes from "./Header.module.css";

export const RankingsHeader: FC<{ divisionSelected: string, largeScreen: boolean, toggler: (a: string) => void }> =
    ({
        divisionSelected,
        largeScreen,
        toggler,
    }) => {

        return (
            <Container fluid className={classes.header}>
                <Stack align="center">
                    <Title order={1}>
                        Rankings
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