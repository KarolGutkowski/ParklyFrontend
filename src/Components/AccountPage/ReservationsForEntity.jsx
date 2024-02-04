import {Link, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import { useCurrentViewStore } from '../../zustand/current_view_store';
import { useCurrentReservationsStore } from "../../zustand/reservations_store";
import { RESERVATION_VIEW } from "./account_page_consts";

export const ReservationsForEntity = (props) => {
    const {columnsNamesList} = props;

    const setCurrentView = useCurrentViewStore((state)=>state.changeView);
    const {rowData} = props;

    const { fetchToCurrentReservation} = useCurrentReservationsStore((state)=>
    {
        return (
        {
            fetchToCurrentReservation: state.fetchToCurrentReservation
        });
    })

    const columns = [];

    columnsNamesList.forEach(name => {
        columns.push(<Th fontSize='1rem' id={name}>{name}</Th>);
    });

    return (
        <>
            <TableContainer marginTop="10px">
                <Table style={{borderCollapse: "separate", borderSpacing: "0 1rem"}} variant='simple'>
                    <Thead>
                        <Tr>
                            {columns}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rowData ? rowData.map(item => {
                            return mapToTableRow(item, fetchToCurrentReservation, setCurrentView);
                        }) : null}
                    </Tbody>
                </Table>
            </TableContainer>
            {
                rowData ? null :
                    <Stack padding={4} spacing={1}>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                    </Stack>
            }
        </>
    );
}

function mapToTableRow(item, fetchToCurrentReservation, setCurrentView) {
    return (<Tr bgColor='#c8e3fa' key={item.id}>
        <Td paddingY='2rem' fontSize='1.25rem'>
            <Link
                onClick={async ()=>
                    {
                        await fetchToCurrentReservation(item.id);
                        setCurrentView(RESERVATION_VIEW);
                        console.log(RESERVATION_VIEW)
                    }}
            >{item.id}</Link>
        </Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.startDate}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.endDate}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>
            <Link>
                {item.user}
            </Link>
        </Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.type}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.itemId}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'
            style={{overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '350px'}}>
            {item.info}
        </Td>
    </Tr>);
}
