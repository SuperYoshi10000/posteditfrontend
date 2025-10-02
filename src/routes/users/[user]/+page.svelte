<script>
    import { TITLE } from "$lib/env";
    export let data;
    let { user, posts } = data;
</script>
<title>{user.name} | {TITLE}</title>

<h1>{user.name}</h1>

