<script lang="ts">
    export let href: string | undefined = undefined;
    export let theme: "invert" | "fill" | "fill-bg" | `accent1` | undefined = undefined;
    export let width: string = "auto";
    export let height: string = "auto";
    export let action: ((event: Event) => void) | undefined = undefined;

    let style = `${width ? `width: ${width};` : ''} ${height ? `height: ${height};` : ''};`;
</script>

{#if action}
    <a href={href} data-color={theme} style={style} on:click|preventDefault={action}>
        <slot />
    </a>
{:else if href}
    <a href={href} data-color={theme} style={style}>
        <slot />
    </a>
{/if}

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
        cursor: pointer;
        color: var(--color-text-1);
        background-color: transparent;
    }
    a:hover {
        background-color: var(--hover-overlay);
    }

    a[data-color="invert"] {
        color: var(--color-bg-1);
    }

    a[data-color="accent1"] {
        color: var(--color-bg-1);
        background-color: var(--color-accent-1);
    }
    a[data-color="accent1"]:hover {
        background-color: var(--color-accent-1a);
    }

    a[data-color="fill"] {
        color: var(--color-bg-1);
        background-color: var(--color-text-1);
    }
    a[data-color="fill"]:hover {
        background-color: var(--color-text-2);
    }

    a[data-color="fill-bg"] {
        color: var(--color-text-1);
        background-color: var(--color-bg-1);
    }
    a[data-color="fill-bg"]:hover {
        background-color: var(--color-bg-2);
    }
</style>