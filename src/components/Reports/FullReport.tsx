import { FC, Fragment } from "react";
import { Text, Title, Stack } from "@mantine/core";
import { Report } from "@/types/reports";

export const FullReport: FC<{ article: Report }> = ({ article }) => {
    const content = article.content.replace(/(\*[^*]+\*)/g, "")

    return (
        <Stack w={1000} align="center" mt="sm" mb="lg">
            <Title ta="center">{article.title.replace(/^\*+|\*+$/g, "")}</Title>
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
