import {create } from "zustand"
import { fetchAllUsers, fetchUserById } from "../Components/AccountPage/Users/fetchUsers";

export const useCurrentUsersStore = create((set)=>(
{
    users: [],
    currentlyViewedUser: null,

    fetchReservations: async () =>
    {
        const users = await fetchAllUsers();
        set({users});
    },

    fetchToCurrentReservation: async (id)=> 
    {
        const currentlyViewedUser = await fetchUserById(id);
        set({currentlyViewedUser});
    }
}))