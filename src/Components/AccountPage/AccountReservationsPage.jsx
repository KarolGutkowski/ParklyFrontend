import {ReservationsTable} from "./ReservationsTable";
import {Box, Text} from "@chakra-ui/react";
import {AccountSearchBar} from "./AccountSearchBar";
import {useEffect, useState} from "react";
import {ReservationsSerachBar} from "./ReservationsSerachBar";

const AccountReservationsPage = () => {
    const [reserevations, setReserevations] = useState([{
        "id": 13,
        "startDate": "17-01-2023",
        "endDate": "31-02-2023",
        "user": "karol1234",
        "type": "Car",
        "itemId": 213,
        "info": "some long text\n tadwafbsdfsdfhjkdfjkhjfdgjshfsjdkfhk\njhdjksnjkdnjkvndfjknvjrebjvnjdfj"
    }]);
    const columns = [
        "Id", "Start Date", "End Date", "User", "Type", "Item id", "Info"
    ];

    useEffect(() => {
        fetch("http://localhost:3000/reservations")
            .then(result => {
                if (!result.ok) {
                    console.error("error loading reservations");
                    return null;
                }
                return result.json();
            })
            .then(data => {
                if (data) {
                    setReserevations(data);
                }
            })
    })

    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Reservations</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">

                <ReservationsSerachBar/>
                <ReservationsTable columnsNamesList={columns} rowData={reserevations}/>
            </Box>
        </Box>
    )
}

export default AccountReservationsPage;