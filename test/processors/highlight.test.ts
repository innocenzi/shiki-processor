import { expect, it } from 'vitest'
import { getHighlighter, createHighlightProcessor, HighlightProcessorOptions } from '../../src'

async function testHighlightProcessor(snippet: string, options: HighlightProcessorOptions = {}) {
	const highlighter = await getHighlighter({
		processors: [
			createHighlightProcessor(options),
		],
	})

	expect(highlighter.codeToHtml(snippet, { lang: 'javascript' })).toMatchSnapshot()
}

it('generates highlighted lines on the same line as the tag', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code hl]
		}
	`

	await testHighlightProcessor(snippet)
})

it('allows custom tags', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code highlight]
		}
	`

	await testHighlightProcessor(snippet, { highlightTag: 'highlight' })
})

it('allows custom highlight class', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code hl]
		}
	`

	await testHighlightProcessor(snippet, { hasHighlightClass: 'is-highlighted' })
})

it('allows custom highlighted lines class', async() => {
	const snippet = `
		function() {
			console.log('owo') // [!code hl]
		}
	`

	await testHighlightProcessor(snippet, { hasHighlightedLinesClass: 'contains-highlighted-lines' })
})
