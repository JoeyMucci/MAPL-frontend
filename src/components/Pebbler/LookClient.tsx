"use client"

import { FC, useState } from "react";
import { Badge, Center, Stack, Flex } from "@mantine/core";
import { CareerSummary } from "@/types/stats";
import { colorMap, divisions } from "@/vars";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { CareerTable } from "../Rankings/CareerTable";


export const LookClient: FC<{ careerSummary: CareerSummary[] }> = ({ careerSummary }) => {
    const careerSummaryMap: Record<string, CareerSummary> = {};
    for (const cs of careerSummary) {
        careerSummaryMap[cs.division] = cs;
    }

    const validDivisions = divisions.filter(division => division in careerSummaryMap);
    const [divisionIndex, setDivisionIndex] = useState<number>(0);

    return (
        <Center mt="md" mb="md">
            <Stack w={300}>
                <Flex justify="space-between" align="center">
                    <IconArrowLeft
                        size={24}
                        color={colorMap[validDivisions[(divisionIndex - 1 + validDivisions.length) % validDivisions.length]]}
                        onClick={() => {
                            setDivisionIndex((divisionIndex - 1 + validDivisions.length) % validDivisions.length);
                        }}
                        style={{ cursor: "pointer" }}
                    />
                    <Badge w={125} color={colorMap[validDivisions[divisionIndex]]}>{validDivisions[divisionIndex]}</Badge>
                    <IconArrowRight
                        size={24}
                        color={colorMap[validDivisions[(divisionIndex + 1 + validDivisions.length) % validDivisions.length]]}
                        onClick={() => {
                            setDivisionIndex((divisionIndex + 1 + validDivisions.length) % validDivisions.length);
                        }}
                        style={{ cursor: "pointer" }}
                    />
                </Flex>
                <CareerTable careerSummaryEntry={careerSummaryMap[validDivisions[divisionIndex]]} />
            </Stack>
        </Center>
    )
}
