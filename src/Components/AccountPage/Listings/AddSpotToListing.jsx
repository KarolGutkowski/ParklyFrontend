import { useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"
import {Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Input} from "@chakra-ui/react"
import {useForm} from "react-hook-form"
import { useCurrentListingsStore } from "../../../zustand/listings_store";
import { useCurrentSpotsStore } from "../../../zustand/current_spots_store";

export const AddSpotToListing = ({id})=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    const addSpotToListing = useCurrentListingsStore((state)=>{
      return state.addSpotToParking;
    })

    const refetchSpots = useCurrentSpotsStore((state)=>
    {
      return state.fetchSpotsForId;
    })

    const { handleSubmit, register} = useForm();

    function addSpot(value, e)
    {
      e.preventDefault();
      const data = {
        ...value,
        carParkId: id
      }
      addSpotToListing(data);
      refetchSpots(id);
    }
  
    return (
      <>
        <Button colorScheme='purple' onClick={onOpen}>
          Add parking spot
        </Button>
  
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Are you sure you want to increase number of spots?
              </AlertDialogHeader>
  
              <AlertDialogBody>
                <form id="add-spot" onSubmit={handleSubmit(addSpot)}>
                  Spot name:
                  <Input placeholder="ex. 12"{   
                      ...register('name',
                      {required: 'This field is required'}
                  )}/>
                </form>
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='purple' onClick={onClose} ml={3} type="submit" form="add-spot" >
                  Add parking spot
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
