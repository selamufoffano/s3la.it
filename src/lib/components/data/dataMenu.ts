export interface MenuItem {
	label: string;
	href: string;
	icon: string;
	subMenu?: Record<string, SubMenuItem>;
}
export interface SubMenuItem {
	label: string;
	href: string;
	icon: string;
}

export interface DataMenu {
	menu: Record<string, MenuItem>;
}

export const Title = {
	menu: {
		title: {
			label: 'Selamu Foffano',
			href: '/?md=cv'
		}
	}
};

export const dataMenu: DataMenu = {
	menu: {
		item_01: {
			label: 'Home',
			href: '/?md=home',
			icon: 'House'
		},
		cv: {
			label: 'Curriculum (CV)',
			href: '/?md=cv',
			icon: 'BookA'
		},
		item_02: {
			label: 'Projects / Work',
			href: '/',
			icon: 'Folder',
			subMenu: {
				item_01: {
					label: 'Navidrome Cliente',
					href: '',
					icon: ''
				},
				item_02: {
					label: 'test',
					href: '',
					icon: ''
				},
				item_03: {
					label: 'Dashboard',
					href: '',
					icon: ''
				}
			}
		},
		item_03: {
			label: 'Hobby',
			href: '/',
			icon: 'Folder',
			subMenu: {
				item_01: {
					label: 'Music',
					href: '/',
					icon: 'Disc3'
				},
				item_02: {
					label: 'Movies',
					href: '/',
					icon: 'Clapperboard'
				},
				item_03: {
					label: 'PC',
					href: '/',
					icon: 'LaptopMinimal'
				}
			}
		}
	}
};

export default { dataMenu, title: Title };
