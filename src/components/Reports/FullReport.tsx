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
    // article.content = article.content.replace(/(\*+)/g, "*")
    // article.content = article.content.replace(/(\*[^*]+\*)/g, "")
    // article.content = article.content.replace(/^\s+/, "")

    // article.title = article.title.replace(/\r?\n|\r/g, "")
    // article.title = article.title.replace(/^.*\*\*(.*)\*\*.*$/g, "$1")
    // article.title = article.title.replace(/^\*+|\*+$/g, "")
    // article.title = article.title.replace(/^\"+|\"+$/g, "")
    // article.title = article.title.replace(/^\'+|\'+$/g, "")
    // article.title = article.title.replace(/^.*\*\*(.*)\*\*.*$/, "$1");

    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen


    return (
        <Stack w={largeScreen ? 1000 : 300} align="center" gap={0} mt="sm" mb="lg">
            <Stack gap={0} align="center">
                <Title ta="center">{article.title}</Title>
                <Flex
                    onClick={() => router.push(`/reports/authors/${toCamelCase(article.author)}`)}
                    className={classes.cursorPointer}
                    align="center"
                >
                    <Image
                        src={"/authors/" + toCamelCase(article.author) + ".png"}
                        alt={"Image of " + article.author + " the reporter"}
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
                    article.content
                        .split(/\n{2,}/)
                        .map((paragraph, idx) => (
                            <Fragment key={idx}>
                                <span>{"         "}{paragraph.trim()}</span>
                                {idx < article.content.split(/\n{2,}/).length - 1 && <><br /><br /></>}
                            </Fragment>
                        ))
                }
            </Text>
        </Stack>
    )
}
