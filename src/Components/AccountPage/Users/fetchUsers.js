import { api_address } from "../../../api_addres";
import { getLoggedInUser, getAuthorizationHeaders } from "../../LoginLogic/loginLogic";

export const fetchUsersCount = async () =>
{
    try {
        const user = getLoggedInUser();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };

        const response = await fetch(`${api_address}/admin/customer_count`, requestOptions);


        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const users_count = await response.json();
        return users_count;
    } catch (error) {
        console.error('Error fetching users:', error);
        return 0;
    }
        
}

export const fetchAllUsers = async () =>
{
    try {
        const user = getLoggedInUser();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${user.token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };

        const response = await fetch(`${api_address}/admin/users`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Error fetching users:', error);
        return 0;
    }
}

export const fetchUserById = async (id) =>
{
    try {

        var myHeaders = getAuthorizationHeaders()

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
          };

        const response = await fetch(`${api_address}/admin/users?` + new URLSearchParams({userId: id}), requestOptions);

        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();

        if(data.totalElements!==1)
            throw new Error('Failed to fetch users');
        
        return data.content[0];
    } catch (error) {
        console.error('Error fetching users:', error);
        return 0;
    }
}

