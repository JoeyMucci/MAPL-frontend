import { FC } from "react";
import { PebblerRowStats } from "@/types/stats";
import {
    Anchor,
    Badge,
    Table,
    TableThead,
    TableTbody,
    TableTd,
    TableTr,
    Image,
    Flex,
    Tooltip,
    Text,
    ScrollArea,
    UnstyledButton
} from "@mantine/core"
import { toCamelCase } from "@/functions";
import { divisions } from "@/vars";
import { theme } from "@/theme"
import {
    IconArrowsUp,
    IconArrowUp,
    IconArrowsDown,
    IconArrowDown,
    IconArrowsRightLeft
} from "@tabler/icons-react";
import { colorMap } from "@/vars";
import classes from "./Rankings.module.css";

const MATCHES_PER_ROUND = 12
const FORM_THRESHOLD = 5
const PROMOTE_DEMOTE = 5
const PEBBLERS_PER_DIVISION = 25

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

    const FormWidget: FC<{ results: string }> = ({ results }) => {
        const recentResults = []
        for (let i = results.length - FORM_THRESHOLD; i < results.length; i++) {
            recentResults.push(results[i]);
        }

        return (
            <Flex justify="space-between">
                {recentResults.map((letter, i) => (
                    <Badge w={30} key={i} color={colorMap[letter]}>{letter}</Badge>
                ))}
            </Flex>
        )
    }

    const includeForm: boolean = !pebblerRows.some(row => row.form.length < FORM_THRESHOLD);

    let totalPlayed = 0
    for (let i = 0; i < pebblerRows.length; i++) {
        totalPlayed += pebblerRows[i].played
    }

    const includeRankChange: boolean = totalPlayed % (2 * MATCHES_PER_ROUND) == 0

    return (
        <>
            {!includeRankChange && <Text>*Rankings will be updated when matchday concludes</Text>}
            <ScrollArea>
                <Table striped>
                    <TableThead>
                        <TableTr ta="center" fw={700}>
                            <TableTd>Rank</TableTd>
                            <TableTd ta="left">Pebbler</TableTd>
                            <TableTd>Pebbles</TableTd>
                            <TableTd className={classes.oneLine}>Quirk Pebbles</TableTd>
                            <TableTd>Played</TableTd>
                            <TableTd>Won</TableTd>
                            <TableTd>Tied</TableTd>
                            <TableTd>Lost</TableTd>
                            <TableTd>PD</TableTd>
                            <TableTd>PF</TableTd>
                            <TableTd>PA</TableTd>
                            {includeForm && <TableTd>Form</TableTd>}
                            <TableTd>PPB</TableTd>
                            <TableTd className={classes.oneLine}>Home PPB</TableTd>
                            <TableTd className={classes.oneLine}>Away PPB</TableTd>
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
                                <TableTr
                                    key={i}
                                    ta="center"
                                    className={pebblerRow.rank <= PROMOTE_DEMOTE && division !== divisions[0] ? classes.promotion : (
                                        pebblerRow.rank >= PEBBLERS_PER_DIVISION - PROMOTE_DEMOTE + 1 &&
                                            division !== divisions[divisions.length - 1] ?
                                            classes.demotion :
                                            ""
                                    )}
                                >
                                    <TableTd w={70}>
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
                                            <Anchor href={`/pebblers/${toCamelCase(pebblerRow.pebbler)}`} c="black" underline="hover" className={classes.oneLine}>
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
                                    {includeForm && <TableTd><FormWidget results={pebblerRow.form} /></TableTd>}
                                    <TableTd>{ppb}</TableTd>
                                    <TableTd>{ppbHome}</TableTd>
                                    <TableTd>{ppbAway}</TableTd>
                                </TableTr>
                            )
                        })}
                    </TableTbody>
                </Table>
            </ScrollArea>
        </>
    )
}