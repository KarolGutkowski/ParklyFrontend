import { Box, Button, Image, Input, Heading, AbsoluteCenter, Text} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom';
import logo from "../img/parkly_logo_black.png";
import { useCurrentUserStore } from '../zustand/current_user_store';
import {useForm} from "react-hook-form"
import {fetchLogin} from "./LoginLogic/loginLogic"
import { useState } from 'react';


const Login = () => {
    const navigate = useNavigate();
    const [loginAttemptFailed, setLoginAttemptFailed] = useState(false);
    const loginUser = useCurrentUserStore((state)=> {
        return state.setCurrentUser;
    });

    const {
        handleSubmit,
        register,
    } = useForm()

    async function onLoginAttempt(value, event)
    {
        event.preventDefault();

        const userdata = {
            email: value.email,
            password: value.password
        };

        try
        {
            await fetchLogin(userdata);
            loginUser({
                email: value.email,
            });

            navigate("/account");
        }catch(err)
        {
            setLoginAttemptFailed(true);
        }
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
                            <Input placeholder='Email' type="email" size='md' marginTop={5} variant="filled" color="black"
                            {   
                                ...register('email',
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
                            {
                                loginAttemptFailed?
                                <Text color="red">Failed login attempt. Try again</Text>
                                :null
                            }

                    </Box>
                </form>
            </AbsoluteCenter>
        </Box>
    )
}

export default Login;