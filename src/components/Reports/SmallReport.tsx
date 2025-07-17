import { FC } from "react";
import { Stack, Title, Card, Flex, Text, Image, Anchor } from "@mantine/core";
import { Report } from "@/types/reports";
import { toCamelCase } from "@/functions";
import { useRouter } from "next/navigation";
import classes from "./Report.module.css";
import { Bout } from "../Bout/SmallBout";

export const SmallReport: FC<{ article: Report }> = ({ article }) => {
    const router = useRouter()

    return (
        <Card
            w={300}
            h={250}
            px={20}
            py={20}
            withBorder
            radius="md"
        >
            <Stack w={260} h={250} justify="space-between">
                <Text ta="center" fw={700}>{article.month}/{article.day}/{article.year}</Text>
                <Flex
                    justify="space-between"
                    align="center"
                    onClick={() => router.push(`/reports/author/${toCamelCase(article.author)}`)}
                    className={classes.cursorPointer}
                >
                    <Text>{article.author}</Text>
                    <Image
                        src={"/authors/" + toCamelCase(article.author) + ".png"}
                        alt={"Image of " + article.author + " the author"}
                        h={35}
                        w={35}
                    />
                </Flex>
                <Title
                    ta="center"
                    order={5}
                    onClick={() => router.push(`/reports/${article.id}`)}
                    className={classes.cursorPointer}
                >
                    {article.title.replace(/^\*+|\*+$/g, "")}
                </Title>
            </Stack>
        </Card>
    )
}
