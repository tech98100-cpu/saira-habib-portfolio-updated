import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { socialLinks } from '../data/socialLinks'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS',
  'Tailwind CSS', 'Node.js', 'Python', 'UI/UX Design', 'Figma', 'Git', 'REST APIs',
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paragraphsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(labelRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 85%' },
      })

      // Heading
      gsap.fromTo(headingRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: section, start: 'top 85%' },
      })

      // Paragraphs stagger
      if (paragraphsRef.current) {
        gsap.fromTo(paragraphsRef.current.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: section, start: 'top 85%' },
        })
      }

      // Skills tags stagger
      if (skillsRef.current) {
        gsap.fromTo(skillsRef.current.children, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.4,
          scrollTrigger: { trigger: section, start: 'top 75%' },
        })
      }

      // Visual element
      gsap.fromTo(visualRef.current, { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: section, start: 'top 80%' },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-[120px] px-6 md:px-10"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-start">
          {/* Left - Text Content */}
          <div>
            <span
              ref={labelRef}
              className="inline-block text-xs font-medium tracking-[1.5px] text-[#6366f1] uppercase mb-4"
            >
              ABOUT ME
            </span>

            <h2
              ref={headingRef}
              className="font-display font-bold text-4xl md:text-5xl lg:text-[72px] text-white leading-[1.1] tracking-[-1.5px] mb-8"
            >
              Passionate Developer, Creative Designer
            </h2>

            <div ref={paragraphsRef} className="space-y-5">
              <p className="text-[#cbd5e1] text-base leading-[1.8]">
                I'm Saira Habib, a full-stack web developer and UI/UX designer with a passion for crafting digital experiences that are both beautiful and functional. With over 3 years of hands-on experience, I've helped businesses transform their online presence into powerful conversion engines.
              </p>
              <p className="text-[#cbd5e1] text-base leading-[1.8]">
                My approach combines clean, maintainable code with eye-catching design. I specialize in React, Next.js, and modern frontend frameworks, ensuring every project is built with performance, accessibility, and SEO in mind.
              </p>
              <p className="text-[#cbd5e1] text-base leading-[1.8]">
                Whether you need a stunning portfolio, a robust e-commerce platform, or a custom web application, I bring your ideas to life with precision and creativity. Let's build something extraordinary together.
              </p>
            </div>

            {/* Skills Cloud */}
            <div ref={skillsRef} className="flex flex-wrap gap-3 mt-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#a5b4fc] bg-[rgba(99,102,241,0.1)] border-2 border-[rgba(99,102,241,0.2)] transition-all duration-300 hover:bg-[rgba(99,102,241,0.2)] hover:border-[#6366f1] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(99,102,241,0.2)] cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Connect row */}
            <div className="flex items-center gap-4 mt-10">
              <span className="text-xs font-medium tracking-[1.5px] text-white/40 uppercase">
                Find me
              </span>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)] flex items-center justify-center text-[#a5b4fc] transition-all duration-300 hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] hover:-translate-y-1"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Visual Element */}
          <div ref={visualRef} className="flex items-center justify-center">
            <div className="relative w-full max-w-[400px] aspect-square card-bg rounded-2xl p-8 flex items-center justify-center overflow-hidden">
              {/* Code bracket icon */}
              <div className="text-8xl md:text-9xl font-display font-bold text-gradient select-none">
                &lt;/&gt;
              </div>

              {/* Orbiting badges */}
              <div className="absolute inset-0" style={{ animation: 'spin 20s linear infinite' }}>
                <span
                  className="absolute top-[10%] left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(99,102,241,0.2)] border border-[rgba(99,102,241,0.3)] text-[#a5b4fc]"
                  style={{ animation: 'spin 20s linear infinite reverse' }}
                >
                  React
                </span>
                <span
                  className="absolute bottom-[15%] right-[10%] px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(236,72,153,0.2)] border border-[rgba(236,72,153,0.3)] text-[#f9a8d4]"
                  style={{ animation: 'spin 20s linear infinite reverse' }}
                >
                  Next.js
                </span>
                <span
                  className="absolute bottom-[15%] left-[10%] px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(16,185,129,0.2)] border border-[rgba(16,185,129,0.3)] text-[#6ee7b7]"
                  style={{ animation: 'spin 20s linear infinite reverse' }}
                >
                  Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
