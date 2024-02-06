import
{
    Box, Collapse, Text, Input,
    FormControl, FormLabel, Select, Checkbox, Button
}from "@chakra-ui/react"
import {useForm} from "react-hook-form"
import { useCurrentReservationsStore } from "../../../zustand/reservations_store";

const ACTIVE = "ACTIVE";
const CANCELED_BY_ADMIN = "CANCELED_BY_ADMIN"
const CANCELED_BY_USER = "CANCELED_BY_USER"
const ARCHIVED = "ARCHIVED"

export const ReservationFilters = (props) =>
{
    const {isOpen} = props;
    const {filters, setFilters} = props;
    const {pageSize, pageNumber} = props;

    const { handleSubmit, register} = useForm();

    const refetchReservations = useCurrentReservationsStore((state)=>
    {
        return state.fetchReservations
    })

    function filterReservations(value, event)
    {
        event.preventDefault();
        setFilters(value);
        refetchReservations(pageNumber, pageSize, value);
    }

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
                    <form id="filter-reservations" onSubmit={handleSubmit(filterReservations)}>
                        <FormControl as='fieldset' width="40%" display="flex" flexDir="column" rowGap="10px">
                            <Text>Start Date:</Text>
                            <Input placeholder="Start Date" size="md" type="datetime-local"
                            {   
                                ...register('startDate')}/>

                            <Text>End Date:</Text>
                            <Input placeholder="Start Date" size="md" type="datetime-local"
                            {   
                                ...register('endDate')}/>
                            <Text>Reservation status:</Text>
                            <Select placeholder='Select option'
                           {...register('status')} >
                            <option value={ACTIVE}>{ACTIVE}</option>
                            <option value={CANCELED_BY_ADMIN}>{CANCELED_BY_ADMIN}</option>
                            <option value={CANCELED_BY_USER}>{CANCELED_BY_USER}</option>
                            <option value={ARCHIVED}>{ARCHIVED}</option>
                        </Select>
                        </FormControl>
                    </form>
                    <Button marginTop="20px" form="filter-reservations" type="submit">Filter</Button>
                </Box>
            </Collapse>
        </Box>);
}