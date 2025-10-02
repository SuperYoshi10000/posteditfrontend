import { API } from '$lib/api.js';

export async function load({ params }) {
    const {user} = await API.User.get(params.user);
    const {post} = await API.Post.get(params.user, params.post);
    const {comments} = await API.Post.Comment.list(user.name, params.post);
    return {
        user,
        post,
        comments
    };
}