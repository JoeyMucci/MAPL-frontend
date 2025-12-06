'use client'

import React, { FC, useState } from "react";
import { MediumPebbler } from "@/types/pebblers";
import { tabs, colorMap } from "@/vars";
import { PebblerHeader } from "../Headers/PebblerHeader";
import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export const Pebbler: FC<{ pebbler: MediumPebbler, children: React.ReactNode }> = ({ pebbler, children }) => {
    const [tab, setTab] = useState<string>(tabs[0])
    let largeScreen = useMediaQuery('(min-width: 56em)');
    largeScreen = largeScreen === undefined ? true : largeScreen;

    const toggleTab = (newTab: string) => {
        setTab(newTab)
    }

    return (
        <>
            <PebblerHeader pebbler={pebbler} tabSelected={tab} largeScreen={largeScreen} toggler={toggleTab} />
            {!largeScreen && <Title c={colorMap[tab]} ta="center" order={3}>{tab}</Title>}
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.key === tab[0]) {
                    return child;
                }
                return null;
            })}
        </>
    )
}