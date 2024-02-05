import {create } from "zustand"
import { fetchAllUsers, fetchUserById } from "../Components/AccountPage/Users/fetchUsers";

export const useCurrentUsersStore = create((set)=>(
{
    users: [],
    currentlyViewedUser: null,

    fetchUsers: async () =>
    {
        const users = await fetchAllUsers();
        set({users});
    },

    fetchToCurrentlyViewedUser: async (id)=> 
    {
        const currentlyViewedUser = await fetchUserById(id);
        set({currentlyViewedUser});
    }
}))