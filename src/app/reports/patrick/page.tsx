import { BasicHeader } from "@/components/Headers/BasicHeader";
import { NoData } from "@/components/nodata";
import { Text, Center } from "@mantine/core";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MAPL | Reports'
};

export const dynamic = "force-dynamic";

export default async function ReporterPage() {
    async function fetchReporter(authorName: string) {
        try {
            // console.log("Fetching reporter...");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/author/${authorName}`);
            return response.data;
        }
         catch (error) { // eslint-disable-line @typescript-eslint/no-unused-vars
            // console.error("Error fetching data:", error);
            return {};
        }
    }

    const name = "patrick"
    const authorStats: { [key: string]: string } = await fetchReporter(name)

    if (!authorStats || Object.keys(authorStats).length === 0) {
        return <NoData />
    }

    return (
        <>
            <BasicHeader identifier={authorStats.name} dir="reporters" />
            <Center>
                <Text mt="md" mb="md" ta="center" size="xl" w={300}>{authorStats.description}</Text>
            </Center>
        </>
    )
}

