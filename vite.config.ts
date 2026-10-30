import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { parse as parseYaml } from 'yaml'
import { marked } from 'marked'

/** Turns content/*.md (YAML front matter + Markdown) into { data, html } at
 *  build time, so neither parser ships to the browser. */
function markdownContent(): Plugin {
  return {
    name: 'mdf-markdown-content',
    transform(code, id) {
      if (!/\/content\/.+\.md$/.test(id)) return null
      const m = code.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
      if (!m) this.error(`${id} has no front matter`)
      const data = parseYaml(m![1]) ?? {}
      const html = marked.parse(m![2], { async: false }) as string
      return { code: `export default ${JSON.stringify({ data, html })}`, map: null }
    },
  }
}

export default defineConfig({
  plugins: [react(), markdownContent()],
  // Lets pages tell upcoming events from past ones in the prerendered HTML.
  define: { __BUILD_TIME__: JSON.stringify(Date.now()) },
})
