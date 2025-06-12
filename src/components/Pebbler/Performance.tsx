import { History } from "@/types/stats";
import { FC } from "react";
import { PerformanceClient } from "./PerformanceClient";
import axios from "axios";

export const Performance: FC<{ pebblerName: string }> = async ({ pebblerName }) => {
    async function fetchHistory() {
        try {
            console.log("Fetching pebbler performance information...");
            const response = await axios.get(`http://127.0.0.1:8000/api/pebblers/history/${pebblerName}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }

    const history: History = await fetchHistory()

    return (
        <PerformanceClient
            performances={history.performances}
            distribution={history.distribution}
            maxYear={history.year}
            pebblerName={pebblerName}
        />
    )
}