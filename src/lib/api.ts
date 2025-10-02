import { API_ROOT } from "$lib/env";
import type { Cookies } from "@sveltejs/kit";

export type ID<T = any> = number;

export interface Comment<C extends Comment<C> = Comment<any>> {
    id: ID<C>;
    author: ID<User>;
    parent: ID<C> | null;
    content: string;
    created_at: Date;
    edited_at: Date;
}
type _Comment<C extends Comment<C>> = Comment<C>; // Allow extending in namespace with same name
export interface CommentTree<C extends Comment<C> = Comment<any>> extends Comment<C> {
    replies: CommentTree<C>[];
}

export namespace Account {
    export interface Settings {}
    export namespace Settings {
        export async function edit(settings: Settings): MsgResponse<Settings> {
            return { message: "Not implemented", ...settings };
        }
    }
    
    export async function getUserFromToken(token: string): MsgResponse<{user: User}> {
        return await request(`/account/user-info`, HttpMethod.GET, undefined, token);
    }
}

export interface Auth {
    id: ID<User>;
    token: string;
}
export namespace Auth {
    
    export interface Login {
        name: string;
        password: string;
    }
    export interface SetEmail {
        name: string;
        email: string;
    }
    export interface Registration extends Login, SetEmail {}
    export async function register(registration: Registration): MsgResponse<Auth> {
        return await request("/auth/register", HttpMethod.POST, registration);
    }
    export async function login(name: string, password: string): MsgResponse<Auth> {
        return await request("/auth/login", HttpMethod.POST, {name, password});
    }
    export async function logout(name: string, token: string): MsgResponse {
        return { message: "Logged out" };
    }
    export async function resetToken(name: string, token: string): MsgResponse<Auth> {
        return await request("/auth/reset-jwt-token", HttpMethod.POST, {name}, token);
    }
    export async function setPassword(name: string, oldPassword: string, newPassword: string): MsgResponse {
        return await request("/auth/set-password", HttpMethod.POST, {name, oldPassword, newPassword});
    }
    export async function setEmail(name: string, password: string, newEmail: string): MsgResponse<{email: string}> {
        return await request("/auth/set-email", HttpMethod.POST, {name, password, newEmail});
    }
    export async function deleteAccount(name: string, password: string, token: string): MsgResponse {
        return await request("/auth/delete", HttpMethod.DELETE, {name, password}, token);
    }
    export async function info(token: string): MsgResponse<{user: User}> {
        return await request(`/account/user-info`, HttpMethod.GET, undefined, token);
    }
}

export interface User {
    id: ID<User>;
    name: string;
    email: string;
    is_admin: boolean;
    permissions: string[];
}
export namespace User {
    export async function list(): MsgResponse<{users: User[]}> {
        return await request("/users");
    }
    export async function get(name: string): MsgResponse<{user: User}> {
        return await request(`/users/${encodeURIComponent(name)}`);
    }

    export interface Comment extends _Comment<Comment> {
        user_page: ID<User>;
    }
    export namespace Comment {
        export async function list(name: string): MsgResponse<{comments: Comment[]}> {
            return await request(`/users/${encodeURIComponent(name)}/user-comments`);
        }
        export async function get(name: string, id: string): MsgResponse<{comment: Comment}> {
            return await request(`/users/${encodeURIComponent(name)}/user-comments/${id}`);
        }
        export async function create(name: string, content: string, token: string): MsgResponse<{comment: Comment}> {
            return await request(`/users/${encodeURIComponent(name)}/user-comments/create`, HttpMethod.POST, {content}, token);
        }
        export async function edit(name: string, id: string, content: string, token: string): MsgResponse<{comment: Comment}> {
            return await request(`/users/${encodeURIComponent(name)}/user-comments/${id}/edit`, HttpMethod.PUT, {content}, token);
        }
        export async function reply(name: string, id: string, content: string, token: string): MsgResponse<{comment: Comment}> {
            return await request(`/users/${encodeURIComponent(name)}/user-comments/${id}/reply`, HttpMethod.POST, {content}, token);
        }
        export async function replies(name: string, id: string): MsgResponse<{comments: Comment[]}> {
            return await request(`/users/${encodeURIComponent(name)}/user-comments/${id}/replies`);
        }
        export async function remove(name: string, id: string, token: string): MsgResponse {
            return await request(`/users/${encodeURIComponent(name)}/user-comments/${id}/delete`, HttpMethod.DELETE, undefined, token);
        }

        export async function listOnPosts(name: string): MsgResponse<{comments: Post.Comment[]}> {
            return await request(`/users/${encodeURIComponent(name)}/post-comments`);
        }
        export async function getOnPosts(name: string, id: string): MsgResponse<{comment: Post.Comment}> {
            return await request(`/users/${encodeURIComponent(name)}/post-comments/${id}`);
        }
    }
}


export interface Profile {
    id: ID<Profile>;
    owner: ID<User>;
    display_name: string;
    bio: string;
    about: string;
    profile_picture_url: string;
    created_at: Date;
}
export namespace Profile {
    export interface Content {
        display_name: string;
        bio: string;
        about: string;
        profile_picture_url: string;
    }
    export async function get(name: string): MsgResponse<{profile: Profile}> {
        return await request(`/users/${encodeURIComponent(name)}/profile`);
    }
    export async function edit(name: string, data: Profile.Content, token: string): MsgResponse<{profile: Profile}> {
        return await request(`/users/${encodeURIComponent(name)}/profile/edit`, HttpMethod.PUT, data, token);
    }
}

