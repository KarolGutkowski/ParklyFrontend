import { api_address } from "../../../api_addres";
import { getLoggedInUser } from "../../LoginLogic/loginLogic";

export const fetchListings = async () =>
{
    try{
        const result = await fetch(`${api_address}/listings`);
        if (!result?.ok)
        {
            throw new Error("Error loading listings");
        }
        const data = await result.json();
        return data;
    }
    catch(err)
    {
        console.log("failed loading listings:", err);
    }
}


export const fetchListingByIdAsync = async (id) =>
{
    try{
        const result = await fetch(`${api_address}/listings/${id}`);
        if (!result?.ok)
        {
            throw new Error("Error loading listings");
        }
        const data = await result.json();
        return data;
    }
    catch(err)
    {
        console.log("failed loading listings:", err);
    }
}

export const fetchListingsCount = async () =>
{
    try {
        const user = getLoggedInUser();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };

        const response = await fetch(`${api_address}/admin/car_park/count`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch listings');
        }
        const car_parks_count = await response.json();
        return car_parks_count;
    } catch (error) {
        console.error('Error fetching listings:', error);
        return 0;
    }
        
}