<script lang="ts">
	import { goto } from '$app/navigation';
	import { CloudDownload } from '@lucide/svelte';
</script>

<section class="h-15 w-full rounded-xl bg-zinc-100">
	<button class="flex h-full w-full items-center justify-center gap-3" onclick={() => goto('../src/lib/components/cv-pdf/Selamu_Foffano_cv.pdf')}>
		<span class="text-lg font-medium tracking-wide">Curriculum</span>
		<CloudDownload size={20} class="animate-bounce" />
	</button>
</section>
