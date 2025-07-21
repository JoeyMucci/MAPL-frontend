"use client"

import { FC } from "react";
import { Container, Image, Stack, Title } from "@mantine/core";
import { toCamelCase } from "@/functions";
import classes from "./Header.module.css";

export const BasicHeader: FC<{ identifier: string, dir: string }> = ({ identifier, dir }) => {
    const imageName: string = toCamelCase(identifier);

    return (
        <Container fluid className={classes.header} pb="md">
            <Stack ta="center" align="center">
                <Title order={1}>
                    {identifier}
                </Title>
                <Image
                    src={"/" + dir + "/" + imageName + ".png"}
                    alt={"Image of " + identifier + " the author"}
                    w={300}
                    h={300}
                />
            </Stack>
        </Container>
    )
}