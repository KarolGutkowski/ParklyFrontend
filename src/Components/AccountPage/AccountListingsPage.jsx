import {Box, Text} from "@chakra-ui/react";
import ListingsTable from "./ListingsTable";
import {useEffect, useState} from "react";
import {AccountSearchBar} from "./AccountSearchBar";
import { api_address } from "../../api_addres";

const AccountListingsPage = ({setCurrentPage, setParkingDetails}) => {
    const [listings, setListings] = useState(null);

    useEffect(() => {
        fetch(`${api_address}/listings`)
            .catch(err => console.error("failed looading listings"))
            .then(result => {
                if (!result.ok) {
                    console.error("error loading reservations");
                    return null;
                }

                return result.json();
            })
            .then(data => {
                if (data) {
                    setListings(data);
                }
            })
    }, [])


    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Listings</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">
                <AccountSearchBar/>
                <ListingsTable setParkingDetails={setParkingDetails} setCurrentPage={setCurrentPage}
                               listings={listings}/>
            </Box>
        </Box>);
};

export default AccountListingsPage;