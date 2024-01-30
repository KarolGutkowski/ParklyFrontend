import {Box, IconButton, Input} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

export const ReservationsSerachBar = () => {

    return (<>
        <Box display="flex" flexDir="row" alignItems="center" justifyContent="center" gap="5px">
            <IconButton icon={<SearchIcon/>} width="fit-content"/>
            <Input variant='filled' placeholder='Search' width="50%"/>
        </Box>
    </>);
}