<script lang="ts">
	import { page } from '$app/state';
	import { Marked, type Tokens } from 'marked';
	import { DocSidebar } from '$lib/components';
	import { slugify } from '$lib/components/docSidebar/+page';
	import indexDoc, { type DocItem } from '$lib/components/docu/index';

	// Configura il parser Marked per aggiungere id di ancoraggio ai titoli
	const mdParser = new Marked({
		breaks: true,
		gfm: true
	});

	mdParser.use({
		renderer: {
			heading({ tokens, depth }: { tokens: Tokens.Generic[]; depth: number }) {
				const text = this.parser.parseInline(tokens);
				const plainText = tokens.map((t) => ('text' in t ? (t as any).text : '')).join('');
				const id = slugify(plainText || text);
				return `<h${depth} id="${id}" class="scroll-mt-8">${text}</h${depth}>\n`;
			}
		}
	});

	function resolveDoc(param: string | null): DocItem {
		if (!param) return indexDoc.item_01;
		if (param in indexDoc) return indexDoc[param];

		const lower = param.toLowerCase().replace(/\.md$/, '');
		if (lower === 'test' || lower === 'reader' || lower === 'markdown reader')
			return indexDoc.item_02;
		if (lower === 'test2' || lower === 'home') return indexDoc.item_01;
		if (lower === '404') return indexDoc.item_404;

		const match = Object.values(indexDoc).find((d) => d.label.toLowerCase() === lower);
		if (match) return match;

		return indexDoc.item_404;
	}

	let mdParam = $derived(page.url.searchParams.get('md'));
	let currentDoc = $derived(resolveDoc(mdParam));
	let markdownText = $derived(currentDoc.content);
	let fileName = $derived(currentDoc.label);
	let isDragging = $state(false);

	let htmlContent = $derived.by(() => {
		try {
			return mdParser.parse(markdownText) as string;
		} catch (err) {
			return `<div class="text-red-500 font-medium">Errore nel rendering: ${err}</div>`;
		}
	});
</script>

<svelte:head>
	<title>{fileName}</title>
</svelte:head>

<div class="flex min-h-screen w-full items-start md:pl-64">
	<div class="sticky top-0 hidden h-screen w-80 shrink-0 lg:block">
		<DocSidebar content={markdownText} />
	</div>
	<div class="flex min-w-0 flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8">
		<div
			class="relative flex flex-1 flex-col rounded-2xl transition-all w-full"
			ondragover={(e) => {
				e.preventDefault();
				isDragging = true;
			}}
			ondragleave={() => (isDragging = false)}
			role="region"
			aria-label="Area Markdown"
		>
			<article
				class="/* Code */
				/* Code
				*/ /*

				Inline code */ prose
				block
				max-w-none
				prose-zinc
				prose-headings:font-semibold
				prose-headings:tracking-tight
				prose-a:text-blue-600
				hover:prose-a:underline

				prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200
				prose-pre:bg-zinc-50
				prose-pre:p-4
				prose-pre:text-zinc-800
				prose-pre:shadow-sm
				prose-img:rounded-xl

				[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:bg-zinc-100 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5
				[&_:not(pre)>code]:font-mono
				[&_:not(pre)>code]:text-xs
				[&_:not(pre)>code]:text-zinc-800
				[&_pre_code]:bg-transparent
				[&_pre_code]:p-0
				[&_pre_code]:font-mono
				[&_pre_code]:text-sm

				[&_pre_code]:text-zinc-800"
			>
				{@html htmlContent}
			</article>
		</div>
	</div>
</div>
