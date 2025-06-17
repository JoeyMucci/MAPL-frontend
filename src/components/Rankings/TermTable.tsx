import React from "react";
import {
    Center,
    Flex,
    Table,
    TableThead,
    TableTr,
    TableTd,
    TableTbody,
    rem,
} from "@mantine/core";

export const TermTable = () => (
    <Table striped withTableBorder>
        <TableThead>
            <TableTr ta="center">
                <TableTd>Abbreviation</TableTd>
                <TableTd>Full Term</TableTd>
            </TableTr>
        </TableThead>
        <TableTbody>
            <TableTr ta="center">
                <TableTd>PD</TableTd>
                <TableTd>Pip Difference</TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>PF</TableTd>
                <TableTd>Pips For</TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>PA</TableTd>
                <TableTd>Pips Against</TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>PPB</TableTd>
                <TableTd>Pebbles Per Bout</TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>QP</TableTd>
                <TableTd>Quirk Pebbles</TableTd>
            </TableTr>
            <TableTr ta="center">
                <TableTd>AT</TableTd>
                <TableTd>Ability Triggers</TableTd>
            </TableTr>
        </TableTbody>
    </Table >
)