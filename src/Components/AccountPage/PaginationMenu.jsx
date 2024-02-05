import {Box, Button, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";

export const PaginationMenu = (props) =>
{
    const {pageNumber, setPageNumber, pageSize, setPageSize, pages} = props;

    return (
        <Box display="flex" justifyContent="right" marginTop="20px" gap="20px">
                    <Button isDisabled={pageNumber-1<0} onClick={()=>setPageNumber(pageNumber-1)} colorScheme="gray">{"<"}</Button>
                    <Button isDisabled={pageNumber+1===pages} onClick={()=>setPageNumber(pageNumber+1)} colorScheme="gray">{">"}</Button>
                    <NumberInput step={1} value={pageSize} min={1} max={30} maxW={20}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper onClick={()=>
                        {
                            if(pageSize+1>30)
                                return;
                            setPageSize(pageSize+1);
                        }}/>
                        <NumberDecrementStepper onClick={()=>
                        { 
                            if(pageSize-1<1)
                                return;
                            setPageSize(pageSize-1);
                        }} />
                    </NumberInputStepper>
                </NumberInput>
        </Box>
    )
}