import { FC } from "react"
import { MediumPebbler } from "@/types/pebblers"
import { Center, Container, Flex, Image, Stack, Text, Title } from "@mantine/core"
import { tabs, colorMap } from "@/vars"
import { toCamelCase } from "@/functions/pebblers"
import { HeaderButtons } from "./HeaderButtons"
import classes from "./Header.module.css"


export const PebblerHeader: FC<{ pebbler: MediumPebbler, tabSelected: string, largeScreen: boolean, toggler: (a: string) => void }> =
    ({
        pebbler,
        tabSelected,
        largeScreen,
        toggler,
    }) => {
        const imageName: string = toCamelCase(pebbler.name);

        const MainInfo: FC<{ pebbler: MediumPebbler }> = ({ pebbler }) => (
            <Flex wrap="wrap" justify="space-evenly">
                <Stack ta="center">
                    <Title order={1}>
                        {pebbler.name}
                    </Title>
                    <Image
                        src={"/pebblers/" + imageName + ".png"}
                        alt={"Image of " + pebbler.name + " the pebbler"}
                        width={300}
                        height={300}
                    />
                </Stack>

                <Stack ta="center" mt="sm">
                    <Flex gap="xs">
                        <Text size="lg" fw={700} span>Division:</Text>
                        <Text size="lg" fw={700} c={colorMap[pebbler.current_division]} span>{pebbler.current_division}</Text>
                        <Text size="lg" fw={700} span>|</Text>
                        <Text size="lg" fw={700} span>Rank:</Text>
                        <Text size="lg" fw={700} c="orange" span>{pebbler.current_rank}</Text>
                    </Flex>

                    <Stack mt="lg">
                        <Title order={3} ta="center" td="underline">All-Time Stats</Title>
                        <Text size="lg">Pebbles: {pebbler.pebbles}</Text>
                        <Text size="lg">Home Pebbles: {pebbler.home_pebbles}</Text>
                        <Text size="lg">Away Pebbles: {pebbler.away_pebbles}</Text>
                        <Text size="lg">Quirk Pebbles: {pebbler.qp}</Text>
                        <Text size="lg">Ability Triggers: {pebbler.at}</Text>
                    </Stack>
                </Stack>
            </Flex>
        )

        return (
            <Container fluid className={classes.header}>
                <Stack>
                    <MainInfo pebbler={pebbler} />
                    <Center>
                        <HeaderButtons
                            options={tabs}
                            selected={tabSelected}
                            largeScreen={largeScreen}
                            toggler={toggler}
                        />
                    </Center>
                </Stack>
            </Container>
        )
    }