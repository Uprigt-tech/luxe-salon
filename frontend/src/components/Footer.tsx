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

          <div className="lg:col-span-1">
            <h4 className="font-label text-[11px] tracking-[0.2em] text-gold mb-6">LOCATION</h4>
            <div className="relative w-full h-[220px] rounded-xl overflow-hidden border border-gold/20 shadow-2xl group transition-all duration-500 hover:border-gold/40">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d981.9390911440594!2d77.545548!3d10.119018!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b076903f8e8fe2b%3A0x9666c7361ae99594!2sLuxe%20Men%20Salon!5e0!3m2!1sen!2sin!4v1773723960542!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 pointer-events-none border border-gold/10 rounded-xl" />
            </div>
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
