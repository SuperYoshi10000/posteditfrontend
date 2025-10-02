<script>
    import UserLabel from "$lib/components/UserLabel.svelte";
    import { TITLE } from "$lib/env";
    export let data;
    let { users } = data;
</script>
<title>Users | {TITLE}</title>

<h1>Users</h1>
<div class="users">
    {#each users as user}
        <UserLabel user={user} />
    {/each}
</div>