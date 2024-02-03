import {create }from "zustand"

export const useCurrentUserStore = create((set)=>({
    currentUser: null,
    setCurrentUser: (user) => set((state) => ({ currentUser: user}) ),
    logoutCurrentUser: () => set((state) => ({ currentUser: null}))
}))