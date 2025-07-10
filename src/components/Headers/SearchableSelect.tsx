"use client"

import { FC, useState } from "react"
import {
    Flex,
    Combobox,
    ComboboxOption,
    ComboboxOptions,
    ComboboxTarget,
    ComboboxChevron,
    ComboboxDropdown,
    TextInput,
    Image,
    useCombobox
} from '@mantine/core';
import { pebblerNameList } from "@/vars";
import { toCamelCase } from "@/functions";
import classes from "./Header.module.css";

function getFilteredOptions(data: string[], searchQuery: string, limit: number) {
    const result: string[] = []

    for (let i = 0; i < data.length; i += 1) {
        if (result.length === limit) {
            break
        }

        if (data[i].toLowerCase().includes(searchQuery.trim().toLowerCase())) {
            result.push(data[i])
        }
    }

    return result
}

export const SearchableSelect: FC<{ defaultValue: string, disabledName: string, setParentAction: (a: string) => void, flip?: boolean }> = (
    { defaultValue, disabledName, setParentAction, flip }) => {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    })

    const [value, setValue] = useState<string>(defaultValue)
    const [search, setSearch] = useState<string>(defaultValue)

    const filteredOptions = getFilteredOptions(pebblerNameList, search, 7)

    const options = filteredOptions.map((item, index) => (
        <ComboboxOption
            value={item}
            key={item}
            onMouseOver={() => combobox.selectOption(index)}
            disabled={item === disabledName}
        >
            <Flex gap="sm">
                <Image
                    src={"/pebblers/" + toCamelCase(item) + ".png"}
                    alt={"Image of " + item + " the pebbler"}
                    h={25}
                    w={25}
                    className={flip ? classes.flipY : ""}
                />
                {item}
            </Flex>
        </ComboboxOption>
    ))

    return (
        <Combobox
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                setValue(val)
                setParentAction(val)
                setSearch(val)
                combobox.closeDropdown()
            }}
            classNames={{
                option: classes.orangeSelected,
            }}
        >
            <ComboboxTarget>
                <TextInput
                    rightSection={<ComboboxChevron />}
                    value={search}
                    onChange={(event) => {
                        combobox.openDropdown()
                        combobox.updateSelectedOptionIndex()
                        setSearch(event.currentTarget.value)
                    }}
                    onClick={() => { combobox.openDropdown(); setSearch("") }}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown()
                        setSearch(value || '')
                    }}
                    placeholder={defaultValue === "" ? "Search Pebbler" : "Pick Pebbler"}
                    rightSectionPointerEvents="none"
                    classNames={{
                        input: defaultValue === "" ? classes.midBorder : flip ? classes.rightBorder : classes.leftBorder
                    }}
                />
            </ComboboxTarget>

            <ComboboxDropdown>
                <ComboboxOptions>
                    {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
                </ComboboxOptions>
            </ComboboxDropdown>
        </Combobox >
    )
}