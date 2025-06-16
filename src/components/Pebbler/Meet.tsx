import { FC } from "react";
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
import axios from "axios";

export const Meet: FC<{ pebblerName: string }> = async ({ pebblerName }) => {
    async function fetchPebbler() {
        try {
            console.log("Fetching personal pebbler information...");
            const response = await axios.get(`http://127.0.0.1:8000/api/pebblers/personal/${pebblerName}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }

    const pebbler: PersonalPebbler = await fetchPebbler();

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
            iconColor: "purple",
            label: quirkDescMap[pebbler.quirk]
        },
        {
            attribute: "Ability",
            value: pebbler.ability,
            Icon: abilityMap[pebbler.ability],
            iconColor: "pink",
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
                            <Tooltip label={datum.label} color={datum.iconColor}>
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
