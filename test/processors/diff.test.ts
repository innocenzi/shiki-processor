import { expect, it } from 'vitest'
import { getHighlighter, createDiffProcessor, DiffProcessorOptions } from '../../src'

async function testDiffProcessor(snippet: string, options: DiffProcessorOptions = {}) {
	const highlighter = await getHighlighter({
		theme: 'nord',
		processors: [
			createDiffProcessor(options),
		],
	})

	expect(highlighter.codeToHtml(snippet, { lang: 'javascript' })).toMatchSnapshot()
}

it('generates diffed lines on the same line as their tag', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code --]
			console.log('uwu') // [!code ++]
		}
	`

	await testDiffProcessor(snippet)
})

it('allows custom tags', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code remove]
			console.log('uwu') // [!code add]
		}
	`

	await testDiffProcessor(snippet, { addLineTag: 'add', removeLineTag: 'remove' })
})

it('allows custom classes', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code --]
			console.log('uwu') // [!code ++]
		}
	`

	await testDiffProcessor(snippet, { commonDiffClass: 'is-diffed', removedLinesClasses: ['diff-remove'], addedLinesClasses: ['diff-add'] })
})
