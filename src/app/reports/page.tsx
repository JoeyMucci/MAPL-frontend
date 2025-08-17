"use client";

import { useState, useEffect } from "react";
import { SmallReport } from "@/components/Reports/SmallReport";
import { Report } from "@/types/reports";
import { useMediaQuery } from "@mantine/hooks";
import { Stack, Flex, Text, Image, Anchor } from "@mantine/core";
import { ReportsHeader } from "@/components/Headers/ReportsHeader";
import { getTime, toCamelCase } from "@/functions";
import axios from "axios";

export default function ReportsPage() {
    async function fetchReports(month: number, year: number) {
        try {
            console.log("Fetching reports...")
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${month}/${year}`)
            return response.data
        }
        catch (error) {
            console.error("Error fetching data:", error)
            return {}
        }
    }

    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    const curMonth = parseInt(getTime().split("-")[1])
    const curYear = parseInt(getTime().split("-")[0])

    const [reporter, setReporter] = useState<string>("Merged")
    const [month, setMonth] = useState<number>(curMonth)
    const [year, setYear] = useState<number>(curYear)
    const [reports, setReports] = useState<{ [reporter: string]: Report[] }>({})

    function toggleDate(setMonth: (a: number) => void, setYear: (a: number) => void, newDate: string): void {
        setMonth(parseInt(newDate.split('-')[1], 10))
        setYear(parseInt(newDate.split('-')[0], 10))
    }

    useEffect(() => {
        fetchReports(month, year).then((data) => {
            setReports(data);
        });
    }, [month, year]);


    return (
        <>
            <ReportsHeader
                reporterSelected={reporter}
                month={month}
                year={year}
                largeScreen={largeScreen}
                toggleReporter={setReporter}
                toggleDate={(value) => toggleDate(setMonth, setYear, value)}
            />
            <Stack align="center" mt="md" mb="md">
                {
                    !largeScreen && (
                        reporter === "Merged" ? (
                            <Flex align="center" gap="sm">
                                <Text>{reporter}</Text>
                                <Anchor href="/reports/authors/ari">
                                    <Image
                                        src={"/authors/" + toCamelCase("Ari") + ".png"}
                                        alt={"Image of " + "Ari" + " the reporter"}
                                        h={35}
                                        w={35}
                                    />
                                </Anchor>
                                <Anchor href="/reports/authors/patrick">
                                    <Image
                                        src={"/authors/" + toCamelCase("Patrick") + ".png"}
                                        alt={"Image of " + "Patrick" + " the reporter"}
                                        h={35}
                                        w={35}
                                    />
                                </Anchor>
                                <Anchor href="/reports/authors/lippo">
                                    <Image
                                        src={"/authors/" + toCamelCase("Lippo") + ".png"}
                                        alt={"Image of " + "Lippo" + " the reporter"}
                                        h={35}
                                        w={35}
                                    />
                                </Anchor>
                            </Flex>
                        ) : (
                            <Flex align="center" gap="sm">
                                <Anchor href={`/reports/authors/${toCamelCase(reporter)}`} c="black" underline="hover">
                                    <Text>{reporter}</Text>
                                </Anchor>
                                <Anchor href={`/reports/authors/${toCamelCase(reporter)}`}>
                                    <Image
                                        src={"/authors/" + toCamelCase(reporter) + ".png"}
                                        alt={"Image of " + reporter + " the reporter"}
                                        h={35}
                                        w={35}
                                    />
                                </Anchor>
                            </Flex >
                        )
                    )
                }

                {
                    Object.keys(reports).length === 0 || reports[reporter].length === 0 ? (
                        <div>No reports found.</div>
                    ) :

                        largeScreen ? (
                            Array.from({ length: Math.ceil(reports[reporter].length / 3) }).map((_, rowIdx) => (
                                <Flex key={rowIdx} gap="md">
                                    {reports[reporter].slice(rowIdx * 3, rowIdx * 3 + 3).map((report, colIdx) => (
                                        <SmallReport key={rowIdx * 3 + colIdx} article={report} />
                                    ))}
                                </Flex>
                            ))
                        ) : (
                            reports[reporter].map((report, i) => (
                                <SmallReport key={i} article={report} />
                            ))
                        )
                }
            </Stack >
        </>
    )
}