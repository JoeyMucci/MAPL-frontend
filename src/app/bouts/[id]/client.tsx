"use client"

import axios from "axios";
import Loading from "@/components/loading";
import { use, useState, useEffect } from 'react';
import { Center } from "@mantine/core";
import { ComplicatedBout } from "@/types/bouts";
import { FullBout } from "@/components/Bout/FullBout";
import { NoData } from "@/components/nodata";

export default function BoutPage({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    async function fetchBout(id: number) {
        try {
            // console.log("Fetching bout...");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bout/${id}`);
            return response.data;
        }
         catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error);
            return {};
        }
    }

    const { id } = use(params)
    const [bout, setBout] = useState<ComplicatedBout>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchBout(id).then((data) => {
            setBout(data);
            setIsLoading(false)
        });
    }, [id]);

    if(isLoading) {
        return <Loading />
    }


    if (!bout || Object.keys(bout).length === 0) {
        return <NoData />
    }

    return (
        <Center mt="md">
            <FullBout bout={bout} />
        </Center>
    )
}