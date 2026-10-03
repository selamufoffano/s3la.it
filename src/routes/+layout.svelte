<script lang="ts">
	import './layout.css';
	import { Sidebar, Footer, Menu } from '$lib/components';

	let { children } = $props();
</script>

<Menu />
<div class="app flex min-h-screen">
	<div class="flex min-w-0 flex-1 flex-col">
		<Sidebar />

		<main class="min-w-0 flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
</div>
