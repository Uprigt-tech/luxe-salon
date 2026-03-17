import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Franchise', href: '/franchise' },
    { name: 'Investment', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
          ? 'bg-dark/95 backdrop-blur-xl py-4 border-b border-gold/10'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="w-full px-6 lg:px-16 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span className="font-display text-dark text-lg font-bold">L</span>
            </div>
            <span className="font-label text-sm tracking-[0.2em] text-white group-hover:text-gold transition-colors">
              LUXE MEN
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative font-label text-[11px] tracking-[0.2em] transition-colors duration-300 py-2 group ${
                  isActive(link.href) ? 'text-gold' : 'text-white/60 hover:text-gold'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${
                  isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-luxury text-[10px] py-3 px-6"
            >
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:text-gold transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-dark/98 backdrop-blur-2xl lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-label text-2xl tracking-[0.15em] transition-colors duration-300 ${
                isActive(link.href) ? 'text-gold' : 'text-white hover:text-gold'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-luxury mt-8"
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  )
}
