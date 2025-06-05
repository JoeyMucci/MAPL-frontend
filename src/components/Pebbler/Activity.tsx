import { FC } from "react";
import { SimpleBout } from "@/types/bouts";
import { Bout } from "@/components/Bout/Bout";
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

    const bouts: SimpleBout[] = await fetchActivity();

    return (
        <Stack>
            {bouts.map((bout, i) => (
                <Bout key={i} bout={bout} />
            ))}
        </Stack>
    )
}