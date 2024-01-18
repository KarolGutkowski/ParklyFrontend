import 
{
    Box, Collapse, Text, 
    FormControl, FormLabel, Select, Checkbox
} 
from "@chakra-ui/react"
import { useState, useEffect } from "react";
import { api_address } from "../../api_addres";

export const ListingsFilters = (props)=>
{
    const {isOpen} = props;
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(()=>
    {   
        fetchAndSet("countries", setCountries);
        fetchAndSet("cities", setCities);
    },[]);

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
                            {
                                countries.length?
                                countries.map(country=>
                                    {
                                        return <Checkbox>{country}</Checkbox>
                                    }):
                                null

                            }
                        </Box>
                        <Box display="flex" flexDir="column">
                            <FormLabel>City</FormLabel>
                            {
                                cities.length?
                                cities.map(city=>
                                    {
                                        return <Checkbox>{city}</Checkbox>
                                    }):
                                null

                            }
                        </Box>
                    </FormControl>
                </Box>
            </Collapse>
        </Box>);
}

function fetchAndSet(endpoint, setterFunc)
{
    fetch(`${api_address}\\${endpoint}`)
        .catch(err => console.error("failed loading data"))
        .then(result =>
            {
                if(result.ok)
                {
                    return result.json()
                }
                return null;
            })
        .then(data =>
            {
                if(data !=null)
                {
                    setterFunc(data);
                }
            })
}