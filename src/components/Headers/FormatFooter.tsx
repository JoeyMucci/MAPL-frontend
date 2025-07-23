"use client"

import { FC } from "react";
import { Progress } from "@mantine/core";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import classes from './Header.module.css';

// const links = [
//     { link: '/pebblers', label: 'Pebblers' },
//     { link: '/bouts', label: 'Bouts' },
//     { link: '/rankings', label: 'Rankings' },
//     { link: '/reports', label: 'Reports' },
//     { link: '/rivalry', label: 'Rivalry' },
//     { link: '/format', label: 'Format' },
//     { link: '/glossary', label: 'Glossary' },
// ]

export const FormatFooter: FC<{ fraction: number }> = ({ fraction }) => {
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    return (
        <>
            <Progress
                value={fraction}
                size="lg"
                transitionDuration={200}
                bg="transparent"
                color="orange"
                radius={0}
                className={classes.formatFooterBar}
            />
            <div className={classes.formatFooterMain}>

            </div>
        </>
    )
}