import { FC } from "react";
import { Container, Flex, Stack, Text, rem, Button, Image } from "@mantine/core";
import Link from 'next/link'
import classes from "./Header.module.css";


export const HomeHeader: FC<{ largeScreen: boolean }> = ({ largeScreen }) => {
    return (
        <Container fluid className={classes.orangeHeader} pb='sm'>
            <Stack align="center" justify="center">
                <Image
                    src={"PebbleEmblemFull" + ".jpg"}
                    alt={"Pebble Banner"}
                    h={340}
                    w={200}
                />
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