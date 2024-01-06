import { Input, Box ,Button} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <Box display="flex" flexDir="column" alignItems="center" justifyItems="center">
            Login
            <Input placeholder='Username' size='md' width="auto" marginTop={5} variant="filled"/>
            <Input type="password" placeholder='Password' size='md' width="auto" marginTop={5} variant="filled"/>
            <Button mt={4} colorScheme='blue' type='submit'>
                <NavLink to="/account" >
                    Submit
                </NavLink>
            </Button>
        </Box>  
    )
} 

export default Login;