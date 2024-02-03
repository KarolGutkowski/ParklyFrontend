import {create }from "zustand"
import {HOME_PAGE} from "../Components/AccountPage/account_page_consts"


export const useCurrentViewStore = create((set)=>({
    currentView: HOME_PAGE,
    changeView: (view_name) => set((state) => ({ currentView: view_name}) ), 
}))