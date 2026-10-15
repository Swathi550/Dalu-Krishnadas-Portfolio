import { useRef } from 'react'
import { portfolio } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Sparkles } from 'lucide-react'

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  if (!portfolio.skills.length) return null

  return (
    <section
      ref={ref}
      id="skills"
      className="relative border-t border-white/10 bg-[#060505] py-28 md:py-44 text-paper overflow-hidden"
    >
      <div className="film-grain" aria-hidden="true" />
      <div
        className="absolute top-1/2 right-1/4 w-[min(500px,60vw)] h-[min(500px,60vw)] rounded-full bg-[radial-gradient(circle,_rgba(222,27,28,0.08)_0%,_transparent_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        <header className="mb-14 md:mb-20 max-w-3xl" data-reveal>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 text-[10px] sm:text-xs font-oswald font-bold tracking-[0.28em] uppercase text-accent mb-5 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Scene 05 — Disciplines &amp; Expertise</span>
          </div>

          <h2 className="font-anton text-[clamp(2.5rem,7vw,6.2rem)] font-normal leading-[0.94] tracking-tight uppercase text-paper">
            MASTERCLASS <br />
            <span className="mark-word">DISCIPLINES</span>
          </h2>

          <p className="mt-4 font-oswald text-xs sm:text-sm uppercase tracking-[0.3em] text-dim">
            Creative Direction · Catwalk Dynamics · Model Poise · Production
          </p>
        </header>

        <div className="mt-14 space-y-6">
          {portfolio.skills.map((g, gIdx) => (
            <div
              key={g.category}
              className="group rounded-2xl border border-white/10 bg-black/60 p-6 md:p-8 backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-black/80 shadow-xl"
              data-reveal
            >
              <div className="grid gap-6 md:grid-cols-12 items-center">
                <div className="md:col-span-4">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl border border-white/20 bg-black/80 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#de1b1c]" />
                    <span className="font-anton text-base sm:text-lg tracking-wider uppercase text-paper">
                      {g.category}
                    </span>
                  </div>
                  <p className="mt-2 font-oswald text-[11px] uppercase tracking-[0.22em] text-dim">
                    0{gIdx + 1} // Specialization Domain
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2.5 md:col-span-8">
                  {g.items.map((s, sIdx) => {
                    const pillStyles = [
                      'bg-accent/15 border-accent/40 text-rose-300 hover:border-accent hover:bg-accent/25',
                      'bg-amber-500/15 border-amber-500/40 text-amber-200 hover:border-amber-400 hover:bg-amber-500/25',
                      'bg-white/10 border-white/20 text-white/90 hover:border-white/40 hover:bg-white/15',
                      'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:border-emerald-400 hover:bg-emerald-500/25',
                    ]
                    const chip = pillStyles[(gIdx * 2 + sIdx) % pillStyles.length]
                    return (
                      <li
                        key={s}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs sm:text-sm font-oswald font-bold uppercase tracking-wider shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-default backdrop-blur-xs ${chip}`}
                      >
                        <Sparkles size={12} className="opacity-70" />
                        {s}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
