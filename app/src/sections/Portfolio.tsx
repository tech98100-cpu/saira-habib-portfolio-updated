import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Images live at /public/assets/projects/<slug>.(jpg|png) — currently
// branded placeholders. Drop in a real screenshot using the same slug name
// (either .jpg or .png both work — see handleImgError below) and it swaps
// in automatically, no further code changes needed.
const img = (slug: string) => `/assets/projects/${slug}.jpg`

// If a .jpg fails to load (e.g. the screenshot was saved as .png instead),
// automatically retry with .png once before giving up.
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const el = e.currentTarget
  if (el.src.endsWith('.jpg') && !el.dataset.triedPng) {
    el.dataset.triedPng = 'true'
    el.src = el.src.replace(/\.jpg$/, '.png')
  }
}

const featuredProjects = [
  {
    slug: 'hospital-management',
    title: 'Hospital Management System',
    tech: ['React', 'Express', 'MongoDB Atlas', 'Railway'],
    live: 'https://hospital-management-m84y.vercel.app/login',
    problem:
      "Small clinics were tracking patients, doctors and appointments across paper and spreadsheets — leading to double-bookings and lost visit history.",
    approach:
      'Built a role-based system: admins manage doctors and departments, staff book and track appointments, and each patient\'s history lives in one searchable place instead of scattered folders.',
    architecture:
      'React (Vite) frontend on Vercel, talking to an Express + MongoDB Atlas API deployed on Railway, with authenticated routes gating the dashboard behind login.',
    challenge:
      "My ISP was silently blocking MongoDB's SRV DNS lookups, so every connection attempt just timed out with no useful error. Traced it to the DNS layer and switched to a direct, non-SRV connection string to get a reliable connection both locally and in production.",
  },
  {
    slug: 'ai-email-writer',
    title: 'AI Email Writer',
    tech: ['React', 'Express', 'Gemini API'],
    live: 'https://ai-email-writer-chi-green.vercel.app/',
    problem:
      'Writing the same kinds of emails on repeat — client updates, cold outreach, polite follow-ups — burns real time starting from a blank page every time.',
    approach:
      'Built a generator where you describe the situation and pick a tone, and it drafts a ready-to-send email to edit rather than write from scratch.',
    architecture:
      'React frontend sends the prompt to an Express backend, which calls the Gemini API server-side so the key never reaches the browser, then returns the draft.',
    challenge:
      "Gemini's named model versions kept rotating in and out of availability mid-build. Moved to the gemini-flash-latest alias and added prompt structure to keep tone and length consistent regardless of which underlying model responds.",
  },
  {
    slug: 'ai-code-assistant',
    title: 'AI Code Assistant',
    tech: ['React', 'Express', 'Gemini API'],
    live: 'https://ai-code-assistant-phi.vercel.app/',
    problem:
      "Breaking flow to search an error message is disruptive, and most explanations online aren't about your actual code.",
    approach:
      'Built a focused chat interface — paste a snippet or error, ask a question, and get an explanation, fix, or refactor back in context, with properly formatted code blocks.',
    architecture:
      'React chat UI with message history, an Express layer that shapes the prompt sent to Gemini, and client-side markdown/code rendering with syntax highlighting.',
    challenge:
      'Getting Gemini to reliably return well-formed, correctly-fenced code (instead of mixing prose and code) took several rounds of prompt tuning, plus handling API rate-limit errors gracefully instead of a blank screen.',
  },
]

