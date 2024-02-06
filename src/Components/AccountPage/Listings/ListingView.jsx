import {Box, Button, Card, CardBody, CardFooter, 
    CardHeader, Heading, Image, Text, Input, Checkbox, Tabs, Tab, TabList,
    TabPanels, TabPanel} from "@chakra-ui/react";
import {LISTINGS_PAGE, reservations_columns} from "../account_page_consts";
import {ReservationsForEntity} from "../ReservationsForEntity"
import { useState, useEffect } from "react";
import { AddSpotToListing, RemoveListing } from "./AddSpotToListing";
import { SaveListingChanges } from "./SaveListingsChanges";
import { fetchReservationsForId } from "../Reservations/fetchReservations";
import { useCurrentViewStore } from "../../../zustand/current_view_store";
import { useCurrentListingsStore } from "../../../zustand/listings_store";
import {useForm} from "react-hook-form"
import example_spot_image from "../../../img/parking_spot_example.png"
import { SpotsForListing } from "./SpotsForListing";
import { api_address } from "../../../api_addres";
import { getAuthorizationHeaders } from "../../LoginLogic/loginLogic";

const VIEW_MODE = "VIEW_MODE"
const EDIT_MODE = "EDIT_MODE"

const RESERVATIONS = "RESERVATIONS";
const SPOTS = "SPOTS";

export const ListingView = () => {

    const [currentTab , setCurrentTab] = useState(RESERVATIONS);
    const {currentListing, updateListing} = useCurrentListingsStore((state)=>
    {
        return {
            currentListing: state.currentListing,
            updateListing: state.updateListing
        }   
    })

    const setCurrentView = useCurrentViewStore((state)=>state.changeView);

    const [listingDisplayMode, setlistingDisplayMode] = useState(VIEW_MODE);
    const [reservationsForListing, setReserevationsForListing] = useState(null);

    const { handleSubmit, register} = useForm()

    useEffect(()=>
    {
        if(currentListing)
        {
            fetchReservationsForId(setReserevationsForListing, currentListing.id);
        }
    },[currentListing])

    function editListing(value, e)
    {
        e.preventDefault();

        updateListing(currentListing.id, value);
        setlistingDisplayMode(VIEW_MODE);
    }

    function handleProfileImageOnClick(event)
    {
        const fileInput = document.getElementById("upload-avatar");
        fileInput.click();
    }

    async function handleFielInputOnChange(event)
    {
        debugger;
        const my_headers = getAuthorizationHeaders();

        const fileInput = document.getElementById("upload-avatar");
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("image", file);
        
        try {
            const result = await fetch(`${api_address}/car_park/${currentListing.id}/image/upload`,{
                method: 'POST',
                body: formData,
                headers: my_headers
            });
            
            if(!result.ok)
            {
                console.error("cant update your profile now :(");
                return;
            }else{
                const url = URL.createObjectURL(file);
                const profilePicture = document.getElementById("profile-avatar");
                profilePicture.setAttribute("src", url);
            }
        }  catch(err)  
        {
            console.error("Failed saving image:", err);
        } 
    }

    console.log(currentListing);
    return (
        
        currentListing?
        <>
            <Box>
                <Box mb='20px'>
                    <Text boxShadow='lg' width="100%" fontSize="3rem" fontWeight="bold" height='81px'
                        textAlign="center">Listing view</Text>
                </Box>
                <Box display="flex" flexDir="column" width="60%" margin="auto">
                    <Card marginTop="10px" overflow='hidden' variant='outline'>
                        <CardHeader textAlign="center">
                            <Button ml='1rem' left='0' position='absolute' colorScheme='blue'
                                    onClick={() => setCurrentView(LISTINGS_PAGE)}>Back</Button>
                            <Heading margin='auto' fontSize='1.875rem' size='md'> Listing {currentListing.id} details</Heading>
                        </CardHeader>
                        <CardBody display='flex' gap="20px">
                            <Box minWidth="250px">
                                <input type="file" 
                                    id="upload-avatar" 
                                    accept="image/*" 
                                    hidden="true"
                                    onChange={handleFielInputOnChange}/>
                                <Image src={currentListing.img?currentListing.img:example_spot_image} 
                                    id="profile-avatar" 
                                    onClick={handleProfileImageOnClick}
                                    alt="image alt" height="256px" width="250px"
                                    _hover={{opacity: "0.5", transition: "0.5s", cursor: "pointer"}}/>
                            </Box >
                                <Box width="80%" display="flex" flexDir="column">
                                    <Text fontSize='1.5rem'>Country: {currentListing.iso3166Country}</Text>
                                    <Text fontSize='1.5rem'>City: {currentListing.cityName}</Text>
                                    <Text fontSize='1.5rem'>Postal Code: {currentListing.postalCode}</Text>
                                    <Text fontSize='1.5rem'>Street: {currentListing.streetName}</Text>
                                    <Text fontSize='1.5rem'>Number: {currentListing.buildingNumber}</Text>
                                    <Text fontSize='1.5rem'>Longitde: {currentListing.longitude}</Text>
                                    <Text fontSize='1.5rem'>Latitude: {currentListing.latitude}</Text>
                                    {listingDisplayMode===VIEW_MODE?
                                        <>
                                            <Text fontSize='1.5rem'>Daily cost: {currentListing.dailyCost}</Text>
                                            <Text fontSize='1.5rem'>Active: {currentListing.active?"yes":"no"}</Text>
                                        </>:
                                    <form id="edit-listing-form" onSubmit={handleSubmit(editListing)}>
                                        Daily cost:
                                        <Input fontSize='1.5rem' defaultValue={currentListing.dailyCost} {   
                                            ...register('dailyCost',
                                            {required: 'This field is required'}
                                        )}/>
                                        
                                        <Checkbox defaultChecked={currentListing.active} 
                                            {...register('active')}>Active</Checkbox>    
                                    </form>
                                    }
                                </Box>
                        </CardBody>
                        <CardFooter display="flex" justifyContent="center">
                            <Box width='100%' display='flex' justifyContent='center' gap="10px">
                                {listingDisplayMode===VIEW_MODE?
                                    <Button colorScheme='teal' onClick={()=>setlistingDisplayMode(EDIT_MODE)}>Edit</Button>:
                                    <>
                                        <Button colorScheme='blue' onClick={()=>setlistingDisplayMode(VIEW_MODE)}>Cancel</Button>
                                        <SaveListingChanges />
                                    </>
                                }
                                <AddSpotToListing id={currentListing.id}/>
                            </Box>
                        </CardFooter>
                    </Card>
                    <Tabs isFitted variant='enclosed' marginTop="20px">
                        <TabList>
                            <Tab onClick={()=>setCurrentTab(RESERVATIONS)}>Reservations</Tab>
                            <Tab onClick={()=>setCurrentTab(SPOTS)}>Spots</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <ReservationsForEntity columnsNamesList={reservations_columns.filter(column => column !== "Car park")} rowData={reservationsForListing}/>
                            </TabPanel>
                            <TabPanel>
                                <SpotsForListing id={currentListing.id} currentlyOpenedTab={currentTab}/>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    {/* <ReservationsForEntity columnsNamesList={reservations_columns.filter(column => column !== "Car park")} rowData={reservationsForListing}/> */}
                </Box>
            </Box>
        </>:
        null
    );
}
