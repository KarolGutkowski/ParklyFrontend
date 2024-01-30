import {Text, Box, Button, Image, Input, Heading} from '@chakra-ui/react'
import {NavLink} from 'react-router-dom';
import logo from "../img/parkly_logo_black.png";

const Login = () => {
    return (
        <>
            <Box display="flex" flexDir="column" alignItems="center" justifyContent="space-between">
                <Image src={logo} width="145px" heigth="auto" alt="parkly logo"/>
            </Box>
            <Box display="flex" flexDir="column" alignItems="center" justifyItems="center">
                <Heading fontSize='1.5rem' size='md' onC>Login</Heading>
                <Input placeholder='Username' size='md' width="auto" marginTop={5} variant="filled"/>
                <Input type="password" placeholder='Password' size='md' width="auto" marginTop={5} variant="filled"/>
                <Button mt={4} colorScheme='blackAlpha' bgColor='#010016' type='submit'>
                    <NavLink to="/account">
                        Submit
                    </NavLink>
                </Button>
            </Box>
        </>
    )
}

export default Login;