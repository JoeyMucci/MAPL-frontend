"use client"

import { MediumPebbler } from "@/types/pebblers";
import { Pebbler } from "@/components/Pebbler/Pebbler";
import { Meet } from "@/components/Pebbler/Meet";
import { Activity } from "@/components/Pebbler/Activity";
import { Performance } from "@/components/Pebbler/Performance";
import { Look } from "@/components/Pebbler/Look";
import {useEffect, useState, use } from "react";
import { NoData } from "@/components/nodata"
import axios from "axios";
import Loading from "@/components/loading";

export default function PebblerPage({
    params,
}: {
    params: Promise<{ name: string }>
}) {
    async function fetchPebbler(pebblerName: string) {
        try {
            // console.log("Fetching pebbler...");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pebblers/basic/${pebblerName}`);
            return response.data;
        }
         catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error);
            return {};
        }
    }


    const { name } = use(params)
    const [pebbler, setPebbler] = useState<MediumPebbler | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchPebbler(name).then((data) => {
            setPebbler(data)
            setIsLoading(false)
        })
    }, [name])

    if(isLoading) {
        return <Loading />
    }

    if (!pebbler || Object.keys(pebbler).length === 0) {
        return <NoData />
    }

    return (
        <Pebbler pebbler={pebbler}>
            <Meet key="M" pebblerName={pebbler.name} />
            <Activity key="A" pebblerName={pebbler.name} />
            <Performance key="P" pebblerName={pebbler.name} />
            <Look key="L" pebblerName={pebbler.name} />
        </Pebbler>
    )
}

