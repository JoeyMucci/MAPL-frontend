"use client"

import { useState, useEffect } from "react";
import { Bout } from "@/components/Bout/SmallBout";
import { SimpleBout } from "@/types/bouts";
import { rem, Center, Badge, Title, Flex, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { colorMap, divisions } from "@/vars";
import { getTime } from "@/functions";
import { BoutsHeader } from "@/components/Headers/BoutsHeader";
import Loading from "@/components/loading";
import axios from "axios";
import { NoData } from "@/components/nodata";

export default function BoutsPage() {
  async function fetchBouts(day: number, month: number, year: number) {
    try {
      // console.log("Fetching bouts...")
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bouts/${month}/${day}/${year}`)
      return response.data
    }
     catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
      // console.error("Error fetching data:", error)
      return {}
    }
  }

  let largeScreen = useMediaQuery('(min-width: 56em)')
  largeScreen = largeScreen === undefined ? true : largeScreen

  const curDay = parseInt(getTime().split("-")[2])
  const curMonth = parseInt(getTime().split("-")[1])
  const curYear = parseInt(getTime().split("-")[0])

  const [division, setDivision] = useState<string>(divisions[0])
  const [day, setDay] = useState<number>(curDay)
  const [month, setMonth] = useState<number>(curMonth)
  const [year, setYear] = useState<number>(curYear)
  const [bouts, setBouts] = useState<{ [division: string]: SimpleBout[] }>({})
  const [isReady, setIsReady] = useState<boolean>(false)

  function toggleDate(
    setDay: (a: number) => void,
    setMonth: (a: number) => void,
    setYear: (a: number) => void,
    newDate: string
  ): void {
    setDay(parseInt(newDate.split('-')[2], 10))
    setMonth(parseInt(newDate.split('-')[1], 10))
    setYear(parseInt(newDate.split('-')[0], 10))
  }

  const toggleDivision = (newDivision: string) => {
    setDivision(newDivision)
  }

  useEffect(() => {
    fetchBouts(day, month, year).then((data) => {
      setBouts(data.bout_info)
      setIsReady(true)
    });
  }, [day, month, year]);

  if (!isReady) {
    return <Loading />
  }

  return (
    <>
      <BoutsHeader
        divisionSelected={division}
        day={day}
        month={month}
        year={year}
        toggleDivision={toggleDivision}
        toggleDate={(value) => toggleDate(setDay, setMonth, setYear, value)}
        largeScreen={largeScreen}
      />

      <Center>
        {!largeScreen &&
          <Flex align="center" gap={rem(10)}>
            <Badge w={125} color={colorMap[division]}>{division}</Badge>
            <Title order={3}>Division</Title>
          </Flex>}
      </Center>

      <Stack align="center" mt={largeScreen ? "md" : ""} mb="md">
        {
          !bouts || bouts[division].length === 0 ? (
            <NoData />
          ) :
            largeScreen ? (
              Array.from({ length: Math.ceil(bouts[division].length / 3) }).map((_, rowIdx) => (
                <Flex key={rowIdx} gap="md">
                  {bouts[division].slice(rowIdx * 3, rowIdx * 3 + 3).map((bout, colIdx) => (
                    <Bout key={rowIdx * 3 + colIdx} bout={bout} />
                  ))}
                </Flex>
              ))
            ) : (
              bouts[division].map((bout, i) => (
                <Bout key={i} bout={bout} />
              ))
            )
        }
      </Stack>
    </>
  )
}
