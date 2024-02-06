import {useEffect} from "react";
import {Box, Text,Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import {UsersTable} from "./UsersTable";
import {UsersSearchBar} from "./UsersSearchBar";
import { useCurrentUsersStore } from "../../../zustand/users_store";
import { useState } from "react";
import { PaginationMenu } from "../PaginationMenu";
import { set } from "react-hook-form";

const AccountUsersPage = () => {
    
    const {fetchAllUsers, pages} = useCurrentUsersStore((state)=>{
        return {
            fetchAllUsers: state.fetchUsers,
            pages: state.pages
        }
    })

    const columns = [
        "Id", "First name", "Last name", "Email", "Date of birth"
    ];

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchAllUsers(pageNumber, pageSize);
    },[pageNumber, pageSize])

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Users</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">
                <PaginationMenu pageSize={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} setPageSize={setPageSize} pages={pages}/>
                <UsersTable columnsNamesList={columns} />
            </Box>
        </Box>
    )
}

export default AccountUsersPage;