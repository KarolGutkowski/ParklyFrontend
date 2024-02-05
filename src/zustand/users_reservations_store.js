import {create }from "zustand"
import {fetchReservationsForUser} from "../Components/AccountPage/Reservations/fetchReservations"


export const useUsersReservationsStore = create((set)=>
({
    reservations: [],
    pages: 0,

    fetchReservations: async (userId, pageNumber, pageSize) =>
    {
        const response = await fetchReservationsForUser(userId, pageNumber, pageSize);
        set({pages: response.totalPages })
        set({reservations: response.content});
    },
}));