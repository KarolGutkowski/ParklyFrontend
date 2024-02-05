import {Link, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {USER_VIEW} from "../account_page_consts";
import { useCurrentViewStore } from "../../../zustand/current_view_store"
import { useCurrentUsersStore } from "../../../zustand/users_store";

export const UsersTable = ({columnsNamesList}) => {
    const columns = [];

    const users = useCurrentUsersStore((state)=>state.users);
    const fetchToCurrentlyViewedUser = useCurrentUsersStore((state)=>state.fetchToCurrentlyViewedUser);
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
                        {users ? users.map(item => {
                            return mapToTableRow(item, setCurrentView, fetchToCurrentlyViewedUser);
                        }) : null}
                    </Tbody>
                </Table>
            </TableContainer>
            {
                users ? null :
                    <Stack padding={4} spacing={1}>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                    </Stack>
            }
        </>
    );
}

function mapToTableRow(item, setCurrentPage, fetchToCurrentUser) {
    return (<Tr bgColor='#c8e3fa' key={item.id}>
        <Td paddingY='2rem' fontSize='1.25rem'>
            <Link color="blue" onClick={async () => {
                await fetchToCurrentUser(item.id)
                setCurrentPage(USER_VIEW)
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
