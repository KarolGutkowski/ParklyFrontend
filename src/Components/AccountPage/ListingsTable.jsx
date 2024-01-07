import { TableContainer,Table, Thead, Tr, Th, Tbody, Td, Tfoot, Link, Image, Box, Text,Stack, Skeleton } from "@chakra-ui/react";
import parking_spot_example from "../../img/parking_spot_example.png"
import { useEffect, useState } from "react";


const ListingsTable = () =>
{
    const listItems = [];
    const listItem = (<Tr>
                        <Td>
                            <Link>13fa</Link>
                        </Td>
                        <Td>Poland</Td>
                        <Td>Wawrszawa</Td>
                        <Td>Puławska</Td>
                        <Td>Number</Td>
                        <Td>No. of spot</Td>
                        <Td>
                            <Image src={parking_spot_example} alt="parking spot"/>
                        </Td>
                    </Tr>);
    for(let i = 0;i<20;i++) 
    {
        listItems.push(listItem)
    }
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(()=>{
        setTimeout(()=>setDataLoaded(true), 5000);
    }, [])

    return (
        <>
            <TableContainer marginTop="10px">
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Country</Th>
                            <Th>City</Th>
                            <Th>Street</Th>
                            <Th>Number</Th>
                            <Th>No. of spot</Th>
                            <Th>Image</Th>
                        </Tr>
                    </Thead>
                        <Tbody>                   
                            {dataLoaded?listItems:null}                      
                        </Tbody>
                </Table>
            </TableContainer>
            {
                dataLoaded?null:
                    <Stack padding={4} spacing={1}>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                    </Stack>
            }
        </>
    );
}

export default ListingsTable;