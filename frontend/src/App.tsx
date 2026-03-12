import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Scissors,
  Sparkles,
  User,
  Flame,
  Hand,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Youtube,
  Menu,
  X,
  ArrowRight,
  Users,
  MessageCircle,
  Star,
  Check,
  TrendingUp,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import AdminLogin from './components/AdminLogin'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './components/AdminDashboard'
import AdminContacted from './components/AdminContacted'
import AdminTickets from './components/AdminTickets'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Franchise', href: '#franchise' },
    { name: 'Investment', href: '#pricing' },
    { name: 'Contact', href: '#enquiry-form' },
  ]

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
          ? 'bg-dark/95 backdrop-blur-xl py-4 border-b border-gold/10'
          : 'bg-transparent py-6'
          }`}
      >
        <div className="w-full px-6 lg:px-16 flex items-center justify-between">
          <a href="#" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span className="font-display text-dark text-lg font-bold">L</span>
            </div>
            <span className="font-label text-sm tracking-[0.2em] text-white group-hover:text-gold transition-colors">
              LUXE MEN
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="relative font-label text-[11px] tracking-[0.2em] text-white/60 hover:text-gold transition-colors duration-300 py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => scrollToSection('#enquiry-form')}
              className="btn-luxury text-[10px] py-3 px-6"
            >
              Book Now
            </button>
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
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-label text-2xl tracking-[0.15em] text-white hover:text-gold transition-colors duration-300"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollToSection('#enquiry-form')}
            className="btn-luxury mt-8"
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  )
}

// Hero Section
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      loadTl.fromTo('.hero-bg',
        { opacity: 0, scale: 1.2 },
        { opacity: 1, scale: 1, duration: 1.5 }
      )

      loadTl.fromTo('.decor-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, stagger: 0.1 },
        '-=1'
      )

      const words = headlineRef.current?.querySelectorAll('.word') || []
      loadTl.fromTo(words,
        { y: 80, opacity: 0, rotateX: -40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08 },
        '-=0.6'
      )

      loadTl.fromTo('.gold-accent-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )

      loadTl.fromTo(subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      )

      loadTl.fromTo(ctaRef.current?.querySelectorAll('a') || [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.2'
      )

      loadTl.fromTo(imageRef.current,
        { x: 100, opacity: 0, rotateY: 15 },
        { x: 0, opacity: 1, rotateY: 0, duration: 1 },
        '-=0.8'
      )

      gsap.to('.floating-decor', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.hero-bg img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-dark overflow-hidden">
      <div className="hero-bg absolute inset-0 z-0">
        <img
          src="/hero-barbershop.jpg"
          alt="Luxury Barbershop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-dark/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/50" />
      </div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="decor-line absolute top-1/4 left-0 w-32 h-[1px] bg-gradient-to-r from-gold/50 to-transparent origin-left" />
        <div className="decor-line absolute top-1/3 left-0 w-20 h-[1px] bg-gradient-to-r from-gold/30 to-transparent origin-left" />
        <div className="decor-line absolute bottom-1/4 right-0 w-32 h-[1px] bg-gradient-to-l from-gold/50 to-transparent origin-right" />
        <div className="floating-decor absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-gold/60" />
        <div className="floating-decor absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-gold/40" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full px-6 lg:px-16 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="font-label text-[10px] tracking-[0.3em] text-gold">
                  PREMIUM GROOMING
                </span>
              </div>

              <div ref={headlineRef} className="mb-8 perspective-1000">
                <h1 className="font-display text-white leading-[0.9]">
                  <span className="word block text-[clamp(48px,8vw,90px)]">PREMIUM</span>
                  <span className="word block text-[clamp(48px,8vw,90px)] text-gradient-gold">GROOMING</span>
                  <span className="word block text-[clamp(48px,8vw,90px)]">EXPERIENCE</span>
                </h1>
              </div>

              <div className="gold-accent-line w-48 h-[2px] bg-gradient-to-r from-gold to-transparent mb-8 origin-left" />

              <div ref={subtextRef}>
                <p className="text-white/60 text-lg lg:text-xl max-w-lg mb-10 font-body leading-relaxed">
                  For the modern gentleman. Precision cuts, beard craft, and franchise opportunities across India.
                </p>
              </div>

              <div ref={ctaRef} className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('enquiry-form');
                    if (el) {
                      const offset = 80;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = el.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="btn-luxury group flex items-center gap-3"
                >
                  Book a Visit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('enquiry-form');
                    if (el) {
                      const offset = 80;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = el.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="btn-outline-luxury"
                >
                  Own a Franchise
                </button>
              </div>

              <div className="flex gap-12 mt-16 pt-8 border-t border-white/10">
                <div>
                  <p className="font-display text-3xl text-gold mb-1">50+</p>
                  <p className="font-label text-[10px] tracking-[0.2em] text-white/40">SALONS</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-gold mb-1">100K+</p>
                  <p className="font-label text-[10px] tracking-[0.2em] text-white/40">CLIENTS</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-gold mb-1">15+</p>
                  <p className="font-label text-[10px] tracking-[0.2em] text-white/40">CITIES</p>
                </div>
              </div>
            </div>

            <div ref={imageRef} className="hidden lg:block relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gold/20 rounded-2xl blur-3xl opacity-50" />

                <div className="glass-card rounded-2xl overflow-hidden relative">
                  <img
                    src="/hero-barber-portrait.jpg"
                    alt="Professional Barber"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                        <Star className="w-5 h-5 text-dark" />
                      </div>
                      <div>
                        <p className="font-label text-[10px] tracking-[0.2em] text-gold">LUXE MEN SALON</p>
                        <p className="text-white/60 text-sm">Where craft meets confidence</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 glass-card rounded-full px-6 py-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-label text-[10px] tracking-[0.15em] text-white">NOW OPEN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-label text-[9px] tracking-[0.3em] text-white/40">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold/50 to-transparent" />
      </div>
    </section>
  )
}

// Craft Promise Section
function CraftPromiseSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.craft-image',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.craft-text .reveal-item',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-dark-light opacity-50" />

      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="craft-image relative">
            <div className="image-frame rounded-2xl">
              <img
                src="/craft-promise.jpg"
                alt="Haircut Craft"
                className="w-full aspect-[4/5] object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-gold/20 rounded-2xl -z-10" />
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-gold/5 rounded-2xl -z-10" />
          </div>

          <div className="craft-text">
            <div className="reveal-item flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-label text-[10px] tracking-[0.3em] text-gold">OUR PHILOSOPHY</span>
            </div>

            <h2 className="reveal-item font-display text-[clamp(36px,5vw,64px)] text-white leading-[0.95] mb-8">
              WHERE STYLE<br />
              <span className="text-gradient-gold">MEETS</span> CONFIDENCE
            </h2>

            <div className="reveal-item w-32 h-[2px] bg-gradient-to-r from-gold to-transparent mb-8" />

            <p className="reveal-item text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              Expert barbers, premium products, and an atmosphere designed for men who value detail. Every cut tells a story of craftsmanship.
            </p>

            <div className="reveal-item grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Expert Barbers</p>
                  <p className="text-white/40 text-sm">10+ years experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Premium Products</p>
                  <p className="text-white/40 text-sm">Luxury brands only</p>
                </div>
              </div>
            </div>

            <a href="#services" className="reveal-item btn-outline-luxury inline-flex items-center gap-3">
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Signature Grooming Section
function SignatureGroomingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.grooming-bg',
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.grooming-content .reveal-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.grooming-image',
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="grooming-bg absolute inset-0 z-0">
        <img
          src="/signature-grooming-bg.jpg"
          alt="Beard Grooming"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/60" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="grooming-content">
            <div className="reveal-item flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-label text-[10px] tracking-[0.3em] text-gold">SIGNATURE SERVICE</span>
            </div>

            <h2 className="reveal-item font-display text-[clamp(36px,5vw,64px)] text-white leading-[0.95] mb-8">
              SIGNATURE<br />
              <span className="text-gradient-gold">GROOMING</span>
            </h2>

            <div className="reveal-item w-32 h-[2px] bg-gradient-to-r from-gold to-transparent mb-8" />

            <p className="reveal-item text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              Haircuts, beard sculpting, and hot towel finishes—tailored to your face shape and lifestyle. Experience grooming redefined.
            </p>

            <div className="reveal-item space-y-4 mb-10">
              {['Precision Haircuts', 'Beard Sculpting', 'Hot Towel Finish', 'Face Shape Analysis'].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>

            <a href="#services" className="reveal-item btn-luxury inline-flex items-center gap-3">
              View Menu
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grooming-image relative flex justify-end">
            <div className="relative max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl blur-2xl opacity-50" />
              <div className="glass-card rounded-2xl overflow-hidden relative">
                <img
                  src="/signature-grooming-portrait.jpg"
                  alt="Groomed Gentleman"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                        <Star className="w-6 h-6 text-dark" />
                      </div>
                      <div>
                        <p className="text-white font-medium">4.9 Rating</p>
                        <p className="text-white/50 text-sm">2,500+ Reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Services Section
function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.services-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(cardsRef.current?.querySelectorAll('.service-card') || [],
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const services = [
    { icon: Scissors, name: 'Precision Haircut', description: 'Tailored cuts designed to complement your face shape and personal style.', price: 'From ₹499' },
    { icon: User, name: 'Beard Styling', description: 'Expert beard sculpting and shaping for a refined, polished look.', price: 'From ₹399' },
    { icon: Sparkles, name: 'Hair Spa', description: 'Revitalizing treatments for healthy, nourished, and lustrous hair.', price: 'From ₹799' },
    { icon: Flame, name: 'Hot Towel Shave', description: 'Classic straight razor shave with therapeutic hot towel therapy.', price: 'From ₹599' },
    { icon: Hand, name: 'Head Massage', description: 'Relaxing massage to relieve stress, tension, and promote wellness.', price: 'From ₹349' },
    { icon: Sparkles, name: 'Facial Grooming', description: 'Premium skincare treatments specifically designed for men.', price: 'From ₹699' },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-32 lg:py-40 bg-dark-light overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="services-header text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="font-label text-[10px] tracking-[0.3em] text-gold">WHAT WE OFFER</span>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] text-white mb-6">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            Experience the art of grooming with our premium services designed for the modern gentleman.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card glass-card rounded-2xl p-8 group cursor-pointer hover:scale-[1.02] transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <service.icon className="w-7 h-7 text-gold group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                </div>
                <span className="font-label text-[10px] tracking-[0.15em] text-gold">{service.price}</span>
              </div>

              <h3 className="font-display text-2xl text-white mb-3 group-hover:text-gold transition-colors">
                {service.name}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Franchise Section
function FranchiseSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.franchise-left',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.franchise-right .reveal-item',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const benefits = [
    { icon: TrendingUp, title: 'High ROI', desc: 'Proven business model' },
    { icon: Award, title: 'Brand Support', desc: 'Marketing & training' },
    { icon: Users, title: 'Low Investment', desc: 'Start from ₹7 Lakhs' },
  ]

  return (
    <section id="franchise" ref={sectionRef} className="relative py-32 lg:py-40 bg-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-dark-light opacity-50" />

      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="franchise-left relative">
            <div className="image-frame rounded-2xl">
              <img
                src="/franchise-left.jpg"
                alt="Salon Interior"
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-6">
              <p className="font-display text-4xl text-gold mb-1">50+</p>
              <p className="font-label text-[10px] tracking-[0.2em] text-white/50">ACTIVE FRANCHISES</p>
            </div>
          </div>

          <div className="franchise-right">
            <div className="reveal-item flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-label text-[10px] tracking-[0.3em] text-gold">FRANCHISE OPPORTUNITY</span>
            </div>

            <h2 className="reveal-item font-display text-[clamp(36px,5vw,64px)] text-white leading-[0.95] mb-8">
              OWN A<br />
              <span className="text-gradient-gold">LUXE MEN</span><br />
              SALON
            </h2>

            <div className="reveal-item w-32 h-[2px] bg-gradient-to-r from-gold to-transparent mb-8" />

            <p className="reveal-item text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              A proven model, premium brand identity, and end-to-end support—built for entrepreneurs who want to make their mark.
            </p>

            <div className="reveal-item grid grid-cols-3 gap-4 mb-10">
              {benefits.map((benefit, i) => (
                <div key={i} className="glass-card rounded-xl p-4 text-center">
                  <benefit.icon className="w-6 h-6 text-gold mx-auto mb-3" />
                  <p className="text-white text-sm font-medium mb-1">{benefit.title}</p>
                  <p className="text-white/40 text-xs">{benefit.desc}</p>
                </div>
              ))}
            </div>

            <a href="#pricing" className="reveal-item btn-luxury inline-flex items-center gap-3">
              Explore Investment
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const plans = [
    {
      name: 'The Essential',
      size: '200–250 Sq Ft',
      capacity: '2 Stylists / 2 Seats',
      investment: '₹7 Lakhs',
      royalty: '₹6,000',
      featured: false
    },
    {
      name: 'The Standard',
      size: '250–450 Sq Ft',
      capacity: '3 Stylists / 3 Seats',
      investment: '₹9.5 Lakhs',
      royalty: '₹6,000',
      featured: false
    },
    {
      name: 'The Elite',
      size: '500–700 Sq Ft',
      capacity: '4 Stylists / 4 Seats',
      investment: '₹13 Lakhs',
      royalty: '₹6,500',
      featured: true
    },
    {
      name: 'Elite Plus',
      size: '500–700 Sq Ft',
      capacity: '4 Stylists + Facial Room',
      investment: '₹15 Lakhs',
      royalty: '₹7,000',
      featured: false
    },
    {
      name: 'The Signature',
      size: '500–700 Sq Ft',
      capacity: '4 Seats + Facial/Pedicure',
      investment: '₹16.89 Lakhs',
      royalty: '₹7,000',
      featured: false
    },
    {
      name: 'The Unisex Luxe',
      size: '700–1000 Sq Ft',
      capacity: '4 Male + 2 Female Stylists',
      investment: '₹26.91 Lakhs',
      royalty: '₹8,000',
      featured: false
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pricing-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(cardsRef.current?.querySelectorAll('.pricing-card') || [],
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40 bg-dark-light overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="pricing-header text-center max-w-2xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-gold" />
            <span className="font-label text-[10px] tracking-[0.3em] text-gold">INVESTMENT PLANS</span>
            <div className="w-12 h-[1px] bg-gold" />
          </div>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] text-white mb-6">
            Choose Your <span className="text-gradient-gold">Format</span>
          </h2>
          <p className="text-white/50 text-lg leading-relaxed">
            From compact studios to flagship lounges—pick a model that fits your market and investment capacity.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card glass-card rounded-2xl p-8 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 ${plan.featured ? 'border-gold/40' : ''
                }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-gold to-gold-dark text-dark">
                  <span className="font-label text-[9px] tracking-[0.2em] px-4 py-2 block">MOST POPULAR</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display text-2xl text-white mb-2 group-hover:text-gold transition-colors">{plan.name}</h3>
                <div className="w-12 h-[1px] bg-gold/30" />
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <span className="text-white/60 text-sm">{plan.size}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-gold mt-1 flex-shrink-0" />
                  <span className="text-white/60 text-sm">{plan.capacity}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white/40 text-sm font-label tracking-wider">INVESTMENT</span>
                  <span className="text-gold font-display text-2xl">{plan.investment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm font-label tracking-wider">ROYALTY</span>
                  <span className="text-white font-body">{plan.royalty}<span className="text-white/40 text-sm">/mo</span></span>
                </div>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("enquiry-form");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`relative z-20 block w-full text-center py-4 rounded-lg font-label text-[11px] tracking-[0.2em] transition-all duration-300 ${plan.featured
                  ? "bg-gold text-dark hover:bg-gold-light"
                  : "border border-gold/30 text-gold hover:bg-gold hover:text-dark"
                  }`}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const testimonials = [
    {
      name: "Rahul Mehta",
      role: "Franchisee, Pune",
      text: "The systems are clear, the brand is strong, and the support team actually shows up. Best decision I made for my entrepreneurial journey.",
      initial: "R"
    },
    {
      name: "Sanjay Kumar",
      role: "Franchisee, Delhi",
      text: "I was skeptical at first, but the ROI speaks for itself. The premium branding attracts exactly the clientele they promised.",
      initial: "S"
    },
    {
      name: "Aditya Singh",
      role: "Customer, Mumbai",
      text: "Finally a salon that understands men's grooming. The signature grooming session is exactly what I need before important meetings.",
      initial: "A"
    },
    {
      name: "Vikram Desai",
      role: "Franchisee, Bangalore",
      text: "The training provided to our staff is unmatched. It ensures every customer gets the same Luxe experience every time.",
      initial: "V"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonial-image',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.testimonial-content .reveal-item',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark to-dark-light opacity-50" />

      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="testimonial-image relative">
            <div className="image-frame rounded-2xl">
              <img
                src="/testimonial.jpg"
                alt="Happy Franchisee"
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="testimonial-content">
            <div className="reveal-item flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-label text-[10px] tracking-[0.3em] text-gold">TESTIMONIALS</span>
            </div>

            <h2 className="reveal-item font-display text-[clamp(36px,5vw,64px)] text-white leading-[0.95] mb-8">
              TRUSTED BY<br />
              <span className="text-gradient-gold">PARTNERS</span>
            </h2>

            <div className="reveal-item relative">
              <div className="glass-card rounded-2xl p-8 mb-8 min-h-[250px] flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed mb-6 italic transition-all duration-300">
                    "{testimonials[currentIndex].text}"
                  </p>
                </div>
                <div className="flex items-center gap-4 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <span className="font-display text-gold text-lg">{testimonials[currentIndex].initial}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonials[currentIndex].name}</p>
                    <p className="text-white/40 text-sm">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={prevTestimonial}
                  className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Blog Section
function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const [selectedBlog, setSelectedBlog] = useState<{ title: string, content: string, date: string, image: string } | null>(null)

  const blogs = [
    {
      image: '/blog-1.jpg',
      title: "The Modern Gentleman's Haircare Routine",
      excerpt: 'Discover the essential steps to maintain healthy, stylish hair every day.',
      content: "Haircare is not just about washing it and rushing out the door. The modern gentleman knows that a dedicated routine is the foundation of an impeccable looking style. Begin with a quality shampoo suitable for your scalp condition... [Full article content loaded here].",
      date: 'Jan 15, 2026'
    },
    {
      image: '/blog-2.jpg',
      title: 'How to Choose Your First Salon Location',
      excerpt: 'Key factors to consider when selecting the perfect spot for your franchise.',
      content: "Location matters more than anything in the salon business. Your first step should be analyzing the demographic of the neighborhood. Does it match our target upscale clientele? Consider foot traffic, visibility, and neighboring businesses... [Full article content loaded here].",
      date: 'Jan 10, 2026'
    },
    {
      image: '/blog-3.jpg',
      title: 'Behind the Brand: Crafting the Experience',
      excerpt: 'The story behind Luxe Men Salon and our commitment to excellence.',
      content: "Luxe Men Salon started with a simple vision: to bring back the lost art of men's grooming in an upscale, comfortable environment. From the choice of our leather chairs to the specific blend of our beard oils, every detail has been meticulously chosen... [Full article content loaded here].",
      date: 'Jan 5, 2026'
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo(cardsRef.current?.querySelectorAll('.blog-card') || [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 bg-dark-light overflow-hidden">
      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="blog-header flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-label text-[10px] tracking-[0.3em] text-gold">FROM THE JOURNAL</span>
            </div>
            <h2 className="font-display text-[clamp(36px,5vw,56px)] text-white">
              Latest <span className="text-gradient-gold">Insights</span>
            </h2>
          </div>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="blog-card group cursor-pointer"
              onClick={() => setSelectedBlog(blog)}
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="font-label text-[10px] tracking-[0.15em] text-gold mb-3">{blog.date}</p>
                  <h3 className="font-display text-xl text-white mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                    {blog.excerpt}
                  </p>
                  <span className="inline-flex items-center text-gold text-sm font-label tracking-wider group-hover:gap-3 gap-2 transition-all mt-auto">
                    READ MORE <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div
            className="bg-dark border border-gold/20 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300"
          >
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-gold hover:text-dark rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X size={20} />
            </button>
            <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-64 sm:h-80 object-cover" />
            <div className="p-8 sm:p-12">
              <p className="font-label text-[10px] tracking-[0.2em] text-gold mb-4">{selectedBlog.date}</p>
              <h2 className="font-display text-3xl sm:text-4xl text-white mb-8">{selectedBlog.title}</h2>
              <div className="text-white/70 leading-relaxed space-y-4">
                {selectedBlog.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    enquiryType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-left',
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.contact-right',
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('http://localhost:5000/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setStatusMessage('Thank you! Your enquiry has been submitted successfully. We will contact you soon.')
        setFormData({ name: '', phone: '', email: '', city: '', enquiryType: '', message: '' })
      } else {
        setSubmitStatus('error')
        setStatusMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitStatus('error')
      setStatusMessage('Unable to connect to server. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@luxemensalon.in' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: MapPin, label: 'Locations', value: 'Mumbai • Delhi • Bangalore' },
  ]

  return (
    <section id="enquiry-form" ref={sectionRef} className="relative py-32 lg:py-40 bg-dark overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="contact-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="font-label text-[10px] tracking-[0.3em] text-gold">GET IN TOUCH</span>
            </div>

            <h2 className="font-display text-[clamp(36px,5vw,56px)] text-white mb-6">
              Start Your <span className="text-gradient-gold">Salon</span>
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-md">
              Tell us your city and goals. We'll share the roadmap, investment breakdown, and next steps.
            </p>

            <div className="space-y-6 mb-10">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="font-label text-[10px] tracking-[0.2em] text-white/40 mb-1">{item.label}</p>
                    <p className="text-white font-body">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="tel:+919876543210" className="btn-luxury inline-flex items-center gap-3">
              Schedule a Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="contact-right">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
              <h3 className="font-display text-2xl text-white mb-8">Send Inquiry</h3>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <p className="text-green-400 text-sm">{statusMessage}</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-red-400 text-sm">{statusMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-label text-[10px] tracking-[0.2em] text-white/40 mb-2">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-label text-[10px] tracking-[0.2em] text-white/40 mb-2">PHONE</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-label text-[10px] tracking-[0.2em] text-white/40 mb-2">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block font-label text-[10px] tracking-[0.2em] text-white/40 mb-2">CITY</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                    placeholder="Your city"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block font-label text-[10px] tracking-[0.2em] text-white/40 mb-2">ENQUIRY TYPE</label>
                <select
                  name="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                  className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors"
                >
                  <option value="">Select enquiry type</option>
                  <option value="franchise">Franchise Opportunity</option>
                  <option value="booking">Salon Booking</option>
                  <option value="partnership">Business Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="block font-label text-[10px] tracking-[0.2em] text-white/40 mb-2">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Your message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// Footer Component
function Footer() {
  const quickLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Franchising', href: '#franchise' },
    { name: 'Investment', href: '#pricing' },
    { name: 'Contact', href: '#enquiry-form' },
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
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </a>
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

// WhatsApp Float Button
function WhatsAppButton() {
  const handleClick = () => {
    const message = encodeURIComponent('Hello, I am interested in Luxe Men Salon franchise.')
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-6 z-[200] w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-full mr-3 bg-dark text-white text-xs font-label tracking-wider px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </button>
  )
}

// Main Site Wrapper
function MainSite() {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative bg-dark">
      <div className="grain-overlay" />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <CraftPromiseSection />
        <SignatureGroomingSection />
        <ServicesSection />
        <FranchiseSection />
        <PricingSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
        <Footer />
      </main>
      <WhatsAppButton />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="contacted" element={<AdminContacted />} />
          <Route path="tickets" element={<AdminTickets />} />
        </Route>
        {/* Redirects */}
        <Route path="/admin-login.html" element={<Navigate to="/admin" replace />} />
        <Route path="/admin-dashboard.html" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
