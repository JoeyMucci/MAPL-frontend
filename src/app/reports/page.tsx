"use client";

import { useState, useEffect } from "react";
import { SmallReport } from "@/components/Reports/SmallReport";
import { Report } from "@/types/reports";
import { useMediaQuery } from "@mantine/hooks";
import { Stack, Flex } from "@mantine/core";
import { getTime } from "@/functions";
import axios from "axios";

export default function ReportsPage() {
    async function fetchReports(month: number, year: number) {
        try {
            console.log("Fetching reports...")
            const response = await axios.get(`http://127.0.0.1:8000/api/news/${month}/${year}`)
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

    const [month, setMonth] = useState<number>(curMonth)
    const [year, setYear] = useState<number>(curYear)
    const [reports, setReports] = useState<Report[]>([])

    useEffect(() => {
        fetchReports(month, year).then((data) => {
            setReports(data);
        });
    }, [month, year]);


    return (
        <Stack align="center" mt="md" mb="md">
            {
                reports.length === 0 ? (
                    <div>No reports found.</div>
                ) :
                    largeScreen ? (
                        Array.from({ length: Math.ceil(reports.length / 3) }).map((_, rowIdx) => (
                            <Flex key={rowIdx} gap="md">
                                {reports.slice(rowIdx * 3, rowIdx * 3 + 3).map((report, colIdx) => (
                                    <SmallReport key={rowIdx * 3 + colIdx} article={report} />
                                ))}
                            </Flex>
                        ))
                    ) : (
                        reports.map((report, i) => (
                            <SmallReport key={i} article={report} />
                        ))
                    )
            }
        </Stack>
    )
}