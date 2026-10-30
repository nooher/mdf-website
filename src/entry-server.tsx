import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import App from './App'

export { EVENTS } from './events'

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {}
  const html = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  )
  return { html, helmet: helmetContext.helmet! }
}
