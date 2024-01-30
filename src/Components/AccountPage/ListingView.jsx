import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text} from "@chakra-ui/react";
import parking_spot_example from "../../img/parking_spot_example.png"
import {LISTINGS_PAGE} from "./account_page_consts";
import {ReservationsTable} from "./ReservationsTable";

export const ListingView = (props) => {
    const {id} = props;
    const {parkingDetails} = props;
    const {setCurrentPage} = props;

    console.log(id);
    console.log(parkingDetails)

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Listing view</Text>
            </Box>
            <Box display="flex" flexDir="column" width="60%" margin="auto">
                <Card bgColor='#EFD6D6' marginTop="10px">
                    <CardHeader textAlign="center">
                        <Button ml='1rem' left='0' position='absolute' colorScheme='blackAlpha' bgColor='#010016'
                                onClick={() => setCurrentPage(LISTINGS_PAGE)}>Back</Button>
                        <Heading margin='auto' fontSize='1.875rem' size='md'> Listing {id} details</Heading>
                    </CardHeader>
                    <CardBody display='flex'>
                        <Box mr='1rem' width='50%'>
                            <Image src={parking_spot_example} alt="parking spot" height="auto" width="100%"/>
                        </Box>
                        <Box>
                            <Text fontSize='1.5rem'>Country: {parkingDetails.country}</Text>
                            <Text fontSize='1.5rem'>City: {parkingDetails.city}</Text>
                            <Text fontSize='1.5rem'>Street: {parkingDetails.street}</Text>
                            <Text fontSize='1.5rem'>Number: {parkingDetails.number}</Text>
                        </Box>
                    </CardBody>
                    <CardFooter display="flex" justifyContent="center">
                        <Box width='100%' display='flex' justifyContent='space-between'>
                            <Button colorScheme='teal'>Edit</Button>
                            <Button variant='solid' colorScheme='blackAlpha' bg="#C64F4F" color="white">Remove</Button>
                        </Box>
                    </CardFooter>
                </Card>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">
                <ReservationsTable columnsNamesList={[
                    "Id", "Start Date", "End Date", "User", "Type", "Item id", "Info"
                ]} rowData={null}/>
            </Box>
        </Box>
    );
}