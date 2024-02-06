import {Box, Button, Text, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from "@chakra-ui/react";
import ListingsTable from "./ListingsTable"
import {useEffect, useState} from "react";
import {AccountSearchBar} from "./AccountSearchBar";
import { useCurrentListingsStore } from "../../../zustand/listings_store";
import { PaginationMenu } from "../PaginationMenu";
import { useDisclosure } from "@chakra-ui/react";
import {ListingsFilters} from "./ListingsFilters";
import { IconButton } from "@chakra-ui/react";
import { FilterIcon } from "../AccountPageIcons";
import { AddListingButton } from "./AddListingButton";

const AccountListingsPage = () => {

    const {fetchListings, pages} = useCurrentListingsStore((state)=>{
        return {
            fetchListings: state.fetchAllListings,
            pages: state.pages
        }
    })
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        fetchListings(pageNumber, pageSize);
    }, [pageNumber, pageSize])


    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Listings</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">
                <Box >
                    <AddListingButton pageSize={pageSize} pageNumber={pageNumber} />
                </Box>
                <Box display="flex" justifyContent="right">
                    {/* <IconButton icon={<FilterIcon/>} onClick={onToggle}/> */}
                    <PaginationMenu pageSize={pageSize} pageNumber={pageNumber} setPageNumber={setPageNumber} setPageSize={setPageSize} pages={pages}/>
                </Box>
                {/* <ListingsFilters isOpen={isOpen}/> */}
                <ListingsTable defaultValue={pageSize}/>
            </Box>
        </Box>);
};

export default AccountListingsPage;