import {Box, Button, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react"
import {useForm} from "react-hook-form";
import {useEffect} from "react";

export const UserEdition = ({isEditingMode, userDetails}) => {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        setValue,
        clearErrors
    } = useForm()


    useEffect(() => {
        if (isEditingMode) {
            setValue('username', userDetails.username)
            setValue('firstName', userDetails.firstName)
            setValue('lastName', userDetails.lastName)
            setValue('email', userDetails.email)
            setValue('dateOfBirth', userDetails.dateOfBirth)
            clearErrors()
        }
    }, [isEditingMode]);


    const onSubmit = (value) => {
        return console.log({...value, id: userDetails.id})
    }

    return (<Box hidden={!isEditingMode}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input placeholder='username' id='username' type='text'  {...register('username', {
                    required: 'This field is required',
                })}/>
                <FormErrorMessage>
                    {errors.username && errors.username.message}
                </FormErrorMessage>
            </FormControl>


            <FormControl isInvalid={errors.firstName}>
                <FormLabel htmlFor='firstName'>First name</FormLabel>
                <Input placeholder='first name' id='firstName' type='text' {...register('firstName', {
                    required: 'This field is required',
                })}/>
                <FormErrorMessage>
                    {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.lastName}>
                <FormLabel htmlFor='lastName'>Last name</FormLabel>
                <Input placeholder='last name' id='lastName' type='text' {...register('lastName', {
                    required: 'This field is required',
                })}/>
                <FormErrorMessage>
                    {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input placeholder='email' id='email' type='text' {...register('email', {
                    required: 'This field is required',
                })}/>
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.dateOfBirth}>
                <FormLabel htmlFor='dateOfBirth'>Date of birth</FormLabel>
                <Input placeholder='date of birth' id='dateOfBirth' type='text' {...register('dateOfBirth', {
                    required: 'This field is required',
                })}/>
                <FormErrorMessage>
                    {errors.dateOfBirth && errors.dateOfBirth.message}
                </FormErrorMessage>
            </FormControl>


            <Button type='submit' mt='1rem' colorScheme='teal' isLoading={isSubmitting}>
                Submit
            </Button>
        </form>
    </Box>);
}