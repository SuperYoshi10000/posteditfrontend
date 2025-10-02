<script>
  import Post from '$lib/components/Post.svelte';
    import { TITLE } from "$lib/env";
    export let data;
    let { user, posts } = data;
    
</script>
<title>{user.name} | {TITLE}</title>

<h1>{user.name}</h1>
<h2>Posts</h2>

<div id="posts">
    {#if posts.length === 0}
        <p>This user hasn't posted yet</p>
    {:else}
        {#each posts as post}
            <Post post={post} />
        {/each}
    {/if}
</div>