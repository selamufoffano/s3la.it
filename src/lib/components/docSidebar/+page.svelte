<script lang="ts">
	import indexDoc from '$lib/components/docu/index';
	import { extractDocStructure, type DocStructure } from './+page';
	import { ChevronDown, ChevronRight, Hash } from '@lucide/svelte';

	interface Props {
		content?: string;
	}

	let { content = indexDoc.item_02.content }: Props = $props();

	let docStructure: DocStructure = $derived(extractDocStructure(content));

	let openSections = $state<Record<string, boolean>>({});

	function toggleSection(id: string, e: MouseEvent) {
		e.stopPropagation();
		openSections[id] = !openSections[id];
	}

	function scrollToHeading(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}
</script>

<aside
	class="flex h-screen w-full flex-col border-r border-black/4"
	aria-label="Indice del Documento"
>
	<div class="border-b border-zinc-200/60 p-4">
		<button
			type="button"
			onclick={() => scrollToHeading(docStructure.titleId)}
			class="group flex w-full text-left transition-colors"
			title={docStructure.title}
		>
			<h2 class="line-clamp-2 text-base font-bold text-zinc-900 transition-colors">
				{docStructure.title}
			</h2>
		</button>
	</div>

	<div class="flex-1 overflow-y-auto p-3">
		<nav class="flex flex-col gap-1">
			{#each docStructure.subtitles as item}
				<div class="flex flex-col">
					<div
						class="group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-sm font-medium text-zinc-700 transition-all"
					>
						<button
							type="button"
							onclick={() => scrollToHeading(item.id)}
							class="flex flex-1 items-center gap-2 truncate text-left"
							title={item.text}
						>
							<Hash class="h-3.5 w-3.5 shrink-0 text-zinc-400 group-hover:text-blue-500" />
							<span class="truncate">{item.text}</span>
						</button>

						{#if item.children && item.children.length > 0}
							<button
								type="button"
								onclick={(e) => toggleSection(item.id, e)}
								class="rounded p-1 text-zinc-400 hover:text-zinc-700"
								aria-label={openSections[item.id]
									? 'Comprimi sotto-sezioni'
									: 'Espandi sotto-sezioni'}
							>
								{#if openSections[item.id]}
									<ChevronDown class="h-3.5 w-3.5" />
								{:else}
									<ChevronRight class="h-3.5 w-3.5" />
								{/if}
							</button>
						{/if}
					</div>

					{#if item.children && item.children.length > 0 && openSections[item.id]}
						<div
							class="mt-1 ml-4 flex flex-col border-l border-zinc-200/80 pl-2 dark:border-zinc-800"
						>
							{#each item.children as child}
								<button
									type="button"
									onclick={() => scrollToHeading(child.id)}
									class="group flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-600 transition-all hover:text-zinc-900"
									title={child.text}
								>
									<span class="truncate">{child.text}</span>
								</button>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</nav>
	</div>
</aside>
