import { FC } from "react";
import { Badge, Card, Flex, Stack, Text } from "@mantine/core";
import { IconArrowsUp, IconArrowsDown, IconArrowsRightLeft } from "@tabler/icons-react";
import { colorMap, divisions, PROMOTE_DEMOTE, PEBBLERS_PER_DIVISION } from "@/vars";
import { theme } from "@/theme";

export const RankingSummary: FC<{ division: string, rank: number, dateString: string }> = ({ division, rank, dateString }) => {
    let divisionIndex = -1
    for (let i = 0; i < divisions.length; i++) {
        if (division === divisions[i]) {
            divisionIndex = i
            break
        }
    }

    return (
        <Card
            w={300}
            radius="lg"
            withBorder
        >
            <Stack gap="xl">
                <Flex justify="space-between">
                    <Text>
                        {dateString}
                    </Text>

                    <Text c="orange">
                        Rank: {rank}
                    </Text>
                </Flex>

                {divisionIndex !== 0 && rank <= PROMOTE_DEMOTE ? (
                    <Flex align="center">
                        <Badge w={125} color={colorMap[division]}>{division}</Badge>
                        <IconArrowsUp size={32} color={theme.colors!.goodGreen![6]} />
                        <Badge w={125} color={colorMap[divisions[divisionIndex - 1]]}>{divisions[divisionIndex - 1]}</Badge>
                    </Flex>
                ) : (
                    divisionIndex !== divisions.length - 1 && rank >= PEBBLERS_PER_DIVISION - PROMOTE_DEMOTE + 1 ? (
                        <Flex align="center">
                            <Badge w={125} color={colorMap[division]}>{division}</Badge>
                            <IconArrowsDown size={32} color={theme.colors!.alarmRed![6]} />
                            <Badge w={125} color={colorMap[divisions[divisionIndex + 1]]}>{divisions[divisionIndex + 1]}</Badge>
                        </Flex>
                    ) : (
                        <Flex align="center">
                            <Badge w={125} color={colorMap[division]}>{division}</Badge>
                            <IconArrowsRightLeft size={32} color={theme.colors!.midBlue![6]} />
                            <Badge w={125} color={colorMap[division]}>{division}</Badge>
                        </Flex>
                    )
                )}
            </Stack>
        </Card>
    );
}