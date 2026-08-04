import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Portfolio from './sections/Portfolio'
import Services from './sections/Services'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const idleTweenRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const orb1 = orb1Ref.current
    const orb2 = orb2Ref.current
    if (!orb1 || !orb2) return

    let idleTimer: ReturnType<typeof setTimeout>

    const startIdle = () => {
      if (idleTweenRef.current) idleTweenRef.current.kill()
      idleTweenRef.current = gsap.timeline({ repeat: -1, yoyo: true })
        .to(orb1, { x: '+=20', y: '+=30', duration: 3, ease: 'sine.inOut' }, 0)
        .to(orb1, { x: '-=20', y: '-=30', duration: 3, ease: 'sine.inOut' }, 3)
        .to(orb2, { x: '-=20', y: '-=20', duration: 3, ease: 'sine.inOut' }, 0)
        .to(orb2, { x: '+=20', y: '+=20', duration: 3, ease: 'sine.inOut' }, 3)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (idleTweenRef.current) {
        idleTweenRef.current.kill()
        idleTweenRef.current = null
      }
      clearTimeout(idleTimer)

      gsap.to(orb1, {
        left: e.clientX - 300,
        top: e.clientY - 300,
        duration: 1.5,
        ease: 'power2.out',
      })
      gsap.to(orb2, {
        left: e.clientX - 250,
        top: e.clientY - 250,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.1,
      })

      idleTimer = setTimeout(startIdle, 3000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(idleTimer)
      if (idleTweenRef.current) idleTweenRef.current.kill()
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0a0e27]">
      {/* Glowing Orbs */}
      <div
        ref={orb1Ref}
        className="fixed pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5), transparent)',
          filter: 'blur(80px)',
          zIndex: 0,
          top: '-10%',
          right: '-5%',
        }}
      />
      <div
        ref={orb2Ref}
        className="fixed pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.5), transparent)',
          filter: 'blur(80px)',
          zIndex: 0,
          bottom: '10%',
          left: '-10%',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
