import { ReservationsTable } from "./ReservationsTable";
import { Box, Text } from "@chakra-ui/react";
import { AccountSearchBar } from "./AccountSearchBar";

const AccountReservationsPage = () => {

    const columns = [
        "Id", "Start Date", "End Date", "User", "Type", "Item id", "Info"
    ];

    const exampleDat = {
        id: 13,
        startDate: "17-01-2023",
        endDate: "31-02-2023",
        user: "karol1234",
        type: "Car",
        itemId: 213,
        info: "some long text\n tadwafbsdfsdfhjkdfjkhjfdgjshfsjdkfhk\njhdjksnjkdnjkvndfjknvjrebjvnjdfj"
    } 
    const data = [exampleDat, exampleDat, exampleDat]

    return (
        <Box display="flex" flexDir="column" width="80%" margin="auto">
            <Text width="100%" fontSize="3rem" fontWeight="bold" textAlign="center">
                Reservations
            </Text>
            <AccountSearchBar />
            <ReservationsTable columnsNamesList={columns} rowData={data}/>
        </Box>
    )
}

export default AccountReservationsPage;