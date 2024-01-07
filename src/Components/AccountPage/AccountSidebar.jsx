import { Image,Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton,DrawerHeader,DrawerBody,Input,DrawerFooter, Text,IconButton } from '@chakra-ui/react'
import { useRef } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { HomeIcon, ListingIcon, ReservationsIcon, UsersIcon} from './AccountPageIcons'
import { HamburgerIcon, UnlockIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import { HOME_PAGE, LISTINGS_PAGE, RESERVATIONS_PAGE,USERS_PAGE } from './account_page_consts'

const AccountSidebar = (props) => 
{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const {setCurrentPage} = props;

    return (
        <>
          <Button ref={btnRef} colorScheme='blue' onClick={onOpen} as={IconButton} icon={<HamburgerIcon/>}/>
          <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent alignItems="center">
              <DrawerCloseButton />

            <DrawerHeader alignItems="center" textAlign="center">
                <Image borderRadius='full' boxSize='150px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' marginTop="10px"/>
                <Text fontSize='md'>Your login</Text>
                <Text fontSize='md' color="#C64F4F">Admin</Text>
            </DrawerHeader>

              <DrawerBody display="flex" flexDirection="column" gap="20px">
                <Button leftIcon={<HomeIcon/>} onClick={()=>setCurrentPage(HOME_PAGE)}>Home</Button>
                <Button leftIcon={<ListingIcon/>} onClick={()=>setCurrentPage(LISTINGS_PAGE)}>Listings</Button>
                <Button leftIcon={<ReservationsIcon />} onClick={()=>setCurrentPage(RESERVATIONS_PAGE)}>Reservations</Button>
                <Button leftIcon={<UsersIcon/>} onClick={()=>setCurrentPage(USERS_PAGE)}>Users</Button>
              </DrawerBody>
    
              <DrawerFooter>
                <NavLink to="/">
                  <Button bg="#C64F4F" color="white" mr={3} rightIcon={<UnlockIcon/>}>
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