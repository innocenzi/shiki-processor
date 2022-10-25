import { expect, it } from 'vitest'
import { createRangeProcessor, getHighlighter } from '../src'

it('understands the range syntax', async() => {
	const highlighter = await getHighlighter({
		processors: [{
			name: 'test',
			handler: createRangeProcessor({
				test: ['is-tested'],
			}),
		}],
	})

	const snippet = `
	function () {
		console.log('uwu')  // [!code test:2]
		console.log('owo')
	}
	`

	expect(highlighter.codeToHtml(snippet, { lang: 'javascript' })).toMatchSnapshot()
})
