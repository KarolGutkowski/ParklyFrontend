import { api_address } from "../../../api_addres";

export const fetchUsersCount = async () =>
{
    try {
        const response = await fetch(`${api_address}/users`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data.length;
    } catch (error) {
        console.error('Error fetching users:', error);
        return 0;
    }
        
}

export const fetchAllUsers = async () =>
{
    try {
        const response = await fetch(`${api_address}/users`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return 0;
    }
}

export const fetchUserById = async (id) =>
{
    try {
        const response = await fetch(`${api_address}/users/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return 0;
    }
}