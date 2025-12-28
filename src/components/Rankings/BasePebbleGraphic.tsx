import React from "react";
import {
    Text,
    Flex,
    Space,
    Stack,
    Title,
    Card,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { theme } from "@/theme"


export const BasePebbleGraphic = () => (
    <>
        <Card withBorder>
            <Stack align="center">
                <Title ta="center">Base Pebble Scoring</Title>
                <Flex align="center">
                    <Text c="goodGreen">Win</Text>
                    <Text>:</Text>
                    <Space w={5} />
                    <Text>Roll Difference</Text>
                    <Space w={5} />
                    <Text>+</Text>
                    <Space w={5} />
                    <Text c="orange">3</Text>
                    <Space w={5} />
                    <IconArrowLeft color={theme.colors!.orange![6]} size={12} />
                    <Text c="orange" size="xs">Win Bonus</Text>
                </Flex>
                <Flex>
                    <Text c="alarmRed">Loss</Text>
                    <Text>:</Text>
                    <Space w={5} />
                    <Text>0</Text>
                </Flex>
                <Flex align="center">
                    <Text c="midBlue">Tie</Text>
                    <Text>:</Text>
                    <Space w={5} />
                    <Text c={theme.colors!.pink![6]}>2</Text>
                    <Space w={5} />
                    <IconArrowLeft color={theme.colors!.pink![6]} size={12} />
                    <Text c={theme.colors!.pink![6]} size="xs">Tie Bonus</Text>
                </Flex>
            </Stack>
        </Card>
    </>
)