import axios from "axios";
import { FullPebbler } from "@/types/pebblers";
import { PebblerHeader } from "@/components/Pebbler/PebblerHeader";

export default async function PebblerPage({
    params,
}: {
    params: Promise<{ name: string }>
}) {
    async function fetchPebbler(pebblerName: string) {
        try {
            console.log("Fetching pebbler...");
            const response = await axios.get(`http://127.0.0.1:8000/api/pebbler/${pebblerName}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }


    const { name } = await params
    const pebbler: FullPebbler = await fetchPebbler(name)

    if (!pebbler || Object.keys(pebbler).length === 0) {
        return <div>Error: Pebbler not found</div>;
    }

    return (
        <PebblerHeader pebbler={pebbler} />
    )
}

