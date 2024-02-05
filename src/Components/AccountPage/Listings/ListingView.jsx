import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, Input, Checkbox} from "@chakra-ui/react";
import {LISTINGS_PAGE, reservations_columns} from "../account_page_consts";
import {ReservationsForEntity} from "../ReservationsForEntity"
import { useState, useEffect } from "react";
import { RemoveListing } from "./ConfirmRemoveListingAlert";
import { SaveListingChanges } from "./SaveListingsChanges";
import { fetchReservationsForId } from "../Reservations/fetchReservations";
import { useCurrentViewStore } from "../../../zustand/current_view_store";
import { useCurrentListingsStore } from "../../../zustand/listings_store";
import {useForm} from "react-hook-form"
import example_spot_image from "../../../img/parking_spot_example.png"

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

    const { handleSubmit, register} = useForm()

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

        updateListing(currentListing.id, value);
        setlistingDisplayMode(VIEW_MODE);
    }
    console.log(currentListing);
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
                        <CardBody display='flex' gap="20px">
                            <Box minWidth="250px">
                                <Image src={example_spot_image} alt="image alt" height="256px" width="250px"/>
                            </Box >
                                <Box width="80%" display="flex" flexDir="column">
                                    <Text fontSize='1.5rem'>Country: {currentListing.iso3166Country}</Text>
                                    <Text fontSize='1.5rem'>City: {currentListing.cityName}</Text>
                                    <Text fontSize='1.5rem'>Postal Code: {currentListing.postalCode}</Text>
                                    <Text fontSize='1.5rem'>Street: {currentListing.streetName}</Text>
                                    <Text fontSize='1.5rem'>Number: {currentListing.buildingNumber}</Text>
                                    <Text fontSize='1.5rem'>Longitde: {currentListing.longitude}</Text>
                                    <Text fontSize='1.5rem'>Latitude: {currentListing.latitude}</Text>
                                    {listingDisplayMode===VIEW_MODE?
                                        <>
                                            <Text fontSize='1.5rem'>Daily cost: {currentListing.dailyCost}</Text>
                                            <Text fontSize='1.5rem'>Active: {currentListing.active?"yes":"no"}</Text>
                                        </>:
                                    <form id="edit-listing-form" onSubmit={handleSubmit(editListing)}>
                                        Daily cost:
                                        <Input fontSize='1.5rem' defaultValue={currentListing.dailyCost} {   
                                            ...register('dailyCost',
                                            {required: 'This field is required'}
                                        )}/>
                                        
                                        <Checkbox defaultChecked={currentListing.active} 
                                            {...register('active')}>Active</Checkbox>    
                                    </form>
                                    }
                                </Box>
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
                    <ReservationsForEntity columnsNamesList={reservations_columns.filter(column => column !== "Car park")} rowData={reservationsForListing}/>
                </Box>
            </Box>
        </>:
        null
    );
}