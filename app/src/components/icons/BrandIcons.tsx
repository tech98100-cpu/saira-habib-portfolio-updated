// Hand-written brand SVGs (not icon-font/AI-look glyphs) for social links.
// Each takes a `size` prop and inherits color via currentColor.

export function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.25 9.27 7.77 10.77.57.1.78-.25.78-.55v-1.94c-3.16.69-3.83-1.52-3.83-1.52-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.73.4-1.24.72-1.53-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.13-1.16 3.13-1.16.63 1.57.24 2.73.12 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FiverrIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.5 2.2c-2.9 0-4.7 1.75-4.7 4.6v.65H8.4a.55.55 0 0 0-.55.55v2.15c0 .3.25.55.55.55h1.4v8.5c0 .3.25.55.55.55h2.75a.55.55 0 0 0 .55-.55V10.7h2.2c.26 0 .49-.19.54-.45l.4-2.15a.55.55 0 0 0-.54-.65h-2.6v-.55c0-.9.4-1.3 1.35-1.3h1.3c.3 0 .55-.24.55-.55V2.75a.55.55 0 0 0-.5-.55c-.5-.05-1.15-.0-1.85 0Z" />
      <rect x="2.7" y="8.35" width="3.85" height="10.75" rx="0.55" />
      <circle cx="4.62" cy="4.4" r="2.05" />
      <path d="M18.9 8.35h2.75c.3 0 .55.25.55.55v6.45c0 1.75 1 2.1 1.8 2.05v2.55c-2.55.25-4.35-.5-4.9-2.2-.5.8-1.35 2.35-3.9 2.35v-2.7c1.9 0 3.7-.7 3.7-3.55V8.35Z" />
    </svg>
  )
}
