import { ReservationsTable } from "./ReservationsTable";
import { Box, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {ReservationsSerachBar} from "./ReservationsSerachBar";
import {reservations_columns} from "../account_page_consts"
import { useCurrentReservationsStore } from "../../../zustand/reservations_store";

const AccountReservationsPage = () => {
    
    const fetchData = useCurrentReservationsStore((state)=>(state.fetchReservations));

    useEffect(()=>
    {
        fetchData();
    },[])

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Reservations</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">

                <ReservationsSerachBar/>
                <ReservationsTable columnsNamesList={reservations_columns}/>
            </Box>
        </Box>
    )
}

export default AccountReservationsPage;