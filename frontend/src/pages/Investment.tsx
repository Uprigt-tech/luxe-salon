import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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
    <section id="pricing" ref={sectionRef} className="relative py-32 lg:py-40 bg-dark-light overflow-hidden min-h-screen">
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
                onClick={() => window.location.href = '/contact'}
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

// Investment Page Component
export default function Investment() {
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [])

  return (
    <PricingSection />
  )
}
