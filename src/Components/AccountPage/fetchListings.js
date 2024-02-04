import { api_address } from "../../api_addres";

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
    console.log("fetching single element");
    try{
        const result = await fetch(`${api_address}/listings/${id}`);
        if (!result?.ok)
        {
            throw new Error("Error loading listings");
        }
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch(err)
    {
        console.log("failed loading listings:", err);
    }
}