import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Image,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import {useRef} from 'react'
import {HomeIcon, ListingIcon, ReservationsIcon, UsersIcon} from './AccountPageIcons'
import {HamburgerIcon, UnlockIcon} from '@chakra-ui/icons'
import {NavLink} from 'react-router-dom'
import {HOME_PAGE, LISTINGS_PAGE, RESERVATIONS_PAGE, USERS_PAGE} from './account_page_consts'
import logo from "../../img/parkly_logo_black.png";

const AccountSidebar = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = useRef()
    const {setCurrentPage} = props;

    return (
        <>
            <Box position="absolute" display="flex" alignItems='center'>
                <Image onClick={() => setCurrentPage(HOME_PAGE)} cursor='pointer' src={logo} alt="parkly logo"
                       width="145px" heigth="auto"/>
                <Button marginLeft='1rem' ref={btnRef} colorScheme='blackAlpha' bgColor='#010016' onClick={onOpen}
                        as={IconButton}
                        icon={<HamburgerIcon/>}/>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent bgColor='#010016' alignItems="center">
                    <DrawerCloseButton color='white'/>

                    <DrawerHeader alignItems="center" textAlign="center">
                        <Image borderRadius='full' boxSize='150px' src='https://bit.ly/dan-abramov' alt='Dan Abramov'
                               marginTop="10px"/>
                        <Text color='white' fontSize='md'>Your login</Text>
                        <Text fontSize='md' color="#C64F4F">Admin</Text>
                    </DrawerHeader>

                    <DrawerBody color='white' display="flex" flexDirection="column" gap="20px">
                        <Button variant='solid' colorScheme='whiteAlpha' color='white' bgColor='#010016'
                                leftIcon={<HomeIcon/>}
                                onClick={() => setCurrentPage(HOME_PAGE)}>Home</Button>
                        <Button variant='solid' colorScheme='whiteAlpha' color='white' bgColor='#010016'
                                leftIcon={<ListingIcon/>}
                                onClick={() => setCurrentPage(LISTINGS_PAGE)}>Listings</Button>
                        <Button variant='solid' colorScheme='whiteAlpha' color='white' bgColor='#010016'
                                leftIcon={<ReservationsIcon/>}
                                onClick={() => setCurrentPage(RESERVATIONS_PAGE)}>Reservations</Button>
                        <Button variant='solid' colorScheme='whiteAlpha' color='white' bgColor='#010016'
                                leftIcon={<UsersIcon/>}
                                onClick={() => setCurrentPage(USERS_PAGE)}>Users</Button>
                    </DrawerBody>

                    <DrawerFooter>
                        <NavLink to="/">
                            <Button variant='solid' colorScheme='whiteAlpha' bg="#C64F4F" color="white" mr={3}
                                    rightIcon={<UnlockIcon/>}>
                                Logout
                            </Button>
                        </NavLink>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AccountSidebar;