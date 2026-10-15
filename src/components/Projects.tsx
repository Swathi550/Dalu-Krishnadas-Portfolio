import { useRef, useState } from 'react'
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react'
import { portfolio, type Project } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const isEven = i % 2 === 1

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion() || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -(y * 12), y: x * 12 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <article
      className="group relative grid items-center gap-10 border-t border-white/10 py-16 md:grid-cols-12 md:gap-16 md:py-28 perspective-1200"
      data-reveal
    >
      {/* Visual Showcase Card with 3D Depth, Floating, and Pointer Tilt */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`md:col-span-7 ${isEven ? 'md:order-2' : ''}`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/15 bg-black/80 shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-500 group-hover:border-accent/60 group-hover:shadow-[0_30px_70px_rgba(222,27,28,0.3)]">
          {/* Ambient rim glow inside card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

          {p.image ? (
            <img
              src={p.image}
              alt={`${p.title} production showcase`}
              loading="lazy"
              width={1600}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center border border-dashed border-white/20 bg-dark">
              <span className="font-oswald text-xs uppercase tracking-widest text-dim">
                Showcase Visual
              </span>
            </div>
          )}

          {/* Floating Index Watermark on Image */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-3.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-anton text-xs text-paper tracking-widest">
              PROJ 0{i + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Content Column */}
      <div className={`md:col-span-5 ${isEven ? 'md:order-1' : ''}`}>
        {/* Technical Label Chip */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/75 px-4 py-1.5 text-xs font-oswald font-bold uppercase tracking-wider text-paper shadow-md backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_#ffa03c]" />
          <span className="text-amber-300 font-anton text-sm tracking-widest">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-white/40">|</span>
          <span className="text-white tracking-widest text-[11px]">Runway Production</span>
        </div>

        {/* Project Title */}
        <h3 className="mt-4 font-anton text-[clamp(2rem,4vw,3.6rem)] leading-tight tracking-tight uppercase text-paper group-hover:text-accent transition-colors">
          {p.title}
        </h3>

        {/* Brief, Overview, My Role, Impact (Bold Headings Preserved) */}
        <dl className="mt-6 space-y-4.5 text-[15px] leading-relaxed">
          <div>
            <dt className="text-base font-bold text-paper font-oswald tracking-wide uppercase">
              Brief
            </dt>
            <dd className="mt-1 text-[#b0b0b0] font-sans leading-relaxed">{p.problem}</dd>
          </div>

          <div>
            <dt className="text-base font-bold text-paper font-oswald tracking-wide uppercase">
              Overview
            </dt>
            <dd className="mt-1 text-[#b0b0b0] font-sans leading-relaxed">{p.overview}</dd>
          </div>

          <div>
            <dt className="text-base font-bold text-paper font-oswald tracking-wide uppercase">
              My Role
            </dt>
            <dd className="mt-1 text-[#b0b0b0] font-sans leading-relaxed">{p.contribution}</dd>
          </div>

          {p.results && (
            <div>
              <dt className="text-base font-bold text-amber-300 font-oswald tracking-wide uppercase flex items-center gap-2">
                <Sparkles size={14} className="text-amber-400" />
                Impact
              </dt>
              <dd className="mt-1 text-[#cfcfcf] font-medium font-sans leading-relaxed">
                {p.results}
              </dd>
            </div>
          )}
        </dl>

        {/* Stack Chips */}
        <ul className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s, sIdx) => {
            const stackStyles = [
              'bg-accent/15 border-accent/40 text-rose-300',
              'bg-amber-500/15 border-amber-500/40 text-amber-200',
              'bg-white/10 border-white/25 text-white/90',
            ]
            const chipStyle = stackStyles[sIdx % stackStyles.length]
            return (
              <li
                key={s}
                className={`border px-3.5 py-1 rounded-full text-[11px] font-oswald font-bold uppercase tracking-wider shadow-xs backdrop-blur-xs ${chipStyle}`}
              >
                {s}
              </li>
            )
          })}
        </ul>

        {/* Working Links */}
        {(p.live || p.source) && (
          <div className="mt-7 flex flex-wrap items-center gap-4">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex min-h-[44px] items-center gap-2 rounded-full border border-accent bg-accent px-6 py-2.5 text-xs font-oswald font-bold uppercase tracking-widest text-white transition-all hover:bg-accent-hot hover:scale-[1.03] shadow-[0_0_18px_rgba(222,27,28,0.4)]"
              >
                <span>View Showcase</span>
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </a>
            )}
            {p.source && (
              <a
                href={p.source}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-black/40 px-6 py-2.5 text-xs font-oswald font-semibold uppercase tracking-widest text-paper transition-colors hover:border-accent hover:text-accent backdrop-blur-sm"
              >
                <span>Details</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  if (!portfolio.projects.length) return null

  return (
    <section
      ref={ref}
      id="work"
      className="relative border-t border-white/10 bg-[#060505] py-28 md:py-44 text-paper overflow-hidden"
    >
      {/* Background grain texture and plate reflection */}
      <div className="film-grain" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(900px,95vw)] h-[min(900px,95vw)] rounded-full bg-[radial-gradient(circle,_rgba(222,27,28,0.08)_0%,_transparent_70%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Section Header (Scene 04 - Project Universe) */}
        <header className="mb-14 md:mb-20 max-w-4xl" data-reveal>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 text-[10px] sm:text-xs font-oswald font-bold tracking-[0.28em] uppercase text-accent mb-5 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Scene 04 — Selected Projects</span>
          </div>

          <h2 className="font-anton text-[clamp(2.5rem,7.5vw,6.5rem)] font-normal leading-[0.92] tracking-tight uppercase text-paper">
            THE RUNWAY <br />
            <span className="mark-word">UNIVERSE</span>
          </h2>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <p className="font-oswald text-xs sm:text-sm uppercase tracking-[0.3em] text-dim">
              High Fashion · Runway Choreography · Stage Architecture
            </p>
            <p className="hidden md:block font-oswald text-xs uppercase tracking-[0.3em] text-accent/80 font-bold">
              Scroll · Explore · Interact ↗
            </p>
          </div>
        </header>

        {/* Interactive 3D Projects List */}
        <div className="mt-12 space-y-4">
          {portfolio.projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
