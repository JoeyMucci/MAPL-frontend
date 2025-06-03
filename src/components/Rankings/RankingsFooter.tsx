import { FC } from "react";
import { divisions } from "@/vars/divisions";
import { Title, Stack, Badge, Flex } from "@mantine/core";
import classes from "./Rankings.module.css"

export const RankingsFooter: FC<{ division: string }> = ({ division }) => {
    let divisionIndex = -1
    for (let i = 0; i < divisions.length; i++) {
        if (division === divisions[i]) {
            divisionIndex = i
            break
        }
    }

    return (
        <Stack>
            <Title order={3}>
                Promotion & Demotion Key
            </Title>
            <Flex gap="lg" mb="md">
                {divisionIndex !== 0 && (
                    <Badge radius="xs" py="md" className={classes.promotion} color="white" style={{ color: "black" }}>
                        Promotion to {divisions[divisionIndex - 1]} division
                    </Badge>
                )}
                {divisionIndex !== divisions.length - 1 && (
                    <Badge radius="xs" py="md" className={classes.demotion} color="white" style={{ color: "black" }}>
                        Demotion to {divisions[divisionIndex + 1]} division
                    </Badge>
                )}
            </Flex>
        </Stack>
    )
}