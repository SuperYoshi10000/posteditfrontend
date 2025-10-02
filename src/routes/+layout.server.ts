import API, { getToken } from "$lib/api";

export async function load({ cookies }) {
    let user = await API.Account.getUserFromToken(getToken(cookies)).then(res => res.user, () => undefined);
	return { user };
}