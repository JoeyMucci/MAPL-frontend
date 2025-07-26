import React from "react";
import {
    Center,
    Flex,
    Table,
    TableThead,
    TableTr,
    TableTd,
    TableTbody,
    Text,
    rem,
} from "@mantine/core";
import {
    abilityDescMap,
    abilityMap
} from "@/vars";
import { theme } from "@/theme";
import classes from "./Rankings.module.css";

export const AbilityTable = () => (
    <Table striped withTableBorder>
        <TableThead>
            <TableTr ta="center">
                <TableTd>Ability</TableTd>
                <TableTd>Description</TableTd>
                <TableTd>Trigger Rate</TableTd>
            </TableTr>
        </TableThead>
        <TableTbody>
            {Object.keys(abilityDescMap).map((ability, i) => {
                const parIdx = abilityDescMap[ability].indexOf("(")
                const vanillaDescription =
                    parIdx !== -1
                        ? abilityDescMap[ability].substring(0, parIdx - 1)
                        : ""

                const triggerRate =
                    parIdx !== -1
                        ? abilityDescMap[ability].substring(parIdx + 1, parIdx + 4)
                        : "";

                return (
                    <TableTr key={i} ta="center">
                        <TableTd className={classes.oneLine}>
                            <Center>
                                <Flex align="center" gap={rem(4)}>
                                    {React.createElement(abilityMap[ability], { color: theme.colors!.pink![6], size: 16 })}
                                    <Text size="xs">{ability}</Text>
                                </Flex>
                            </Center>
                        </TableTd>
                        <TableTd>{vanillaDescription}</TableTd>
                        <TableTd>{triggerRate}</TableTd>
                    </TableTr>
                )
            })}
        </TableTbody>
    </Table>
)