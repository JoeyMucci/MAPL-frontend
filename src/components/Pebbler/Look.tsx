import { FC } from "react";
import { LookClient } from "@/components/Pebbler/LookClient";
import axios from "axios";

export const Look: FC<{ pebblerName: string }> = async ({ pebblerName }) => {
    async function fetchSummary() {
        try {
            console.log("Fetching pebbler career summary...");
            const response = await axios.get(`http://127.0.0.1:8000/api/pebblers/summary/${pebblerName}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }

    const data = await fetchSummary();

    return (
        <LookClient careerSummary={data} />
    )
}