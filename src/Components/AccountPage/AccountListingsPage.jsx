import { Box, Text, Input, Button, IconButton, Icon } from "@chakra-ui/react";
import ListingsTable from "./ListingsTable";
import { SearchIcon } from "@chakra-ui/icons";
import { FilterIcon } from "./AccountPageIcons";
const AccountListingsPage = () => {
    
    

    return (
        <Box display="flex" flexDir="column" width="80%" margin="auto">
            <Text width="100%" fontSize="3rem" fontWeight="bold" textAlign="center">
                Listings
            </Text>
            <Box display="flex" flexDir="row" alignItems="center" justifyContent="center" gap="5px" > 
                <IconButton icon={<FilterIcon/>} />
                <IconButton icon={<SearchIcon />} width="fit-content"/>
                <Input variant='filled' placeholder='Search' width="50%" />
            </Box>
            <ListingsTable />
        </Box>);
};

export default AccountListingsPage;