import { FC } from "react";
import { Stack, Title, Card, Flex, Text, Image, Anchor } from "@mantine/core";
import { ReportPreview } from "@/types/reports";
import { toCamelCase } from "@/functions";
import classes from "./Report.module.css";

export const SmallReport: FC<{ article: ReportPreview }> = ({ article }) => {
    if(!article.id) {
        return (
            <Card
                bg="orange"
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
                        <Anchor href={`/reports/${toCamelCase(article.author)}`} c="black" underline="hover">
                            <Text>{article.author}</Text>
                        </Anchor>
                        <Anchor href={`/reports/${toCamelCase(article.author)}`}>
                            <Image
                                src={"/reporters/" + toCamelCase(article.author) + ".png"}
                                alt={"Image of " + article.author + " the reporter"}
                                h={35}
                                w={35}
                            />
                        </Anchor>
                    </Flex>
                    <Text c="midBlue" ta="center" size="xl" mt={50}>Coming Soon ✍️</Text>
                </Stack>
            </Card>
        )
    }


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
                    <Anchor href={`/reports/${toCamelCase(article.author)}`} c="black" underline="hover">
                        <Text>{article.author}</Text>
                    </Anchor>
                    <Anchor href={`/reports/${toCamelCase(article.author)}`}>
                        <Image
                            src={"/reporters/" + toCamelCase(article.author) + ".png"}
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
