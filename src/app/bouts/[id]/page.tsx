import axios from "axios";
import { Center } from "@mantine/core";
import { ComplicatedBout } from "@/types/bouts";
import { FullBout } from "@/components/Bout/FullBout";

export default async function PebblerPage({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    async function fetchBout(id: number) {
        try {
            console.log("Fetching bout...");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bout/${id}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }


    const { id } = await params
    const bout: ComplicatedBout = await fetchBout(id)

    if (!bout || Object.keys(bout).length === 0) {
        return <div>Error: Bout not found</div>;
    }

    return (
        <Center mt="md">
            <FullBout bout={bout} />
        </Center>
    )
}