<script lang="ts">
    export let id: string;
    export let type: string = "text";
    export let placeholder: string|undefined = undefined;
    export let required: boolean = false;
    export let value: string|undefined = undefined;
</script>

<div class="input-field">
    <label for={id}>
        <slot />
    </label>
    <br>
    <input id={id} type={type} placeholder={placeholder} required={required} bind:value/>
</div>

<style>
    .input-field {
        margin-bottom: 0.5em;
        width: 100%;
    }
    .input-field input {
        padding: 0.5em;
        border: 1px solid var(--color-line-1);
        border-radius: 5px;
        width: 100%;
    }
</style>