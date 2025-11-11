"use client"

import { Button, Flex, Image, Stack, Modal } from "@mantine/core";
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { IconMenu2, IconX } from "@tabler/icons-react";
import classes from './Header.module.css';

const links = [
    { link: '/', label: 'Home' },
    { link: '/pebblers', label: 'Pebblers' },
    { link: '/bouts', label: 'Bouts' },
    { link: '/rankings', label: 'Rankings' },
    { link: '/reports', label: 'Reports' },
    { link: '/rivalry', label: 'Rivalry' },
    { link: '/format', label: 'Format' },
    { link: '/glossary', label: 'Glossary' },
]

export const WebHeader = () => {
    const router = useRouter()
    const pathname = usePathname()
    const tab = '/' + pathname.split('/')[1]
    let largeScreen = useMediaQuery('(min-width: 56em)')
    largeScreen = largeScreen === undefined ? true : largeScreen

    const [modalOpened, modalHandlers] = useDisclosure(false);

    return (
        <header className={classes.webHeader}>
            {largeScreen ? (
                <Flex align="center" justify="space-between">
                    <Image
                        src="/pebble.png"
                        alt="The MAPL logo"
                        h={40}
                        w={40}
                        m={10}
                        onClick={() => router.push('/')}
                        style={{ cursor: "pointer" }}
                    />
                    <Flex mr={10}>
                        {links.map((link, i) => (
                            <Button
                                h={60}
                                key={i}
                                className={tab === link.link ? classes.ghostButtonSelected : classes.ghostButton}
                                onClick={() => router.push(link.link)}
                                radius="xs"
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Flex>
                </Flex>
            ) : (
                <Flex align="center" justify="flex-start" style={{ width: '100%' }}>
                    {!modalOpened && (
                        <Flex align="center" justify="flex-start">
                            <IconMenu2
                                size={40}
                                color="brown"
                                style={{ cursor: "pointer" }}
                                onClick={() => modalHandlers.open()}
                            />

                            <Image
                                src="/pebble.png"
                                alt="The MAPL logo"
                                h={40}
                                w={40}
                                m={10}
                                onClick={() => router.push('/')}
                                style={{ cursor: "pointer" }}
                            />
                        </Flex>
                    )}

                    <Modal
                        opened={modalOpened}
                        onClose={modalHandlers.close}
                        fullScreen
                        transitionProps={{ transition: 'fade', duration: 200 }}
                        withCloseButton={false}
                        styles={{
                            body: {
                                padding: 0,
                            },
                        }}
                    >
                        <Stack justify="space-between" style={{ height: '100vh', width: '100vw' }} bg="cyan">
                            <Flex align="center" justify="flex-start">
                                <IconX
                                    size={40}
                                    color="brown"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => modalHandlers.close()}
                                />

                                <Image
                                    src="/pebble.png"
                                    alt="The MAPL logo"
                                    h={40}
                                    w={40}
                                    m={10}
                                    onClick={() => { modalHandlers.close(); router.push('/') }}
                                    style={{ cursor: "pointer" }}
                                />
                            </Flex>
                            {links.map((link, i) => (
                                <Button
                                    key={i}
                                    className={tab === link.link ? classes.whButtonSelected : classes.whButton}
                                    onClick={() => { modalHandlers.close(); router.push(link.link) }}
                                    radius="xs"
                                >
                                    {link.label}
                                </Button>
                            ))}
                        </Stack>
                    </Modal>
                </Flex>
            )}
        </header>
    )
}