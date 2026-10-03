import { writable } from 'svelte/store';
import { dataMenu, Title } from '$lib/components/data/dataMenu';

export const openMenus = writable<Record<string, boolean>>({});
export const isSidebarOpen = writable<boolean>(false);

export const sidebar = {
	title: Title,
	dataMenu: dataMenu,
	isOpen: isSidebarOpen,

	open() {
		isSidebarOpen.set(true);
	},

	close() {
		isSidebarOpen.set(false);
	},

	toggle() {
		isSidebarOpen.update((open) => !open);
	},

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
