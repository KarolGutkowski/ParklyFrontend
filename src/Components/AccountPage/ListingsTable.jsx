import {Image, Link, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {LISTING_VIEW} from "./account_page_consts";
import { useCurrentViewStore } from '../../zustand/current_view_store';

const ListingsTable = ({setParkingDetails, listings}) => {

    const setCurrentView = useCurrentViewStore((state)=>state.changeView);

    return (
        <>
            <TableContainer marginTop="10px">
                <Table style={{borderCollapse: "separate", borderSpacing: "0 1rem"}} variant='simple'>
                    <Thead>
                        <Tr>
                            <Th fontSize='1rem'>Id</Th>
                            <Th fontSize='1rem'>Country</Th>
                            <Th fontSize='1rem'>City</Th>
                            <Th fontSize='1rem'>Street</Th>
                            <Th fontSize='1rem'>Number</Th>
                            <Th fontSize='1rem'>Image</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {listings ? listings.map(item => {
                            return mapToTableRow(item, setCurrentView, setParkingDetails);
                        }) : null}
                    </Tbody>
                </Table>
            </TableContainer>
            {
                listings ? null :
                    <Stack padding={4} spacing={1}>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                    </Stack>
            }
        </>
    );
}

function mapToTableRow(item, setCurrentPage, setParkingDetails) {
    return (<Tr bgColor='#c8e3fa'>
        <Td borderLeftRadius='10px' fontSize='1.25rem'>
            <Link color="blue" onClick={() => {
                setCurrentPage(LISTING_VIEW + item.id)
                setParkingDetails(item)
            }}>
                {item.id}
            </Link>
        </Td>
        <Td fontSize='1.25rem'>{item.country}</Td>
        <Td fontSize='1.25rem'>{item.city}</Td>
        <Td fontSize='1.25rem'>{item.street}</Td>
        <Td fontSize='1.25rem'>{item.number}</Td>
        <Td fontSize='1.25rem' borderRightRadius='10px'>
            <Image src={item.image.src} alt={item.image.alt}/>
        </Td>
    </Tr>);
}

export default ListingsTable;