<script lang="ts">
    import Button from "./Button.svelte";

    export let user: User | undefined = undefined;
</script>

<header>
    <nav class="nav-left">
        <Button href="/" theme="invert">Home</Button>
    </nav>
    <nav class="nav-right">
        {#if user}
            <Button href="/account/settings" theme="invert">Settings</Button>
            <Button href="/users/{user.name}/posts" theme="invert">Your Posts</Button>
            <Button href="/users/{user.name}" theme="invert">{user.name}</Button>
        {:else}
            <Button href="/auth/login" theme="invert">Login</Button>
            <Button href="/auth/register" theme="invert">Register</Button>
        {/if}
    </nav>
</header>
<style>
    header {
        position: fixed;
        width: 100vw;
        height: 4rem;
        background-image: linear-gradient(to bottom, var(--color-accent-1), var(--color-accent-1a))
    }
    nav {
        height: 100%;
        display: flex;
        align-items: center;
    }
    nav.nav-left {
        float: left;
    }
    nav.nav-right {
        float: right;
    }
    :global(nav > *) {
        margin: 0 0.5rem;
        min-width: 5rem;
    }
</style>