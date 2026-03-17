import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

export default function MainLayout() {
  return (
    <div className="relative bg-dark">
      <div className="grain-overlay" />
      <Navigation />
      <main className="relative">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
