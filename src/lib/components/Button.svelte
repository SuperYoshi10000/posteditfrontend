<script lang="ts">
    export let href: string;
    export let important: boolean = false;
</script>

<a href={href} data-important={important||null}>
    <slot />
</a>

<style>
    a {
        display: block;
        text-decoration-line: none;
        padding: 0.5rem 1rem;
        text-align: center;
        border-radius: 1rem;
        font-weight: bold;
        min-height: 2rem;
        align-content: center;
        color: var(--color-bg-1);
    }
    a:hover {
        background-color: var(--hover-overlay);
    }
</style>