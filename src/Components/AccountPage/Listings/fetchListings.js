import { api_address } from "../../../api_addres";
import { getLoggedInUser, getAuthorizationHeaders } from "../../LoginLogic/loginLogic";

export const fetchListings = async (pageNumber, pageSize) =>
{
    try{
        var myHeaders = getAuthorizationHeaders()

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };


        const result = await fetch(`${api_address}/admin/car_park?` + new URLSearchParams({page: pageNumber, size: pageSize}), requestOptions);
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
        debugger;
        var myHeaders = getAuthorizationHeaders()

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const result = await fetch(`${api_address}/admin/car_park?` + new URLSearchParams({id: id}), requestOptions);

        if (!result?.ok)
        {
            throw new Error("Error loading listings");
        }
        const data = await result.json();

        if(data.totalElements!==1)
            throw new Error('Failed to fetch users');
        
        const src = await fetchImage(id);

        return { ...data.content[0], img: src};
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

export const fetchUpdateListing = async (id, newData) =>
{
    try {
        var myHeaders = getAuthorizationHeaders();

        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(newData)
        };

        const response = await fetch(`${api_address}/admin/car_park/${id}`, requestOptions);
        if (!response.ok) 
        {
            throw new Error('Failed to fetch update listing');
        }

    } catch (error) {
        console.error('Error while updating listing:', error);
        return 0;
    }
}

export const fetchAddListing = async (listingData) =>
{
    try {
        var myHeaders = getAuthorizationHeaders();

        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(listingData)
        };

        const response = await fetch(`${api_address}/admin/car_park`, requestOptions);
        if (!response.ok) 
        {
            throw new Error('Failed to fetch update listing');
        }

    } catch (error) {
        console.error('Error while updating listing:', error);
        return 0;
    }
}


export const fetchAddSpotToListing = async (spot_data) =>
{
    try {
        var myHeaders = getAuthorizationHeaders();

        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(spot_data)
        };

        const response = await fetch(`${api_address}/admin/spot`, requestOptions);
        if (!response.ok) 
        {
            throw new Error('Failed to fetch update listing');
        }

    } catch (error) {
        console.error('Error while updating listing:', error);
        return 0;
    }
}

export const fetchSpotsForListing = async (id)=>
{
    try {
        const user = getLoggedInUser();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };

        const response = await fetch(`${api_address}/admin/spot/${id}`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch spots');
        }
        const spots = await response.json();
        return spots;
    } catch (error) {
        console.error('Error fetching spots:', error);
        return 0;
    }
}


const fetchImage = async (id) =>
{
    try{
        var myHeaders = getAuthorizationHeaders();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        const result = await fetch(`${api_address}/car_park/${id}/image`, requestOptions);
        if (!result?.ok)
        {
            return null;
        }

        const data = await result.blob();
        debugger;
        const objectURL = URL.createObjectURL(data);
        return objectURL;
    }
    catch(err)
    {
        console.log("failed loading listings:", err);
    }
}

