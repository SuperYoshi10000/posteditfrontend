<script lang="ts">
    export let width: string = "100%";
    export let height: string = "100%";
</script>

<div class="box" style="width: {width}; height: {height};">
    <slot />
</div>