<script lang="ts">
    import type { User } from "$lib/api";
    export let user: User;
</script>

<span class="user-label">
    <a href="/users/{user.name}">{user.name}</a>
</span>