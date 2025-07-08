import { FC } from "react";
import { PersonalPebbler } from "@/types/pebblers";
import { OverviewCard } from "./OverviewCard";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

export const OverviewCarousel: FC<{ pebblers: PersonalPebbler[], largeScreen: boolean }> = ({ pebblers, largeScreen }) => (
    <Carousel
        nextControlIcon={<IconArrowRight color="orange" size={16} />}
        previousControlIcon={<IconArrowLeft color="orange" size={16} />}
        w={largeScreen ? 1000 : 180}
        slideSize={180}
        slideGap={25}
        height={300}
        emblaOptions={{ loop: true, align: "start", slidesToScroll: largeScreen ? 5 : 1 }}
    >
        {pebblers.map((pebbler, i) => (
            <Carousel.Slide key={i}>
                <OverviewCard pebbler={pebbler} />
            </Carousel.Slide>
        ))}
    </Carousel>
)