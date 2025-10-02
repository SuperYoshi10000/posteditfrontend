<script>
    import Comment from '$lib/components/Comment.svelte';
    import { TITLE } from "$lib/env";
    import { buildCommentTree } from '$lib/util';
    export let data;
    let { user, post, comments } = data;
    
    const rootComments = comments.filter(comment => !comment.parent);
</script>
<title>{post.title} - Comments | {TITLE}</title>

<h1>{post.title}</h1>
<h2>Comments</h2>

<div id="comments">
    {#if comments.length === 0}
        <p>This post has no comments yet</p>
    {:else}
        {#each rootComments as comment}
            <Comment user={user} comment={buildCommentTree(comment, comments)} />
        {/each}
    {/if}
</div>