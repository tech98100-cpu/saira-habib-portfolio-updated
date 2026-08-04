import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const categories = ['Web Development', 'UI/UX Design', 'Full Package']

const plans = [
  {
    name: 'Starter',
    price: '$299',
    description: 'Perfect for landing pages and small business sites',
    featured: false,
    features: [
      'Single-page website',
      'Mobile responsive',
      'Basic SEO setup',
      '1 revision round',
      '3-day delivery',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '$699',
    description: 'Best for businesses that need a complete web presence',
    featured: true,
    features: [
      'Multi-page website (up to 5)',
      'Mobile responsive',
      'Advanced SEO',
      'Contact form integration',
      'Speed optimization',
      '3 revision rounds',
      '7-day delivery',
    ],
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For complex projects and ongoing development needs',
    featured: false,
    features: [
      'Unlimited pages',
      'Custom functionality',
      'CMS integration',
      'E-commerce ready',
      'Priority support',
      'Unlimited revisions',
      'Ongoing maintenance',
    ],
    cta: 'Contact Me',
  },
]

function MagneticButton({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const dist = Math.sqrt(distX * distX + distY * distY)

    if (dist < 60) {
      const force = (60 - dist) / 60
      gsap.to(btn, {
        x: distX * force * 0.3,
        y: distY * force * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  }, [])

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
        active
          ? 'bg-gradient-accent text-white border-transparent'
          : 'bg-[rgba(99,102,241,0.1)] text-[#a5b4fc] border-2 border-[rgba(99,102,241,0.2)] hover:border-[#6366f1]'
      }`}
    >
      {children}
    </button>
  )
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const catsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%' },
        })
      }

      if (catsRef.current) {
        gsap.fromTo(catsRef.current.children, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        })
      }

      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-[120px] px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <span className="inline-block text-xs font-medium tracking-[1.5px] text-[#6366f1] uppercase mb-4">
            SERVICES
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[72px] text-white leading-[1.1] tracking-[-1.5px]">
            Pricing Plans
          </h2>
          <p className="text-[#cbd5e1] text-lg mt-4 max-w-[600px] mx-auto">
            Transparent pricing with no hidden fees. Choose the plan that fits your project.
          </p>
        </div>

        {/* Category Buttons */}
        <div ref={catsRef} className="flex flex-wrap justify-center gap-3 mt-10">
          {categories.map((cat, i) => (
            <MagneticButton
              key={cat}
              active={i === activeCategory}
              onClick={() => setActiveCategory(i)}
            >
              {cat}
            </MagneticButton>
          ))}
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-4 ${
                plan.featured
                  ? 'border-2 border-[#ec4899] shadow-[0_0_30px_rgba(236,72,153,0.2)] bg-[rgba(236,72,153,0.05)]'
                  : 'card-bg hover:border-[#6366f1] hover:shadow-[0_25px_50px_rgba(99,102,241,0.25)]'
              }`}
            >
              {/* Featured badge */}
              {plan.featured && (
                <div className="absolute -top-3 right-6 bg-gradient-accent text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  MOST POPULAR
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-white font-bold text-xl md:text-2xl">{plan.name}</h3>

              {/* Price */}
              <div className="mt-4">
                <span className="font-display font-bold text-4xl md:text-5xl text-gradient">
                  {plan.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#cbd5e1] text-sm mt-3 mb-6">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-[#cbd5e1]">
                    <Check size={18} className="text-[#10b981] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={() => {
                  const contact = document.querySelector('#contact')
                  if (contact) contact.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`w-full mt-8 py-4 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                  plan.featured
                    ? 'bg-gradient-accent text-white hover:shadow-[0_15px_35px_rgba(99,102,241,0.4)]'
                    : 'bg-gradient-accent text-white hover:shadow-[0_15px_35px_rgba(99,102,241,0.4)]'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
