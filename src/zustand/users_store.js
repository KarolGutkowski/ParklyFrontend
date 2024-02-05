import {create } from "zustand"
import { fetchAllUsers, fetchUserById } from "../Components/AccountPage/Users/fetchUsers";

export const useCurrentUsersStore = create((set)=>(
{
    users: [],
    currentlyViewedUser: null,
    pages: 0,

    fetchUsers: async (pageNumber, pageSize) =>
    {
        const response = await fetchAllUsers(pageNumber, pageSize);
        set({pages: response.totalPages})
        set({users: response.content });
    },

    fetchToCurrentlyViewedUser: async (id)=> 
    {
        const currentlyViewedUser = await fetchUserById(id);
        set({currentlyViewedUser});
    }
}))