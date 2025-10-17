import React from "react";
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
                <TableTd>Tiebreaker Precedence</TableTd>
            </TableTr>
        </TableThead>
        <TableTbody>
            <TableTr ta="center">
                <TableTd>
                    1. Pebbles
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    2. Quirk Pebbles
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    3. Wins
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    4. Ties
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    5. Pip Difference
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    6. Pips For
                </TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>
                    7. Random
                </TableTd>
            </TableTr>
        </TableTbody>
    </Table>
)