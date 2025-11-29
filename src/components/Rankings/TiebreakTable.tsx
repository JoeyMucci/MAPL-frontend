import React from "react";
import { Text } from "@mantine/core"
import {
    Table,
    TableThead,
    TableTr,
    TableTd,
    TableTbody,
} from "@mantine/core";


export const TiebreakTable = () => (
    <Table striped withTableBorder>
        <TableThead>
            <TableTr ta="center">
                <TableTd><Text size="xs">Tiebreaker Precedence</Text></TableTd>
            </TableTr>
        </TableThead>
        <TableTbody>
            <TableTr ta="center">
                <TableTd>
                    <Text size="xs">
                        1. Pebbles
                    </Text>
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    <Text size="xs">
                        2. Quirk Pebbles
                    </Text>
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    <Text size="xs">
                        3. Wins
                    </Text>
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    <Text size="xs">
                        4. Ties
                    </Text>
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    <Text size="xs">
                        5. Pip Difference
                    </Text>
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    <Text size="xs">
                        6. Pips For
                    </Text>
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    <Text size="xs">
                        7. Random
                    </Text>
                </TableTd>
            </TableTr>
        </TableTbody>
    </Table>
)