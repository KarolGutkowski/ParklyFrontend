import { Box, Button, Image, Input, Heading, AbsoluteCenter} from '@chakra-ui/react'
import {NavLink, useNavigate} from 'react-router-dom';
import logo from "../img/parkly_logo_black.png";
import { useCurrentUserStore } from '../zustand/current_user_store';
import {useForm} from "react-hook-form"

const Login = () => {
    const navigate = useNavigate();

    const loginUser = useCurrentUserStore((state)=> {
        return state.setCurrentUser;
    });

    const {
        handleSubmit,
        register,
        setValue,
        clearErrors
    } = useForm()

    function onLoginAttempt(value)
    {
        //verify login attempt and assign username + jwt
        loginUser({
            username: value.username
        });
        navigate("/account");
    }

    return (
        <Box position='relative' h='80vh' w="100%">
            <AbsoluteCenter p='4' color='white' axis='both'>
                <Box display="flex" flexDir="column" alignItems="center" justifyContent="space-between">
                    <Image src={logo} minWidth="300px" width="10vw" heigth="auto" alt="parkly logo"/>
                </Box>
                <form onSubmit={handleSubmit(onLoginAttempt)}>
                    <Box display="flex" flexDir="column" alignItems="center" justifyItems="center">
                        <Heading fontSize='2rem' size='md' onC>Login</Heading>
                            <Input placeholder='Username' size='md' marginTop={5} variant="filled" color="black"
                            {   
                                ...register('username',
                                {required: 'This field is required'}
                            )}/>
                            <Input type="password" placeholder='Password' size='md' marginTop={5} variant="filled" color="black"
                            {   
                                ...register('password',
                                {required: 'This field is required'}
                            )}/>
                            <Button mt={4} colorScheme='blackAlpha' bgColor='#010016' type='submit'>
                                Submit
                            </Button>
                    </Box>
                </form>
            </AbsoluteCenter>
        </Box>
    )
}

export default Login;