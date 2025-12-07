import { FC } from "react";
import { Stack, Title, Card, Flex, Text, Image, Anchor } from "@mantine/core";
import { ReportPreview } from "@/types/reports";
import { toCamelCase } from "@/functions";
import classes from "./Report.module.css";

export const SmallReport: FC<{ article: ReportPreview }> = ({ article }) => {
    // article.title = article.title.replace(/\r?\n|\r/g, "")
    // article.title = article.title.replace(/^.*\*\*(.*)\*\*.*$/g, "$1")
    // article.title = article.title.replace(/^\*+|\*+$/g, "")
    // article.title = article.title.replace(/^\"+|\"+$/g, "")
    // article.title = article.title.replace(/^\'+|\'+$/g, "")

    return (
        <Card
            onClick={() => window.location.href = `/reports/${article.id}`}
            className={`${classes.cursorPointer} ${classes.orangeHover}`}
            w={300}
            h={250}
            px={20}
            py={20}
            withBorder
            radius="md"
        >
            <Stack w={260} h={250} gap={0}>
                <Text ta="center" h={35} fw={700}>{article.month}/{article.day}/{article.year}</Text>
                <Flex
                    justify="space-between"
                    align="center"
                    h={35}
                >
                    <Anchor href={`/reports/authors/${toCamelCase(article.author)}`} c="black" underline="hover">
                        <Text>{article.author}</Text>
                    </Anchor>
                    <Anchor href={`/reports/authors/${toCamelCase(article.author)}`}>
                        <Image
                            src={"/authors/" + toCamelCase(article.author) + ".png"}
                            alt={"Image of " + article.author + " the reporter"}
                            h={35}
                            w={35}
                        />
                    </Anchor>
                </Flex>
                <Stack h={180} justify="center">
                    <Title
                        ta="center"
                        order={5}
                    >
                        {article.title}
                    </Title>
                </Stack>
            </Stack>
        </Card>
    )
}
