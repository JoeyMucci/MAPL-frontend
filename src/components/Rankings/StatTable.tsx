import { FC } from 'react';
import { Table, TableThead, TableTr, TableTd, TableTbody } from '@mantine/core';
import { MediumPebbler } from '@/types/pebblers';

export const StatTable: FC<{ pebbler: MediumPebbler }> = ({ pebbler }) => {
    return (
        <Table w={300} ta="center" withTableBorder>
            <TableThead>
                <TableTr ta="center" fw={700}>
                    <TableTd>Stat</TableTd>
                    <TableTd>YTD</TableTd>
                    <TableTd>Career</TableTd>
                </TableTr>
            </TableThead>
            <TableTbody>
                <TableTr>
                    <TableTd>Pebbles</TableTd>
                    <TableTd>{pebbler.ytd_pebbles}</TableTd>
                    <TableTd>{pebbler.pebbles}</TableTd>
                </TableTr>
                <TableTr>
                    <TableTd>Home Pebbles</TableTd>
                    <TableTd>{pebbler.ytd_home_pebbles}</TableTd>
                    <TableTd>{pebbler.home_pebbles}</TableTd>
                </TableTr>
                <TableTr>
                    <TableTd>Away Pebbles</TableTd>
                    <TableTd>{pebbler.ytd_away_pebbles}</TableTd>
                    <TableTd>{pebbler.away_pebbles}</TableTd>
                </TableTr>
                <TableTr>
                    <TableTd>Quirk Pebbles</TableTd>
                    <TableTd>{pebbler.ytd_qp}</TableTd>
                    <TableTd>{pebbler.qp}</TableTd>
                </TableTr>
                <TableTr>
                    <TableTd>Ability Triggers</TableTd>
                    <TableTd>{pebbler.ytd_at}</TableTd>
                    <TableTd>{pebbler.at}</TableTd>
                </TableTr>
            </TableTbody>
        </Table>
    )
}
