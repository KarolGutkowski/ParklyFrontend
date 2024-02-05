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


export const fetchAllReservations = async (pageNumber, pageSize) =>
{
    try{
        const user = getLoggedInUser();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);
        
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };

        const result = await fetch(`${api_address}/admin/reservation?` + new URLSearchParams({page: pageNumber, size: pageSize}), requestOptions);

        if (!result?.ok)
        {
            throw new Error("Error loading reservations");
        }

        const data = await result.json();
        return data;
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
const canceled_string = "CANCELED_BY_ADMIN"
const active_string = "ACTIVE";
export const cancelReservation = async (reservation) =>
{
    try {
        const user = getLoggedInUser();

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);
        myHeaders.append("Content-Type", "application/json");

        const new_status = reservation.reservationStatus===active_string?canceled_string:active_string;

        const raw = JSON.stringify({status: new_status});

        const requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw
          };

        const response = await fetch(`${api_address}/admin/reservation/${reservation.id}`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch reservations');
        }
    } catch (error) {
        console.error('Error fetching reservations:', error);
        return 0;
    }
}