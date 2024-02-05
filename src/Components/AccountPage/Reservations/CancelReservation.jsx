import { useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"
import {Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter} from "@chakra-ui/react"
import { useCurrentReservationsStore } from "../../../zustand/reservations_store"

export const CancelReservation = ({reservation})=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
  
    const {cancelReservationWithId} = useCurrentReservationsStore((state)=>
    {
        return {
          cancelReservationWithId: state.cancelReservationWithId
        }
    })

    return (
      <>
        <Button colorScheme={reservation.reservationStatus==="ACTIVE"?"orange":"green"} onClick={onOpen}>
          {reservation.reservationStatus==="ACTIVE"?"Cancel":"Restore"}
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {reservation.reservationStatus==="ACTIVE"?"Canceling the reservation":"Restoring the reservation"}
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>
  
              <AlertDialogFooter display="flex" justifyContent="center">
                <Button ref={cancelRef} onClick={onClose}>
                  Go Back
                </Button>
                <Button colorScheme='red' onClick={()=>
                  {
                    cancelReservationWithId(reservation);
                    onClose();
                  }} ml={3}>
                  Confirm
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
