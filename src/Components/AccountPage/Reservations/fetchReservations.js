import { api_address } from "../../../api_addres";
import { getLoggedInUser } from "../../LoginLogic/loginLogic";

export const fetchReservationsForId = (reservationsSetter, id) =>{
    fetch(`${api_address}/reservations`)
    .catch(error => {
        console.log("failed loading reservations:", error);
        reservationsSetter([]);
    })
    .then(result=>
        {
            if (!result?.ok)
            {
                console.error("error loading reservations");
                return null;
            }
            return result.json();
        })
    .then(data => 
        {
            if(data)
            {
                data = data.filter(reservation => reservation.itemId === id);
                reservationsSetter(data);
            }
        })
}


export const fetchAllReservations = async () =>
{
    try{
        const result = await fetch(`${api_address}/reservations`);
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