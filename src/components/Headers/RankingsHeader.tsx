import { FC } from "react";
import { Container, Title, Button, Flex, Stack } from "@mantine/core";
import { divisions, colorMap } from "@/vars/divisions";
import classes from "./Header.module.css";

export const RankingsHeader: FC<{ divisionSelected: string, toggler: (a: string) => void, largeScreen: boolean }> =
    ({
        divisionSelected,
        toggler,
        largeScreen
    }) => {

        return (
            <Container fluid className={classes.header}>
                <Stack align="center">
                    <Title order={1}>
                        Rankings
                    </Title>
                    <Flex wrap="wrap">
                        {divisions.map((division, i) => (
                            <Button
                                key={i}
                                w={largeScreen ? 150 : 50}
                                style={{ color: colorMap[division] }}
                                className={division === divisionSelected ? classes.ghostButtonSelected : classes.ghostButton}
                                onClick={() => toggler(division)}
                                radius="xs"
                            >
                                {largeScreen ? division : division[0]}
                            </Button>
                        ))}
                    </Flex>
                </Stack>
            </Container>
        )
    }