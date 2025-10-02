<script>
    import Comment from '$lib/components/Comment.svelte';
    import { TITLE } from "$lib/env";
    import { buildCommentTree } from '$lib/util';
    export let data;
    let { user, post, comment, comments } = data;
</script>
<title>{post.title} - Single Comment | {TITLE}</title>

<h1>{post.title}</h1>
<h2>Single Comment</h2>

<div id="comments">
    {#if comment}
        <Comment user={user} comment={buildCommentTree(comment, comments)} />
    {:else}
        <p>Comment not found</p>
    {/if}
</div>