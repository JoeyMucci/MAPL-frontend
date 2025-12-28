import { BasicHeader } from "@/components/Headers/BasicHeader";
import { NoData } from "@/components/nodata";
import { Text, Center } from "@mantine/core";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MAPL | Format'
};

export default async function RefereePage() {
    async function fetchReferee(authorName: string) {
        try {
            // console.log("Fetching referee...");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/helper/${authorName}`);
            return response.data;
        }
         catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error);
            return {};
        }
    }

    const name = 'tickle'
    const helperStats: { [key: string]: string } = await fetchReferee(name)

    if (!helperStats || Object.keys(helperStats).length === 0) {
        return <NoData />
    }

    return (
        <>
            <BasicHeader identifier={helperStats.name} dir="referees" />
            <Center>
                <Text mt="md" mb="md" ta="center" size="xl" w={300}>{helperStats.description}</Text>
            </Center>
        </>
    )
}

