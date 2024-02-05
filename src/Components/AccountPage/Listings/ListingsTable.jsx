import {Image, Link, List, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {LISTING_VIEW} from "../account_page_consts";
import { useCurrentViewStore } from "../../../zustand/current_view_store"
import { useCurrentListingsStore } from "../../../zustand/listings_store"

const ListingsTable = () => {

    const setCurrentView = useCurrentViewStore((state)=>state.changeView);
    const {listings, fetchListingById} = useCurrentListingsStore((state)=>
    {
        return ({
            listings: state.listings,
            fetchListingById: state.fetchListingById
        })
    })
    
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
                        </Tr>
                    </Thead>
                    <Tbody>
                        {listings ? listings.map(item => {
                            return mapToTableRow(item, setCurrentView, fetchListingById);
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

function mapToTableRow(item, setCurrentPage, fetchListingById) {
    return (<Tr bgColor='#c8e3fa' key={item.id}>
        <Td borderLeftRadius='10px' fontSize='1.25rem'>
            <Link color="blue" onClick={async () => {
                await fetchListingById(item.id);
                setCurrentPage(LISTING_VIEW);
            }}>
                {item.id}
            </Link>
        </Td>
        <Td fontSize='1.25rem'>{item.iso3166Country}</Td>
        <Td fontSize='1.25rem'>{item.cityName}</Td>
        <Td fontSize='1.25rem'>{item.streetName}</Td>
        <Td fontSize='1.25rem'>{item.buildingNumber}</Td>
    </Tr>);
}

export default ListingsTable;