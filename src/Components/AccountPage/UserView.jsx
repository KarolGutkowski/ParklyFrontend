import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text} from "@chakra-ui/react";
import parking_spot_example from "../../img/parking_spot_example.png"
import {USERS_PAGE} from "./account_page_consts";
import {ReservationsTable} from "./ReservationsTable";
import {useState} from "react";
import {UserEdition} from "./UserEdition";

export const UserView = ({id, userDetails, setCurrentPage}) => {
    const [isEditingMode, setIsEditingMode] = useState(false)


    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">User</Text>
            </Box>
            <Box display="flex" flexDir="column" width="60%" margin="auto">
                <Card bgColor='#EFD6D6' marginTop="10px">
                    <CardHeader textAlign="center">
                        <Button ml='1rem' left='0' position='absolute' colorScheme='blackAlpha' bgColor='#010016'
                                onClick={() => setCurrentPage(USERS_PAGE)}>Back</Button>
                        <Heading margin='auto' fontSize='1.875rem' size='md'> User {id} details</Heading>
                    </CardHeader>
                    <CardBody display='flex'>
                        <Box mr='1rem' width='50%'>
                            <Image src={userDetails.image.src} alt="parking spot" height="auto" width="100%"/>
                        </Box>
                        <Box hidden={isEditingMode}>
                            <Text fontSize='1.5rem'>Username: {userDetails.username}</Text>
                            <Text fontSize='1.5rem'>First name: {userDetails.firstName}</Text>
                            <Text fontSize='1.5rem'>Last name: {userDetails.lastName}</Text>
                            <Text fontSize='1.5rem'>Email: {userDetails.email}</Text>
                            <Text fontSize='1.5rem'>Date of birth: {userDetails.dateOfBirth}</Text>
                        </Box>
                        <UserEdition isEditingMode={isEditingMode}
                                     userDetails={userDetails}></UserEdition>
                    </CardBody>
                    <CardFooter display="flex" justifyContent="center">
                        <Box width='100%' display='flex' justifyContent='space-between'>
                            <Button onClick={() => setIsEditingMode(!isEditingMode)}
                                    colorScheme='teal'>{!isEditingMode ? "Edit" : "Cancel"}</Button>
                            <Button variant='solid' colorScheme='blackAlpha' bg="#C64F4F" color="white">Remove</Button>
                        </Box>
                    </CardFooter>
                </Card>
            </Box>
            <Box  display="flex" flexDir="column" width="80%" margin="2rem auto 0 auto">
                <Text width="100%" fontSize="2.5rem" fontWeight="bold" textAlign="center">Reservations</Text>
                <ReservationsTable columnsNamesList={[
                    "Id", "Start Date", "End Date", "User", "Type", "Item id", "Info"
                ]} rowData={null}/>
            </Box>
        </Box>
    );
}