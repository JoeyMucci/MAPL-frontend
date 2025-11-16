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
    traitMap,
    traitDescMap,
    colorMap,
} from "@/vars";
import classes from "./Rankings.module.css";

export const TraitTable = () => (
    <Table striped withTableBorder>
        <TableThead>
            <TableTr ta="center">
                <TableTd>Trait</TableTd>
                <TableTd>Possible Rolls</TableTd>
            </TableTr>
        </TableThead>
        <TableTbody>
            {Object.keys(traitDescMap).map((trait, i) => (
                <TableTr key={i} ta="center">
                    <TableTd className={classes.oneLine}>
                        <Center>
                            <Flex align="center" gap={rem(4)}>
                                {React.createElement(traitMap[trait], { color: colorMap[trait] })}
                                {trait}
                            </Flex>
                        </Center>
                    </TableTd>
                    <TableTd>{traitDescMap[trait]}</TableTd>
                </TableTr>
            ))}
        </TableTbody>
    </Table>
)