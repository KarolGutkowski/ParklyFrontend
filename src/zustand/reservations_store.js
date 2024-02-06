import {create }from "zustand"
import {fetchAllReservations, cancelReservation} from "../Components/AccountPage/Reservations/fetchReservations"


export const useCurrentReservationsStore = create((set)=>
({
    reservations: [],
    currentReservation: null,
    pages: 0,

    fetchReservations: async (pageNumber, pageSize, filters) =>
    {
        const response = await fetchAllReservations(pageNumber, pageSize, filters);
        debugger;
        set({pages: response.totalPages })
        set({reservations: response.content});
    },

    fetchToCurrentReservation: async (reservation)=> 
    {
        set({currentReservation: reservation});
    },

    cancelReservationWithId: async (reservation) =>
    {
        await cancelReservation(reservation);

        const new_status = reservation.reservationStatus==="ACTIVE"?"CANCELED_BY_ADMIN":"ACTIVE";

        set((state)=>({currentReservation: {...state.currentReservation, reservationStatus: new_status}}))
    }


}));