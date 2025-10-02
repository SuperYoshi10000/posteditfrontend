import { getOrCall } from "./util";


export function GET<R extends Response>(url: getOrCall<[Event], string>, callback?: (event: Event, res: R) => Promise<void> | void): EventListener {
    return _request("GET", url, undefined, callback);
}
export function POST<B extends BodyInit | object, R extends Response>(url: getOrCall<[Event], string>, body: getOrCall<[Event], B>, callback?: (event: Event, res: R) => Promise<void> | void): EventListener {
    return _request("POST", url, body, callback);
}
export function PUT<B extends BodyInit | object, R extends Response>(url: getOrCall<[Event], string>, body: getOrCall<[Event], B>, callback?: (event: Event, res: R) => Promise<void> | void): EventListener {
    return _request("PUT", url, body, callback);
}
export function DELETE<B extends BodyInit | object, R extends Response>(url: getOrCall<[Event], string>, body: getOrCall<[Event], B>, callback?: (event: Event, res: R) => Promise<void> | void): EventListener {
    return _request("DELETE", url, body, callback);
}

function _request<M extends string, B extends BodyInit | object, R extends Response>(method: M, url: getOrCall<[Event], string>, body: getOrCall<[Event], B> | undefined, callback?: (event: Event, res: R) => Promise<void> | void): EventListener {
    return async (event: Event) => {
        event.preventDefault();
        url = getOrCall(url, event);
        body = getOrCall(body, event);
        const res = await fetch(url, { method, body: typeof body === "string" ? body : JSON.stringify(body) });
        if (callback) await callback(event, res as R);
    }
}