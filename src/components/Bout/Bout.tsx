import { FC } from "react";
import { Badge, Card, CardSection, CheckIcon, Flex, Radio, Text } from "@mantine/core"

interface PebblerStats {
    name: string;
    rank: number;
    trait: string;
    quirk: string;
    quirkActivated: boolean;
    ability: string;
    abilityTriggered: boolean;
    roll: number | null;
    rollHalf: number | null;
    rollFinal: number | null;
    score: number | null;
}

interface BoutProps {
    division: string;
    time: Date;
    awayPebbler: PebblerStats;
    homePebbler: PebblerStats;
}

interface BoutLineProps {
    rank: number;
    name: string;
    score: number | null;
    pips: number | null;
    quirkActivated: boolean;
    abilityTriggered: boolean;
}

export const Bout: FC<BoutProps> = ({
    division,
    time,
    awayPebbler,
    homePebbler,
}) => {
    const BoutLine: FC<BoutLineProps> = ({ rank, name, score, pips, quirkActivated, abilityTriggered }) => {
        const displayRight: boolean = pips !== null;
        return (
            <Flex justify="space-between">
                <Flex gap="xs">
                    <Text w={10} span c="orange" size="sm">{rank}</Text>
                    <Text span size="sm">{name}</Text>
                </Flex>

                {displayRight && (
                    <Flex gap="xs">
                        <Radio color="purple" iconColor="purple" size="xs" checked={quirkActivated} readOnly />
                        {division !== "Learner" && (
                            <Radio color="pink" iconColor="pink" size="xs" checked={abilityTriggered} readOnly />
                        )}
                        <Text w={5} span size="sm">{pips}</Text>
                        <Text w={20} span size="sm">{"+"}{score}</Text>
                    </Flex>
                )}
            </Flex>
        )
    }


    const hasTimePassed: boolean = time.getTime() < Date.now();
    const hasBoutOccurred: boolean = awayPebbler.roll !== null && homePebbler.roll !== null;
    const timeDisplay: string = hasTimePassed ? (hasBoutOccurred ? "FINAL" : "LIVE 🔴") :
        time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const colorMap: { [key: string]: string } = {
        "Master": "red",
        "All-Star": "blue",
        "Professional": "gray",
        "Learner": "yellow",
    };

    return (
        <Card w={225} withBorder>
            <CardSection>
                <Flex justify={"space-between"} align="center">
                    <Badge w={125} color={colorMap[division]}>{division}</Badge>
                    <span>{timeDisplay}</span>
                </Flex>
            </CardSection>

            <CardSection>
                {[awayPebbler, homePebbler].map((p, i) => (
                    <BoutLine
                        key={i}
                        rank={p.rank}
                        name={p.name}
                        score={p.score}
                        pips={p.rollFinal}
                        quirkActivated={p.quirkActivated}
                        abilityTriggered={p.abilityTriggered}
                    />
                ))}
            </CardSection>
        </Card>
    );
};
