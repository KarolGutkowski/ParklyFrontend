import {create }from "zustand"
import { api_address } from "../api_addres"
import { fetchListings, fetchListingByIdAsync } from "../Components/AccountPage/Listings/fetchListings";

export const useCurrentListingsStore = create((set) => ({ 
  listings: [], // Array to store all listings
  currentListing: null, // Currently selected listing

  // Action to fetch all listings
  fetchAllListings: async () => {
    const listings = await fetchListings(); // Call your API function to fetch all listings
    set({ listings }); // Update the listings array in the store
  },

  // Action to fetch a single listing by ID
  fetchListingById: async (id) => {
    const currentListing = await fetchListingByIdAsync(id); // Call your API function to fetch a listing by ID
    set({ currentListing }); // Update the current listing in the store
  },

  // Action to update a listing
  updateListing: async (id, newData) => {

    fetch(`${api_address}/listings/${id}`, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
    }) // Call your API function to update a listing

    await set(async (state) => {
      await state.fetchAllListings(); // Refetch all listings after updating
      await state.fetchListingById(id); // Refetch the current listing after updating
    });
  }
}));