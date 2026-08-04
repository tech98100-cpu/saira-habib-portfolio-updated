import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { socialLinks, contactEmail } from '../data/socialLinks'

gsap.registerPlugin(ScrollTrigger)

const WEB3FORMS_ACCESS_KEY = '0b2a2c3f-79be-47a5-96d3-fb98e7c59dc9'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(leftRef.current.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        })
      }
      if (rightRef.current) {
        gsap.fromTo(rightRef.current.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: section, start: 'top 85%' },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New message from ${formData.name}`,
          message: formData.message,
        }),
      })
      const result = await res.json()

      if (result.success) {
        setStatus('sent')
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 4000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-[120px] px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
          {/* Left - Form */}
          <div ref={leftRef}>
            <span className="inline-block text-xs font-medium tracking-[1.5px] text-[#6366f1] uppercase mb-4">
              GET IN TOUCH
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[72px] text-white leading-[1.1] tracking-[-1.5px] mb-8">
              Let's Work Together
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(99,102,241,0.05)] border-2 border-[rgba(99,102,241,0.2)] text-white placeholder:text-white/30 font-body text-base transition-all duration-300 focus:outline-none focus:border-[#6366f1] focus:bg-[rgba(99,102,241,0.1)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(99,102,241,0.05)] border-2 border-[rgba(99,102,241,0.2)] text-white placeholder:text-white/30 font-body text-base transition-all duration-300 focus:outline-none focus:border-[#6366f1] focus:bg-[rgba(99,102,241,0.1)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Project Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(99,102,241,0.05)] border-2 border-[rgba(99,102,241,0.2)] text-white placeholder:text-white/30 font-body text-base transition-all duration-300 focus:outline-none focus:border-[#6366f1] focus:bg-[rgba(99,102,241,0.1)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[rgba(99,102,241,0.05)] border-2 border-[rgba(99,102,241,0.2)] text-white placeholder:text-white/30 font-body text-base transition-all duration-300 focus:outline-none focus:border-[#6366f1] focus:bg-[rgba(99,102,241,0.1)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)] resize-y min-h-[120px]"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-4 rounded-lg bg-gradient-accent text-white font-semibold text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(99,102,241,0.4)] active:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === 'sending' && 'Sending…'}
                {status === 'sent' && 'Message Sent! ✓'}
                {status === 'error' && 'Something went wrong — try again'}
                {status === 'idle' && 'Send Message'}
              </button>
              {status === 'error' && (
                <p className="text-sm text-[#f87171] -mt-2">
                  Couldn't send right now. You can also email me directly at {contactEmail}.
                </p>
              )}
            </form>
          </div>

          {/* Right - Contact Info */}
          <div ref={rightRef}>
            <h3 className="text-white font-bold text-xl md:text-2xl mb-6">
              Contact Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <Mail size={20} className="text-[#6366f1] flex-shrink-0" />
                <span className="text-[#cbd5e1]">{contactEmail}</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin size={20} className="text-[#6366f1] flex-shrink-0" />
                <span className="text-[#cbd5e1]">Available Worldwide (Remote)</span>
              </div>
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-[#6366f1] flex-shrink-0" />
                <span className="text-[#cbd5e1]">Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-4">
                <CheckCircle size={20} className="text-[#10b981] flex-shrink-0" />
                <span className="text-[#cbd5e1]">Currently Accepting Projects</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <h4 className="text-white font-bold text-lg mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-[50px] h-[50px] rounded-full bg-[rgba(99,102,241,0.1)] border-2 border-[rgba(99,102,241,0.2)] flex items-center justify-center text-[#a5b4fc] transition-all duration-300 hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(99,102,241,0.3)]"
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
