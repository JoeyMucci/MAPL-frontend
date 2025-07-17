import axios from "axios";


export default async function PebblerPage({
    params,
}: {
    params: Promise<{ name: string }>
}) {
    async function fetchReporter(authorName: string) {
        try {
            console.log("Fetching reporter...");
            const response = await axios.get(`http://127.0.0.1:8000/api/news/author/${authorName}`);
            return response.data;
        }
        catch (error) {
            console.error("Error fetching data:", error);
            return {};
        }
    }


    const { name } = await params
    const authorDescription: { [key: string]: string } = await fetchReporter(name)

    if (!authorDescription || Object.keys(authorDescription).length === 0) {
        return <div>Error: Reporter not found</div>;
    }

    return (
        <p>{authorDescription.description}</p>
    )
}

