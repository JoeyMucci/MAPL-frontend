"use client"

import { FC } from "react";
import { Progress, Flex, Button, Stack } from "@mantine/core";
import classes from './Header.module.css';

const tabs = [
    "Base Scoring",
    "Pebbling History",
    "MAPL Overview",
    "Traits",
    "Quirks",
    "Abilities",
    "Scheduling",
    "Division Factors",
    "Promotion/Demotion",
    "Conclusion"
]

export const FormatFooter: FC<{ cur: number, setPageAction: (a: number) => void }> = ({ cur, setPageAction }) => {
    return (
        <Stack gap={0}>
            <Progress
                value={cur / 9 * 100}
                size="lg"
                transitionDuration={200}
                bg="transparent"
                color="orange"
                radius={0}
                h={10}
                className={classes.formatFooterBar}
            />
            <Flex className={classes.formatFooterMain} justify="space-between" align="center">
                {tabs.map((tab, i) => (
                    <Button
                        h={40}
                        key={i}
                        className={i === cur ? classes.ghostButtonSelected : classes.ghostButton}
                        onClick={() => setPageAction(i)}
                        radius="xs"
                    >
                        {tab}
                    </Button>
                ))}
            </Flex>
        </Stack>
    )
}

export const FormatFooterMobile: FC<{ cur: number }> = ({ cur }) => {
    return (
        <Progress
            value={cur / 11 * 100}
            size="lg"
            transitionDuration={200}
            bg="transparent"
            color="orange"
            radius={0}
            h={10}
            className={classes.formatFooterBarTop}
        />
    )
}