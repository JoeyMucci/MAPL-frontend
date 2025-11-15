"use client"

import { Anchor, Badge, Card, CardSection, Flex, Radio, Stack, Text, Image, Tooltip } from "@mantine/core"
import { colorMap, divisions } from "@/vars";
import { toCamelCase } from "@/functions";
import { theme } from "@/theme";
import classes from "./Bout.module.css";

export const CoolBoutSmall = () => {
    const timeDisplay: string = "6/5/2025"

    return (
        <Card
            w={250}
            radius="lg"
            onClick={() => window.location.href = `/bouts/example`}
            className={`${classes.cursorPointer} ${classes.orangeHover}`}
        >
            <CardSection>
                <Flex justify={"space-between"} align="center">
                    <Badge w={125} color={colorMap["Master"]} ml="xs">{"Master"}</Badge>
                    <Text span mr="xs">{timeDisplay}</Text>
                </Flex>
            </CardSection>

            <CardSection>
                <Stack gap="sm">
                    <Flex justify="space-between">
                        <Flex gap="xs" align="center">
                            <Anchor href={`/pebblers/${toCamelCase("Gregory")}`}>
                                <Image
                                    ml={12}
                                    src={"/pebblers/" + toCamelCase("Gregory") + ".png"}
                                    alt={"Image of " + "Gregory" + " the pebbler"}
                                    h={25}
                                    w={25}
                                />
                            </Anchor>
                            <Anchor href={`/pebblers/${toCamelCase("Gregory")}`} c="black" underline="hover">
                                <Text span size="sm" >{"Gregory"}</Text>
                            </Anchor>
                        </Flex>

                        <Flex gap="xs" align="center">
                            <Tooltip
                                label={"Quirk Activated"}
                                color={theme.colors!.purple![6]}
                                position={"top"}
                                transitionProps={{ transition: 'fade-up', duration: 300 }}
                            >
                                <Radio color={theme.colors!.purple![6]} iconColor={theme.colors!.purple![6]} size="xs" checked={true} readOnly />
                            </Tooltip>
                            {"Master" !== divisions[divisions.length - 1] && (
                                <Tooltip
                                    label={"Ability Triggered"}
                                    color={theme.colors!.pink![6]}
                                    position={"top"}
                                    transitionProps={{ transition: 'fade-up', duration: 300 }}
                                >
                                    <Radio color={theme.colors!.pink![6]} iconColor={theme.colors!.pink![6]} size="xs" checked={true} readOnly />
                                </Tooltip>
                            )}
                            <Text w={5} span size="sm">{3}</Text>
                            <Text w={25} span size="sm">{"+"}{2}</Text>
                        </Flex>
                    </Flex>
                    <Flex justify="space-between">
                        <Flex gap="xs" align="center">
                            <Anchor href={`/pebblers/${toCamelCase("Marcel")}`}>
                                <Image
                                    ml={12}
                                    src={"/pebblers/" + toCamelCase("Marcel") + ".png"}
                                    alt={"Image of " + "Marcel" + " the pebbler"}
                                    h={25}
                                    w={25}
                                />
                            </Anchor>
                            <Anchor href={`/pebblers/${toCamelCase("Marcel")}`} c="black" underline="hover">
                                <Text span size="sm" >{"Marcel"}</Text>
                            </Anchor>
                        </Flex>

                        <Flex gap="xs" align="center">
                            <Tooltip
                                label={"Quirk Activated"}
                                color={theme.colors!.purple![6]}
                                position={"bottom"}
                                transitionProps={{ transition: 'fade-down', duration: 300 }}
                            >
                                <Radio color={theme.colors!.purple![6]} iconColor={theme.colors!.purple![6]} size="xs" checked={true} readOnly />
                            </Tooltip>
                            {"Master" !== divisions[divisions.length - 1] && (
                                <Tooltip
                                    label={"Ability Triggered"}
                                    color={theme.colors!.pink![6]}
                                    position={"bottom"}
                                    transitionProps={{ transition: 'fade-down', duration: 300 }}
                                >
                                    <Radio color={theme.colors!.pink![6]} iconColor={theme.colors!.pink![6]} size="xs" checked={true} readOnly />
                                </Tooltip>
                            )}
                            <Text w={5} span size="sm">{6}</Text>
                            <Text w={25} span size="sm">{"+"}{29}</Text>
                        </Flex>
                    </Flex>
                </Stack>
            </CardSection>
            <CardSection h={3} />
        </Card >
    )
}
