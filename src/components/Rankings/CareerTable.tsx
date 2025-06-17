import { FC } from 'react';
import { Text, Table, TableThead, TableTr, TableTd, TableTbody, Tooltip } from '@mantine/core';
import { CareerSummary } from '@/types/stats';
import { divisions } from '@/vars';

export const CareerTable: FC<{ careerSummaryEntry: CareerSummary }> = ({ careerSummaryEntry }) => {
    return (
        <>
            <Text ta="center">{careerSummaryEntry.cnt} Completed Performance{careerSummaryEntry.cnt === 1 ? "" : "s"}</Text>
            <Table w={300} ta="center" striped withTableBorder>
                <TableThead>
                    <TableTr ta="center" fw={700}>
                        <TableTd>Stat</TableTd>
                        <TableTd>Best</TableTd>
                        <TableTd>Average</TableTd>
                        <TableTd>Worst</TableTd>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    <TableTr>
                        <TableTd>Rank</TableTd>
                        <TableTd>{careerSummaryEntry.best_rank}</TableTd>
                        <TableTd>{careerSummaryEntry.avg_rank.toFixed(2)}</TableTd>
                        <TableTd>{careerSummaryEntry.worst_rank}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd>Pebbles</TableTd>
                        <TableTd>{careerSummaryEntry.best_pebbles}</TableTd>
                        <TableTd>{careerSummaryEntry.avg_pebbles.toFixed(2)}</TableTd>
                        <TableTd>{careerSummaryEntry.worst_pebbles}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd>Wins</TableTd>
                        <TableTd>{careerSummaryEntry.best_wins}</TableTd>
                        <TableTd>{careerSummaryEntry.avg_wins.toFixed(2)}</TableTd>
                        <TableTd>{careerSummaryEntry.worst_wins}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd>Losses</TableTd>
                        <TableTd>{careerSummaryEntry.best_losses}</TableTd>
                        <TableTd>{careerSummaryEntry.avg_losses.toFixed(2)}</TableTd>
                        <TableTd>{careerSummaryEntry.worst_losses}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd>
                            <Tooltip
                                color="orange"
                                position="left"
                                transitionProps={{
                                    transition: 'fade-left',
                                    duration: 300,
                                }}
                                label="Pips For"
                                withArrow
                            >
                                <span>PF</span>
                            </Tooltip>
                        </TableTd>
                        <TableTd>{careerSummaryEntry.best_pf}</TableTd>
                        <TableTd>{careerSummaryEntry.avg_pf.toFixed(2)}</TableTd>
                        <TableTd>{careerSummaryEntry.worst_pf}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd>
                            <Tooltip
                                color="orange"
                                position="left"
                                transitionProps={{
                                    transition: 'fade-left',
                                    duration: 300,
                                }}
                                label="Pips Against"
                                withArrow
                            >
                                <span>PA</span>
                            </Tooltip>
                        </TableTd>
                        <TableTd>{careerSummaryEntry.best_pa}</TableTd>
                        <TableTd>{careerSummaryEntry.avg_pa.toFixed(2)}</TableTd>
                        <TableTd>{careerSummaryEntry.worst_pa}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd>
                            <Tooltip
                                color="orange"
                                position="left"
                                transitionProps={{
                                    transition: 'fade-left',
                                    duration: 300,
                                }}
                                label="Pip Difference"
                                withArrow
                            >
                                <span>PD</span>
                            </Tooltip>
                        </TableTd>
                        <TableTd>{careerSummaryEntry.best_pd}</TableTd>
                        <TableTd>{careerSummaryEntry.avg_pd.toFixed(2)}</TableTd>
                        <TableTd>{careerSummaryEntry.worst_pd}</TableTd>
                    </TableTr>
                    <TableTr>
                        <TableTd>
                            <Tooltip
                                color="orange"
                                position="left"
                                transitionProps={{
                                    transition: 'fade-left',
                                    duration: 300,
                                }}
                                label="Quirk Pebbles"
                                withArrow
                            >
                                <span>QP</span>
                            </Tooltip>
                        </TableTd>
                        <TableTd>{careerSummaryEntry.best_qp}</TableTd>
                        <TableTd>{careerSummaryEntry.avg_qp.toFixed(2)}</TableTd>
                        <TableTd>{careerSummaryEntry.worst_qp}</TableTd>
                    </TableTr>
                    {careerSummaryEntry.division !== divisions[divisions.length - 1] && (
                        <TableTr>
                            <TableTd>
                                <Tooltip
                                    color="orange"
                                    position="left"
                                    transitionProps={{
                                        transition: 'fade-left',
                                        duration: 300,
                                    }}
                                    label="Ability Triggers"
                                    withArrow
                                >
                                    <span>AT</span>
                                </Tooltip>
                            </TableTd>
                            <TableTd>{careerSummaryEntry.best_at}</TableTd>
                            <TableTd>{careerSummaryEntry.avg_at.toFixed(2)}</TableTd>
                            <TableTd>{careerSummaryEntry.worst_at}</TableTd>
                        </TableTr>
                    )}
                </TableTbody>
            </Table>
        </>
    )
}
