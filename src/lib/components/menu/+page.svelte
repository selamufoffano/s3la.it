<script lang="ts">
	import { sidebar, isSidebarOpen } from '$lib/components/sidebar/+page';
	import { PanelLeft, House, BookA } from '@lucide/svelte';
</script>

<!-- Barra di navigazione per schermi mobile -->
<header
	class="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-zinc-200/80 bg-white/80 px-3 backdrop-blur-xl md:hidden"
	aria-label="Menu di navigazione mobile"
>
	<!-- Bottone per aprire la Sidebar -->
	<button
		type="button"
		onclick={() => sidebar.toggle()}
		class="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-100/90 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-xs transition hover:bg-zinc-200/80 active:scale-95"
		aria-label="Apri sidebar"
		aria-expanded={$isSidebarOpen}
	>
		<PanelLeft size={17} class="text-zinc-700" />
		<span>Sidebar</span>
	</button>


	<!-- Link veloci per mobile -->
	<nav class="flex items-center gap-1.5" aria-label="Link rapidi">
		<a
			href="/?md=home"
			class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/70 bg-zinc-50 text-zinc-700 transition hover:bg-zinc-100"
			title="Home"
			aria-label="Home"
		>
			<House size={15} />
		</a>
		<a
			href="/?md=cv"
			class="inline-flex h-8 items-center gap-1 rounded-lg border border-zinc-200/70 bg-zinc-50 px-2.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
			title="Curriculum"
		>
			<BookA size={14} />
			<span>CV</span>
		</a>
	</nav>
</header>