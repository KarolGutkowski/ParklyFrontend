import { Card,CardHeader, Text, Heading, CardBody, CardFooter, Button, Box, Image, GridItem, Grid } from "@chakra-ui/react";
import parking_spot_example from "../../img/parking_spot_example.png"

export const ListingView = () => 
{
    return (
        <Box display="flex" flexDir="column" width="80%" margin="auto">
            <Heading textAlign="center">
                Listing details
            </Heading>
            <Card marginTop="10px" >
                <CardHeader textAlign="center">
                    <Heading size='md'> Listing</Heading>
                </CardHeader>
                    <CardBody>
                        <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>
                            <GridItem rowSpan={2} colSpan={1} bg='transparent' >
                                <Image src={parking_spot_example} alt="parking spot" height="100%" width="100%"/>
                            </GridItem>
                            <GridItem colSpan={2} bg='papayawhip' />
                            <GridItem colSpan={2} bg='papayawhip' />
                            <GridItem colSpan={4} bg='tomato' />
                        </Grid>
                    </CardBody>
                <CardFooter display="flex" justifyContent="center">
                    <Button colorScheme='teal'>View here</Button>
                </CardFooter>
            </Card>
        </Box>
  );
}