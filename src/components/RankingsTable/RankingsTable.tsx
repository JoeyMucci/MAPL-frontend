import { FC } from "react";
import { PebblerRowStats } from "@/types/pebblers";
import { Table, TableThead, TableTbody, TableTd, TableTr, Image, Flex } from "@mantine/core"
import Link from "next/link";
import { toCamelCase } from "@/functions/pebblers";
import classes from "./RankingTable.module.css"
import { colorMap } from "@/vars/divisions";

export const RankingsTable: FC<{ pebblerRows: PebblerRowStats[], division: string }> = ({ pebblerRows, division }) => {
    const includeForm: boolean = !pebblerRows.some(row => row.form.length < 5);

    return (
        <Table striped withColumnBorders>
            <TableThead>
                <TableTr ta="center" fw={700} color={colorMap[division]}>
                    <TableTd>Rank</TableTd>
                    <TableTd ta="left">Pebbler</TableTd>
                    <TableTd>Pebbles</TableTd>
                    <TableTd>Quirk Pebbles</TableTd>
                    <TableTd>Played</TableTd>
                    <TableTd>Won</TableTd>
                    <TableTd>Tied</TableTd>
                    <TableTd>Lost</TableTd>
                    <TableTd>PD</TableTd>
                    <TableTd>PF</TableTd>
                    <TableTd>PA</TableTd>
                    {includeForm && <TableTd>Form</TableTd>}
                    <TableTd>PPB</TableTd>
                    <TableTd>Home PPB</TableTd>
                    <TableTd>Away PPB</TableTd>
                </TableTr>
            </TableThead>
            <TableTbody>
                {pebblerRows.map((pebblerRow, i) => {
                    const ppb: number | string = pebblerRow.played === 0 ?
                        "N/A" : (pebblerRow.pebbles / pebblerRow.played).toFixed(2);
                    const ppbHome: number | string = pebblerRow.home_played === 0 ?
                        "N/A" : (pebblerRow.home_pebbles / pebblerRow.home_played).toFixed(2);
                    const ppbAway: number | string = pebblerRow.away_played === 0 ?
                        "N/A" : (pebblerRow.away_pebbles / pebblerRow.away_played).toFixed(2);

                    return (
                        <TableTr key={i} ta="center">
                            <TableTd>{pebblerRow.rank}</TableTd>
                            <TableTd w={175}>
                                <Flex gap="md" align="center">
                                    <Image
                                        src={"/pebblers/" + toCamelCase(pebblerRow.pebbler) + ".png"}
                                        alt={"Image of " + pebblerRow.pebbler + " the pebbler"}
                                        h={25}
                                        w={25}
                                    />
                                    <Link href={`/pebblers/${toCamelCase(pebblerRow.pebbler)}`} className={classes.nameLink}>
                                        {pebblerRow.pebbler}
                                    </Link>
                                </Flex>
                            </TableTd>
                            <TableTd>{pebblerRow.pebbles}</TableTd>
                            <TableTd>{pebblerRow.qp}</TableTd>
                            <TableTd>{pebblerRow.away_played}</TableTd>
                            <TableTd>{pebblerRow.wins}</TableTd>
                            <TableTd>{pebblerRow.ties}</TableTd>
                            <TableTd>{pebblerRow.losses}</TableTd>
                            <TableTd>{pebblerRow.pd}</TableTd>
                            <TableTd>{pebblerRow.pf}</TableTd>
                            <TableTd>{pebblerRow.pa}</TableTd>
                            {includeForm && <TableTd>{pebblerRow.form}</TableTd>}
                            <TableTd>{ppb}</TableTd>
                            <TableTd>{ppbHome}</TableTd>
                            <TableTd>{ppbAway}</TableTd>
                        </TableTr>
                    )
                })}
            </TableTbody>
        </Table>
    )
}
