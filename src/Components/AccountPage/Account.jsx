import { Box, List } from "@chakra-ui/react"
import AccountSidebar from "./AccountSidebar"
import { useState } from "react"
import {HOME_PAGE, LISTINGS_PAGE, RESERVATIONS_PAGE, USERS_PAGE, LISTING_VIEW, USER_VIEW} from "./account_page_consts"
import AccountHomePage from "./AccountHomePage"
import AccountListingsPage from "./AccountListingsPage"
import AccountReservationsPage from "./AccountReservationsPage"
import AccountUsersPage from "./AccountUsersPage"
import { ListingView } from "./ListingView"
import {UserView} from "./UserView";


const Account = () => {
    const [currentPage, setCurrentPage] = useState(HOME_PAGE);
    const [parkingDetails, setParkingDetails] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    function renderMainContent() {
        switch(currentPage){
            case HOME_PAGE:
                return <AccountHomePage setCurrentPage={setCurrentPage}/>
            case LISTINGS_PAGE:
                return <AccountListingsPage setParkingDetails={setParkingDetails} setCurrentPage={setCurrentPage}/>
            case RESERVATIONS_PAGE:
                return <AccountReservationsPage />
            case USERS_PAGE:
                return <AccountUsersPage setUserDetails={setUserDetails} setCurrentPage={setCurrentPage} />
            default:
                if(currentPage.startsWith(LISTING_VIEW))
                {
                    const id = currentPage.replace(LISTING_VIEW, "");
                    return <ListingView setCurrentPage={setCurrentPage} id={id} parkingDetails={parkingDetails}/>
                }
                if(currentPage.startsWith(USER_VIEW))
                {
                    const id = currentPage.replace(USER_VIEW, "");
                    return <UserView setCurrentPage={setCurrentPage} id={id} userDetails={userDetails}/>
                }

        }
    }

    return (
        <>
            <Box position="relative" margin="auto">
                <AccountSidebar setCurrentPage={setCurrentPage} />
                {renderMainContent()}
            </Box>
        </>
    )
}



export default Account