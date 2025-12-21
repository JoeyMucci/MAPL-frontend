// import { FC } from "react";
import { Container, Flex, Stack, Text, rem, Button, Image, Anchor} from "@mantine/core";
import classes from "./Header.module.css";

// TODO: IMPLEMENT MOBILE FRIENDLY

// export const HomeHeader: FC<{ largeScreen: boolean }> = ({ largeScreen }) => {
export const HomeHeader = () => {
    return (
        <Container fluid className={classes.orangeHeader} pb='sm'>
            <Stack align="center" justify="center">
                <Image
                    src={"PebbleEmblemFull" + ".jpg"}
                    alt={"Pebble Banner"}
                    h={340}
                    w={200}
                />
                <Flex className={classes.fadeInUpFirst} gap="lg" align="center">
                    <Text size={rem(40)} fw={700} span>The</Text>
                    <Text size={rem(60)} fw={700} c='red' span>Mega</Text>
                    <Text size={rem(60)} fw={700} c='blue' span>Auto</Text>
                    <Text size={rem(60)} fw={700} c='gray' span>Pebble</Text>
                    <Text size={rem(60)} fw={700} c='yellow' span>League</Text>
                </Flex>
                <Text className={classes.fadeInUpSecond} size="xl">A perpetual dice rolling tournament ecosystem for stuffed animals and figures</Text>
                <Flex className={classes.fadeInUpThird} gap="md">
                    <Anchor href='/format'>
                        <Button color='purple' radius='lg' w={150}>How it Works</Button>
                    </Anchor>
                    <Anchor href='/rankings'>
                        <Button color='pink' radius='lg' w={150}>Tables</Button>
                    </Anchor>
                </Flex>
            </Stack>
        </Container >
    )
}

export const HomeHeaderMobile = () => {
    return (
        <Container fluid className={classes.orangeHeader} pb='sm'>
            <Stack align="center" justify="center">
                <Image
                    src={"PebbleEmblemFull" + ".jpg"}
                    alt={"Pebble Banner"}
                    h={340}
                    w={200}
                />
                <Stack className={classes.fadeInUpFirst} gap="lg">
                    <Text size={rem(40)} fw={700} span ta="center">The</Text>
                    <Text size={rem(60)} fw={700} c='red' span>Mega</Text>
                    <Text size={rem(60)} fw={700} c='blue' span>Auto</Text>
                    <Text size={rem(60)} fw={700} c='gray' span>Pebble</Text>
                    <Text size={rem(60)} fw={700} c='yellow' span>League</Text>
                </Stack>
                <Text className={classes.fadeInUpSecond} size="xl" ta="center">A perpetual dice rolling tournament ecosystem for stuffed animals and figures</Text>
                <Flex className={classes.fadeInUpThird} gap="md">
                    <Anchor href='/format'>
                        <Button color='purple' radius='lg' w={150}>How it Works</Button>
                    </Anchor>
                    <Anchor href='/rankings'>
                        <Button color='pink' radius='lg' w={150}>Tables</Button>
                    </Anchor>
                </Flex>
            </Stack>
        </Container >
    )
}