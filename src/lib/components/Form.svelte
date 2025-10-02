<script lang="ts">
    export let title: string | undefined = undefined;
    export let subtitle: string | undefined = undefined;
    export let id: string | undefined = undefined;
    export let className: string | undefined = undefined;
</script>

<form id={id} class="form {className ?? ''}">
    {#if title}
        <h1>{title}</h1>
    {/if}
    {#if subtitle}
        <h2>{subtitle}</h2>
    {/if}
    <slot />
</form>

<style>
    form {
        margin: 0 auto;
        padding: 1em;
        width: 100%;
        max-width: 400px;
    }
</style>