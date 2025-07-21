import { MediumPebbler } from "@/types/pebblers";
import { Pebbler } from "@/components/Pebbler/Pebbler";
import { Meet } from "@/components/Pebbler/Meet";
import { Activity } from "@/components/Pebbler/Activity";
import { Performance } from "@/components/Pebbler/Performance";
import { Look } from "@/components/Pebbler/Look";
import axios from "axios";

export default async function PebblerPage({
    params,
}: {
    params: Promise<{ name: string }>
}) {
    async function fetchPebbler(pebblerName: string) {
        try {
            console.log("Fetching pebbler...");
            const response = await axios.get(`http://127.0.0.1:8000/api/pebblers/basic/${pebblerName}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }


    const { name } = await params
    const pebbler: MediumPebbler = await fetchPebbler(name)

    if (!pebbler || Object.keys(pebbler).length === 0) {
        return <div>Error: Pebbler not found</div>;
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

