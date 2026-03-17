import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { API_BASE_URL } from '../config'

gsap.registerPlugin(ScrollTrigger)

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
      const response = await fetch(`${API_BASE_URL}/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setStatusMessage(data.message || 'Thank you! Your enquiry has been submitted successfully. We will contact you soon.')
        setFormData({ name: '', phone: '', email: '', city: '', enquiryType: '', message: '' })
      } else {
        console.error('Submission failed:', data)
        setSubmitStatus('error')
        setStatusMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Network error:', error)
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
    <section id="enquiry-form" ref={sectionRef} className="relative py-32 lg:py-40 bg-dark overflow-hidden min-h-screen flex items-center">
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

// Contact Page Component
export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [])

  return (
    <ContactSection />
  )
}
