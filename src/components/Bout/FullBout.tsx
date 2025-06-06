import { FC } from "react"
import { ComplicatedBout } from "@/types/bouts"
import { Card, Flex, Image, ScrollArea, Text } from "@mantine/core"
import { toCamelCase } from "@/functions/pebblers"

export const FullBout: FC<{ bout: ComplicatedBout }> = ({ bout }) => {
    const awayPebbler = bout.away
    const homePebbler = bout.home

    const bullets = [
        `${bout.month.toString().padStart(2, "0")}/${bout.day.toString().padStart(2, "0")}/${bout.year}`,
        `${awayPebbler.name} rolled a ${bout.away_roll} with a ${awayPebbler.trait} die`,
        `${homePebbler.name} rolled a ${bout.home_roll} with a ${homePebbler.trait} die`,
        `Bout Status: ${bout.away_roll} - ${bout.home_roll}`,
    ]

    if (bout.away_quirk) {
        bullets.push(`${awayPebbler.name} activates their ${awayPebbler.quirk} quirk!`)
    }

    if (bout.home_quirk) {
        bullets.push(`${homePebbler.name} activates their ${homePebbler.quirk} quirk!`)
    }

    if (bout.away_ability) {
        bullets.push(`${awayPebbler.name} triggers their ${awayPebbler.ability} ability!`)
        bullets.push(`Bout Status: ${bout.away_roll_half} - ${bout.home_roll_half}`)
    }

    if (bout.home_ability) {
        bullets.push(`${homePebbler.name} triggers their ${homePebbler.ability} ability!`)
        bullets.push(`Bout Status: ${bout.away_roll_final} - ${bout.home_roll_final}`)
    }

    bullets.push(`${awayPebbler.name} gains ${bout.away_score} pebble${bout.away_score !== 1 ? "s" : ""}`)
    bullets.push(`${homePebbler.name} gains ${bout.home_score} pebble${bout.home_score !== 1 ? "s" : ""}`)

    return (
        <Card h={300} w={1000} radius="md" withBorder>
            <Flex justify="space-between" mt="xl">
                <Image
                    src={"/pebblers/" + toCamelCase(awayPebbler.name) + ".png"}
                    alt={"Image of " + awayPebbler.name + " the pebbler"}
                    h={200}
                    w={200}
                />
                <ScrollArea>
                    {bullets.map((bull, i) => (
                        <Text key={i}>{bull}</Text>
                    ))}
                </ScrollArea>
                <Image
                    src={"/pebblers/" + toCamelCase(homePebbler.name) + ".png"}
                    alt={"Image of " + homePebbler.name + " the pebbler"}
                    h={200}
                    w={200}
                />
            </Flex>
        </Card>
    )
}