import { Box } from "@chakra-ui/react"
import AccountSidebar from "./AccountSidebar"
import { useState } from "react"
import { HOME_PAGE, LISTINGS_PAGE, RESERVATIONS_PAGE, USERS_PAGE } from "./account_page_consts"
import AccountHomePage from "./AccountHomePage"
import AccountListingsPage from "./AccountListingsPage"
import AccountReservationsPage from "./AccountReservationsPage"
import AccountUsersPage from "./AccountUsersPage"


const Account = () => {
    const [currentPage, setCurrentPage] = useState(HOME_PAGE);

    function renderMainContent() {
      switch(currentPage){
        case HOME_PAGE:
          return <AccountHomePage />
        case LISTINGS_PAGE:
          return <AccountListingsPage/>
        case RESERVATIONS_PAGE:
          return <AccountReservationsPage />
        case USERS_PAGE:
          return <AccountUsersPage />
        default:
          return null;
      }
    }

    return (
      <>
        <Box width="80%" margin="auto" marginTop="5px">
          <AccountSidebar setCurrentPage={setCurrentPage} />
          {renderMainContent()}
        </Box>
      </>
    )
}



export default Account