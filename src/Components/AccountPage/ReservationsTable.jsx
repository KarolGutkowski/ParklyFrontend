import { TableContainer,Table, Thead, Tr, Th, Tbody, Td, Tfoot, Link, Image, Box, Text,Stack, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";


export const ReservationsTable = (props) =>
{
    const {columnsNamesList} = props;
    const {rowData} = props;
    const columns = [];

    columnsNamesList.forEach(name => {
        columns.push(<Th>{name}</Th>);
    });   
                    
    return (
        <>
            <TableContainer marginTop="10px">
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            {columns}
                        </Tr>
                    </Thead>
                        <Tbody>                   
                            {rowData?rowData.map(item=>
                                {
                                    return mapToTableRow(item);
                                }):null}                      
                        </Tbody>
                </Table>
            </TableContainer>
            {
                rowData?null:
                    <Stack padding={4} spacing={1}>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                    </Stack>
            }
        </>
    );
}

function mapToTableRow(item)
{
    return (<Tr>
                <Td>
                    <Link>{item.id}</Link>
                </Td>
                <Td>{item.startDate}</Td>
                <Td>{item.endDate}</Td>
                <Td>
                    <Link>
                        {item.user}
                    </Link>
                </Td>
                <Td>{item.type}</Td>
                <Td>{item.itemId}</Td>
                <Td style={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100px' }}>
                    {item.info}
                </Td>
            </Tr>);
}
