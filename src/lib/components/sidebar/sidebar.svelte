<script lang="ts">
	import { sidebar, openMenus, isSidebarOpen } from './+page';
	import { Curriculum } from '$lib/components';
	import {
		House,
		Folder,
		ChevronRight,
		CornerDownRight,
		MoveRight,
		FileText,
		Ellipsis,
		Disc3,
		Clapperboard,
		LaptopMinimal,
		BookA,
		X
	} from '@lucide/svelte';

	const icons: Record<string, any> = {
		House,
		Folder,
		CornerDownRight,
		FileText,
		MoveRight,
		Ellipsis,
		Disc3,
		Clapperboard,
		LaptopMinimal,
		BookA
	};
</script>

{#if $isSidebarOpen}
	<!-- Backdrop per schermi mobile -->
	<button
		type="button"
		class="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity md:hidden"
		onclick={() => sidebar.close()}
		aria-label="Chiudi sidebar"
		tabindex="-1"
	></button>
{/if}

<aside
	class="fixed top-0 left-0 z-50 flex h-full w-72 max-w-[85vw] flex-col border-r border-zinc-200/60 bg-white/95 p-5 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out md:w-64 md:bg-white/70 md:shadow-none 
	{$isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} "
>
	<div class="mb-6 flex w-full shrink-0 items-center justify-between px-3">
		<a
			href={sidebar.title.menu.title.href}
			class="text-xl font-bold tracking-wide text-zinc-900 transition hover:opacity-80"
			onclick={() => sidebar.close()}
		>
			{sidebar.title.menu.title.label}
		</a>

		<button
			type="button"
			class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-zinc-200/80 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 md:hidden"
			onclick={() => sidebar.close()}
			aria-label="Chiudi sidebar"
		>
			<X size={18} />
		</button>
	</div>

	<div class="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
		{#each Object.entries(sidebar.dataMenu.menu) as [id, value]}
			{@const IconComponent = icons[value.icon]}
			{@const isOpen = $openMenus[id]}

			<div class="w-full">
				<div
					class="flex cursor-pointer items-center justify-between rounded-xl px-3 transition hover:bg-zinc-300/20"
				>
					<a
						href={value.href}
						class="flex items-center gap-3 rounded-lg py-2 text-zinc-700"
						onclick={() => sidebar.close()}
					>
						{#if IconComponent}
							<IconComponent size={20} />
						{/if}
						<span>{value.label}</span>
					</a>

					{#if value.subMenu}
						<button
							class="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border transition-transform duration-200 {isOpen
								? 'rotate-90'
								: ''}"
							onclick={(e) => sidebar.toggleMenu(id, e)}
						>
							<ChevronRight size={14} />
						</button>
					{/if}
				</div>

				{#if value.subMenu}
					<div class="ml-2 {isOpen ? 'block' : 'hidden'}">
						{#each Object.entries(value.subMenu) as [subKey, subValue]}
							{@const IconComponent = icons[subValue.icon]}

							<a
								href={subValue.href}
								class="flex items-center gap-3 rounded-lg px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-300/20"
								onclick={() => sidebar.close()}
							>
								{#if IconComponent}
									<IconComponent size={15} />
								{/if}
								<span>{subValue.label}</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mt-2 shrink-0 border-t border-zinc-200/50 pt-4">
		<Curriculum />
	</div>
</aside>
