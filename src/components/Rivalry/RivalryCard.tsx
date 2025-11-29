import { FC } from "react";
import { Stack, Card, Flex, Anchor, Image, Title, ProgressRoot, ProgressSection } from "@mantine/core";
import classes from './Rivalry.module.css';
import { FullRivalryStats } from "@/types/stats";
import { divisions } from "@/vars";
import { toCamelCase } from "@/functions";
import { NoData } from "@/components/nodata";

export const RivalryCard: FC<{ stats: FullRivalryStats }> = ({ stats }) => {
    // Totals across the divisions
    let one_score = 0
    let two_score = 0
    let one_wins = 0
    let two_wins = 0
    let ties = 0

    divisions.forEach((division, _) => {
        one_score += stats.data.division_pebbles[division]?.one_score
        two_score += stats.data.division_pebbles[division]?.two_score
        one_wins += stats.data.division_wtl[division]?.one_wins
        two_wins += stats.data.division_wtl[division]?.two_wins
        ties += stats.data.division_wtl[division]?.ties
    })

    const MiddleBlock = () => {
        if (one_wins + two_wins + ties === 0) {
            return (
                <NoData mt={0}/>
            )
        }

        return (
            <Stack align='center' gap='lg'>
                <Stack align='center' gap={0}>
                    <Title order={4}> Pebbles</Title>
                    <ProgressRoot w={120}>
                        <ProgressSection value={one_score / (one_score + two_score) * 100} color='goodGreen' />
                        <ProgressSection value={two_score / (one_score + two_score) * 100} color='alarmRed' />
                    </ProgressRoot>
                </Stack>

                <Stack align='center' gap={0} >
                    <Title order={4}>Results</Title>
                    <ProgressRoot w={120}>
                        <ProgressSection value={one_wins / (one_wins + two_wins + ties) * 100} color='goodGreen' />
                        <ProgressSection value={ties / (one_wins + two_wins + ties) * 100} color='midBlue' />
                        <ProgressSection value={two_wins / (one_wins + two_wins + ties) * 100} color='alarmRed' />
                    </ProgressRoot>
                </Stack>
            </Stack>
        )
    }


    return (
        <Card
            onClick={() => window.location.href = `/rivalry/${toCamelCase(stats.one)}/${toCamelCase(stats.two)}`}
            className={`${classes.cursorPointer} ${classes.orangeHover}`}
            w={300}
            h={250}
            withBorder
            radius="md"
        >
            <Stack gap={0}>
                <Flex h={25} gap="md">
                    <Anchor href={`/pebblers/${(stats.one)}`} c="goodGreen" underline="hover">
                        <Title order={6} w={110} ta="right" c='goodGreen'>{stats.one}</Title>
                    </Anchor>
                    <Title order={6} c='midBlue'>vs.</Title>
                    <Anchor href={`/pebblers/${toCamelCase(stats.two)}`} c="alarmRed" underline="hover">
                        <Title order={6} w={110} ta="left" c='alarmRed'>{stats.two}</Title>
                    </Anchor>
                </Flex>

                <Flex h={225} align='center' justify='space-between'>
                    <Anchor href={`/pebblers/${toCamelCase(stats.one)}`}>
                        <Image
                            src={"/pebblers/" + toCamelCase(stats.one) + ".png"}
                            alt={"Image of " + stats.one + " the pebbler"}
                            h={50}
                            w={50}
                        />
                    </Anchor>

                    <MiddleBlock />

                    <Anchor href={`/pebblers/${toCamelCase(stats.two)}`}>
                        <Image
                            src={"/pebblers/" + toCamelCase(stats.two) + ".png"}
                            alt={"Image of " + stats.one + " the pebbler"}
                            className={classes.flipY}
                            h={50}
                            w={50}
                        />
                    </Anchor>
                </Flex>
            </Stack>
        </Card >
    )
}
