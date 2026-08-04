import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { socialLinks } from '../data/socialLinks'

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <footer
        className="relative z-10 py-16 px-6 md:px-10 mt-16"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 14, 39, 0.8), #000000)',
          borderTop: '1px solid rgba(99, 102, 241, 0.1)',
        }}
      >
        <div className="max-w-[1200px] mx-auto text-center">
          {/* Logo */}
          <img
            src="/assets/logo.png"
            alt="Saira Habib Developer"
            className="h-16 w-auto mx-auto object-contain animate-logo-glow"
          />

          {/* Tagline */}
          <p className="font-display italic text-xl text-[#cbd5e1] mt-3">
            We Code Your Ideas
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] flex items-center justify-center text-[#cbd5e1] transition-all duration-300 hover:text-[#ec4899] hover:border-[#ec4899] hover:-translate-y-1"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs tracking-[1.5px] text-white/50 mt-8 uppercase">
            &copy; 2026 Saira Habib. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-[999] w-12 h-12 rounded-full bg-gradient-accent text-white flex items-center justify-center shadow-[0_10px_30px_rgba(99,102,241,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(99,102,241,0.5)] ${
          showScrollTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  )
}
