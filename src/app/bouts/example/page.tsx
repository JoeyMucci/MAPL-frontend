import { Center } from "@mantine/core"
import { CoolBout } from "@/components/Bout/CoolBout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MAPL | Bouts'
};

// TODO: Remove once a real cool bout emerges in prod db

export default function ExampleBoutPage() {
    return (
        <Center mt="md" mb="md">
            <CoolBout />
        </Center>
    )
}