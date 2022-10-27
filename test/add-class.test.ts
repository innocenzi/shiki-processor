import { expect, it } from 'vitest'
import { addClass } from '../src'

it('adds the given class to the given element tag', () => {
	const result = addClass('<pre class="base"><code></code></pre>', 'vp-code-dark', 'pre')
	expect(result).toMatchSnapshot()
})

it('adds the given class to the given nested element tag', () => {
	const result = addClass('<pre class="base"><code class="base"></code></pre>', 'vp-code-dark', 'code')
	expect(result).toMatchSnapshot()
})

it('adds the given class to the last element when no tag is given', () => {
	const result = addClass('<pre class="base"><code class="base"></code></pre>', 'vp-code-dark')
	expect(result).toMatchSnapshot()
})

it('adds the given class to the given element when the class is not the first attribute', () => {
	const result = addClass('<pre v-pre class="shiki"><code>...</code></pre>', 'vp-code-dark', 'pre')
	expect(result).toMatchSnapshot()
})
