import { useRef } from "react"
import { useDisclosure } from "@chakra-ui/react"
import { Button, Modal, ModalOverlay,  
    ModalContent, ModalHeader, ModalCloseButton, 
    ModalBody, FormControl, FormLabel,Input, ModalFooter} from "@chakra-ui/react"
import { useCurrentListingsStore } from "../../../zustand/listings_store"
import {useForm} from "react-hook-form"

export const AddListingButton = (props)=> {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {pageSize, pageNumber} = props;
  
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const { handleSubmit, register} = useForm();

    const {addNewListing} = useCurrentListingsStore((state)=>
    {
        return {
            addNewListing: state.addNewListing
        }
    })

    function uploadListing(value, e)
    {
        e.preventDefault();
        console.log(value);
        debugger;

        const newListing = 
        {
            ...value,
            active: true
        }

        addNewListing(newListing, pageNumber, pageSize);
        onClose();
    }

  
    return (
      <>
        <Button onClick={onOpen}>Add Listing</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a new listing!</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <form id="add-listing-form" onSubmit={handleSubmit(uploadListing)}>
                <FormControl>
                    <FormLabel>Country</FormLabel>
                    <Input ref={initialRef} placeholder='Poland' 
                        {   
                            ...register('iso3166Country',
                            {required: 'This field is required'}
                        )} />
                </FormControl>
    
                <FormControl mt={4}>
                    <FormLabel>City</FormLabel>
                    <Input placeholder='Warsaw'  
                        {   
                            ...register('cityName',
                            {required: 'This field is required'}
                        )}/>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Postal Code</FormLabel>
                    <Input placeholder='01-100'
                    {   
                        ...register('postalCode',
                        {required: 'This field is required'}
                    )} />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Street name</FormLabel>
                    <Input placeholder='Koszykowa' 
                    {   
                        ...register('streetName',
                        {required: 'This field is required'}
                    )}/>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Number</FormLabel>
                    <Input placeholder='Koszykowa' 
                    {   
                        ...register('buildingNumber',
                        {required: 'This field is required'}
                    )}/>
                </FormControl>


                <FormControl mt={4}>
                    <FormLabel>Longitude</FormLabel>
                    <Input placeholder='32' 
                    {   
                        ...register('longitude',
                        {required: 'This field is required'}
                    )}/>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Latitude</FormLabel>
                    <Input placeholder='30' 
                    {   
                        ...register('latitude',
                        {required: 'This field is required'}
                    )}/>
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Daily Cost</FormLabel>
                    <Input placeholder='3.5' 
                    {   
                        ...register('dailyCost',
                        {required: 'This field is required'}
                    )}/>
                </FormControl>
              </form>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} form="add-listing-form" type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }