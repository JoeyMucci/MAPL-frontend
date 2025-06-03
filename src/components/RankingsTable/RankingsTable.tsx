import { FC } from "react";
import { PebblerRowStats } from "@/types/pebblers";
import {
    Anchor,
    Table,
    TableThead,
    TableTbody,
    TableTd,
    TableTr,
    Image,
    Flex,
    Tooltip,
    UnstyledButton
} from "@mantine/core"
import { toCamelCase } from "@/functions/pebblers";
import { colorMap } from "@/vars/divisions";
import { theme } from "@/theme"
import {
    IconArrowsUp,
    IconArrowUp,
    IconArrowsDown,
    IconArrowDown,
    IconArrowsRightLeft
} from "@tabler/icons-react";

const MATCHES_PER_ROUND = 12

export const RankingsTable: FC<{ pebblerRows: PebblerRowStats[], division: string }> = ({ pebblerRows, division }) => {
    const RankingChangeWidget: FC<{ rank: number, oldRank: number }> = ({ rank, oldRank }) => {
        const doubleUp: boolean = rank <= (oldRank - 3)
        const up: boolean = !doubleUp && (rank < oldRank)
        const doubleDown: boolean = rank >= (oldRank + 3)
        const down: boolean = !doubleDown && (rank > oldRank)
        const even: boolean = (rank === oldRank)

        let color = theme.colors!.goodGreen![6]
        if (doubleDown || down) {
            color = theme.colors!.alarmRed![6]
        }
        if (even) {
            color = theme.colors!.midBlue![6]
        }

        return (
            <Tooltip label={`Previous Rank: ${oldRank}`} color={color}>
                <UnstyledButton>
                    {doubleUp && <IconArrowsUp color={color} />}
                    {up && <IconArrowUp color={color} />}
                    {doubleDown && <IconArrowsDown color={color} />}
                    {down && <IconArrowDown color={color} />}
                    {even && <IconArrowsRightLeft color={color} />}
                </UnstyledButton>
            </Tooltip>
        )
    }

    const includeForm: boolean = !pebblerRows.some(row => row.form.length < 5);

    let totalPlayed = 0
    for (let i = 0; i < pebblerRows.length; i++) {
        totalPlayed += pebblerRows[i].played
    }

    const includeRankChange: boolean = totalPlayed % (2 * MATCHES_PER_ROUND) == 0

    return (
        <>
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
                                <TableTd>
                                    <Flex justify="space-evenly">
                                        {pebblerRow.rank}
                                        {includeRankChange && (
                                            <RankingChangeWidget rank={pebblerRow.rank} oldRank={pebblerRow.previous_rank} />
                                        )}
                                    </Flex>
                                </TableTd>
                                <TableTd w={200}>
                                    <Flex gap="md" align="center">
                                        <Image
                                            src={"/pebblers/" + toCamelCase(pebblerRow.pebbler) + ".png"}
                                            alt={"Image of " + pebblerRow.pebbler + " the pebbler"}
                                            h={25}
                                            w={25}
                                        />
                                        <Anchor href={`/pebblers/${toCamelCase(pebblerRow.pebbler)}`} c="black" underline="hover">
                                            {pebblerRow.pebbler}
                                        </Anchor>
                                    </Flex>
                                </TableTd>
                                <TableTd>{pebblerRow.pebbles}</TableTd>
                                <TableTd>{pebblerRow.qp}</TableTd>
                                <TableTd>{pebblerRow.away_played + pebblerRow.home_played}</TableTd>
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
        </>
    )
}
