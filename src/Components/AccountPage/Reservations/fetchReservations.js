import { api_address } from "../../../api_addres";


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
        const response = await fetch(`${api_address}/reservations`);
        if (!response.ok) {
            throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        return data.length;
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