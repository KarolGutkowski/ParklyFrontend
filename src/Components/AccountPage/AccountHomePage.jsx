import { Box, Card, CardHeader, CardBody, CardFooter,Heading, Text, Button } from '@chakra-ui/react'
import { LISTINGS_PAGE, RESERVATIONS_PAGE } from './account_page_consts';

const cardWith = "40%";
const AccountHomePage = (props) => {
    const {setCurrentPage} = props;

    return (
        <Box display="flex" justifyContent="center" gap="10%" flexWrap="wrap" rowGap="20px">
            <Text width="100%" fontSize="3rem" fontWeight="bold" textAlign="center">Home</Text>
        <Card textAlign="center" width={cardWith} boxShadow='outline' p='6' rounded='md' bg='white'>
            <CardHeader >
                <Heading size='md'> Users</Heading>
            </CardHeader>
            <CardBody>
                <Text>100 000</Text>
            </CardBody>
            <CardFooter alignSelf="center">
                <Button>Details</Button>
            </CardFooter>
        </Card>

        <Card textAlign="center" width={cardWith} boxShadow='outline' p='6' rounded='md' bg='white'>
            <CardHeader >
                <Heading size='md' onC>Listings</Heading>
            </CardHeader>
            <CardBody>
                <Text>4 234</Text>
            </CardBody>
            <CardFooter alignSelf="center">
                <Button onClick={()=>setCurrentPage(LISTINGS_PAGE)}>Details</Button>
            </CardFooter>
        </Card>

        <Card textAlign="center" width={cardWith} boxShadow='outline' p='6' rounded='md' bg='white'>
            <CardHeader >
                <Heading size='md'>Reservations</Heading>
            </CardHeader>
            <CardBody>
                <Text>14 003</Text>
            </CardBody>
            <CardFooter alignSelf="center">
                <Button onClick={()=>setCurrentPage(RESERVATIONS_PAGE)}>Details</Button>
            </CardFooter>
        </Card>
        </Box>
    )
}

export default AccountHomePage;