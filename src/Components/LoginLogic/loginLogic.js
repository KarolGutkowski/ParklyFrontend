import Cookies from 'js-cookie';
import { api_address } from '../../api_addres';

export const fetchLogin = async(user) =>
{
    try
    {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user),
          };

        const response = await fetch(`${api_address}/auth/login`,requestOptions);

        if(!response?.ok)
        {
            throw new Error("Couldn't login");
        }

        const data = await response.json();

        if(!data)
        {
            throw new Error("Couldn't login");
        }

        const token = data.jwttoken;
        Cookies.set('token', token, {expires: 7, secure: true});
        Cookies.set('email', user.email, {expires: 7});
        return user.email;
    }
    catch(error)
    {
        console.error("Login failed:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export const fetchLogout = () =>
{
    Cookies.remove('token');
    Cookies.remove('email');
}

export const getLoggedInUser = () =>
{
    const token = Cookies.get('token');
    const email = Cookies.get('email');

    if(!token || !email)
        return null;

    return {token, email}
}


export function getAuthorizationHeaders()
{
    const user = getLoggedInUser();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    return myHeaders;
}