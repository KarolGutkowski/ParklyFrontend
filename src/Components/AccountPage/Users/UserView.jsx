import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Image, Text, Input} from "@chakra-ui/react";
import {USERS_PAGE} from "../account_page_consts";
import {ReservationsTable} from "../Reservations/ReservationsTable";
import {useState} from "react";
import { useCurrentViewStore } from "../../../zustand/current_view_store";
import { useCurrentUsersStore } from "../../../zustand/users_store";
import {useForm} from "react-hook-form"
import {SaveUserChanges} from "./SaveUserChanges"
import { UsersReservationTable } from "./UsersReservationTable";

export const UserView = () => {
    const [isEditingMode, setIsEditingMode] = useState(false)

    const user = useCurrentUsersStore((state)=>state.currentlyViewedUser);
    const setCurrentView = useCurrentViewStore((state)=>state.changeView);
    const { handleSubmit, register} = useForm();

    function editUser(value, e)
    {
        e.preventDefault();
        console.log(value);
    }

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">User</Text>
            </Box>
            <Box display="flex" flexDir="column" width="60%" margin="auto">
                <Card bgColor='transparent' marginTop="10px">
                    <CardHeader textAlign="center">
                        <Button ml='1rem' left='0' position='absolute' colorScheme='blue' 
                                onClick={() => setCurrentView(USERS_PAGE)}>Back</Button>
                        <Heading margin='auto' fontSize='1.875rem' size='md'> User {user.id} details</Heading>
                    </CardHeader>
                    <CardBody display='flex' justifyContent="center">
                        {!isEditingMode?
                        <Box display='flex' justifyContent="center" flexDir="column">
                            <Text fontSize='1.5rem'>First name: {user.firstName}</Text>
                            <Text fontSize='1.5rem'>Last name: {user.lastName}</Text>
                            <Text fontSize='1.5rem'>Email: {user.email}</Text>
                            <Text fontSize='1.5rem'>Date of birth: {user.birthDate}</Text>
                        </Box >
                        :
                            <Box >
                                <form id="edit-user-form" onSubmit={handleSubmit(editUser)} flexDir="column" display='flex' justifyContent="center" >
                                            First name:
                                            <Input fontSize='1.5rem' defaultValue={user.firstName} {   
                                                ...register('firstName',
                                                {required: 'This field is required'}
                                            )}/>
                                            Last name:
                                            <Input fontSize='1.5rem' defaultValue={user.lastName} {   
                                                ...register('lastName',
                                                {required: 'This field is required'}
                                            )}/>
                                            Email:
                                            <Input fontSize='1.5rem' defaultValue={user.email} {   
                                                ...register('email',
                                                {required: 'This field is required'}
                                            )}/>
                                            Date of birth:
                                            <Input fontSize='1.5rem' defaultValue={user.birthDate} {   
                                                ...register('dateOfBirth',
                                                {required: 'This field is required'}
                                            )}/>
                                    </form>
                                </Box>
                        }
                    </CardBody>
                    <CardFooter display="flex" justifyContent="center">
                        <Box width='100%' display='flex' justifyContent='center' gap="10px">
                            {/* {isEditingMode?
                                <>
                                    <Button onClick={() => setIsEditingMode(!isEditingMode)} colorScheme='blue'>Cancel</Button>
                                    <SaveUserChanges/>
                                </>:
                                <Button colorScheme='teal' onClick={()=>setIsEditingMode(!isEditingMode)}>Edit</Button>
                            }       */}
                            {/* <Button variant='solid' colorScheme='blackAlpha' bg="#C64F4F" color="white">Remove</Button> */}
                        </Box>
                    </CardFooter>
                </Card>
                <Box  display="flex" flexDir="column" width="100%" margin="2rem auto 0 auto">
                    <Text width="100%" fontSize="2.5rem" fontWeight="bold" textAlign="center">Reservations</Text>
                    <UsersReservationTable columnsNamesList={[
                        "Id", "Start Date", "End Date", "User", "Type", "Item id", "Info"
                    ]} userId={user.userId}/>
                </Box>
            </Box>
            
        </Box>
    );
}