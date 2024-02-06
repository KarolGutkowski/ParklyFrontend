import {create }from "zustand"
import { fetchSpotsForListing} from "../Components/AccountPage/Listings/fetchListings";

export const useCurrentSpotsStore = create((set) => ({ 
  spots: [],

  // Action to fetch all listings
  fetchSpotsForId: async (id) => {
    debugger;
    const response = await fetchSpotsForListing(id);
    debugger;
    set({ spots: response.content }); 
  }
}));