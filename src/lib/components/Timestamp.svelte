<script lang="ts">
    import { TIME_FORMAT } from "$lib/util";

    export let createdAt: Date;
    export let editedAt: Date | null = null;
</script>

<p>{createdAt.toLocaleString(undefined, TIME_FORMAT)}{editedAt ? ` - Edited ${editedAt.toLocaleString(undefined, TIME_FORMAT)}` : ''}</p>