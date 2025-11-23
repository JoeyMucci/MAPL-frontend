"use client"

import { FC, useState, useEffect } from "react";
import { LookClient } from "@/components/Pebbler/LookClient";
import axios from "axios";

export const Look: FC<{ pebblerName: string }> = ({ pebblerName }) => {

    const [data, setData] = useState([])
    const [isReady, setIsReady] = useState<boolean>(false)
   
    useEffect(() => {
        async function fetchSummary() {
            try {
                // console.log("Fetching pebbler career summary...");
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pebblers/summary/${pebblerName}`);
                return response.data;
            }  catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
                // console.error("Error fetching data:", error);
                return null;
            }
        }

        fetchSummary().then((summaryData) => {
            setData(summaryData)
            setIsReady(true)
        })
    }, [pebblerName])
   
    if(!isReady) {
        return <></>
    }
   
    return (
        <LookClient careerSummary={data} />
    )
}