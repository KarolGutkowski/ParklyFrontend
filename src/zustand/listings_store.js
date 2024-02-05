import {create }from "zustand"
import { api_address } from "../api_addres"
import { fetchListings, fetchListingByIdAsync, fetchUpdateListing } from "../Components/AccountPage/Listings/fetchListings";

export const useCurrentListingsStore = create((set) => ({ 
  listings: [], // Array to store all listings
  currentListing: null, // Currently selected listing
  pages: 0,

  // Action to fetch all listings
  fetchAllListings: async (page, pageSize) => {
    const listings = await fetchListings(page, pageSize);
    set({ pages: listings.totalPages});
    set({ listings: listings.content }); 
  },

  setCurrentPage: (page_num) =>
  {
      set({currentPage: page_num.content});
  },

  // Action to fetch a single listing by ID
  fetchListingById: async (id) => {
    const currentListing = await fetchListingByIdAsync(id); 
    set({ currentListing });
  },

  // Action to update a listing
  updateListing: async (id, newData) => {

    await fetchUpdateListing(id, newData);
    await set(async (state) => {
      await state.fetchAllListings(); // Refetch all listings after updating
      await state.fetchListingById(id); // Refetch the current listing after updating
    });
  }
}));