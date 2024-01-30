import { Box, Text, Input, IconButton} from "@chakra-ui/react";
import ListingsTable from "./ListingsTable";
import { SearchIcon } from "@chakra-ui/icons";
import { FilterIcon } from "./AccountPageIcons";
import { useEffect, useState } from "react";
import { AccountSearchBar } from "./AccountSearchBar";

const AccountListingsPage = (props) => {
    
    const {setCurrentPage} = props;
    const {setParkingDetails} = props;
    const [listings, setListings] = useState(null);

    useEffect(()=>
    {
        fetch("http://localhost:10000/listings")
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
                <ListingsTable setParkingDetails={setParkingDetails} setCurrentPage={setCurrentPage} listings={listings}/>
            </Box>
        </Box>);
};

export default AccountListingsPage;