import React from "react";
import {
    Text,
    Flex,
    Space,
    Stack,
    Title,
    Card,
} from "@mantine/core";

export const FullPebbleGraphic = () => (
    <>
        <Card withBorder>
            <Stack align="center">
                <Title ta="center">Full Pebble Scoring</Title>
                <Flex align="center">
                    <Text ta="center">Total Pebbles</Text>
                    <Space w={5} />
                    <Text>=</Text>
                    <Space w={5} />
                    <Text ta="center" c="purple">Quirk Pebbles</Text>
                    <Space w={5} />
                    <Text>+</Text>
                    <Space w={5} />
                    <Text>3</Text>
                    <Space w={5} />
                    <Text>*</Text>
                    <Space w={5} />
                    <Text ta="center">Base Pebbles</Text>
                </Flex>
            </Stack>
        </Card>
    </>
)