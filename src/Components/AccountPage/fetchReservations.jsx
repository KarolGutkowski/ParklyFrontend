import { api_address } from "../../api_addres";

export const fetchReservations = (reservationsSetter) =>{
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
                    reservationsSetter(data);
                }
            })
}


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

export const fetchListingsAsync = async() =>
{
    try{
        const result = await fetch(`${api_address}/reservations`);
        if (!result?.ok)
        {
            console.error("error loading reservations");
            return;
        }

        const data = await result.json();
        return data;
    } catch(err)
    {
        console.log(err)
    }
}

export const fetchListingsSync = () =>
{
    fetch(`${api_address}/reservations`)
    .catch(error => {
        console.log("failed loading reservations:", error);
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
                return data;
            }
        })
}