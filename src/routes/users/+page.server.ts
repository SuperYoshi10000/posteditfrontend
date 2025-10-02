import API from '$lib/api';

export async function load({ params }) {
    const {users} = await API.User.list();
    return {
        users
    };
}