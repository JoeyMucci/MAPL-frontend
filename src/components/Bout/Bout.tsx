import { FC } from "react";
import { Anchor, Badge, Card, CardSection, Flex, Radio, Text } from "@mantine/core"
import { SimpleBout } from "@/types/bouts";
import { SimplePebbler } from "@/types/pebblers";
import { SimplePebblerStats } from "@/types/stats";
import { colorMap } from "@/vars";
import { toCamelCase } from "@/functions/pebblers";

interface BoutLineProps {
    pebbler: SimplePebbler;
    stats: SimplePebblerStats;
    hasBoutOccurred: boolean;
}

export const Bout: FC<{ bout: SimpleBout }> = ({ bout }) => {
    const BoutLine: FC<BoutLineProps> = ({ pebbler, stats, hasBoutOccurred }) => {
        return (
            <Flex justify="space-between">
                <Flex gap="xs" align="center">
                    <Text w={10} span c="orange" size="sm">{pebbler.current_rank}</Text>
                    <Anchor href={`/pebblers/${toCamelCase(pebbler.name)}`} c="black" underline="hover">
                        <Text span size="sm" >{pebbler.name}</Text>
                    </Anchor>
                </Flex>

                {hasBoutOccurred && (
                    <Flex gap="xs" align="center">
                        <Radio color="purple" iconColor="purple" size="xs" checked={stats.quirk_activated} readOnly />
                        {bout.division !== "Learner" && (
                            <Radio color="pink" iconColor="pink" size="xs" checked={stats.ability_triggered} readOnly />
                        )}
                        <Text w={5} span size="sm">{stats.roll_final}</Text>
                        <Text w={25} span size="sm">{"+"}{stats.score}</Text>
                    </Flex>
                )}
            </Flex>
        )
    }

    const awayStats: SimplePebblerStats = {
        quirk_activated: bout.away_quirk,
        ability_triggered: bout.away_ability,
        roll_final: bout.away_roll_final,
        score: bout.away_score,
    }

    const homeStats: SimplePebblerStats = {
        quirk_activated: bout.home_quirk,
        ability_triggered: bout.home_ability,
        roll_final: bout.home_roll_final,
        score: bout.home_score,
    }

    const hasTimePassed: boolean = new Date(bout.time).getTime() < Date.now();
    const hasBoutOccurred: boolean = bout.away_roll_final !== null && bout.home_roll_final !== null;
    const timeDisplay: string = hasTimePassed ? (hasBoutOccurred ? "FINAL" : "LIVE 🔴") :
        new Date(bout.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    return (
        <Card w={225} withBorder>
            <CardSection>
                <Flex justify={"space-between"} align="center">
                    <Badge w={125} color={colorMap[bout.division]}>{bout.division}</Badge>
                    <Text span>{timeDisplay}</Text>
                </Flex>
            </CardSection>

            <CardSection>
                <BoutLine
                    pebbler={bout.away}
                    stats={awayStats}
                    hasBoutOccurred={hasBoutOccurred}
                />
                <BoutLine
                    pebbler={bout.home}
                    stats={homeStats}
                    hasBoutOccurred={hasBoutOccurred}
                />
            </CardSection>
        </Card>
    );
};
