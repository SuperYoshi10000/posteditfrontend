import API, { getToken } from "$lib/api";

export async function load({ cookies }) {
    const user = (await API.Account.getUserFromToken(getToken(cookies))).user;
	return { user };
}