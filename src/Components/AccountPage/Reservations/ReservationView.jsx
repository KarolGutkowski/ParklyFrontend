import { useCurrentReservationsStore } from "../../../zustand/reservations_store"
import { useCurrentViewStore } from "../../../zustand/current_view_store"
import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, Input, Link} from "@chakra-ui/react";
import { LISTING_VIEW, RESERVATIONS_PAGE } from "../account_page_consts";
import {useForm} from "react-hook-form"
import { CancelReservation } from "./CancelReservation";
import { useCurrentListingsStore } from "../../../zustand/listings_store";

const EDIT_MODE = "EDIT_MODE";

export const ReservationView = () =>
{
    const {currentReservation} = useCurrentReservationsStore((state)=>
    {
        return {
            currentReservation: state.currentReservation,
        }
    })

    const {fetchListingById} = useCurrentListingsStore((state)=>
    {
        return ({
            fetchListingById: state.fetchListingById
        })
    })
    
    const setCurrentView = useCurrentViewStore((state)=>state.changeView);

    return (
        
        currentReservation?
        <>
            <Box>
                <Box mb='20px'>
                    <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                        textAlign="center">Reservation details</Text>
                </Box>
                <Box display="flex" flexDir="column" width="60%" margin="auto">
                    <Card marginTop="10px" overflow='hidden' variant='outline'>
                        <CardHeader textAlign="center">
                            <Button ml='1rem' left='0' position='absolute' colorScheme='blue'
                                    onClick={() => setCurrentView(RESERVATIONS_PAGE)}>Back</Button>
                            <Heading margin='auto' fontSize='1.875rem' size='md'> Reservation {currentReservation.id} details</Heading>
                        </CardHeader>
                        <CardBody display='flex'>
                                <Box width="100%" display='flex' flexDir="column" justifyContent="center">
                                    <Text fontSize='1.5rem' margin="auto">Start Date: {currentReservation.startDate}</Text>
                                    <Text fontSize='1.5rem' margin="auto">End Date: {currentReservation.endDate}</Text>
                                    <Text fontSize='1.5rem' margin="auto">User: {currentReservation.user}</Text>
                                    <Text fontSize='1.5rem' margin="auto">
                                            Car park:&nbsp;
                                            <Link color="blue" onClick={async ()=>
                                            {
                                                await fetchListingById(currentReservation.itemId);
                                                setCurrentView(LISTING_VIEW);
                                            }}>{currentReservation.itemId}
                                        </Link>
                                    </Text>
                                </Box>
                            
                        </CardBody>
                        <CardFooter display="flex" justifyContent="center">
                            <Box width='100%' display='flex' justifyContent='center'>
                                    <CancelReservation />
                            </Box>
                        </CardFooter>
                    </Card>
                </Box>
            </Box>
        </>:
        null
    );
}