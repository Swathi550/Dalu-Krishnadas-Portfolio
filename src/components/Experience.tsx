import { useRef, useState } from 'react'
import { portfolio } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Clock, Compass, Award, Briefcase, GraduationCap } from 'lucide-react'

export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const [selectedIdx, setSelectedIdx] = useState(0)

  if (!portfolio.timeline.length) return null
  const activeItem = portfolio.timeline[selectedIdx] || portfolio.timeline[0]

  const kindIcons: Record<string, React.ReactNode> = {
    Leadership: <Award size={15} className="text-accent" />,
    Work: <Briefcase size={15} className="text-indigo-400" />,
    Education: <GraduationCap size={15} className="text-amber-400" />,
    Certification: <Compass size={15} className="text-emerald-400" />,
  }

  return (
    <section
      ref={ref}
      id="experience"
      className="relative border-t border-white/10 bg-[#060505] py-28 md:py-44 text-paper overflow-hidden"
    >
      {/* Film grain and atmospheric floor reflection */}
      <div className="film-grain" aria-hidden="true" />
      <div
        className="absolute top-1/3 left-1/4 w-[min(600px,70vw)] h-[min(600px,70vw)] rounded-full bg-[radial-gradient(circle,_rgba(255,160,60,0.07)_0%,_transparent_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Section Header (Scene 03 - Time Machine) */}
        <header className="mb-14 md:mb-20 max-w-4xl" data-reveal>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 text-[10px] sm:text-xs font-oswald font-bold tracking-[0.28em] uppercase text-amber-400 mb-5 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Scene 03 — Chrono Experience</span>
          </div>

          <h2 className="font-bodoni text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.96] tracking-tight uppercase text-paper">
            A JOURNEY <br />
            <span className="font-anton mark-word">THROUGH TIME</span>
          </h2>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <p className="font-oswald text-xs sm:text-sm uppercase tracking-[0.32em] text-dim">
              Vision · Directing · Runway Leadership · Growth
            </p>
            <p className="font-oswald text-xs uppercase tracking-[0.28em] text-amber-400/90 font-bold flex items-center gap-2">
              <Clock size={14} className="animate-spin" style={{ animationDuration: '12s' }} />
              Interactive Time Rail
            </p>
          </div>
        </header>

        {/* 1. Interactive Time Rail Navigation Bar (Chrono Dial) */}
        <div className="mb-16 rounded-2xl border border-white/15 bg-black/70 p-5 md:p-8 backdrop-blur-md shadow-2xl" data-reveal>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <p className="font-oswald text-[10px] uppercase tracking-[0.34em] text-accent font-bold">
                Time Machine Selector
              </p>
              <h3 className="font-bodoni text-xl md:text-2xl text-paper tracking-wider mt-1">
                Select Year to Illuminate Milestone
              </h3>
            </div>
            <div className="text-[11px] font-oswald text-dim uppercase tracking-[0.28em]">
              {portfolio.timeline.length} Key Milestones Catalogued
            </div>
          </div>

          {/* Time Dial Years Strip */}
          <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-4 items-center justify-between">
            {portfolio.timeline.map((t, idx) => {
              const isSelected = selectedIdx === idx
              return (
                <button
                  key={t.period + t.title}
                  onClick={() => setSelectedIdx(idx)}
                  className={`group relative flex-1 min-w-[120px] rounded-xl border p-3.5 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-accent bg-accent/20 shadow-[0_0_25px_rgba(222,27,28,0.35)] scale-[1.02]'
                      : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`h-2 w-2 rounded-full transition-transform ${
                        isSelected
                          ? 'bg-accent shadow-[0_0_8px_#de1b1c] scale-125'
                          : 'bg-white/30 group-hover:bg-white'
                      }`}
                    />
                    <span className="font-oswald text-[9px] uppercase tracking-widest text-dim">
                      0{idx + 1}
                    </span>
                  </div>
                  <p
                    className={`mt-2 font-oswald text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                      isSelected ? 'text-amber-300' : 'text-paper'
                    }`}
                  >
                    {t.period}
                  </p>
                  <p className="font-sans text-[11px] text-dim truncate mt-0.5">{t.org}</p>
                </button>
              )
            })}
          </div>

          {/* Highlighted Spotlight Card */}
          <div className="mt-6 rounded-xl border border-accent/40 bg-gradient-to-r from-accent/15 via-black/80 to-black/60 p-6 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/25 border border-accent/50 text-accent-hot text-xs font-oswald font-bold uppercase tracking-wider">
                {kindIcons[activeItem.kind]}
                {activeItem.kind}
              </span>
              <span className="font-oswald text-xs uppercase tracking-widest text-amber-300 font-bold">
                {activeItem.period}
              </span>
            </div>

            <h4 className="mt-3 font-anton text-2xl sm:text-3xl uppercase tracking-wide text-paper">
              {activeItem.title}
            </h4>
            <p className="font-oswald text-sm font-medium uppercase tracking-wider text-dim mt-1">
              {activeItem.org}
            </p>
            {activeItem.detail && (
              <p className="mt-3 font-sans text-sm sm:text-base text-[#cfcfcf] leading-relaxed max-w-3xl">
                {activeItem.detail}
              </p>
            )}
          </div>
        </div>

        {/* 2. Full Chrono Vertical Timeline with Animated Connecting Line */}
        <div className="relative mt-16 pl-6 sm:pl-10">
          {/* Animated Glowing Vertical Rail Line */}
          <div className="absolute top-2 bottom-4 left-2 sm:left-4 w-[2px] bg-gradient-to-b from-accent via-amber-400 to-white/20" />

          <ol className="space-y-12">
            {portfolio.timeline.map(t => (
              <li
                key={t.title + t.period}
                className="relative group transition-all duration-300"
                data-reveal
              >
                {/* Node Pip on Line */}
                <span className="absolute -left-6 sm:-left-10 top-1.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-black bg-accent shadow-[0_0_10px_#de1b1c] group-hover:scale-125 transition-transform" />

                <div className="rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm transition-all duration-300 group-hover:border-accent/50 group-hover:bg-black/75 shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                    <span className="font-oswald text-xs uppercase tracking-[0.24em] text-amber-300 font-bold">
                      {t.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-white/15 bg-white/5 text-[10px] font-oswald uppercase tracking-wider text-dim">
                      {kindIcons[t.kind]}
                      {t.kind}
                    </span>
                  </div>

                  <h3 className="font-anton text-xl sm:text-2xl uppercase tracking-wide text-paper group-hover:text-accent transition-colors">
                    {t.title}
                  </h3>
                  <p className="font-oswald text-sm uppercase tracking-wider text-dim mt-0.5">
                    {t.org}
                  </p>
                  {t.detail && (
                    <p className="mt-3 font-sans text-sm sm:text-[15px] leading-relaxed text-[#b0b0b0]">
                      {t.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
