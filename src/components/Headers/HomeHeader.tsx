import { FC } from "react";
import { MediumPebbler } from "@/types/pebblers";
import { Center, Container, Flex, Image, Stack, Text, Title, Overlay, rem, Button } from "@mantine/core";
import { DonutChart } from "@mantine/charts";
import { tabs, colorMap } from "@/vars";
import { toCamelCase } from "@/functions";
import { HeaderButtons } from "./HeaderButtons";
import { StatTable } from "@/components/Rankings/StatTable";
import Link from 'next/link'
import classes from "./Header.module.css";


export const HomeHeader: FC<{ largeScreen: boolean }> = ({ largeScreen }) => {
    return (
        <Container h={500} fluid className={classes.imageHeader}>
            <Stack h={500} align="center" justify="center">
                <Flex className={classes.fadeInUpFirst} gap="lg">
                    <Text size={rem(60)} fw={700} span>The</Text>
                    <Text size={rem(60)} fw={700} c='red' span>Mega</Text>
                    <Text size={rem(60)} fw={700} c='blue' span>Auto</Text>
                    <Text size={rem(60)} fw={700} c='gray' span>Pebble</Text>
                    <Text size={rem(60)} fw={700} c='yellow' span>League</Text>
                </Flex>
                <Text className={classes.fadeInUpSecond} size="lg">A perpetual dice rolling tournament ecosystem for stuffed animals</Text>
                <Flex className={classes.fadeInUpThird} gap="md">
                    <Link href='/format'>
                        <Button color='purple' radius='lg' w={150}>How it Works</Button>
                    </Link>
                    <Link href='/rankings'>
                        <Button color='pink' radius='lg' w={150}>Tables</Button>
                    </Link>
                </Flex>
            </Stack>
        </Container >
    )
}