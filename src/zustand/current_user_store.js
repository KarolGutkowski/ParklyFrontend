import {create }from "zustand"
import {fetchLogout} from "../Components/LoginLogic/loginLogic"

export const useCurrentUserStore = create((set)=>({
    currentUser: null,
    setCurrentUser: (user) => set((state) => ({ currentUser: user}) ),
    logoutCurrentUser: () => 
    {
        fetchLogout();
        set((state) => ({ currentUser: null}))
    }
}))