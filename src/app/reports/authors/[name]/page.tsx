import { BasicHeader } from "@/components/Headers/BasicHeader";
import { Text, Center } from "@mantine/core";
import axios from "axios";

export default async function PebblerPage({
    params,
}: {
    params: Promise<{ name: string }>
}) {
    async function fetchReporter(authorName: string) {
        try {
            console.log("Fetching reporter...");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/author/${authorName}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }

    const { name } = await params
    const authorStats: { [key: string]: string } = await fetchReporter(name)

    if (!authorStats || Object.keys(authorStats).length === 0) {
        return <div>Error: Reporter not found</div>;
    }

    return (
        <>
            <BasicHeader identifier={authorStats.name} dir="authors" />
            <Center>
                <Text mt="md" mb="md" ta="center" size="xl" w={300}>{authorStats.description}</Text>
            </Center>
        </>
    )
}

