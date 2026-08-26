import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Header from './components/Header'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Programme from './pages/Programme'
import Donate from './pages/Donate'
import Grants from './pages/Grants'
import News from './pages/News'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Legal from './pages/Legal'
import NotFound from './pages/NotFound'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollTop />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-work" element={<Work />} />
          <Route path="/our-work/:slug" element={<Programme />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/grants" element={<Grants />} />
          <Route path="/news" element={<News />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/legal/:page" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieBanner />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
