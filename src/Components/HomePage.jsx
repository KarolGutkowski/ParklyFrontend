import {Box, Image} from '@chakra-ui/react'
import logo from "../img/parkly_logo.png"

const HomePage = () => {
    return (
        <Box display="flex" flexDir="column" alignItems="center" justifyContent="space-between">
            <Image src={logo} alt="parkly logo" />
        </Box>
    )
}

export default HomePage