import {create }from "zustand"

export const useCurrentListingsStore = create((set)=>({
    listings: null,
    currentlyViewedListing: null,

    setListings: (new_listings) => set((state) => ({ listings: new_listings}) ),
    appendListing: (listing) => set((state)=> ({listings: [...state.listings, listing]})),
    clearListings: () =>set((state) => ({ listings: null}) ),
    removeListing: (id) => set((state) =>({ listings: state.listings.filter(listing => listing.id !== id)})),

    setCurrentlyViewedListing: (id) => set((state) => ({currentlyViewedListing: id}))
}))