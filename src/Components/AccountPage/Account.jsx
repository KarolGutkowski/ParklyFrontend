import { Box, List } from "@chakra-ui/react"
import AccountSidebar from "./AccountSidebar"
import { useState } from "react"
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
    const [parkingDetails, setParkingDetails] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const currentView = useCurrentViewStore((state)=> state.currentView);

    function renderMainContent() {
        switch(currentView){
            case HOME_PAGE:
                return <AccountHomePage />
            case LISTINGS_PAGE:
                return <AccountListingsPage setParkingDetails={setParkingDetails}/>
            case RESERVATIONS_PAGE:
                return <AccountReservationsPage />
            case RESERVATION_VIEW:
                return <ReservationView />
            case USERS_PAGE:
                return <AccountUsersPage setUserDetails={setUserDetails} />
            default:
                if(currentView.startsWith(LISTING_VIEW))
                {
                    return <ListingView />
                }
                if(currentView.startsWith(USER_VIEW))
                {
                    const id = currentView.replace(USER_VIEW, "");
                    return <UserView setCurrentPage={currentView} id={id} userDetails={userDetails}/>
                }

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