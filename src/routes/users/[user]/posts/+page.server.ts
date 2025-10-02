import { API } from '$lib/api.js';

export async function load({ params }) {
    const {user} = await API.User.get(params.user);
    const {posts} = await API.Post.list(user.name);
    return {
        user,
        posts
    };
}