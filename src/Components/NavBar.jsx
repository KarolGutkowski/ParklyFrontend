import { NavLink, Outlet } from "react-router-dom"
import { Button,Box } from "@chakra-ui/react"
const NavBar = () =>
{
// The size prop affects the height of the button
// It can still be overridden by passing a custom height


    return (
        <div>
            <Box display="flex" flexDir="row" alignItems="center" justifyContent="center" width="100%" backgroundColor="white" >
                <NavLink to="/" className={({ isActive }) =>isActive? "active" : ""}>
                    <Button size='md' height='30px' width='100px' margin="10px" >
                        Home
                    </Button>
                </NavLink>
                <NavLink to="/login" className={({ isActive }) => isActive? "active": "" }>
                    <Button size='md' height='30px' width='100px' margin="10px">
                        Login
                    </Button>
                </NavLink>
            </Box>
            <Outlet />
        </div>
    )
}
export default NavBar;