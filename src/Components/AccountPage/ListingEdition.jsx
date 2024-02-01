import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react"
import {useForm} from "react-hook-form";
import {useEffect} from "react";

export const ListingEdition = ({isEditingMode, parkingDetails}) => {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        setValue,
        clearErrors
    } = useForm()


    useEffect(() => {
        if (isEditingMode) {
            setValue('country', parkingDetails.country)
            setValue('city', parkingDetails.city)
            setValue('street', parkingDetails.street)
            setValue('number', parkingDetails.number)
            clearErrors()
        }
    }, [isEditingMode]);


    const onSubmit = (value) => {
        return console.log({...value, id: parkingDetails.id})
    }

    return (<Box hidden={!isEditingMode}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.country}>
                <FormLabel htmlFor='country'>Country</FormLabel>
                <Input placeholder='country' id='country' type='text'  {...register('country', {
                    required: 'This field is required',
                })}/>
                <FormErrorMessage>
                    {errors.country && errors.country.message}
                </FormErrorMessage>
            </FormControl>


            <FormControl isInvalid={errors.city}>
                <FormLabel htmlFor='city'>City</FormLabel>
                <Input placeholder='city' id='city' type='text' {...register('city', {
                    required: 'This field is required',
                })}/>
                <FormErrorMessage>
                    {errors.city && errors.city.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.street}>
                <FormLabel htmlFor='street'>Street</FormLabel>
                <Input placeholder='street' id='street' type='text' {...register('street', {
                    required: 'This field is required',
                })}/>
                <FormErrorMessage>
                    {errors.street && errors.street.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.number}>
                <FormLabel htmlFor='number'>Number</FormLabel>
                <Input onKeyDown={(event) => event.key !== '+' && event.key !== '-' ? null : event.preventDefault()}
                       placeholder='number'
                       id='number' type='number'  {...register('number', {
                    required: 'This field is required',
                    pattern: {
                        value: /^[1-9][0-9]*$/,
                        message: 'Invalid number'
                    }

                })}/>
                <FormErrorMessage>
                    {errors.number && errors.number.message}
                </FormErrorMessage>
            </FormControl>
            <Button type='submit' mt='1rem' colorScheme='teal' isLoading={isSubmitting}>
                Submit
            </Button>
        </form>
    </Box>);
}