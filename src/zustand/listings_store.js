import {create }from "zustand"
import { api_address } from "../api_addres"
import { fetchListings, fetchListingByIdAsync, fetchUpdateListing } from "../Components/AccountPage/Listings/fetchListings";

export const useCurrentListingsStore = create((set) => ({ 
  listings: [], // Array to store all listings
  currentListing: null, // Currently selected listing

  // Action to fetch all listings
  fetchAllListings: async () => {
    const listings = await fetchListings();
    set({ listings }); 
  },

  // Action to fetch a single listing by ID
  fetchListingById: async (id) => {
    const currentListing = await fetchListingByIdAsync(id); 
    set({ currentListing });
  },

  // Action to update a listing
  updateListing: async (id, newData) => {

    await fetchUpdateListing(id, newData);
    debugger;
    await set(async (state) => {
      await state.fetchAllListings(); // Refetch all listings after updating
      await state.fetchListingById(id); // Refetch the current listing after updating
    });
  }
}));