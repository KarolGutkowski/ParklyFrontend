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
import { useCurrentViewStore } from "../../zustand/current_view_store";
import { useCurrentUserStore } from '../../zustand/current_user_store';
import { useNavigate} from 'react-router-dom';

const AccountSidebar = (props) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = useRef()
    const navigate = useNavigate();
    const setCurrentView = useCurrentViewStore((state)=>state.changeView);
    const {currentUser, logoutCurrentUser} = useCurrentUserStore((state)=>
    {
        return ({
            currentUser: state.currentUser,
            logoutCurrentUser: state.logoutCurrentUser
        })
    })

    if(currentUser == null)
    {
        navigate("/");
    }
    
    return (
        <>
            <Box position="absolute" display="flex" alignItems='center'>
                <Image onClick={() => setCurrentView(HOME_PAGE)} cursor='pointer' src={logo} alt="parkly logo"
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
                        <Text color='white' fontSize='md'>{currentUser.username}</Text>
                        <Text fontSize='md' color="#C64F4F">Admin</Text>
                    </DrawerHeader>

                    <DrawerBody color='white' display="flex" flexDirection="column" gap="20px">
                        <Button variant='solid' colorScheme='whiteAlpha' color='white' bgColor='#010016'
                                leftIcon={<HomeIcon fontSize='1.875rem'/>}
                                onClick={() => setCurrentView(HOME_PAGE)}>Home</Button>
                        <Button variant='solid' colorScheme='whiteAlpha' color='white' bgColor='#010016'
                                leftIcon={<ListingIcon fontSize='1.875rem'/>}
                                onClick={() => setCurrentView(LISTINGS_PAGE)}>Listings</Button>
                        <Button variant='solid' colorScheme='whiteAlpha' color='white' bgColor='#010016'
                                leftIcon={<ReservationsIcon fontSize='1.875rem'/>}
                                onClick={() => setCurrentView(RESERVATIONS_PAGE)}>Reservations</Button>
                        <Button variant='solid' colorScheme='whiteAlpha' color='white' bgColor='#010016'
                                leftIcon={<UsersIcon fontSize='1.875rem'/>}
                                onClick={() => setCurrentView(USERS_PAGE)}>Users</Button>
                    </DrawerBody>

                    <DrawerFooter>
                        <NavLink to="/">
                            <Button variant='solid' colorScheme='whiteAlpha' bg="#C64F4F" color="white" mr={3}
                                    rightIcon={<UnlockIcon/>} onClick={logoutCurrentUser}>
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