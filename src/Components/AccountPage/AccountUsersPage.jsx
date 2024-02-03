import {useEffect, useState} from "react";
import {Box, Text} from "@chakra-ui/react";
import {UsersTable} from "./UsersTable";
import {UsersSearchBar} from "./UsersSearchBar";
import { api_address } from "../../api_addres";

const AccountUsersPage = ({setUserDetails, setCurrentPage}) => {
    const [users, setUsers] = useState([
        {
            "id": 21,
            "username": "jp2137",
            "firstName": "Karol",
            "lastName": "Wojtyła",
            "email": "superEmail@gmail.com",
            "dateOfBirth": "01.01.2005",
            
        }]);
    const columns = [
        "Username", "First name", "Last name", "Email", "Date of birth"
    ];

    // useEffect(() => {
    //     fetch(`${api_address}/reservations`)
    //         .then(result => {
    //             if (!result.ok) {
    //                 console.error("error loading users");
    //                 return null;
    //             }
    //             return result.json();
    //         })
    //         .then(data => {
    //             if (data) {
    //                 setUsers(data);
    //             }
    //         })
    // })

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Users</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">

                <UsersSearchBar/>
                <UsersTable columnsNamesList={columns} rowData={users} setCurrentPage={setCurrentPage}
                            setUserDetails={setUserDetails}
                />
            </Box>
        </Box>
    )
}

export default AccountUsersPage;