import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

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

      loadTl.fromTo(ctaRef.current?.querySelectorAll('button, a') || [],
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
                  onClick={() => window.location.href = '/contact'}
                  className="btn-luxury group flex items-center gap-3"
                >
                  Book a Visit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => window.location.href = '/franchise'}
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

            <a href="/services" className="reveal-item btn-outline-luxury inline-flex items-center gap-3">
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
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
      content: "Haircare is not just about washing it and rushing out the door. The modern gentleman knows that a dedicated routine is the foundation of an impeccable looking style. Begin with a quality shampoo suitable for your scalp condition...",
      date: 'Jan 15, 2026'
    },
    {
      image: '/blog-2.jpg',
      title: 'How to Choose Your First Salon Location',
      excerpt: 'Key factors to consider when selecting the perfect spot for your franchise.',
      content: "Location matters more than anything in the salon business. Your first step should be analyzing the demographic of the neighborhood. Does it match our target upscale clientele? Consider foot traffic, visibility, and neighboring businesses...",
      date: 'Jan 10, 2026'
    },
    {
      image: '/blog-3.jpg',
      title: 'Behind the Brand: Crafting the Experience',
      excerpt: 'The story behind Luxe Men Salon and our commitment to excellence.',
      content: "Luxe Men Salon started with a simple vision: to bring back the lost art of men's grooming in an upscale, comfortable environment. From the choice of our leather chairs to the specific blend of our beard oils, every detail has been meticulously chosen...",
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
                  <span className="inline-flex items-center text-gold text-sm font-label tracking-wider group-hover:gap-3 gap-2 transition-all mt-auto pointer-events-none">
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
            className="bg-dark border border-gold/20 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
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
              <div className="text-white/70 leading-relaxed">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// Home Page Component
export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <HeroSection />
      <CraftPromiseSection />
      <TestimonialsSection />
      <BlogSection />
    </>
  )
}
