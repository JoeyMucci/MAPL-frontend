"use client"

import { FC, Fragment } from "react";
import { Text, Title, Stack, Flex, Image, Space } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Report } from "@/types/reports";
import { useRouter } from "next/navigation";
import { toCamelCase } from "@/functions";
import classes from "./Report.module.css";

export const FullReport: FC<{ article: Report }> = ({ article }) => {
    const router = useRouter()
    const content = article.content.replace(/(\*[^*]+\*)/g, "")

    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    return (
        <Stack w={largeScreen ? 1000 : 300} align="center" gap={0} mt="sm" mb="lg">
            <Stack gap={0} align="center">
                <Title ta="center">{article.title.replace(/^\*+|\*+$/g, "")}</Title>
                <Flex
                    onClick={() => router.push(`/reports/authors/${toCamelCase(article.author)}`)}
                    className={classes.cursorPointer}
                    align="center"
                >
                    {/* <Text>Written By:</Text>
                    <Space w={5} /> */}
                    <Image
                        src={"/authors/" + toCamelCase(article.author) + ".png"}
                        alt={"Image of " + article.author + " the author"}
                        h={35}
                        w={35}
                    />
                    <Text>{article.author}</Text>
                    <Space w={45} />
                    <Text>{article.month}/{article.day}/{article.year}</Text>
                </Flex>
                <Space h={5} />
            </Stack>
            <Text style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {
                    content
                        .split(/\n{2,}/)
                        .map((paragraph, idx) => (
                            <Fragment key={idx}>
                                <span>{"         "}{paragraph.trim()}</span>
                                {idx < content.split(/\n{2,}/).length - 1 && <><br /><br /></>}
                            </Fragment>
                        ))
                }
            </Text>
        </Stack>
    )
}
