import
{
    Box, Collapse, Text,
    FormControl, FormLabel, Select, Checkbox
}
    from "@chakra-ui/react"

export const ListingsFilters = (props)=>
{
    const {isOpen} = props;

    return (
        <Box width="100%">
            <Collapse in={isOpen}  transition={{exit: {delay: 0.0}, enter: {duration: 0.2}}}>
                <Box
                    p='40px'
                    color='black'
                    mt='4'
                    bg='transparent'
                    rounded='md'
                    shadow='md'
                >
                    <FormControl as='fieldset' width="100%" display="flex" justifyContent="space-evenly">
                        <Box display="flex" flexDirection="column">
                            <FormLabel>Countries</FormLabel>
                            <Checkbox>Poland</Checkbox>
                            <Checkbox>Germany</Checkbox>
                            <Checkbox>Spain</Checkbox>
                        </Box>
                        <Box display="flex" flexDir="column">
                            <FormLabel>City</FormLabel>
                            <Checkbox >Warsaw</Checkbox>
                            <Checkbox >Cracow</Checkbox>
                            <Checkbox >Poznan</Checkbox>
                            <Checkbox >Madrid</Checkbox>
                            <Checkbox >Berlin</Checkbox>
                        </Box>
                    </FormControl>
                </Box>
            </Collapse>
        </Box>);
}