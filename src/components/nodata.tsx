import { Text } from "@mantine/core"

interface NoDataProps {
    mt?: number;
}

export const NoData = ({ mt = 36 }: NoDataProps) => (
        <Text c="midBlue" ta="center" size="xl" mt={mt}>No Data 🥲</Text>
)