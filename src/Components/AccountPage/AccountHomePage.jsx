import {Box, Card, CardBody, CardFooter, CardHeader, Heading, Text} from '@chakra-ui/react'
import {LISTINGS_PAGE, RESERVATIONS_PAGE, USERS_PAGE} from './account_page_consts';
import {ListingIcon, ReservationsIcon, UsersIcon} from "./AccountPageIcons";
import { useCurrentViewStore } from '../../zustand/current_view_store';
import { useEffect, useState } from 'react';
import { api_address } from '../../api_addres';
import { fetchListingsCount } from "./Listings/fetchListings";
import { fetchReservationsCount } from './Reservations/fetchReservations';
import { fetchUsersCount } from './Users/fetchUsers';


const cardWith = "40%";
const AccountHomePage = (props) => {

    const setCurrentView = useCurrentViewStore((state)=>state.changeView);
    const currentView = useCurrentViewStore((state)=> state.currentView);
    const [statistics, setStatistics] = useState([]);

    useEffect(()=>
    {
        getStatistics()
            .then(statistics => {
                setStatistics(statistics);
            })
            .catch(error => {
                console.error('Error fetching statistics:', error);
            });

    }, [currentView])

    return (
        <Box>
            <Box>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Home</Text>
            </Box>

            <Box display="flex" justifyContent="center" gap="10%" flexWrap="wrap" rowGap="20px" mt="20px" width="60%"
                 marginX="auto">
                <Card borderRadius='2rem' fontSize='1.875rem' color='white' bg="#010016"
                      onClick={() => setCurrentView(USERS_PAGE)} cursor="pointer" textAlign="center"
                      width={cardWith} p='6'>
                    <CardHeader>
                        <UsersIcon fontSize="7rem"/>
                    </CardHeader>
                    <CardBody>
                        <Text>{statistics[0]}</Text>
                    </CardBody>
                    <CardFooter alignSelf="center">
                        <Heading fontSize='2rem' size='md'> Users</Heading>
                    </CardFooter>
                </Card>

                <Card borderRadius='2rem' fontSize='1.875rem' color='white' bg="#010016"
                      onClick={() => setCurrentView(LISTINGS_PAGE)} cursor="pointer" textAlign="center"
                      width={cardWith} p='6'>
                    <CardHeader>
                        <ListingIcon fontSize="7rem"/>
                    </CardHeader>
                    <CardBody>
                        <Text>{statistics[1]}</Text>
                    </CardBody>
                    <CardFooter alignSelf="center">
                        <Heading fontSize='2rem' size='md' onC>Listings</Heading>
                    </CardFooter>
                </Card>

                <Card borderRadius='2rem' fontSize='1.875rem' color='white' bg="#010016"
                      onClick={() => setCurrentView(RESERVATIONS_PAGE)} cursor="pointer"
                      textAlign="center" width={cardWith} p='6'>
                    <CardHeader>
                        <ReservationsIcon fontSize="7rem"/>
                    </CardHeader>
                    <CardBody>
                        <Text>{statistics[2]}</Text>
                    </CardBody>
                    <CardFooter alignSelf="center">
                        <Heading fontSize='2rem' size='md'>Reservations</Heading>
                    </CardFooter>
                </Card>
            </Box>
        </Box>
    )
}

export default AccountHomePage;


function getStatistics() {
    const usersPromise = fetchUsersCount();
    const listingsPromise = fetchListingsCount();
    const reservationsPromise = fetchReservationsCount();

    return Promise.all([usersPromise, listingsPromise, reservationsPromise]);
}
