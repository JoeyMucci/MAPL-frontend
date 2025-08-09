"use client"

import { JSX, useRef, useState } from "react";
import { Card, Stack, Flex, Image, Text, Center, Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FormatFooter } from "@/components/Headers/FormatFooter";
import { toCamelCase } from "@/functions";
import { BasePebbleGraphic } from "@/components/Rankings/BasePebbleGraphic";
import { DivisionTable } from "@/components/Rankings/DivisionTable";
import { TraitTable } from "@/components/Rankings/TraitTable";
import { QuirkTable } from "@/components/Rankings/QuirkTable";
import { FullPebbleGraphic } from "@/components/Rankings/FullPebbleGraphic";
import { AbilityTable } from "@/components/Rankings/AbilityTable";
import { theme } from "@/theme";
import { TiebreakTable } from "@/components/Rankings/TiebreakTable";
import { CoolBoutSmall } from "@/components/Bout/SmallCoolBout";
import classes from "./Format.module.css";
import NoSsr from "@/components/nossr";

export default function FormatPage(): JSX.Element {
    return (
        <NoSsr><FormatPageHelper /></NoSsr>
    )
}

function FormatPageHelper() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [currentPage, setCurrentPage] = useState(0)

    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    const handleScroll = () => {
        if (containerRef.current) {
            const scrollTop = containerRef.current.scrollTop
            const page = Math.round(scrollTop / (window.innerHeight - 111))
            setCurrentPage(page)
        }
    }

    const setAndScroll = (newPage: number) => {
        setCurrentPage(newPage)
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: newPage * (window.innerHeight - 111),
                behavior: "smooth",
            });
        }
    }

    return (
        <>
            <div
                ref={containerRef}
                style={{
                    width: "1000",
                    height: "calc(100vh - 111px)",
                    overflowY: "scroll",
                    scrollSnapType: "y mandatory",
                }}
                onScroll={handleScroll}
            >
                <Center>
                    <Stack>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}
                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} size="sm">
                                    {"H-hi... I'm Shaun. I am going first because I wanted to get this over with. " +
                                        "Pebbling is a one-on-one dice rolling competition in which the goal is to accumulate as many pebbles as possible. The base " +
                                        "formula to calculate pebbles depending on whether a pebbler wins (higher roll), loses (smaller roll), or ties (same roll) are as follows."}
                                </Text>
                            </Flex>
                            <Flex w={1000} justify="center">
                                <Center w={500}>
                                    <BasePebbleGraphic />
                                </Center>
                            </Flex>
                        </Card>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}
                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} size="sm">
                                    {"Over the years, pebbling has taken many forms. There have even been team elements incorporated at times. " +
                                        "The largest scale pebble c-competition prior to the MAPL was the 2022 Super Pebble Circuit, which featured 12 monthly tournaments. " +
                                        "In some ways, the MAPL is similar, but it also elevates pebbling to a place it has never been before. "}
                                </Text>
                            </Flex>
                        </Card>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}
                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} size="sm">
                                    {"The Mega Auto Pebble League (MAPL) is a perpetual competition in which 100 pebblers compete across four divisions of different prestige: "}
                                    <span style={{ color: theme.colors!.red![6] }}>Master</span>
                                    {", "}
                                    <span style={{ color: theme.colors!.blue![6] }}>All-Star</span>
                                    {", "}
                                    <span style={{ color: theme.colors!.gray![6] }}>Professional</span>
                                    {", and "}
                                    <span style={{ color: theme.colors!.yellow![6] }}>Learner</span>
                                    {". Depending on their performance, pebblers may either get promoted or demoted to another division. " +
                                        "Also, each pebbler has a unique set of "}
                                    <b>trait</b>
                                    {", "}
                                    <span style={{ color: theme.colors!.purple![6] }}>quirk</span>
                                    {", and "}
                                    <span style={{ color: theme.colors!.pink![6] }}>ability</span>
                                    {", which impact how they compete. My " +
                                        "p-pal Neville will explain in more detail. Phew..."}
                                </Text>
                            </Flex>
                        </Card>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}
                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} size="sm">
                                    {"Ahem. The MAPL has certainly made pebbling more complicated, but I love the details, so let's dive right in. The first thing that happens " +
                                        "in a MAPL bout between two pebblers is the initial roll, which is dictated by the "}
                                    <b>trait</b>
                                    {". You can see the four traits below. While you can analyze them " +
                                        "for yourself, I have noticed that some traits have higher average rolls while others offer more stability."}
                                </Text>
                            </Flex>
                            <Flex w={1000} justify="center">
                                <Center w={500}>
                                    <TraitTable />
                                </Center>
                            </Flex>
                        </Card>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}
                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} size="sm">
                                    {"Next up, if certain conditions are met after the initial rolls, a "}
                                    <span style={{ color: theme.colors!.purple![6] }}>quirk activation</span>
                                    {" could occur. These are their own thing, separate from " +
                                        "the base scoring system since they offer pebbles instantly during the bout. While quirk pebbles may seem to be relatively " +
                                        "less important in the full scoring system, rest assured that they can still shake things up!"}
                                </Text>
                            </Flex>
                            <Flex justify="center" align="center">
                                <Center w={500}>
                                    <QuirkTable />
                                </Center>
                                <Center w={500}>
                                    <FullPebbleGraphic />
                                </Center>
                            </Flex>
                        </Card>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}
                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} span size="sm">
                                    {"Lastly, bouts can finish with dramatic "}
                                    <span style={{ color: theme.colors!.pink![6] }}>ability triggers</span>
                                    {" that change the final pebble distribution in a major way. These happen at the end of the bout if a condition AND trigger rate are met. " +
                                        "It is important to note that the home pebbler has the chance to activate " +
                                        "their ability last. In some cases, the home pebbler can nullify the ability of their competitor with their own!"}
                                </Text>
                            </Flex>
                            <Flex w={1000} justify="center">
                                <Center w={500}>
                                    <AbilityTable />
                                </Center>
                            </Flex>
                        </Card>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}
                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} span size="sm">
                                    {"That's enough Neville. I'm Tickle, and I'm gonna wrap this up real quick since I'm on a tight schedule. Speaking of schedule, each pebbler " +
                                        "competes in 12 away bouts and 12 home bouts with one bye during each competition cycle. The competition cycles run from the 1st to the 25th of the month " +
                                        "and every pebbler plays every other pebbler in their division once. Simple enough right?"}
                                </Text>
                            </Flex>
                        </Card>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}
                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} span size="sm">
                                    {"Next up, let me tell you something interesting about divisions. The more prestigious the division, the greater the impact of quirks " +
                                        "and abilities. Quirks will give more pebbles and abilities will have greater trigger rates. Note that abilities cannot be triggered in the Learner division."}
                                </Text>
                            </Flex>
                            <Flex w={1000} justify="center">
                                <Center w={500}>
                                    <DivisionTable />
                                </Center>
                            </Flex>
                        </Card>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}
                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} span size="sm">
                                    {"Moving on to our final point, let's talking about moving up or down between divisions. Top 5 in terms of pebbles accumulated move up, bottom 5 move down. " +
                                        "Naturally if there's no further division to go to, it's all about pride. Of course, it's possible for pebblers to have the same amount of pebbles " +
                                        "so there are tiebreakers in place."}
                                </Text>
                            </Flex>
                            <Flex w={1000} justify="center">
                                <Center w={500}>
                                    <TiebreakTable />
                                </Center>
                            </Flex>
                        </Card>
                        <Card style={{
                            height: "calc(100vh - 111px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                            scrollSnapAlign: "start",
                        }}
                            w={1000}

                            p={0}
                            m={0}
                        >
                            <Flex justify="center" align="center">
                                <Image
                                    src={"/authors/" + toCamelCase("Ari") + ".png"}
                                    alt={"Image of " + "Ari" + " the reporter"}
                                    h={300}
                                    w={300}
                                />
                                <Text ta="center" w={300} span size="sm">
                                    {"Thanks for your attention. Click the home button if you want to see the latest in the MAPL. " +
                                        "Click on the graphic for the bout between Gregory and Marcel to see how crazy bouts can get, " +
                                        "or click on their names to learn more about them. " +
                                        "Finally, consider clicking on the glossary button to review some of the graphics we went over here. Bye bye."}
                                </Text>
                            </Flex>
                            <Flex gap="md">
                                <Button
                                    w={250}
                                    h={100}
                                    radius="lg"
                                    size="xl"
                                    className={classes.orangeHover}
                                    onClick={() => window.location.href = '/'}
                                >
                                    Home
                                </Button>
                                <CoolBoutSmall />
                                <Button
                                    w={250}
                                    h={100}
                                    radius="lg"
                                    size="xl"
                                    className={classes.orangeHover}
                                    onClick={() => window.location.href = '/glossary'}
                                >
                                    Glossary
                                </Button>
                            </Flex>
                        </Card>
                    </Stack>
                </Center>
            </div >
            <FormatFooter cur={currentPage} setPageAction={setAndScroll} />
        </>

    )
}