const projects = [
  {
    slug: 'saira-ai-prompt-studio',
    title: 'PromptVault',
    description: 'A premium, animated collection of expertly crafted AI prompts for developers, designers and creators — organized for fast browsing and reuse.',
    tech: ['React', 'Framer Motion'],
    live: 'https://saira-ai-prompt-studio-1.vercel.app/',
  },
  {
    slug: 'study-tracker',
    title: 'Study Tracker',
    description: 'A habit and study-tracking app built around consistency and spiritual growth — daily logging, streaks, and progress at a glance.',
    tech: ['React', 'Habit Tracking'],
    live: 'https://sairastudy-tracker-react.vercel.app/',
  },
  {
    slug: 'insightflow-analytics',
    title: 'InsightFlow Analytics',
    description: 'A SaaS-style analytics dashboard concept with interactive charts and data views, built to demonstrate real-time reporting UI.',
    tech: ['React', 'Data Visualization'],
    live: 'https://insightflow-analytics-2.vercel.app/',
  },
  {
    slug: 'saira-developer-hub',
    title: 'DevToolsHub',
    description: 'A curated platform bringing developer tools, resources and references together in one clean, modern interface.',
    tech: ['React', 'UI/UX'],
    live: 'https://saira-developer-hub.vercel.app/',
  },
  {
    slug: 'sairas-collection',
    title: "Saira's Collection",
    description: 'A cozy-fantasy digital products storefront — ebooks, a companion journal app, wallpapers and stickers, bundled and sold directly to readers.',
    tech: ['React', 'Vercel', 'E-commerce'],
    live: 'https://sairascollection.vercel.app/',
  },
  {
    slug: 'bloom-journal',
    title: 'Bloom Journal',
    description: 'A 15-page digital journal web app with mood tracking, habits, sleep and gratitude logging, wrapped in a soft, aesthetic UI.',
    tech: ['React', 'Local Persistence'],
    live: 'https://bloom-journal-two.vercel.app/',
  },
  {
    slug: 'expense-tracker',
    title: 'Expense Tracker',
    description: "Everyday spending is easy to lose track of without categorized logging. Built for adding, editing and categorizing expenses with running totals so patterns are visible at a glance.",
    tech: ['React', 'MongoDB'],
    live: 'https://expense-tracker-seven-umber-18.vercel.app/',
  },
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Checking weather across multiple tabs is annoying. A single clean dashboard pulling live conditions and forecasts for any city through a weather API.',
    tech: ['React', 'Weather API'],
    live: 'https://weather-dashboard-cyan-ten.vercel.app/',
  },
  {
    slug: 'notes-app',
    title: 'Notes App',
    description: 'Most note apps are bloated for quick capture. A fast CRUD notes app with search and instant persistence for jotting things down without friction.',
    tech: ['React', 'Local Persistence'],
    live: 'https://notes-app-livid-two-57.vercel.app/',
  },
  {
    slug: 'movie-finder',
    title: 'Movie Finder',
    description: 'Finding details and ratings on a movie means jumping between sites. A search-driven app pulling posters, ratings and details from a movie API into one view.',
    tech: ['React', 'Movie API'],
    live: 'https://movie-finder-two-self.vercel.app/',
  },
  {
    slug: 'shopease',
    title: 'ShopEase',
    description: 'A concept e-commerce storefront with category filtering, product browsing and a live shopping cart.',
    tech: ['React', 'E-commerce UI'],
    live: 'https://ease-app-iota.vercel.app/',
  },
  {
    slug: 'ai-website-builder',
    title: 'AI Website Builder',
    description: "Non-technical clients often can't picture a site from a spec sheet. A Gemini-powered generator that turns a short prompt into a live page layout and copy draft, previewed instantly.",
    tech: ['React', 'Express', 'Gemini API'],
    live: 'https://ai-website-builder-bay-delta.vercel.app/',
  },
  {
    slug: 'devblog',
    title: 'DevBlog',
    description: 'A developer-focused blog concept with tag filtering, a featured-post layout and clean reading experience.',
    tech: ['React', 'Content/Blog'],
    live: 'https://dev-blog-omega-green.vercel.app/',
  },
  {
    slug: 'url-shortener',
    title: 'URL Shortener',
    description: 'Long links are unwieldy to share and impossible to track. Generates short codes via an Express + MongoDB backend and reports click counts per link.',
    tech: ['React', 'Express', 'MongoDB'],
    live: 'https://url-shortener-roan-five.vercel.app/',
  },
  {
    slug: 'ai-pdf-summarizer',
    title: 'AI PDF Summarizer',
    description: 'Long PDFs take time to skim for what matters. An uploader that extracts text server-side and sends it to Gemini for a structured summary.',
    tech: ['React', 'Express', 'Gemini API'],
    live: 'https://ai-pdf-summarizer-tau.vercel.app/',
  },
  {
    slug: 'taskflow',
    title: 'TaskFlow',
    description: 'A drag-and-drop kanban task manager with To Do / In Progress / Done columns, tagging and a quick-add task modal.',
    tech: ['React', 'Drag & Drop'],
    live: 'https://taskflow-sigma-snowy.vercel.app/',
  },
  {
    slug: 'inventory-management',
    title: 'Inventory Management System',
    description: "Small shops tracking stock in spreadsheets miss low-stock items until it's too late. A CRUD inventory app with category organization and low-stock flags.",
    tech: ['React', 'Express', 'MongoDB'],
    live: 'https://inventory-management-system-delta-lime.vercel.app/',
  },
  {
    slug: 'cafe-restaurant-pos',
    title: 'Cafe & Restaurant POS',
    description: "Small cafes need order-taking and billing without expensive POS hardware. A browser-based POS with menu management, order building and instant bill calculation.",
    tech: ['React', 'POS UI'],
    live: 'https://cafe-restaurant-pos-jgk9.vercel.app/',
  },
  {
    slug: 'novatech-solutions',
    title: 'NovaTech Solutions',
    description: 'A corporate agency-style website for a software/AI/cloud company, complete with a routed blog section.',
    tech: ['React', 'React Router'],
    live: 'https://saira-seven.vercel.app/#/blog',
  },
  {
    slug: 'corkboard-job-portal',
    title: 'Corkboard Job Portal',
    description: 'Simple local job boards get buried in noise. A corkboard-style listing app where postings can be added, browsed and filtered by category.',
    tech: ['React', 'Express', 'MongoDB'],
    live: 'https://corkboard-job-portal-otm5.vercel.app',
  },
  {
    slug: 'real-estate-platform',
    title: 'Real Estate Platform',
    description: 'Browsing property listings without filters wastes time. A listings app with price/location filtering and a detail view for each property.',
    tech: ['React', 'MongoDB'],
    live: 'https://real-estate-platform-k8h1.vercel.app/',
  },
  {
    slug: 'saira-ai',
    title: 'NexusAI',
    description: 'A bold AI-startup landing page concept — hero-led layout built to pitch an AI product at a glance.',
    tech: ['React', 'Landing Page'],
    live: 'https://saira-ai-react.vercel.app/',
  },
]

