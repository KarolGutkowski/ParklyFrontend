import {Link, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {USER_VIEW} from "../account_page_consts";
import { useCurrentViewStore } from "../../../zustand/current_view_store"

export const UsersTable = ({columnsNamesList, rowData, setUserDetails}) => {
    const columns = [];

    const setCurrentView = useCurrentViewStore((state)=>state.changeView);

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
                            return mapToTableRow(item, setCurrentView, setUserDetails);
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

function mapToTableRow(item, setCurrentPage, setUserDetails) {
    return (<Tr bgColor='#c8e3fa' key={item.id}>
        <Td paddingY='2rem' fontSize='1.25rem'>
            <Link color="blue" onClick={() => {
                setCurrentPage(USER_VIEW + item.id)
                setUserDetails(item)
            }}>
                {item.username}
            </Link>
        </Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.firstName}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.lastName}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.email}</Td>
        <Td paddingY='2rem' fontSize='1.25rem'>{item.dateOfBirth}</Td>
    </Tr>);
}
