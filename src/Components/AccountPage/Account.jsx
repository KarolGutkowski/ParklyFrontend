import { Box} from "@chakra-ui/react"
import AccountSidebar from "./AccountSidebar"
import {HOME_PAGE, LISTINGS_PAGE, RESERVATIONS_PAGE, USERS_PAGE, LISTING_VIEW, USER_VIEW, RESERVATION_VIEW} from "./account_page_consts"
import AccountHomePage from "./AccountHomePage"
import AccountListingsPage from "./Listings/AccountListingsPage"
import AccountReservationsPage from "./Reservations/AccountReservationsPage"
import AccountUsersPage from "./Users/AccountUsersPage"
import { ListingView } from "./Listings/ListingView"
import {UserView} from "./Users/UserView";
import { useCurrentViewStore } from "../../zustand/current_view_store"
import { ReservationView } from "./Reservations/ReservationView"


const Account = () => {
    const currentView = useCurrentViewStore((state)=> state.currentView);

    function renderMainContent() {
        switch(currentView){
            case HOME_PAGE:
                return <AccountHomePage />
            case LISTINGS_PAGE:
                return <AccountListingsPage />
            case RESERVATIONS_PAGE:
                return <AccountReservationsPage />
            case RESERVATION_VIEW:
                return <ReservationView />
            case USERS_PAGE:
                return <AccountUsersPage />
            case LISTING_VIEW:
                return <ListingView />
            case USER_VIEW:
                return <UserView />
            default:
                return null;
        }
    }

    return (
        <>
            <Box position="relative" margin="auto">
                <AccountSidebar />
                {renderMainContent()}
            </Box>
        </>
    )
}



export default Account