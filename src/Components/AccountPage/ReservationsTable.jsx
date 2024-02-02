import {Link, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";


export const ReservationsTable = (props) => {
    const {columnsNamesList} = props;
    const {rowData} = props;
    const columns = [];

    columnsNamesList.forEach(name => {
        columns.push(<Th fontSize='1rem'>{name}</Th>);
    });

    return (
        <>
            <TableContainer marginTop="10px">
                <Table style={{borderCollapse: "separate", borderSpacing: "0 1rem"}} variant='simple'>
                    <Thead>
                        <Tr>
                            {columns}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {rowData ? rowData.map(item => {
                            return mapToTableRow(item);
                        }) : null}
                    </Tbody>
                </Table>
            </TableContainer>
            {
                rowData ? null :
                    <Stack padding={4} spacing={1}>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                    </Stack>
            }
        </>
    );
}

function mapToTableRow(item) {
    return (<Tr bgColor='#EFD6D6'>
        <Td paddingY='2rem' fontSize='1.25rem'>
            <Link>{item.id}</Link>
        </Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.startDate}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.endDate}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>
            <Link>
                {item.user}
            </Link>
        </Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.type}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.itemId}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'
            style={{overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '350px'}}>
            {item.info}
        </Td>
    </Tr>);
}