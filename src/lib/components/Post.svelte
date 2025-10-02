<script lang="ts">
    import { page } from "$app/state";
    import { Post } from "$lib/api";
    import Timestamp from "./Timestamp.svelte";
    export let post: Post;
</script>

<div class="post">
    <h2><a href="/users/{page.params.user}/posts/{post.id}">{post.title}</a></h2>
    <Timestamp createdAt={post.created_at} editedAt={post.edited_at} />
    <div class="post-content">{@html post.content}</div>
</div>