import React from 'react'
import { Card, Stack, Flex, Badge, Text, rem, Title } from "@mantine/core"
import { theme } from "@/theme";
import { divisions, colorMap } from "@/vars"
import {
    IconArrowUp,
    IconArrowDown,
} from "@tabler/icons-react";

export const PromotionGraphic = () => (
    <Card withBorder>
        <Title ta="center">Promotion & Demotion</Title>
        <Stack align="center" gap={rem(3)}>
            {divisions.map((div, i) => (
                <React.Fragment key={i}>
                    <Badge w={125} color={colorMap[div]}>{div}</Badge>
                    {divisions.findIndex(division => division === div) < divisions.length - 1 &&
                        <Flex align="center" gap={rem(0)}>
                            <Stack gap={rem(0)}>
                                <Text size="xs" w={100} ta="right">Bottom 5</Text>
                                <Text size="xs" w={100} ta="right">{div}</Text>
                            </Stack>
                            <IconArrowDown color={theme.colors!.alarmRed![6]} />
                            <IconArrowUp color={theme.colors!.goodGreen![6]} />
                            <Stack gap={rem(0)}>
                                <Text size="xs" w={100} ta="left">Top 5</Text>
                                <Text size="xs" w={100} ta="left">{divisions[divisions.findIndex(division => division === div) + 1]}</Text>
                            </Stack>
                        </Flex>
                    }
                </React.Fragment>
            ))}
        </Stack>
    </Card>
)