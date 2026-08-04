import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "Saira transformed our outdated website into a modern, high-converting platform. Our leads increased by 40% within the first month. Absolutely incredible work!",
    name: "Sarah Mitchell",
    role: "CEO, TechStart Inc.",
  },
  {
    quote: "Working with Saira was a breeze. She understood our vision from day one and delivered beyond our expectations. The attention to detail is unmatched.",
    name: "James Rodriguez",
    role: "Founder, GreenLeaf Organic",
  },
  {
    quote: "The e-commerce platform Saira built for us handles thousands of transactions smoothly. Her technical skills combined with design sensibility are rare to find.",
    name: "Aisha Khan",
    role: "Marketing Director, Luxe Fashion",
  },
  {
    quote: "Fast, professional, and incredibly talented. Saira delivered our SaaS dashboard ahead of schedule and it looks stunning. Our users love the new interface.",
    name: "David Chen",
    role: "CTO, DataViz Solutions",
  },
  {
    quote: "I needed a portfolio that would make me stand out as a designer. Saira created something truly unique that gets me compliments from every client I show it to.",
    name: "Elena Popov",
    role: "Freelance Graphic Designer",
  },
  {
    quote: "From concept to launch, Saira was communicative and thorough. Our restaurant's booking system has streamlined our operations completely. Highly recommend!",
    name: "Marco Rossi",
    role: "Owner, Bella Vista Restaurant",
  },
]

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const visibleTestimonials = showAll ? testimonials : testimonials.slice(0, 3)

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
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
    }
  }, [showAll])

  useEffect(() => {
    if (!showAll && cardsRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(cardsRef.current!.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current!, start: 'top 85%' },
        })
      })
      return () => ctx.revert()
    }
  }, [showAll])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-[120px] px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center">
          <span className="inline-block text-xs font-medium tracking-[1.5px] text-[#6366f1] uppercase mb-4">
            TESTIMONIALS
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[72px] text-white leading-[1.1] tracking-[-1.5px]">
            What Clients Say
          </h2>
        </div>

        {/* Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
          {visibleTestimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl p-8 card-bg transition-all duration-300 hover:-translate-y-4 hover:border-[#6366f1] hover:shadow-[0_25px_50px_rgba(99,102,241,0.25)]"
            >
              {/* Quote marks */}
              <span
                className="absolute top-4 left-6 font-display text-6xl text-[#6366f1] opacity-30 leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <p className="text-[#cbd5e1] text-base italic leading-[1.7] mt-6 relative z-10">
                {t.quote}
              </p>

              <div className="mt-6 pt-4 border-t border-[rgba(99,102,241,0.1)]">
                <p className="text-white font-bold text-base">{t.name}</p>
                <p className="text-[#6366f1] text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-full border-2 border-[#6366f1] text-[#6366f1] font-semibold transition-all duration-300 hover:bg-gradient-accent hover:text-white hover:border-transparent"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
