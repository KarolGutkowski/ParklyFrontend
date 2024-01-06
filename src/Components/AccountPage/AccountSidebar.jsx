import { Image,Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton,DrawerHeader,DrawerBody,Input,DrawerFooter, Text, chakra, List } from '@chakra-ui/react'
import { useRef } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { HomeIcon, ListingIcon, ReservationsIcon, UsersIcon } from './AccountPageIcons'
import { UnlockIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'

const AccountSidebar = () => 
{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
        <>
          <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
            Menu
          </Button>
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
                <Button leftIcon={<HomeIcon/>}>Home</Button>
                <Button leftIcon={<ListingIcon/>}>Listings</Button>
                <Button leftIcon={<ReservationsIcon />}>Reservations</Button>
                <Button leftIcon={<UsersIcon/>}>Users</Button>
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