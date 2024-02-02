import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, Input} from "@chakra-ui/react";
import parking_spot_example from "../../img/parking_spot_example.png"
import {LISTINGS_PAGE, reservations_columns} from "./account_page_consts";
import {ReservationsTable} from "./ReservationsTable";
import { useState, useEffect } from "react";
import { RemoveListing } from "./ConfirmRemoveListingAlert";
import { SaveListingChanges } from "./SaveListingsChanges";
import { fetchReservationsForId } from "./fetchReservations";


const VIEW_MODE = "VIEW_MODE"
const EDIT_MODE = "EDIT_MODE"

export const ListingView = (props) => {
    const {id} = props;
    const {parkingDetails} = props;
    const {setCurrentPage} = props;

    const [listingDisplayMode, setlistingDisplayMode] = useState(VIEW_MODE);
    const [reservationsForListing, setReserevationsForListing] = useState(null);

    useEffect(()=>
    {
        fetchReservationsForId(setReserevationsForListing, id);
    },[id])

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Listing view</Text>
            </Box>
            <Box display="flex" flexDir="column" width="60%" margin="auto">
                <Card /*bgColor='#EFD6D6'*/ marginTop="10px" overflow='hidden' variant='outline'>
                    <CardHeader textAlign="center">
                        <Button ml='1rem' left='0' position='absolute' colorScheme='blue'
                                onClick={() => setCurrentPage(LISTINGS_PAGE)}>Back</Button>
                        <Heading margin='auto' fontSize='1.875rem' size='md'> Listing {id} details</Heading>
                    </CardHeader>
                    <CardBody display='flex'>
                        <Box mr='1rem' width='50%'>
                            <Image src={parking_spot_example} alt="parking spot" height="256px" width="521px"/>
                        </Box >
                        {listingDisplayMode===VIEW_MODE?
                            <Box width="70%">
                                <Text fontSize='1.5rem'>Country: {parkingDetails.country}</Text>
                                <Text fontSize='1.5rem'>City: {parkingDetails.city}</Text>
                                <Text fontSize='1.5rem'>Street: {parkingDetails.street}</Text>
                                <Text fontSize='1.5rem'>Number: {parkingDetails.number}</Text>
                            </Box>
                        :
                            <Box width="70%">
                                Country: 
                                <Input fontSize='1.5rem' defaultValue={parkingDetails.country} />
                                City:
                                <Input fontSize='1.5rem' defaultValue={parkingDetails.city} />
                                Street:
                                <Input fontSize='1.5rem' defaultValue={parkingDetails.street}/>
                                Number:
                                <Input fontSize='1.5rem' defaultValue={parkingDetails.number}/>
                            </Box>
                        }
                    </CardBody>
                    <CardFooter display="flex" justifyContent="center">
                        <Box width='100%' display='flex' justifyContent='center' gap="10px">
                            {listingDisplayMode===VIEW_MODE?
                                <Button colorScheme='teal' onClick={()=>setlistingDisplayMode(EDIT_MODE)}>Edit</Button>:
                                <>
                                    <Button colorScheme='blue' onClick={()=>setlistingDisplayMode(VIEW_MODE)}>Cancel</Button>
                                    <SaveListingChanges listingId={id} modifiedValues={parkingDetails}/>
                                </>
                            }
                                <RemoveListing />
                        </Box>
                    </CardFooter>
                </Card>
                <ReservationsTable columnsNamesList={reservations_columns} rowData={reservationsForListing}/>
            </Box>
        </Box>
    );
}