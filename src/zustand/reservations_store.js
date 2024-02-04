import {create }from "zustand"
import {fetchAllReservations, fetchReservationById} from "../Components/AccountPage/Reservations/fetchReservations"


export const useCurrentReservationsStore = create((set)=>
({
    reservations: [],
    currentReservation: null,

    fetchReservations: async () =>
    {
        const reservations = await fetchAllReservations();
        set({reservations});
    },

    fetchToCurrentReservation: async (id)=> 
    {
        const currentReservation = await fetchReservationById(id);
        set({currentReservation});
        console.log(currentReservation);
    }
}));