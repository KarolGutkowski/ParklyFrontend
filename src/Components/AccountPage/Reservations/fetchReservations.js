import { api_address } from "../../../api_addres";
import { getLoggedInUser, getAuthorizationHeaders } from "../../LoginLogic/loginLogic";

export const fetchReservationsForId = async (reservationsSetter, id) =>{
    
    try{
        debugger;
        const headers = getAuthorizationHeaders()

        var requestOptions = {
            method: 'GET',
            headers: headers,
        };

        const result = await fetch(`${api_address}/admin/reservation/car_park?` + new URLSearchParams({carParkId: id}),
            requestOptions);

        if (!result?.ok)
        {
            console.error("error loading reservations");
            throw new Error("failed loading reservations for car park " + id);
        }
        const data = await result.json();

        reservationsSetter(data.content);
        
    }catch(error)
    {
        console.log("failed loading reservations:", error);
        reservationsSetter([]);
    }
}


export const fetchAllReservations = async () =>
{
    try{
        const user = getLoggedInUser();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };

        const result = await fetch(`${api_address}/admin/reservation`, requestOptions);

        if (!result?.ok)
        {
            throw new Error("Error loading reservations");
        }

        const data = await result.json();
        return data.content;
    }
    catch(err)
    {
        console.log("failed loading reservations:", err);
    }
}

export async function fetchReservationsCount() {
    try {
        const user = getLoggedInUser();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };

        const response = await fetch(`${api_address}/admin/reservation/count`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch reservations');
        }
        const reservations_count = await response.json();
        return reservations_count;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return 0;
    }
}

export async function fetchReservationById(id)
{
    try {
        const response = await fetch(`${api_address}/reservations/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return 0;
    }
}