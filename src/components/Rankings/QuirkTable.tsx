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
import {
    quirkDescMap,
    quirkMap
} from "@/vars";
import classes from "./Rankings.module.css";

export const QuirkTable = () => (
    <Table striped withTableBorder>
        <TableThead>
            <TableTr ta="center">
                <TableTd>Quirk</TableTd>
                <TableTd>Description</TableTd>
            </TableTr>
        </TableThead>
        <TableTbody>
            {Object.keys(quirkDescMap).map((quirk, i) => (
                <TableTr key={i} ta="center">
                    <TableTd className={classes.oneLine}>
                        <Center>
                            <Flex align="center" gap={rem(4)}>
                                {React.createElement(quirkMap[quirk], { color: "purple" })}
                                {quirk}
                            </Flex>
                        </Center>
                    </TableTd>
                    <TableTd>{quirkDescMap[quirk]}</TableTd>
                </TableTr>
            ))}
        </TableTbody>
    </Table>
)