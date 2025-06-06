import { FC } from "react";
import { ComplicatedBout } from "@/types/bouts";
import { FullBout } from "@/components/Bout/FullBout";
import { Stack } from "@mantine/core";
import axios from "axios";

export const Activity: FC<{ pebblerName: string }> = async ({ pebblerName }) => {
    async function fetchActivity() {
        try {
            console.log("Fetching personal pebbler information...");
            const response = await axios.get(`http://127.0.0.1:8000/api/bouts/${pebblerName}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }

    const bouts: ComplicatedBout[] = await fetchActivity();

    return (
        <Stack align="center" mt="sm">
            {bouts.map((bout, i) => (
                <FullBout key={i} bout={bout} />
            ))}
        </Stack>
    )
}