import { TableContainer,Table, Thead, Tr, Th, Tbody, Td, Tfoot, Link, Image, Box, Text,Stack, Skeleton } from "@chakra-ui/react";
import parking_spot_example from "../../img/parking_spot_example.png"
import { useEffect, useState } from "react";


export const DataTable = (props) =>
{
    const {columnsNamesList} = props;
    const {rowData} = props;
    const columns = [];

    columnsNamesList.forEach(name => {
        columns.push(<Th>{name}</Th>);
    });
    const listItems = rowData.map(item => {
        return  (
            <Tr>
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
            </Tr>
        )
        
        });
                    
    
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
                            {columns}
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
