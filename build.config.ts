import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
	entries: [
		'src/index',
	],
	externals: [
		'shiki',
	],
	declaration: true,
	clean: true,
	rollup: {
		emitCJS: true,
	},
})
