import error404Md from './404.md?raw';
// Hobby
import test2Md from './md/test2.md?raw';

// Links
import test3Md from './md/test3.md?raw';

// Study
import test4Md from './md/test4.md?raw';

// Projects
import test5Md from './Project/test.md?raw';

// home
import home from './home.md?raw';

// CV
import cv from './cv/Selamu.md?raw'

export interface DocItem {
	label: string;
	content: string;
}

export interface DataMenu {
	[key: string]: DocItem;
}

export const dataMenu: DataMenu = {
	item_01: {
		label: 'Home',
		content: home
	},
	item_404: {
		label: '404',
		content: error404Md
	},
	item_2: {
		label: 'cv',
		content: cv
	}
};

export default dataMenu;
