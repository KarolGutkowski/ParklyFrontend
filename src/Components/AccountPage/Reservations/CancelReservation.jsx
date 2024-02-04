import { useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"
import {Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter} from "@chakra-ui/react"

export const CancelReservation = ()=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
  
    return (
      <>
        <Button colorScheme='orange' onClick={onOpen}>
          Cancel this reservation
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Canceling the reservation
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter display="flex" justifyContent="center">
                <Button ref={cancelRef} onClick={onClose}>
                  Go Back
                </Button>
                <Button colorScheme='red' onClick={onClose} ml={3}>
                  Confirm
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
