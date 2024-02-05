import {Link, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import { useCurrentViewStore } from '../../../zustand/current_view_store';
import { useCurrentReservationsStore } from "../../../zustand/reservations_store";
import { RESERVATION_VIEW, USER_VIEW, LISTING_VIEW } from "../account_page_consts";
import { useCurrentUsersStore } from "../../../zustand/users_store";
import { useCurrentListingsStore } from "../../../zustand/listings_store";
import { useState, useEffect } from "react";
import { PaginationMenu } from "../PaginationMenu";
import { useUsersReservationsStore } from "../../../zustand/users_reservations_store";

export const UsersReservationTable = (props) => {
    const {columnsNamesList} = props;
    const {userId} = props;

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const {reservations, fetchUserReservations, pages} = useUsersReservationsStore((state)=>
    {
        return {
            reservations: state.reservations,
            fetchUserReservations: state.fetchReservations,
            pages: state.pages
        }
    })

    const setCurrentView = useCurrentViewStore((state)=>state.changeView);

    const {fetchToCurrentReservation} = useCurrentReservationsStore((state)=>
    {
        return (
        {
            fetchToCurrentReservation: state.fetchToCurrentReservation
        });
    })

    const {fetchToCurrentlyViewedUser} = useCurrentUsersStore((state)=> 
    {
        return {
            fetchToCurrentlyViewedUser: state.fetchToCurrentlyViewedUser
        }
    })

    const {fetchListingById} = useCurrentListingsStore((state)=>
    {
        return {
            fetchListingById: state.fetchListingById
        }
    })

    const columns = [];

    columnsNamesList.forEach(name => {
        columns.push(<Th fontSize='1rem' id={name}>{name}</Th>);
    });

    useEffect(()=>
    {
        fetchUserReservations(userId, pageSize, pageNumber);
    },[userId, pageSize, pageNumber])

    return (
        <>
            <PaginationMenu pageSize={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} setPageSize={setPageSize} pages={pages}/>
            <TableContainer marginTop="10px">
                <Table style={{borderCollapse: "separate", borderSpacing: "0 1rem"}} variant='simple'>
                    <Thead>
                        <Tr>
                            {columns}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {reservations ? reservations.map(item => {
                            return mapToTableRow(item, fetchToCurrentReservation, setCurrentView, fetchToCurrentlyViewedUser, fetchListingById);
                        }) : null}
                    </Tbody>
                </Table>
            </TableContainer>
            {
                reservations ? null :
                    <Stack padding={4} spacing={1}>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                    </Stack>
            }
        </>
    );
}

function mapToTableRow(item, fetchToCurrentReservation, setCurrentView, fetchToCurrentlyViewedUser, fetchListingById) {
    const isCanceled = item.reservationStatus==="CANCELED_BY_ADMIN"

    return (<Tr bgColor={isCanceled?'#e89768':'#c8e3fa'} key={item.id}>
        <Td paddingY='2rem' fontSize='1.25rem'>
            <Link color="blue"
                onClick={async ()=>
                    {
                        await fetchToCurrentReservation(item);
                        setCurrentView(RESERVATION_VIEW);
                        console.log(RESERVATION_VIEW)
                    }}
            >{item.id}</Link>
        </Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.startDate}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.endDate}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>
            <Link color="blue" onClick={async ()=>
            {
                await fetchToCurrentlyViewedUser(item.userId);
                setCurrentView(USER_VIEW)
            }}>
                {item.userId}
            </Link>
        </Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.reservationStatus}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>
            <Link color="blue" onClick={async () =>
            {
                await fetchListingById(item.carParkId);
                setCurrentView(LISTING_VIEW);
            }}>
            {item.carParkId}
            </Link>
        </Td>
        <Td paddingY='2rem' fontSize='1.25rem'
            style={{overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '350px'}}>
            {item.info}
        </Td>
    </Tr>);
}
