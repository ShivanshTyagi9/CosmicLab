import { defineConfig } from 'astro/config';
import { remarkReadingTime } from './src/utils/readingTime';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import vercelStatic from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

const options = {
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: 'text', value: ' ' }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = ['highlighted'];
	}
};

export default defineConfig({
	site: 'https://astro-tech-blog-ten.vercel.app/',

	markdown: {
		syntaxHighlight: false,
		remarkPlugins: [remarkReadingTime, remarkMath],
		rehypePlugins: [
			[rehypePrettyCode, options],
			rehypeKatex
		]
	},

	integrations: [react(), sitemap(), mdx()],
	output: 'static',

	adapter: vercelStatic({
		webAnalytics: { enabled: true }
	}),

	vite: {
		plugins: [tailwindcss()]
	}
});
