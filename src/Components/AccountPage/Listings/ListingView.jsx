import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, Input, list} from "@chakra-ui/react";
import {LISTINGS_PAGE, reservations_columns} from "../account_page_consts";
import {ReservationsForEntity} from "../ReservationsForEntity"
import { useState, useEffect } from "react";
import { RemoveListing } from "./ConfirmRemoveListingAlert";
import { SaveListingChanges } from "../SaveListingsChanges";
import { fetchReservationsForId } from "../Reservations/fetchReservations";
import { useCurrentViewStore } from "../../../zustand/current_view_store";
import { useCurrentListingsStore } from "../../../zustand/listings_store";
import {useForm} from "react-hook-form"

const VIEW_MODE = "VIEW_MODE"
const EDIT_MODE = "EDIT_MODE"

export const ListingView = () => {

    const {currentListing, updateListing} = useCurrentListingsStore((state)=>
    {
        return {
            currentListing: state.currentListing,
            updateListing: state.updateListing
        }   
    })

    const setCurrentView = useCurrentViewStore((state)=>state.changeView);

    const [listingDisplayMode, setlistingDisplayMode] = useState(VIEW_MODE);
    const [reservationsForListing, setReserevationsForListing] = useState(null);

    const {
        handleSubmit,
        register,
    } = useForm()

    useEffect(()=>
    {
        if(currentListing)
        {
            fetchReservationsForId(setReserevationsForListing, currentListing.id);
        }
    },[currentListing])

    function editListing(value, e)
    {
        e.preventDefault();
        console.log(value);
        const updated = {
            id: currentListing.id,
            ...value,
        }

        updateListing(currentListing.id, updated);
        setlistingDisplayMode(VIEW_MODE);
    }

    return (
        
        currentListing?
        <>
            <Box>
                <Box mb='20px'>
                    <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                        textAlign="center">Listing view</Text>
                </Box>
                <Box display="flex" flexDir="column" width="60%" margin="auto">
                    <Card marginTop="10px" overflow='hidden' variant='outline'>
                        <CardHeader textAlign="center">
                            <Button ml='1rem' left='0' position='absolute' colorScheme='blue'
                                    onClick={() => setCurrentView(LISTINGS_PAGE)}>Back</Button>
                            <Heading margin='auto' fontSize='1.875rem' size='md'> Listing {currentListing.id} details</Heading>
                        </CardHeader>
                        <CardBody display='flex'>
                            <Box mr='1rem' width='50%'>
                                <Image src={currentListing.image.src} alt={currentListing.image.alt} height="256px" width="521px"/>
                            </Box >
                            {listingDisplayMode===VIEW_MODE?
                                <Box width="70%">
                                    <Text fontSize='1.5rem'>Country: {currentListing.country}</Text>
                                    <Text fontSize='1.5rem'>City: {currentListing.city}</Text>
                                    <Text fontSize='1.5rem'>Street: {currentListing.street}</Text>
                                    <Text fontSize='1.5rem'>Number: {currentListing.number}</Text>
                                </Box>
                            :
                                <form id="edit-listing-form" onSubmit={handleSubmit(editListing)}>
                                    <Box width="70%">
                                        Country: 
                                        <Input fontSize='1.5rem' defaultValue={currentListing.country} {   
                                            ...register('country',
                                            {required: 'This field is required'}
                                        )}/>
                                        City:
                                        <Input fontSize='1.5rem' defaultValue={currentListing.city} {   
                                            ...register('city',
                                            {required: 'This field is required'}
                                        )}/>
                                        Street:
                                        <Input fontSize='1.5rem' defaultValue={currentListing.street} {   
                                            ...register('street',
                                            {required: 'This field is required'}
                                        )}/>
                                        Number:
                                        <Input fontSize='1.5rem' defaultValue={currentListing.number} {   
                                            ...register('number',
                                            {required: 'This field is required'}
                                        )}/>
                                    </Box>
                                </form>
                            }
                        </CardBody>
                        <CardFooter display="flex" justifyContent="center">
                            <Box width='100%' display='flex' justifyContent='center' gap="10px">
                                {listingDisplayMode===VIEW_MODE?
                                    <Button colorScheme='teal' onClick={()=>setlistingDisplayMode(EDIT_MODE)}>Edit</Button>:
                                    <>
                                        <Button colorScheme='blue' onClick={()=>setlistingDisplayMode(VIEW_MODE)}>Cancel</Button>
                                        <SaveListingChanges />
                                    </>
                                }
                                    <RemoveListing />
                            </Box>
                        </CardFooter>
                    </Card>
                    <ReservationsForEntity columnsNamesList={reservations_columns} rowData={reservationsForListing}/>
                </Box>
            </Box>
        </>:
        null
    );
}