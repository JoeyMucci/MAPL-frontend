"use client"

import { FC } from "react";
import { Center, Container, Flex, Image, Stack, Text, Title, Badge } from "@mantine/core";
import { toCamelCase } from "@/functions";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./Header.module.css";

export const AuthorHeader: FC<{ author: string, description: string }> = ({ author, description }) => {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen
    const imageName: string = toCamelCase(author);

    const MainInfo: FC<{ author: string, description: string }> = ({ author, description }) => (
        <>
            <Stack ta="center">
                <Title order={1}>
                    {author}
                </Title>
                <Image
                    src={"/authors/" + imageName + ".png"}
                    alt={"Image of " + author + " the author"}
                    width={300}
                    height={300}
                />
            </Stack>

            <Text ta="center" w={300}>{description}</Text>
        </>
    )

    return (
        <Container fluid className={classes.header} pb="md">
            <Stack>
                {largeScreen ? (
                    <Flex justify="space-evenly" align="center">
                        <MainInfo author={author} description={description} />
                    </Flex>

                ) : (
                    <Center>
                        <Stack w={300}>
                            <MainInfo author={author} description={description} />
                        </Stack>
                    </Center>
                )}
            </Stack>
        </Container>
    )
}