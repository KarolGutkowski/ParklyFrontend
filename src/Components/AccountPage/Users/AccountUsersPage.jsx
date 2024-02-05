import {useEffect} from "react";
import {Box, Text} from "@chakra-ui/react";
import {UsersTable} from "./UsersTable";
import {UsersSearchBar} from "./UsersSearchBar";
import { useCurrentUsersStore } from "../../../zustand/users_store";

const AccountUsersPage = () => {
    
    const fetchAllUsers = useCurrentUsersStore((state)=>(state.fetchUsers))

    const columns = [
        "Username", "First name", "Last name", "Email", "Date of birth"
    ];

    useEffect(() => {
        fetchAllUsers();
    },[])

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Users</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">

                <UsersSearchBar/>
                <UsersTable columnsNamesList={columns} />
            </Box>
        </Box>
    )
}

export default AccountUsersPage;