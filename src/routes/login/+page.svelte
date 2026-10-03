<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	let password: string = $state('');
	async function login() {
		const res = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify({ password })
		});
		if (res.ok) await goto('/admin');
        else alert("nah");
	}
</script>

<section class="bg-red flex h-screen w-full items-center justify-center">
	<form onsubmit={login}>
		<input bind:value={password} type="password" class="ring" />
		<input type="submit" value="login" />
	</form>
</section>