export interface Post {
    id: ID<Post>;
    author: ID<User>;
    title: string;
    content: string;
    created_at: Date;
    edited_at: Date;
}
export namespace Post {
    export async function list(name: string): MsgResponse<{posts: Post[]}> {
        return await request(`/users/${encodeURIComponent(name)}/posts`);
    }
    export async function get(name: string, id: string): MsgResponse<{post: Post}> {
        return await request(`/users/${encodeURIComponent(name)}/posts/${id}`);
    }
    export async function create(name: string, title: string, content: string, token: string): MsgResponse<{post: Post}> {
        return await request(`/users/${encodeURIComponent(name)}/posts/create`, HttpMethod.POST, {title, content}, token);
    }
    export async function edit(name: string, id: string, title: string, content: string, token: string): MsgResponse<{post: Post}> {
        return await request(`/users/${encodeURIComponent(name)}/posts/${id}/edit`, HttpMethod.PUT, {title, content}, token);
    }
    export async function remove(name: string, id: string, token: string): MsgResponse {
        return await request(`/users/${encodeURIComponent(name)}/posts/${id}/delete`, HttpMethod.DELETE, undefined, token);
    }

    export interface Comment extends _Comment<Comment> {
        post: ID<Post>;
    }
    export namespace Comment {
        export async function list(name: string, post: string): MsgResponse<{comments: Comment[]}> {
            return await request(`/users/${encodeURIComponent(name)}/posts/${post}/comments`);
        }
        export async function get(name: string, post: string, id: string): MsgResponse<{comment: Comment}> {
            return await request(`/users/${encodeURIComponent(name)}/posts/${post}/comments/${id}`);
        }
        export async function create(name: string, post: string, content: string, token: string): MsgResponse<{comment: Comment}> {
            return await request(`/users/${encodeURIComponent(name)}/posts/${post}/comments/create`, HttpMethod.POST, {content}, token);
        }
        export async function edit(name: string, post: string, id: string, content: string, token: string): MsgResponse<{comment: Comment}> {
            return await request(`/users/${encodeURIComponent(name)}/posts/${post}/comments/${id}/edit`, HttpMethod.PUT, {content}, token);
        }
        export async function reply(name: string, post: string, id: string, content: string, token: string): MsgResponse<{comment: Comment}> {
            return await request(`/users/${encodeURIComponent(name)}/posts/${post}/comments/${id}/reply`, HttpMethod.POST, {content}, token);
        }
        export async function replies(name: string, post: string, id: string): MsgResponse<{comments: Comment[]}> {
            return await request(`/users/${encodeURIComponent(name)}/posts/${post}/comments/${id}/replies`);
        }
        export async function remove(name: string, post: string, id: string, token: string): MsgResponse {
            return await request(`/users/${encodeURIComponent(name)}/posts/${post}/comments/${id}/delete`, HttpMethod.DELETE, undefined, token);
        }
    }
}

export namespace Admin {
    export interface SetPermissions {
        [key: string]: boolean;
    }
    export type Permissions = string[];
    interface DatabaseQueryResult {
        rowCount: number | null;
        rows: any[];
    };

    export async function databaseQuery(query: string, token: string): MsgResponse<{result: DatabaseQueryResult}> {
        return await request(`/admin/query?query=${encodeURIComponent(query)}`, HttpMethod.POST, undefined, token);
    }
    export async function setPermission(userId: string, permissions: SetPermissions, token: string): MsgResponse<{permissions: Permissions}> {
        return await request(`/admin/auth/set-permission`, HttpMethod.POST, {userId, permissions}, token);
    }
    export async function setAdmin(userId: string, isAdmin: boolean, token: string): MsgResponse<{isAdmin: boolean}> {
        return await request(`/admin/auth/set-admin`, HttpMethod.POST, {userId, isAdmin}, token);
    }
}

type MsgResponse<T = {}> = Promise<({message: string} & T)>;

enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export async function request<T extends object = object>(path: string, method?: HttpMethod, body?: object, auth?: string): MsgResponse<T>;
export async function request<T extends object = object>(path: string, method?: string, body?: object, auth?: string): MsgResponse<T>;
export async function request<T extends object = object>(path: string, method: string = HttpMethod.GET, body?: object, auth?: string): MsgResponse<T> {
    const url = request.root + path;
    if (request.DEBUG) console.debug(`[request] ${method} ${url}`, ...(body ? [body] : []));
    const res = await fetch(url, {
        method,
        headers: {
            "Accept": "application/json",
            // "Content-Type": "application/json",
            ...(auth ? {"Authorization": `Bearer ${auth}`} : {}),
            // ...(request.CLIENT ? {"X-Client-Origin": window.location.origin}: {}),
        },
        body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
        throw new Error(`API request failed: ${res.status} ${res.statusText} (${await res.text()})`);
    }
    const json = await res.json();
    if ("error" in json) return Promise.reject({
        ...json,
        status: res.status,
        statusText: res.statusText
    });
    return json;
}
export namespace request {
    export const CLIENT = typeof window !== "undefined";
    export const DEBUG = true;
    export const root = API_ROOT;
}

const WEEK_IN_SECONDS = 604800;
export function getToken(cookies?: Cookies) {
    if (cookies) return cookies.get("JwtToken") || "";
    if (typeof document !== "undefined") return document.cookie.split("; ").find(c => c.startsWith("JwtToken="))?.split('=', 2)[1] || "";
    return "";
}
export function setToken(token: string, cookies?: Cookies) {
    if (cookies) cookies.set("JwtToken", token, { sameSite: "lax", secure: true, path: "/", maxAge: WEEK_IN_SECONDS });
    else if (typeof document !== "undefined") document.cookie = `JwtToken=${token}; SameSite=Lax; Secure; Path=/; Max-Age=${WEEK_IN_SECONDS}`;
}

export const API = {
    Account,
    Auth,
    User,
    Profile,
    Post,
    Admin,
    request,
    getToken,
    setToken
} as const;
export default API;