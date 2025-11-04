import axios from "axios";
import { Center } from "@mantine/core";
import { Report } from "@/types/reports";
import { FullReport } from "@/components/Reports/FullReport";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MAPL | Reports'
};

export default async function ReportPage({
    params,
}: {
    params: Promise<{ id: number }>
}) {
    async function fetchReport(id: number) {
        try {
            console.log("Fetching report...");
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${id}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }


    const { id } = await params
    const report: Report = await fetchReport(id)

    if (!report || Object.keys(report).length === 0) {
        return <div>Error: Report not found</div>;
    }

    return (
        <Center>
            <FullReport article={report} />
        </Center>
    )
}