<script>
    import Button from "./Button.svelte";
</script>

<header>
    <nav class="nav-left">
        <Button href="/">Home</Button>
    </nav>
    <nav class="nav-right">
        <Button href="/auth/login">Login</Button>
        <Button href="/auth/register">Register</Button>
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