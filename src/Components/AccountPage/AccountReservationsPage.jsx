import { ReservationsTable } from "./ReservationsTable";
import { Box, Text } from "@chakra-ui/react";
import { AccountSearchBar } from "./AccountSearchBar";
import { useState, useEffect } from "react";

const AccountReservationsPage = () => {
    const [reserevations, setReserevations]= useState(null);
    const columns = [
        "Id", "Start Date", "End Date", "User", "Type", "Item id", "Info"
    ];

    useEffect(()=>
    {
        fetch("http://localhost:10000/reservations")
        .then(result=>
            {
                if (!result.ok)
                {
                    console.error("error loading reservations");
                    return null;
                }
                return result.json();
            })
        .then(data => 
            {
                if(data)
                {
                    setReserevations(data);
                }
            })
    })

    return (
        <Box display="flex" flexDir="column" width="80%" margin="auto">
            <Text width="100%" fontSize="3rem" fontWeight="bold" textAlign="center">
                Reservations
            </Text>
            <AccountSearchBar />
            <ReservationsTable columnsNamesList={columns} rowData={reserevations}/>
        </Box>
    )
}

export default AccountReservationsPage;