const INITIAL_VISIBLE = 6

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  const visibleProjects = expanded ? projects : projects.slice(0, INITIAL_VISIBLE)

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
      if (featuredRef.current) {
        gsap.fromTo(featuredRef.current.children, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: featuredRef.current, start: 'top 85%' },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!cardsRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current!.children, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
      })
    }, cardsRef)
    return () => ctx.revert()
  }, [expanded])

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-[120px] px-6 md:px-10 relative"
      style={{
        background: 'linear-gradient(180deg, #0a0e27 0%, #1a0f2e 100%)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent)',
        }}
      />

      <div className="max-w-[1200px] mx-auto">
        <div ref={headerRef}>
          <span className="inline-block text-xs font-medium tracking-[1.5px] text-[#6366f1] uppercase mb-4">
            PORTFOLIO
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-[72px] text-white leading-[1.1] tracking-[-1.5px]">
            Featured Projects
          </h2>
          <p className="text-[#cbd5e1] text-lg mt-4 max-w-[600px]">
            A closer look at three builds — the problem each one solved, how I approached it,
            and what I ran into along the way.
          </p>
        </div>

        {/* Featured case-study cards */}
        <div ref={featuredRef} className="flex flex-col gap-10 mt-12">
          {featuredProjects.map((project, i) => (
            <div
              key={project.title}
              className="group rounded-2xl overflow-hidden card-bg grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] transition-all duration-300 hover:border-[#6366f1] hover:shadow-[0_25px_60px_rgba(99,102,241,0.2)]"
            >
              <div
                className={`relative w-full h-[260px] lg:h-auto overflow-hidden bg-gradient-to-br from-[rgba(99,102,241,0.15)] to-[rgba(236,72,153,0.15)] ${
                  i % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={img(project.slug)}
                  onError={handleImgError}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-7 md:p-10 flex flex-col">
                <h3 className="text-white font-bold text-2xl md:text-[28px] mb-4">
                  {project.title}
                </h3>

                <div className="flex flex-col gap-4 text-sm md:text-[15px] leading-relaxed">
                  <p className="text-[#cbd5e1]">
                    <span className="text-[#ec4899] font-semibold">The problem — </span>
                    {project.problem}
                  </p>
                  <p className="text-[#cbd5e1]">
                    <span className="text-[#6366f1] font-semibold">My approach — </span>
                    {project.approach}
                  </p>
                  <p className="text-[#cbd5e1]">
                    <span className="text-[#a5b4fc] font-semibold">Architecture — </span>
                    {project.architecture}
                  </p>
                  <p className="text-[#cbd5e1]">
                    <span className="text-[#f0c674] font-semibold">A challenge I solved — </span>
                    {project.challenge}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-semibold text-[#a5b4fc] bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.2)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-fit flex items-center gap-2 py-3 px-6 rounded-lg bg-gradient-accent text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(99,102,241,0.3)]"
                >
                  <ExternalLink size={16} />
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mt-20 mb-4">
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white">
            More Projects
          </h3>
          <div className="h-px flex-1" style={{ background: 'rgba(99,102,241,0.25)' }} />
        </div>
        <p className="text-[#cbd5e1] text-base max-w-[600px] mb-4">
          Smaller builds and practice projects — each one live and explorable.
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {visibleProjects.map((project) => (
            <div
              key={project.title}
              className="group rounded-2xl overflow-hidden card-bg transition-all duration-300 hover:-translate-y-4 hover:border-[#6366f1] hover:shadow-[0_25px_50px_rgba(99,102,241,0.25)] flex flex-col"
            >
              <div className="relative w-full h-[220px] md:h-[250px] overflow-hidden bg-gradient-to-br from-[rgba(99,102,241,0.15)] to-[rgba(236,72,153,0.15)]">
                <img
                  src={img(project.slug)}
                  onError={handleImgError}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-white font-bold text-lg md:text-xl mb-2">
                  {project.title}
                </h3>
                <p className="text-[#cbd5e1] text-sm leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full text-xs font-semibold text-[#a5b4fc] bg-[rgba(99,102,241,0.15)] border border-[rgba(99,102,241,0.2)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-accent text-white font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(99,102,241,0.3)]"
                  >
                    <ExternalLink size={16} />
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > INITIAL_VISIBLE && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-2 py-3 px-7 rounded-full font-semibold text-sm text-[#a5b4fc] border-2 border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.08)] transition-all duration-300 hover:bg-[rgba(99,102,241,0.18)] hover:border-[#6366f1]"
            >
              {expanded ? 'Show Fewer Projects' : `Show ${projects.length - INITIAL_VISIBLE} More Projects`}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}