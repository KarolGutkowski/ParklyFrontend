import { Box, Text, Input, IconButton} from "@chakra-ui/react";
import ListingsTable from "./ListingsTable";
import { SearchIcon } from "@chakra-ui/icons";
import { FilterIcon } from "./AccountPageIcons";
import { useEffect, useState } from "react";
import { AccountSearchBar } from "./AccountSearchBar";

const AccountListingsPage = (props) => {
    
    const {setCurrentPage} = props;
    const [listings, setListings] = useState(null);

    useEffect(()=>
    {
        fetch("http://localhost:10000/listings")
        .catch(err=>console.error("failed looading listings"))
        .then(result=>
            {
                if(!result.ok)
                {
                    console.error("error loading reservations");
                    return null;
                }

                return result.json();
            })
        .then(data=>
            {
                if(data)
                {
                    setListings(data);
                }
            })
    },[])


    return (
        <Box display="flex" flexDir="column" width="80%" margin="auto">
            <Text width="100%" fontSize="3rem" fontWeight="bold" textAlign="center">
                Listings
            </Text>
            <AccountSearchBar/>
            <ListingsTable setCurrentPage={setCurrentPage} listings={listings}/>
        </Box>);
};

export default AccountListingsPage;