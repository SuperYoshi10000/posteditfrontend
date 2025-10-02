import type { Comment, CommentTree } from "./api";

export type getOrCall<T extends any[], R> = R | ((...args: T) => R);
export function getOrCall<T extends any[], R>(value: getOrCall<T, R>, ...args: T): R {
    if (typeof value === "function") return (value as (...args: T) => R)(...args);
    return value;
}

export const TIME_FORMAT: Intl.DateTimeFormatOptions = { month:"short", day:"numeric", year:"numeric", hour: "numeric", minute: "2-digit", hour12: true };

export function buildCommentTree<C extends Comment<C>>(comment: C, comments: C[], depth: number = -1): CommentTree<C> {
    const children = depth !== 0 ? comments.filter(c => c.parent === comment.id).map(c => buildCommentTree(c, comments)) : [];
    return {
        ...comment,
        replies: children
    };
}