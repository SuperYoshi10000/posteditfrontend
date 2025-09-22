<script lang="ts">
	import favicon from '$lib/assets/images/favicon.svg';
	// import '$lib/assets/styles/global.css';

  	import Footer from '$lib/components/Footer.svelte';
  	import Header from '$lib/components/Header.svelte';

	export let children;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<div class="header-spacer" style:height="4rem"></div>
<main>
	{@render children?.()}
</main>
<Footer />

<style>
	:global(*) {
		font-family: "Roboto", sans-serif;
		--color-text-1: #222222;
		--color-bg-1: #ffffff;
		--color-bg-2: #f0f0f0;
		--color-accent-1: #005fdf;
		--color-accent-1a: #008fff;
		--hover-overlay: #00000020;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		min-height: 100vh;
		color: var(--color-text-1);
		background-color: var(--color-bg-1);
		display: flex;
		flex-direction: column;
	}

	main {
		padding: 1rem;
		flex: 1 0 auto;
	}
</style>