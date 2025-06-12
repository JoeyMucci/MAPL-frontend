import { FC } from "react";
import { ActivityClient } from "./ActivityClient";
import axios from "axios";

export const Activity: FC<{ pebblerName: string }> = async ({ pebblerName }) => {
    async function fetchActivity() {
        try {
            console.log("Fetching pebbler bout information...");
            const response = await axios.get(`http://127.0.0.1:8000/api/bouts/${pebblerName}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }

    const data = await fetchActivity();

    return (
        <ActivityClient bouts={data.bouts} maxMonth={data.month} maxYear={data.year} pebblerName={pebblerName} />
    )
}