import {Box, Text} from "@chakra-ui/react";
import ListingsTable from "./ListingsTable";
import {useEffect, useState} from "react";
import {AccountSearchBar} from "./AccountSearchBar";

const AccountListingsPage = ({setCurrentPage, setParkingDetails}) => {
    const [listings, setListings] = useState([
        {
            "id": "13fa",
            "country": "Poland",
            "city": "Warszawa",
            "street": "Puławska",
            "number": 12,
            "image": {
                "src": "./static/media/parking_spot_example.b1a03108a34703a3d9e7.png",
                "alt": "example parking spot"
            }
        },
        {
            "id": "14fa",
            "country": "Nigeria",
            "city": "Shit city",
            "street": "Shit street",
            "number": 42,
            "image": {
                "src": "./static/media/parking_spot_example.b1a03108a34703a3d9e7.png",
                "alt": "example parking spot"
            }
        }
    ]);

    useEffect(() => {
        fetch("http://localhost:3000/listings")
            .catch(err => console.error("failed looading listings"))
            .then(result => {
                if (!result.ok) {
                    console.error("error loading reservations");
                    return null;
                }

                return result.json();
            })
            .then(data => {
                if (data) {
                    setListings(data);
                }
            })
    }, [])


    return (
        <Box>
            <Box mb='20px'>
                <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                      textAlign="center">Listings</Text>
            </Box>
            <Box display="flex" flexDir="column" width="80%" margin="auto">
                <AccountSearchBar/>
                <ListingsTable setParkingDetails={setParkingDetails} setCurrentPage={setCurrentPage}
                               listings={listings}/>
            </Box>
        </Box>);
};

export default AccountListingsPage;