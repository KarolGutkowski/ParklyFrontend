import { ReservationsTable } from "./ReservationsTable";
import { Box, Text } from "@chakra-ui/react";
import { AccountSearchBar } from "./AccountSearchBar";
import { useState, useEffect } from "react";
import {ReservationsSerachBar} from "./ReservationsSerachBar";
import { api_address } from "../../api_addres";
import {reservations_columns} from "./account_page_consts"
import { fetchReservations } from "./fetchReservations";

const AccountReservationsPage = () => {
    const [reserevations, setReserevations]= useState(null);   

    useEffect(()=>
    {
        fetchReservations(setReserevations);
    },[])

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Reservations</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">

                <ReservationsSerachBar/>
                <ReservationsTable columnsNamesList={reservations_columns} rowData={reserevations}/>
            </Box>
        </Box>
    )
}

export default AccountReservationsPage;