import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Award, Users, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Franchise Section
function FranchiseSection() {
  const navigate = useNavigate()
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
    <section id="franchise" ref={sectionRef} className="relative py-32 lg:py-40 bg-dark overflow-hidden min-h-screen flex items-center">
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

            <button 
              onClick={() => navigate('/pricing')}
              className="reveal-item btn-luxury inline-flex items-center gap-3"
            >
              Explore Investment
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Franchise Page Component
export default function Franchise() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <FranchiseSection />
  )
}
