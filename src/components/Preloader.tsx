import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { portfolio } from '../data/portfolio'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    let finished = false
    const finish = () => {
      if (!finished) {
        finished = true
        setGone(true)
        onDone()
      }
    }

    const fallback = window.setTimeout(finish, 2200)
    if (prefersReducedMotion() || !root.current) {
      finish()
      return () => clearTimeout(fallback)
    }

    const ctx = gsap.context(() => {
      const counterObj = { val: 0 }
      const tl = gsap.timeline({ onComplete: finish })

      // Counter animation
      tl.to(
        counterObj,
        {
          val: 100,
          duration: 1.1,
          ease: 'power2.out',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counterObj.val)).padStart(2, '0')
            }
          },
        },
        0
      )

      tl.from('.pl-brand', { opacity: 0, y: -10, duration: 0.5 }, 0.1)
        .from('.pl-title', { opacity: 0, y: 25, duration: 0.7, ease: 'power3.out' }, 0.2)
        .from('.pl-subtitle', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, 0.4)
        .fromTo('.pl-line', { scaleX: 0 }, { scaleX: 1, duration: 1.0, ease: 'power2.inOut' }, 0.1)
        .to('.pl-content', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' }, 1.1)
        .to(root.current, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, 1.3)
    }, root)

    return () => {
      clearTimeout(fallback)
      ctx.revert()
    }
  }, [onDone])

  if (gone) return null

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black p-6 text-paper md:p-12 select-none"
      aria-live="polite"
    >
      <div className="film-grain" aria-hidden="true" />

      {/* Top Branding Row */}
      <div className="pl-brand relative z-10 flex items-center justify-between text-xs font-oswald uppercase tracking-[0.28em] text-white/50">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#de1b1c] animate-pulse" />
          {portfolio.brand}
        </span>
        <span className="hidden sm:inline font-oswald text-[11px] tracking-[0.32em] text-amber-400">
          RUNWAY ARCHIVE · MMXXVI
        </span>
      </div>

      {/* Center Cinematic Title */}
      <div className="pl-content relative z-10 my-auto w-full text-center px-4">
        <p className="pl-subtitle font-oswald text-[11px] sm:text-xs uppercase tracking-[0.36em] text-accent font-bold mb-3">
          Fashion Direction &amp; Choreography
        </p>

        <h1 className="pl-title font-anton text-[clamp(2rem,6.5vw,5.5rem)] font-normal tracking-wide text-white whitespace-nowrap inline-block max-w-full uppercase">
          DALU <span className="mark-word inline-block">KRISHNADAS</span>
        </h1>

        <p className="pl-subtitle mt-3 max-w-xl mx-auto font-oswald text-[11px] sm:text-xs text-white/80 font-medium tracking-[0.28em] uppercase">
          {portfolio.preloaderRole}
        </p>

        {/* Minimal Luxury Progress Bar */}
        <div className="mx-auto mt-8 h-[2px] w-[min(320px,75vw)] overflow-hidden bg-white/15 rounded-full">
          <div className="pl-line h-full origin-left bg-gradient-to-r from-accent via-amber-400 to-white shadow-[0_0_8px_#de1b1c]" />
        </div>
      </div>

      {/* Bottom Counter & Status */}
      <div className="relative z-10 flex items-end justify-between text-xs font-oswald tracking-[0.25em] uppercase text-white/70 font-medium">
        <span>Kochi · Mumbai · Bangalore</span>
        <div className="font-oswald text-lg font-bold tracking-wider text-amber-300">
          <span ref={counterRef}>00</span>
          <span className="text-xs text-white/50 ml-0.5">%</span>
        </div>
      </div>
    </div>
  )
}
