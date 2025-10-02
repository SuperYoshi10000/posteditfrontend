<script lang="ts">
    import UserLabel from "./UserLabel.svelte";
    import Timestamp from "./Timestamp.svelte";
    import type { CommentTree, User } from "$lib/api";
    export let user: User;
    export let comment: CommentTree;
    export let showReplies: number = -1;

    let { created_at: createdAt, edited_at: editedAt, replies } = comment;
</script>

<div class="comment">
    <UserLabel user={user} />
    <p>{comment.content}</p>
    <Timestamp createdAt={createdAt} editedAt={editedAt} />
    {#if showReplies && replies.length > 0}
        <div class="replies">
            {#each replies as reply}
                <svelte:self comment={reply} showReplies={showReplies === -1 ? -1 : showReplies - 1} />
            {/each}
        </div>
    {/if}
</div>