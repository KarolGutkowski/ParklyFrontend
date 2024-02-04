import {Box, Text} from "@chakra-ui/react";
import ListingsTable from "./ListingsTable";
import {useEffect, useState} from "react";
import {AccountSearchBar} from "./AccountSearchBar";
import { useCurrentListingsStore } from "../../zustand/listings_store";

const AccountListingsPage = ({setParkingDetails}) => {

    const fetchListings = useCurrentListingsStore((state)=>(state.fetchAllListings))

    useEffect(() => {
        fetchListings();
    }, [])


    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Listings</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">
                <AccountSearchBar/>
                <ListingsTable setParkingDetails={setParkingDetails}/>
            </Box>
        </Box>);
};

export default AccountListingsPage;