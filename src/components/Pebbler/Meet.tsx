"use client"

import { FC, useState, useEffect } from "react";
import { PersonalPebbler } from "@/types/pebblers";
import { Flex, Text, Title, Stack, Card, Tooltip } from "@mantine/core";
import {
    traitMap,
    quirkMap,
    abilityMap,
    colorMap,
    traitDescMap,
    quirkDescMap,
    abilityDescMap
} from "@/vars";
import { theme } from "@/theme";
import axios from "axios";

export const Meet: FC<{ pebblerName: string }> = ({ pebblerName }) => {
    

    const [pebbler, setPebbler] = useState<PersonalPebbler | null>(null)
    const [isReady, setIsReady] = useState<boolean>(false)

    useEffect(() => {
        async function fetchPebbler() {
            try {
                console.log("Fetching personal pebbler information...");
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pebblers/personal/${pebblerName}`);
                return response.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                return {};
            }
        }

        fetchPebbler().then((data) => {
            setPebbler(data)
            setIsReady(true)
        })
    }, [pebblerName])

    if(!isReady) {
        return <></>
    }

    if(!pebbler) {
        return <>error</>
    }

    const displayData = [
        {
            attribute: "Trait",
            value: pebbler.trait,
            Icon: traitMap[pebbler.trait],
            iconColor: colorMap[pebbler.trait],
            label: traitDescMap[pebbler.trait]
        },
        {
            attribute: "Quirk",
            value: pebbler.quirk,
            Icon: quirkMap[pebbler.quirk],
            iconColor: theme.colors!.purple![6],
            label: quirkDescMap[pebbler.quirk]
        },
        {
            attribute: "Ability",
            value: pebbler.ability,
            Icon: abilityMap[pebbler.ability],
            iconColor: theme.colors!.pink![6],
            label: abilityDescMap[pebbler.ability]
        },
    ];

    return (
        <Flex wrap="wrap" align="center" justify="space-evenly" mt="md">
            <Text size="xl" ta="center" w={300}>{pebbler.description}</Text>
            <Stack mt="md" mb="md">
                {displayData.map((datum, i) => (
                    <Card key={i} radius="md" w={300} bg="orange" px="sm">
                        <Flex align="center" justify="space-between">
                            <Text span>{datum.attribute}:</Text>
                            <Tooltip
                                label={datum.label}
                                color={datum.iconColor}
                                transitionProps={{ transition: 'fade-up', duration: 300 }}
                            >
                                <Flex align="center" gap="xs">
                                    <datum.Icon size={32} color={datum.iconColor} />
                                    <Title order={3}>{datum.value}</Title>
                                </Flex>
                            </Tooltip>
                        </Flex>
                    </Card>
                ))}

            </Stack>
        </Flex>
    );
};
