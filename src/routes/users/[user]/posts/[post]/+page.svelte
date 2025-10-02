<script>
    import Post from "$lib/components/Post.svelte";
    import { TITLE } from "$lib/env";
    export let data;
    let { user, post } = data;
</script>

<title>{post.title} | {TITLE}</title>
<Post post={post} />