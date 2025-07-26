"use client"

import { Card, Center, Stack, Flex, Anchor, Image, Title, Badge, Text, Tooltip, rem } from "@mantine/core";
import { toCamelCase } from "@/functions";
import { colorMap, traitDescMap, quirkDescMap, abilityActionMap, abilityDescMap } from "@/vars";
import { IconBoltFilled, IconCircuitResistor, IconDropletFilled, IconShieldFilled, IconSparkles, IconSwords } from "@tabler/icons-react";
import { theme } from "@/theme";
import classes from "./Bout.module.css";

export const CoolBout = () => (
    <Card w={1000} radius="md" style={{ minHeight: 300 }} bg="orange">
        <Center>
            <Stack align="center" gap={rem(4)} mb="lg">
                <Flex gap="md">
                    <Anchor href={`/pebblers/${toCamelCase("Gregory")}`} c="black" underline="hover">
                        <Title order={2} w={200} ta="right">{"Gregory"}</Title>
                    </Anchor>
                    <Title order={2}>@</Title>
                    <Anchor href={`/pebblers/${toCamelCase("Marcel")}`} c="black" underline="hover">
                        <Title order={2} w={200} ta="left">{"Marcel"}</Title>
                    </Anchor>
                </Flex>
                <Badge w={125} color={colorMap["Master"]}>{"Master"}</Badge>
                <Title ta="left" order={4}>
                    6/5/2025
                </Title>
            </Stack>
        </Center>
        <Flex align="center" justify="space-between" style={{ minHeight: 300 }}>
            <Stack align="center">
                <Anchor href={`/pebblers/${toCamelCase("Gregory")}`}>
                    <Image
                        src={"/pebblers/" + toCamelCase("Gregory") + ".png"}
                        alt={"Image of " + "Gregory" + " the pebbler"}
                        h={200}
                        w={200}
                    />
                </Anchor>
            </Stack>
            <Stack w={550} gap="xs">
                <Flex justify="flex-start" gap={rem(4)}>
                    <Text span>{"Gregory"} rolls a 1 with</Text>
                    <Tooltip
                        label={traitDescMap["Skill"]}
                        color={colorMap["Skill"]}
                        transitionProps={{ transition: 'fade-up', duration: 300 }}
                    >
                        <Flex gap={rem(4)}>
                            <IconDropletFilled color={colorMap["Skill"]} />
                            {"Skill"}
                        </Flex>
                    </Tooltip>
                </Flex>

                <Flex justify="flex-end" gap={rem(4)}>
                    <Text span>{"Marcel"} rolls a 3 with</Text>
                    <Tooltip
                        label={traitDescMap["Speed"]}
                        color={colorMap["Speed"]}
                        transitionProps={{ transition: 'fade-up', duration: 300 }}
                    >
                        <Flex gap={rem(4)}>
                            <IconBoltFilled color={colorMap["Speed"]} />
                            {"Speed"}
                        </Flex>
                    </Tooltip>
                </Flex>

                <Text ta="center" size="xl">1-3</Text>

                <Flex justify="flex-start" gap={rem(4)}>
                    <Text span>{"Gregory"} gains 2 pebbles with</Text>
                    <Tooltip
                        label={quirkDescMap["Even Temper"]}
                        color={theme.colors!.purple![6]}
                        transitionProps={{ transition: 'fade-up', duration: 300 }}

                    >
                        <Flex gap={rem(4)}>
                            <IconCircuitResistor color={theme.colors!.purple![6]} />
                            {"Even Temper"}
                        </Flex>
                    </Tooltip>
                </Flex>

                <Flex justify="flex-end" gap={rem(4)}>
                    <Text span>{"Marcel"} gains 2 pebbles with</Text>
                    <Tooltip
                        label={quirkDescMap["Untouchable"]}
                        color={theme.colors!.purple![6]}
                        transitionProps={{ transition: 'fade-up', duration: 300 }}
                    >
                        <Flex gap={rem(4)}>
                            <IconShieldFilled color={theme.colors!.purple![6]} />
                            {"Untouchable"}
                        </Flex>
                    </Tooltip>
                </Flex>

                <>
                    <Flex justify="flex-start" gap={rem(4)}>
                        <Text span>{"Gregory"} {abilityActionMap["Miracle"]} with</Text>
                        <Tooltip
                            label={abilityDescMap["Miracle"]}
                            color={theme.colors!.pink![6]}
                            transitionProps={{ transition: 'fade-up', duration: 300 }}
                        >
                            <Flex gap={rem(4)}>
                                <IconSparkles color={theme.colors!.pink![6]} />
                                {"Miracle"}
                            </Flex>
                        </Tooltip>
                    </Flex>
                    <Text ta="center" size="xl">3-3</Text>
                </>

                <>
                    <Flex justify="flex-end" gap={rem(4)}>
                        <Text span>{"Marcel"} {abilityActionMap["Will to Win"]} with</Text>
                        <Tooltip
                            label={abilityDescMap["Will to Win"]}
                            color={theme.colors!.pink![6]}
                            transitionProps={{ transition: 'fade-up', duration: 300 }}
                        >
                            <Flex gap={rem(4)}>
                                <IconSwords color={theme.colors!.pink![6]} />
                                {"Will to Win"}
                            </Flex>
                        </Tooltip>
                    </Flex>
                    <Text ta="center" size="xl">3-6</Text>
                </>

                <Text ta="right">{"Marcel"} gains {27} pebbles from {"winning"}</Text>

            </Stack>
            <Stack align="center">
                <Anchor href={`/pebblers/${toCamelCase("Marcel")}`}>
                    <Image
                        className={classes.flipY}
                        src={"/pebblers/" + toCamelCase("Marcel") + ".png"}
                        alt={"Image of " + "Marcel" + " the pebbler"}
                        h={200}
                        w={200}
                    />
                </Anchor>
            </Stack>
        </Flex>
    </Card >
)