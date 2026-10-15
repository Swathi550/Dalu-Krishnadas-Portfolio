import { useRef } from 'react'
import { portfolio } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { Sparkles, Compass, Eye, Users, Film, Award } from 'lucide-react'

const disciplineIcons: Record<string, React.ReactNode> = {
  'Fashion Direction': <Compass size={18} className="text-accent" />,
  'Choreography': <Sparkles size={18} className="text-amber-400" />,
  'Model Grooming': <Users size={18} className="text-accent-hot" />,
  'Casting Direction': <Eye size={18} className="text-amber-300" />,
  'Runway Production': <Film size={18} className="text-rose-400" />,
  'Styling Consultation': <Award size={18} className="text-amber-400" />,
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const { about } = portfolio

  return (
    <section
      ref={ref}
      id="about"
      className="relative border-t border-white/10 bg-[#060505] py-28 md:py-44 overflow-hidden text-paper"
    >
      {/* Background grain and ambient lighting */}
      <div className="film-grain" aria-hidden="true" />
      <div
        className="absolute top-1/4 right-0 w-[min(500px,60vw)] h-[min(500px,60vw)] rounded-full bg-[radial-gradient(circle,_rgba(222,27,28,0.12)_0%,_transparent_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Section Header (Inspired by Scene 02) */}
        <header className="mb-14 md:mb-20 max-w-3xl" data-reveal>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 text-[10px] sm:text-xs font-oswald font-bold tracking-[0.28em] uppercase text-accent mb-5 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Scene 02 — The Creative Universe</span>
          </div>

          <h2 className="font-anton text-[clamp(2.5rem,7vw,6.2rem)] font-normal leading-[0.94] tracking-tight uppercase text-paper">
            THE CREATIVE <br />
            <span className="mark-word">UNIVERSE</span>
          </h2>

          <p className="mt-4 font-oswald text-xs sm:text-sm uppercase tracking-[0.32em] text-dim">
            Direction · Choreography · Poise · Visual Narrative
          </p>
        </header>

        {/* Two Column Layout: Biography & Editorial Card */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column: Headline and Biography */}
          <div className="lg:col-span-7 space-y-8" data-reveal>
            <h3 className="font-bodoni text-[clamp(1.6rem,3.2vw,2.8rem)] font-light leading-snug text-paper tracking-wide">
              {about.headline}
            </h3>

            <div className="space-y-5 font-sans text-base sm:text-lg leading-relaxed text-dimmer-light text-[#b8b8b8]">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Quick Metrics / Accolades Row */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
                <span className="block font-anton text-2xl sm:text-3xl text-accent">50+</span>
                <span className="block font-oswald text-[10px] uppercase tracking-[0.22em] text-dim mt-1">
                  Runway Productions
                </span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
                <span className="block font-anton text-2xl sm:text-3xl text-amber-400">10+</span>
                <span className="block font-oswald text-[10px] uppercase tracking-[0.22em] text-dim mt-1">
                  Years Directing
                </span>
              </div>
              <div className="p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm">
                <span className="block font-anton text-2xl sm:text-3xl text-paper">400+</span>
                <span className="block font-oswald text-[10px] uppercase tracking-[0.22em] text-dim mt-1">
                  Models Mentored
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Disciplines Floating 3D Cards */}
          <div className="lg:col-span-5 space-y-6" data-reveal>
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-oswald text-xs font-bold uppercase tracking-[0.26em] text-accent">
                Core Disciplines
              </span>
              <span className="font-oswald text-[10px] tracking-[0.3em] uppercase text-dim">
                Dalu Fashion Factory
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 perspective-1200">
              {about.focus.map((f, idx) => (
                <div
                  key={f}
                  className="group relative rounded-xl border border-white/10 bg-black/60 p-4 transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(222,27,28,0.25)] backdrop-blur-md cursor-default"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-accent/40 transition-colors">
                      {disciplineIcons[f] || <Compass size={18} className="text-accent" />}
                    </div>
                    <span className="font-oswald text-[10px] font-bold text-white/40 tracking-wider">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="mt-3 font-oswald text-sm font-bold tracking-wider uppercase text-paper group-hover:text-accent transition-colors">
                    {f}
                  </h4>
                  <p className="mt-1 font-sans text-[11px] text-dim leading-snug">
                    Bespoke curation &amp; couture staging.
                  </p>
                </div>
              ))}
            </div>

            {/* Backstage / Runway Video / Visual plate integration */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/15 bg-black/90 aspect-square max-h-[500px] shadow-2xl group">
              <video
                src="/media/runway-walk.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-top opacity-95 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-oswald">
                <span className="flex items-center gap-2 tracking-[0.2em] uppercase font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Live Runway Footage
                </span>
                <span className="text-[10px] tracking-widest text-dim">960P · CHOREOGRAPHY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
