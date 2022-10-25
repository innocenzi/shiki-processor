<h2 align="center">shiki-processor</h2>

<p align="center">
  <a href="https://github.com/innocenzi/shiki-processor/actions?query=workflow%3Aci">
    <img alt="Status" src="https://github.com/innocenzi/shiki-processor/actions/workflows/ci.yml/badge.svg">
  </a>
  <span>&nbsp;</span>
  <a href="https://www.npmjs.com/package/shiki-processor">
    <img alt="npm" src="https://img.shields.io/npm/v/shiki-processor">
  </a>
  <br />
  <br />
  <p align="center">
    Add processing capabilities to Shiki's highlighter
  </p>
  <pre><div align="center">npm i shiki shiki-processor</div></pre>
</p>

&nbsp;

## Usage

`shiki-processor` exports a custom `getHighlighter` that provides the same API as the one exported from `shiki`, except it adds a new `processors` option.

```ts
import { getHighlighter, createFocusProcessor } from 'shiki-processor'

const snippet = /** ... */
const highlighter = await getHighlighter({
  processors: [
    createFocusProcessor(),
  ],
})

highlighter.codeToHtml(snippet, { lang: 'javascript' })
```

Alternatively, for more flexibility, it is possible to use the `process` and `postProcess` functions directly.

```ts
import { getHighlighter } from 'shiki'
import { process, postProcess } from 'shiki-processor'

const theme = 'material-night'
const lang = 'javascript'
const snippet = /** ... */
const processors = [
  createFocusProcessor(),
]

const highlighter = await getHighlighter({ theme })

const { code, lineOptions } = process(processors, snippet, lang)
const highlighted = highlighter.codeToHtml(code, {
	lang,
	theme,
	lineOptions,
})

return postProcess(processors, highlighted, lang)
```

&nbsp;

## Built-in processors

There is currently three processors: `focus`, `diff` and `highlight`. Each one of them adds the possibility of adding a `// [!code <tag>]` annotation to a line in a code snipppet.

When this annotation is found, it is removed and a class corresponding to the processor is added to the line. The complete code block is also added a class.

```ts
// Input
function() {
	console.log('hewwo') // [!code --]
	console.log('hello') // [!code ++]
}
```
```html
<!-- Output (stripped of `style` attributes for clarity) -->
<pre class="shiki has-diff"> <!-- Notice `has-diff` -->
	<code>
		<span class="line"></span>
		<span class="line"><span>function</span><span>()</span><span></span><span>{</span></span>
		<span class="line diff remove">  <!-- Notice `diff` and `remove` -->
			<span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hewwo</span><span>&#39;</span><span>) </span>
		</span>
		<span class="line diff add">  <!-- Notice `diff` and `add` -->
			<span></span><span>console</span><span>.</span><span>log</span><span>(</span><span>&#39;</span><span>hello</span><span>&#39;</span><span>) </span>
		</span>
		<span class="line"><span></span><span>}</span></span>
		<span class="line"><span></span></span>
	</code>
</pre>
```

Optionally, a range can be defined by adding a colon and a number of lines: `// [!code focus:3]`.


<p align="center">
  <br />
  <br />
  ·
  <br />
  <br />
  <sub>Built with ❤︎ by <a href="https://twitter.com/enzoinnocenzi">Enzo Innocenzi</a>
</p>
