import { getToken, API } from "$lib/api";

export async function load({ params, cookies }) {
    const user = await API.Account.getUserFromToken(getToken(cookies));
    return { user };
}