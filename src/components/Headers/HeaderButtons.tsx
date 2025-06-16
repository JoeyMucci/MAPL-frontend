import { FC } from "react";
import { colorMap } from "@/vars";
import { Button, Flex } from "@mantine/core";
import classes from "./Header.module.css";

export const HeaderButtons: FC<{ options: string[], selected: string, largeScreen: boolean, toggler: (a: string) => void }> =
    ({
        options,
        selected,
        largeScreen,
        toggler,
    }) => {
        return (
            <Flex>
                {options.map((option, i) => (
                    <Button
                        key={i}
                        w={largeScreen ? 200 : 50}
                        style={{ color: colorMap[option] }}
                        className={option === selected ? classes.ghostButtonSelected : classes.ghostButton}
                        onClick={() => toggler(option)}
                        radius="xs"
                    >
                        {largeScreen ? option : option[0]}
                    </Button>
                ))}
            </Flex>
        )
    }