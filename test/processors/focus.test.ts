import { expect, it } from 'vitest'
import { getHighlighter, createFocusProcessor, FocusProcessorOptions } from '../../src'

async function testFocusProcessor(snippet: string, options: FocusProcessorOptions = {}) {
	const highlighter = await getHighlighter({
		theme: 'nord',
		processors: [
			createFocusProcessor(options),
		],
	})

	expect(highlighter.codeToHtml(snippet, { lang: 'javascript' })).toMatchSnapshot()
}

it('generates focused lines on the same line as the tag', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code focus]
		}
	`

	await testFocusProcessor(snippet)
})

it('allows custom tags', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code unblur]
		}
	`

	await testFocusProcessor(snippet, { focusTag: 'unblur' })
})

it('allows custom focus class', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code focus]
		}
	`

	await testFocusProcessor(snippet, { hasFocusClass: 'is-focused' })
})

it('allows custom focused lines class', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code focus]
		}
	`

	await testFocusProcessor(snippet, { hasFocusedLinesClass: 'contains-focused-lines' })
})
