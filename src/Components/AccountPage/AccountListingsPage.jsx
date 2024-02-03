import {Box, Text} from "@chakra-ui/react";
import ListingsTable from "./ListingsTable";
import {useEffect, useState} from "react";
import {AccountSearchBar} from "./AccountSearchBar";
import { api_address } from "../../api_addres";
import { useCurrentListingsStore } from "../../zustand/listings_store";

const AccountListingsPage = ({setParkingDetails}) => {

    const setListings = useCurrentListingsStore((state)=>(state.setListings))


    useEffect(() => {
        fetch(`${api_address}/listings`)
            .catch(()=>
                {
                    setListings([]);
                    return;
                })
            .then((response) => {
                if (!response?.ok) {
                    console.log("failed loading reservations");
                    return null;
                }

                return response.json();
            })
            .then(data => {
                if (data) {
                    setListings(data);
                }
            });
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