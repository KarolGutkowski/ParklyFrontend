import { Box, Button, Image, Input, Heading, AbsoluteCenter} from '@chakra-ui/react'
import {NavLink} from 'react-router-dom';
import logo from "../img/parkly_logo_black.png";

const Login = () => {
    return (
        <Box position='relative' h='80vh' w="100%">
            <AbsoluteCenter p='4' color='white' axis='both'>
                <Box display="flex" flexDir="column" alignItems="center" justifyContent="space-between">
                    <Image src={logo} minWidth="300px" width="10vw" heigth="auto" alt="parkly logo"/>
                </Box>
                <Box display="flex" flexDir="column" alignItems="center" justifyItems="center">
                    <Heading fontSize='2rem' size='md' onC>Login</Heading>
                    <Input placeholder='Username' size='md' marginTop={5} variant="filled"/>
                    <Input type="password" placeholder='Password' size='md' marginTop={5} variant="filled"/>
                    <Button mt={4} colorScheme='blackAlpha' bgColor='#010016' type='submit'>
                        <NavLink to="/account">
                            Submit
                        </NavLink>
                    </Button>
                </Box>
            </AbsoluteCenter>
        </Box>
    )
}

export default Login;