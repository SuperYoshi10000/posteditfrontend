<script lang="ts">
    export let error: string;
</script>

{#if error}
    <div class="error-message">{error}</div>
{/if}

<style>
    .error-message {
        color: red;
        background-color: #ffe0e0;
        padding: 0.5em;
        border: 1px solid red;
        border-radius: 10px;
        margin: 1em 0;
    }
</style>