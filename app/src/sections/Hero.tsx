import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const stats = [
  { number: 50, suffix: '+', label: 'Projects Delivered' },
  { number: 30, suffix: '+', label: 'Happy Clients' },
  { number: 3, suffix: '+', label: 'Years Experience' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Badge bounce in
    if (badgeRef.current) {
      tl.fromTo(badgeRef.current, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' })
    }

    // Headline slide in down
    if (headlineRef.current) {
      tl.fromTo(headlineRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    }

    // Subtitle
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    }

    // Tagline slide in up
    if (taglineRef.current) {
      tl.fromTo(taglineRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    }

    // CTAs
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    }

    // Logo fade in
    if (logoRef.current) {
      tl.fromTo(logoRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.6')
    }

    // Stats with counter animation
    if (statsRef.current) {
      tl.fromTo(
        statsRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.5'
      )

      // Counter animation
      const counters = statsRef.current.querySelectorAll('[data-count]')
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-count') || '0', 10)
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          delay: 1.5,
          onUpdate: () => {
            counter.textContent = Math.round(obj.val).toString()
          },
        })
      })
    }
  }, [])

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-[72px]"
      style={{
        background: '#0a0e27',
      }}
    >
      {/* Animated background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="/assets/video/hero-bg.mp4"
          type="video/mp4"
        />
      </video>
      {/* Tint + gradient overlay so text stays readable over the video */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(10,14,39,0.92) 0%, rgba(10,14,39,0.75) 30%, rgba(10,14,39,0.45) 55%, rgba(10,14,39,0.35) 100%)',
        }}
      />

      {/* Subtle pulsing orbs in background */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full top-[10%] right-[5%]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent)',
          filter: 'blur(40px)',
          animation: 'pulse 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[250px] h-[250px] rounded-full bottom-[20%] left-[5%]"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15), transparent)',
          filter: 'blur(40px)',
          animation: 'pulse 5s ease-in-out infinite 1s',
        }}
      />

      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.3)] px-5 py-3 rounded-full mb-6 font-semibold text-sm text-[#a5b4fc]"
            >
              <span className="animate-spin-slow inline-block">&#10022;</span>
              Available for Projects
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className="font-display font-bold text-5xl md:text-7xl lg:text-[96px] leading-[1.05] tracking-[-2px] text-gradient"
            >
              SAIRA HABIB
            </h1>

            {/* Subtitle */}
            <h2
              ref={subtitleRef}
              className="font-display font-bold text-3xl md:text-4xl lg:text-[48px] text-white leading-[1.15] tracking-[-1px] mt-2"
            >
              Web Developer & Designer
            </h2>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-[#cbd5e1] text-base md:text-lg leading-relaxed max-w-[540px] mt-6"
            >
              We Code Your Ideas — Transforming visions into pixel-perfect, high-performance digital experiences that convert visitors into loyal clients.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-8">
              <a
                href="#contact"
                onClick={(e) => handleCtaClick(e, '#contact')}
                className="relative overflow-hidden bg-gradient-accent text-white font-semibold px-8 py-4 rounded-full text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(99,102,241,0.4)] group"
              >
                <span className="relative z-10">Start a Project</span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </a>
              <a
                href="#portfolio"
                onClick={(e) => handleCtaClick(e, '#portfolio')}
                className="border-2 border-[#6366f1] text-[#6366f1] font-semibold px-8 py-4 rounded-full text-center transition-all duration-300 hover:-translate-y-1 hover:bg-[rgba(99,102,241,0.1)]"
              >
                View My Work
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 md:p-6 rounded-2xl card-bg transition-all duration-300 hover:-translate-y-1 hover:border-[#6366f1] hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)] hover:bg-[rgba(99,102,241,0.1)]"
                >
                  <div className="text-2xl md:text-3xl font-extrabold text-[#6366f1]">
                    <span data-count={stat.number}>0</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <div className="text-xs md:text-sm font-medium text-[#cbd5e1] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Logo Display */}
          <div ref={logoRef} className="order-1 lg:order-2 flex items-center justify-center">
            <div className="animate-float">
              <img
                src="/assets/logo.png"
                alt="Saira Habib - We Code Your Ideas"
                className="w-full max-w-[300px] md:max-w-[400px] rounded-2xl"
                style={{
                  filter: 'drop-shadow(0 20px 60px rgba(236, 72, 153, 0.3))',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </section>
  )
}
