declare module '*.svelte' {
	const component: import('svelte').Component<any, any, any>;
	export default component;
}

declare module '*?raw' {
	const content: string;
	export default content;
}
