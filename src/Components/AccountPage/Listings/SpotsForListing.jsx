import { useState, useEffect } from "react";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Stack, Skeleton, Td } from "@chakra-ui/react";
import { useCurrentSpotsStore } from "../../../zustand/current_spots_store";

export const SpotsForListing = ({id, currentlyOpenedTab}) =>
{
    const {spots, fetchSpotsForId } = useCurrentSpotsStore((state)=>
    {
        return {
            spots: state.spots,
            fetchSpotsForId: state.fetchSpotsForId
        }
    })

    useEffect(()=>{
        fetchSpotsForId(id);
    },[id, currentlyOpenedTab])
    console.log(spots);
    return (
        <>
            <TableContainer marginTop="10px">
                <Table style={{borderCollapse: "separate", borderSpacing: "0 1rem"}} variant='simple'>
                    <Thead>
                        <Tr>
                            <Th fontSize='1rem'>Spot Id</Th>
                            <Th fontSize='1rem'>Name</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {spots ? spots.map(item => {
                            return (
                                <Tr bgColor='#c8e3fa'>
                                    <Td fontSize='1.25rem'>{item.spotId}</Td>
                                    <Td fontSize='1.25rem'>{item.name}</Td>
                                </Tr>
                            )
                        }) : null}
                    </Tbody>
                </Table>
            </TableContainer>
            {
                spots ? null :
                    <Stack padding={4} spacing={1}>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                        <Skeleton height="70px"/>
                    </Stack>
            }
        </>
    )
}