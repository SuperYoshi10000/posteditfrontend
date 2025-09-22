<script>
  import Button from '$lib/components/Button.svelte';
    import { TITLE } from '$lib/env';
</script>
<title>Home | {TITLE}</title>

<h1>Welcome to {TITLE}!</h1>

<p>
    This is a website where you can create your own blog.
</p>
<Button href="/auth/register">Create a Blog</Button>