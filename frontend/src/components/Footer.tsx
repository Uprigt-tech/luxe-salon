import { Instagram, Linkedin, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const quickLinks = [
    { name: 'Services', href: '/services' },
    { name: 'Franchising', href: '/franchise' },
    { name: 'Investment', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ]

  const socialLinks = [
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Youtube, href: '#' },
  ]

  return (
    <footer className="relative bg-dark-light pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="w-full px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <span className="font-display text-dark text-lg font-bold">L</span>
              </div>
              <span className="font-label text-sm tracking-[0.2em] text-white">LUXE MEN</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Premium grooming experience for the modern gentleman. Where craft meets confidence.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-gold hover:text-dark transition-all duration-300 text-white/60"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-label text-[11px] tracking-[0.2em] text-gold mb-6">QUICK LINKS</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/50 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-label text-[11px] tracking-[0.2em] text-gold mb-6">CONTACT</h4>
            <ul className="space-y-3">
              <li className="text-white/50 text-sm">hello@luxemensalon.in</li>
              <li className="text-white/50 text-sm">+91 98765 43210</li>
              <li className="text-white/50 text-sm">Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">
              © 2026 Luxe Men Salon. All rights reserved.
            </p>
            <div className="flex gap-6 items-center">
              <a href="#" className="text-white/30 text-sm hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/30 text-sm hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
