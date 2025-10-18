import { Center } from "@mantine/core"
import { CoolBout } from "@/components/Bout/CoolBout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'MAPL | Bouts'
};

export default function ExampleBoutPage() {
    return (
        <Center mt="md">
            <CoolBout />
        </Center>
    )
}