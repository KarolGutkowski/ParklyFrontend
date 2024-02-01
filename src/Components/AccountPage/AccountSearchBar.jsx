import {Box, IconButton, Input, useDisclosure} from "@chakra-ui/react";
import {FilterIcon} from "./AccountPageIcons";
import {SearchIcon} from "@chakra-ui/icons";
import {ListingsFilters} from "./ListingsFilters";

export const AccountSearchBar = () => {
    const {isOpen, onToggle} = useDisclosure()

    return (<>
        <Box display="flex" flexDir="row" alignItems="center" justifyContent="center" gap="5px">
            <IconButton icon={<FilterIcon/>} onClick={onToggle}/>
            <IconButton icon={<SearchIcon/>} width="fit-content"/>
            <Input variant='filled' placeholder='Search' width="50%"/>
        </Box>
        <ListingsFilters isOpen={isOpen}/>
    </>);
}