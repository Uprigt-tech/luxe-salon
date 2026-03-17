import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
import { Scissors, User, Sparkles, Flame, Hand, ArrowRight, Check, Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Signature Grooming Section
function SignatureGroomingSection() {
  const navigate = useNavigate()
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

            <button
              onClick={() => navigate('/contact')}
              className="reveal-item btn-luxury inline-flex items-center gap-3"
            >
              Order Service
              <ArrowRight className="w-4 h-4" />
            </button>
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
    { icon: Sparkles, name: 'Facial Grooming', description: 'Skincare specifically for men.', price: 'From ₹699' },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-32 lg:py-40 bg-dark-light overflow-hidden min-h-screen">
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

// Services Page Component
export default function Services() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <ServicesSection />
      <SignatureGroomingSection />
    </>
  )
}
