class footer {
	title: string;
	items: { label: string; href: string }[];
	constructor() {
		this.title = 'Sidebar Menu';
		this.items = [
			{ label: 'Dashboard', href: '/' },
			{ label: 'Impostazioni', href: '/settings' }
		];
	}
}

export default new footer();
