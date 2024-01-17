import { TableContainer,Table, Thead, Tr, Th, Tbody, Td, Link, Image, Stack, Skeleton } from "@chakra-ui/react";
import parking_spot_example from "../../img/parking_spot_example.png"
import { useEffect, useState } from "react";
import { LISTING_VIEW } from "./account_page_consts";


const ListingsTable = (props) =>
{
    const {setCurrentPage} = props
    const {listings} = props;

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
                            <Th>Image</Th>
                        </Tr>
                    </Thead>
                        <Tbody>                   
                            {listings? listings.map(item=>
                                {
                                    return mapToTableRow(item, setCurrentPage);
                                }):null}                      
                        </Tbody>
                </Table>
            </TableContainer>
            {
                listings?null:
                    <Stack padding={4} spacing={1}>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                    </Stack>
            }
        </>
    );
}

function mapToTableRow(item, setCurrentPage)
{
    return (<Tr>
        <Td>
            <Link color="blue" onClick={()=>setCurrentPage(LISTING_VIEW+"13fa")}>         
                    {item.id}
            </Link>
        </Td>
        <Td>{item.country}</Td>
        <Td>{item.city}</Td>
        <Td>{item.street}</Td>
        <Td>{item.number}</Td>
        <Td>
            <Image src={item.image.src} alt={item.image.alt}/>
        </Td>
    </Tr>);
}

export default ListingsTable;