import { ReservationsTable } from "./ReservationsTable";
import { Box, Text, Button ,NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {ReservationsSerachBar} from "./ReservationsSerachBar";
import {reservations_columns} from "../account_page_consts"
import { useCurrentReservationsStore } from "../../../zustand/reservations_store";
import { PaginationMenu } from "../PaginationMenu";

const AccountReservationsPage = () => {
    
    const {fetchData, pages} = useCurrentReservationsStore((state)=>
    {
        return {
            fetchData: state.fetchReservations,
            pages: state.pages
        }
    });

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    
    useEffect(()=>
    {
        fetchData(pageNumber, pageSize);
    },[pageNumber, pageSize])

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Reservations</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">
                <ReservationsSerachBar />
                <PaginationMenu pageSize={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} setPageSize={setPageSize} pages={pages}/>
                <ReservationsTable columnsNamesList={reservations_columns}/>
            </Box>
        </Box>
    )
}

export default AccountReservationsPage;