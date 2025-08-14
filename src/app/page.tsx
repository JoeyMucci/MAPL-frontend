"use client"

import { HomeHeader } from "@/components/Headers/HomeHeader"
import { useMediaQuery } from "@mantine/hooks"

export default function HomePage() {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    return (
        <HomeHeader largeScreen={largeScreen} />
    )
}