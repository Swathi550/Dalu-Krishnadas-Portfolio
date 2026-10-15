import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowDownRight, Volume2, VolumeX } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

export default function Hero({ start }: { start: boolean }) {
  const root = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(true)
  const audio = useRef<HTMLAudioElement>(null)

  const { role, location, available, hero } = portfolio

  // Interactive pointer parallax: shifts video and typography at different depths
  useEffect(() => {
    if (prefersReducedMotion()) return
    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 20
      const y = (e.clientY / innerHeight - 0.5) * 12
      if (videoContainerRef.current) {
        gsap.to(videoContainerRef.current, {
          x: x * 0.4,
          y: y * 0.3,
          duration: 1.4,
          ease: 'power2.out',
        })
      }
      gsap.to('.hero-bg-text', {
        x: -x * 0.45,
        y: -y * 0.35,
        duration: 1.4,
        ease: 'power2.out',
      })
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Cinematic opening sequence:
  // 1. THE NAME COMES FIRST!
  // 2. THEN DALU WALKS IN (walking strides, scaling forward from the depth)!
  useEffect(() => {
    if (!start || !root.current) return
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // Step 1: Background red ember glow blooms (0.0s)
      tl.fromTo(
        '.hero-ember',
        { opacity: 0, scale: 0.65 },
        { opacity: 0.9, scale: 1, duration: 1.8, ease: 'power2.out' },
        0
      )

      // Step 2: THE NAME COMES FIRST! (0.1s - 1.25s)
      // DALU KRISHNADAS materialises boldly in full view first
      tl.fromTo(
        '.hero-bg-text',
        { opacity: 0, y: 35, scale: 0.93 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'expo.out' },
        0.1
      )

      // Step 3: AFTER SHOWING THE NAME -> MAN WALKING FORWARD VIDEO ENTERS! (1.35s - 3.0s)
      // Dalu walks forward down the luxury corridor towards the camera
      tl.fromTo(
        videoContainerRef.current,
        {
          opacity: 0,
          scale: 1.05,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: 'power2.out',
          onStart: () => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0
              videoRef.current.play().catch(() => {})
            }
          },
        },
        1.35
      )

      // Step 4: Flanking technical chips snap into place (1.9s)
      tl.fromTo(
        '.hero-chip-left',
        { opacity: 0, x: -35 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        1.9
      )
      tl.fromTo(
        '.hero-chip-right',
        { opacity: 0, x: 35 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        2.0
      )

      // Step 7: Chevron arrows and dot grid matrix (2.2s)
      tl.fromTo(
        '.hero-arrows',
        { opacity: 0 },
        { opacity: 1, duration: 0.7, stagger: 0.1 },
        2.2
      )
      tl.fromTo(
        '.hero-dots',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 },
        2.3
      )

      // Step 8: Action CTAs and metadata settle (2.4s)
      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
        2.4
      )
    }, root)

    return () => ctx.revert()
  }, [start])

  const toggleSound = () => {
    const next = !muted
    setMuted(next)
    if (audio.current) {
      audio.current.muted = next
      next ? audio.current.pause() : audio.current.play().catch(() => {})
    }
  }

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-between overflow-hidden bg-black text-paper pt-24 pb-10 select-none"
    >
      {/* 1. Cinematic mottled plate background + film grain texture */}
      <div className="absolute inset-0 z-0 bg-[#060505] pointer-events-none" />
      <div className="film-grain z-0" aria-hidden="true" />

      {/* Atmospheric center red ember glow behind typography */}
      <div
        className="hero-ember absolute top-1/2 left-1/2 z-0 h-[min(650px,85vw)] w-[min(900px,95vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(222,27,28,0.28)_0%,_rgba(180,15,20,0.14)_38%,_transparent_72%)] blur-3xl pointer-events-none animate-ember"
        aria-hidden="true"
      />

      {/* Cinematic Walking Video (Reveals AFTER Name) */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-0 flex items-center justify-center"
        style={{ willChange: 'opacity, transform' }}
      >
        <video
          ref={videoRef}
          src={hero.video || '/media/Man_walking_forward_20261015113514_gwr_video_mvp.mp4'}
          muted
          playsInline
          loop
          preload="auto"
          className="h-full w-full object-contain object-center"
          style={{
            filter: 'brightness(1.50) contrast(1.10) saturate(1.18)',
          }}
        />

        {/* Minimal edge vignette - keeping video exceptionally bright & vivid */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_70%,_rgba(0,0,0,0.3)_100%)] pointer-events-none" />
      </div>

      {/* 2. Main Scene Stage: Typography FIRST, then Walking Video reveals */}
      <div className="relative z-10 my-auto flex w-full max-w-7xl flex-col items-center justify-center px-4 perspective-1200 min-h-[520px] sm:min-h-[580px]">
        {/* Giant Distressed Typography (REVEALS FIRST) */}
        <div className="hero-bg-text absolute inset-x-0 top-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
          <div className="relative inline-block w-full">
            <h1 className="mark-word font-anton text-[clamp(4.8rem,18.5vw,16.5rem)] font-normal leading-[0.82] tracking-tighter uppercase opacity-95 drop-shadow-[0_15px_30px_rgba(0,0,0,0.95)]">
              DALU
            </h1>
            <p className="font-bodoni text-[clamp(1.1rem,3.4vw,2.9rem)] font-light tracking-[0.38em] text-paper/90 uppercase mt-1 sm:mt-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              KRISHNADAS
            </p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-[1px] w-8 sm:w-16 bg-accent/60" />
              <span className="font-oswald text-[10px] sm:text-xs tracking-[0.36em] uppercase text-accent font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {role} · Runway Choreographer
              </span>
              <span className="h-[1px] w-8 sm:w-16 bg-accent/60" />
            </div>
          </div>
        </div>

        {/* Flanking Technical Chips */}
        <div className="hero-chip-left hidden md:block absolute left-4 lg:left-10 top-1/3 z-20 pointer-events-none">
          <div className="rounded-full border border-white/15 bg-black/75 px-3.5 py-1 text-[10px] font-oswald tracking-[0.26em] uppercase text-white/80 shadow-md backdrop-blur-sm">
            <span className="text-accent font-bold">•</span> Runway Director <span className="text-accent font-bold">•</span>
          </div>
        </div>

        <div className="hero-chip-right hidden md:block absolute right-4 lg:right-10 top-1/3 z-20 pointer-events-none">
          <div className="rounded-full border border-white/15 bg-black/75 px-3.5 py-1 text-[10px] font-oswald tracking-[0.26em] uppercase text-white/80 shadow-md backdrop-blur-sm">
            <span className="text-accent font-bold">•</span> Casting &amp; Poise <span className="text-accent font-bold">•</span>
          </div>
        </div>

        {/* Flanking Chevron Arrows */}
        <div className="hero-arrows hidden lg:flex absolute left-6 bottom-16 z-20 flex-col gap-1 text-[11px] font-oswald text-white/30 tracking-[0.4em] pointer-events-none">
          <span>&lt; &lt; &lt;</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent/70 font-semibold">Dalu Factory</span>
        </div>

        <div className="hero-arrows hidden lg:flex absolute right-6 bottom-16 z-20 flex-col items-end gap-1 text-[11px] font-oswald text-white/30 tracking-[0.4em] pointer-events-none">
          <span>&gt; &gt; &gt;</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-accent/70 font-semibold">Runway 2026</span>
        </div>
      </div>

      {/* 4. Bottom Furniture Row */}
      <div className="relative z-20 mt-4 w-full wrap flex flex-col md:flex-row items-center justify-between gap-6 pb-2">
        {/* Left: Location & Availability */}
        <div className="hero-cta flex flex-col items-center md:items-start text-center md:text-left max-w-md">
          <p className="font-oswald text-xs sm:text-sm uppercase tracking-[0.24em] text-paper/90 font-medium">
            {location}
          </p>
          <p className="font-oswald text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-accent font-medium mt-0.5">
            {available}
          </p>
        </div>

        {/* Center: Action CTAs */}
        <div className="hero-cta flex items-center gap-4">
          <a
            href="#work"
            onClick={e => {
              e.preventDefault()
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-6 sm:px-7 py-3 text-xs font-oswald font-bold uppercase tracking-[0.24em] text-white transition-all hover:bg-accent-hot hover:scale-[1.03] shadow-[0_0_20px_rgba(222,27,28,0.45)]"
          >
            <span>Explore Work</span>
            <ArrowDownRight
              size={15}
              className="text-white transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </a>

          <a
            href="#about"
            onClick={e => {
              e.preventDefault()
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-6 py-3 text-xs font-oswald font-semibold uppercase tracking-[0.22em] text-paper transition-colors hover:border-accent hover:text-accent backdrop-blur-sm"
          >
            Director Vision
          </a>
        </div>

        {/* Right: Technical Dot Grid Matrix */}
        <div className="hero-dots hidden lg:flex items-center gap-4">
          <div className="flex flex-col items-end text-[9px] font-oswald text-dim tracking-[0.28em] uppercase">
            <span>Grid · 01</span>
            <span className="text-accent font-semibold">Active Scene</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 p-2 rounded-lg border border-white/10 bg-black/40 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_5px_#de1b1c] animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </div>
        </div>
      </div>

      {hero.audio && <audio ref={audio} src={hero.audio} loop muted preload="none" />}
      {hero.audio && (
        <button
          onClick={toggleSound}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="absolute bottom-5 right-5 z-30 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/60 text-paper hover:border-accent transition-colors shadow-lg backdrop-blur-md"
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      )}
    </section>
  )
}
