import { writable } from 'svelte/store';
import { marked, type Tokens } from 'marked';
import { dataMenu, Title } from '$lib/components/data/dataMenu';

export const openMenus = writable<Record<string, boolean>>({});

export const docSidebar = {
	title: Title,
	dataMenu: dataMenu,

	toggleMenu(id: string, event?: Event) {
		if (event) {
			event.preventDefault();
			event.stopPropagation();
		}

		openMenus.update((menus) => ({
			...menus,
			[id]: !menus[id]
		}));
	}
};

export interface HeadingItem {
	id: string;
	text: string;
	level: number;
	children: HeadingItem[];
}

export interface DocStructure {
	title: string;
	titleId: string;
	subtitles: HeadingItem[];
}

/**
 * Normalizza il testo in uno slug sicuro per gli attributi id e ancore
 */
export function slugify(text: string): string {
	return text
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/<[^>]*>/g, '')
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');
}

/**
 * Estrapola dal contenuto Markdown il titolo principale (H1) e tutti i suoi sotto titoli (H2, H3...)
 */
export function extractDocStructure(content: string): DocStructure {
	if (!content) {
		return { title: 'Documento', titleId: '', subtitles: [] };
	}

	const tokens = marked.lexer(content);
	const headings = tokens.filter((t): t is Tokens.Heading => t.type === 'heading');

	if (headings.length === 0) {
		return { title: 'Documento', titleId: '', subtitles: [] };
	}

	// Il primo H1 (o il primo heading presente nel file) è il titolo principale
	const h1Index = headings.findIndex((h) => h.depth === 1);
	const mainHeading = h1Index !== -1 ? headings[h1Index] : headings[0];
	const otherHeadings =
		h1Index !== -1 ? headings.filter((_, idx) => idx !== h1Index) : headings.slice(1);

	const title = mainHeading.text;
	const titleId = slugify(mainHeading.text);

	// Estrapola i sotto titoli con gerarchia (H2 come padri, H3+ come figli annidati)
	const subtitles: HeadingItem[] = [];
	let currentParent: HeadingItem | null = null;

	for (const h of otherHeadings) {
		const item: HeadingItem = {
			id: slugify(h.text),
			text: h.text,
			level: h.depth,
			children: []
		};

		if (h.depth === 2) {
			currentParent = item;
			subtitles.push(item);
		} else if (h.depth > 2 && currentParent) {
			currentParent.children.push(item);
		} else {
			subtitles.push(item);
		}
	}

	return {
		title,
		titleId,
		subtitles
	};
}
