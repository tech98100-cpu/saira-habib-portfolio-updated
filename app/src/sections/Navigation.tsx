import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ delay: 0.2 })
    if (logoRef.current) {
      tl.fromTo(logoRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
    }
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('a, button')
      tl.fromTo(links, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, '-=0.4')
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 h-[72px] flex items-center justify-between px-6 md:px-10 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,14,39,0.95)] shadow-[0_4px_20px_rgba(99,102,241,0.2)]'
            : 'bg-[rgba(10,14,39,0.85)] backdrop-blur-xl'
        }`}
      >
        {/* Logo */}
        <a
          ref={logoRef}
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="animate-logo-glow"
        >
          <img
            src="/assets/logo.png"
            alt="Saira Habib Developer"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-white font-normal text-lg transition-colors duration-300 hover:text-[#6366f1] group"
            >
              {link.label}
              <span className="absolute bottom-[-5px] left-0 w-0 h-0.5 bg-[#6366f1] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-gradient-accent text-white font-semibold px-7 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(99,102,241,0.4)]"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[rgba(10,14,39,0.98)] z-[999] flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white font-display font-bold text-3xl transition-colors duration-300 hover:text-[#6366f1]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-gradient-accent text-white font-semibold px-10 py-3 rounded-full text-lg mt-4"
          >
            Hire Me
          </a>
        </div>
      )}
    </>
  )
}
