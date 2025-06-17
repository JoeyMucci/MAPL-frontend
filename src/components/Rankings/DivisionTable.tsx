import {
    Badge,
    Table,
    TableThead,
    TableTr,
    TableTd,
    TableTbody
} from "@mantine/core";
import {
    abilityMultMap,
    colorMap,
    divisions,
    quirkMultMap,
} from "@/vars";

export const DivisionTable = () => (
    <Table striped withTableBorder>
        <TableThead>
            <TableTr ta="center">
                <TableTd>Division</TableTd>
                <TableTd>Quirk Factor</TableTd>
                <TableTd>Ability Factor</TableTd>
            </TableTr>
        </TableThead>
        <TableTbody>
            {divisions.map((division, i) => (
                <TableTr key={i} ta="center">
                    <TableTd><Badge w={125} color={colorMap[division]}>{division}</Badge></TableTd>
                    <TableTd>{quirkMultMap[division]}x</TableTd>
                    <TableTd>{abilityMultMap[division]}x</TableTd>
                </TableTr>
            ))}
        </TableTbody>
    </Table>
)