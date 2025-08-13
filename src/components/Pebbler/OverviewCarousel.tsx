import { FC, Fragment } from "react";
import { PersonalPebbler } from "@/types/pebblers";
import { Card, Title, Stack, Center } from "@mantine/core";
import { OverviewCard } from "./OverviewCard";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { theme } from "@/theme";
import classes from "./Pebbler.module.css";

export const OverviewCarousel: FC<{ pebblers: PersonalPebbler[], largeScreen: boolean, label: string }> =
    ({ pebblers, largeScreen, label }) => {
        return (
            <Card w={largeScreen ? 1025 : 205} px={12.5} py={10} radius="md" className={classes.banner}>
                <Title order={1} ta="center" mb="lg">
                    {label}
                </Title>
                <Center>
                    <Carousel
                        nextControlIcon={<IconArrowRight color={theme.colors!.purple![6]} size={16} />}
                        previousControlIcon={<IconArrowLeft color={theme.colors!.pink![6]} size={16} />}
                        w={largeScreen ? 1000 : 180}
                        slideSize={180}
                        slideGap={25}
                        height={300}
                        emblaOptions={{ loop: true, align: "start", slidesToScroll: largeScreen ? 5 : 1 }}
                        classNames={largeScreen ? {
                            root: classes.carousel,
                            controls: classes.carouselControls,
                        } : {}}
                        styles={(pebblers.length <= 5 && largeScreen) ? {
                            controls: { opacity: 0 }
                        } : {}}
                    >
                        {(label === "Recent Champs" && pebblers.length === 16 && largeScreen) ?
                            pebblers.map((pebbler, i) => (
                                i % 4 == 0 ? (
                                    <Fragment key={i}>
                                        <Carousel.Slide>
                                            <Card
                                                w={180}
                                                h={300}
                                                radius="md"
                                                bg="transparent"
                                            >
                                                <Stack h={300} justify="center">
                                                    <Title ta="center">{pebbler.description.slice(pebbler.description.indexOf(' '))}</Title>
                                                </Stack>
                                            </Card>
                                        </Carousel.Slide>
                                        <Carousel.Slide>
                                            <OverviewCard pebbler={pebbler} hideText />
                                        </Carousel.Slide>
                                    </Fragment>
                                ) : (
                                    <Carousel.Slide key={i}>
                                        <OverviewCard pebbler={pebbler} hideText />
                                    </Carousel.Slide>
                                )
                            )) : pebblers.map((pebbler, i) => (
                                <Carousel.Slide key={i}>
                                    <OverviewCard pebbler={pebbler} />
                                </Carousel.Slide>
                            ))}
                    </Carousel>
                </Center>
            </Card >
        )
    }