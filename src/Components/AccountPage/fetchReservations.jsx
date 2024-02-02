import { api_address } from "../../api_addres";

export const fetchReservations = (reservationsSetter) =>{
        fetch(`${api_address}/reservations`)
        .then(result=>
            {
                if (!result.ok)
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
    console.log(id);
    fetch(`${api_address}/reservations`)
    .then(result=>
        {
            if (!result.ok)
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
