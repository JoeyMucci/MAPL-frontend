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
            </TableTr>
        </TableThead>
        <TableTbody>
            {Object.keys(abilityDescMap).map((ability, i) => {
                return (
                    <TableTr key={i} ta="center">
                        <TableTd className={classes.oneLine}>
                            <Center>
                                <Flex align="center" gap={rem(4)}>
                                    {React.createElement(abilityMap[ability], { color: theme.colors!.pink![6] })}
                                    {ability}
                                </Flex>
                            </Center>
                        </TableTd>
                        <TableTd><Text size="xs">{abilityDescMap[ability]}</Text></TableTd>
                    </TableTr>
                )
            })}
        </TableTbody>
    </Table>
)