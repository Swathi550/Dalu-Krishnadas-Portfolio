import { useRef, useState } from 'react'
import { ArrowUpRight, Mail, Phone, Instagram, Linkedin, Copy, Check } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)
  const [copied, setCopied] = useState(false)

  const c = portfolio.contact as {
    headline: string
    email?: string
    phone?: string
    linkedin?: string
    instagram?: string
  }

  const copyEmail = () => {
    if (!c.email) return
    navigator.clipboard.writeText(c.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      ref={ref}
      id="contact"
      className="relative border-t border-white/10 bg-[#050507] py-28 md:py-44 text-paper overflow-hidden select-none"
    >
      {/* Background grain and atmospheric crimson furnace glow */}
      <div className="film-grain" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[min(1000px,100vw)] h-[min(600px,80vw)] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(222,27,28,0.22)_0%,_rgba(150,15,20,0.1)_45%,_transparent_75%)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Section Header */}
        <header className="mb-14 md:mb-20 max-w-4xl" data-reveal>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/15 bg-black/60 text-[10px] sm:text-xs font-oswald font-bold tracking-[0.28em] uppercase text-accent mb-5 shadow-md">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Scene 06 — The Finale &amp; Inquiries</span>
          </div>

          <h2 className="font-anton text-[clamp(2.6rem,7.5vw,6.5rem)] font-normal leading-[0.92] tracking-tight uppercase text-paper">
            THE CLOSING <br />
            <span className="mark-word">FINALE</span>
          </h2>

          <p className="mt-4 font-bodoni text-lg sm:text-2xl text-[#b8b8b8] tracking-wide max-w-2xl">
            {c.headline}<span className="text-accent">.</span>
          </p>
        </header>

        {/* Cinematic Finale Stage: Giant Typography + Silhouette + Editorial Captions */}
        <div
          className="relative my-8 rounded-3xl border border-white/15 bg-black/80 p-8 md:p-14 overflow-hidden shadow-2xl backdrop-blur-md min-h-[480px] flex flex-col justify-between"
          data-reveal
        >
          {/* Corner Editorial Captions (Signature Reference Finale Details) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="font-oswald text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-dim leading-relaxed">
              <span>Ideas · Designs · Runways</span> <br />
              <span className="text-accent font-bold">Real Impact</span>
            </div>

            <div className="text-left sm:text-right font-oswald text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-dim leading-relaxed">
              <span>Same Passion</span> <br />
              <span className="text-amber-300 font-bold">A Brighter Tomorrow</span>
            </div>
          </div>

          {/* Centerpiece: Giant Distressed Wordmark with Director Silhouette */}
          <div className="relative my-10 flex flex-col items-center justify-center text-center">
            <h3 className="mark-word font-anton text-[clamp(3.5rem,14vw,12rem)] font-normal leading-[0.85] tracking-tighter uppercase opacity-80 pointer-events-none">
              DALU
            </h3>
            <blockquote className="mt-4 max-w-xl font-bodoni text-lg sm:text-2xl italic text-[#f4e9dc] tracking-wide leading-relaxed">
              &ldquo;Movement is the silent dialogue of high fashion.&rdquo;
            </blockquote>
            <p className="mt-2 font-oswald text-[11px] uppercase tracking-[0.35em] text-accent font-bold">
              — Dalu Krishnadas · Fashion Director
            </p>
          </div>

          {/* Bottom Editorial Captions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div className="font-oswald text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-dim">
              A Director&rsquo;s World
            </div>

            <div className="text-left sm:text-right font-oswald text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-dim">
              Direct · Choreograph · Inspire · Repeat
            </div>
          </div>
        </div>

        {/* Functional Contact Cards Grid (Real Info, Verified Links) */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {/* Email Card */}
          {c.email && (
            <div className="group relative rounded-2xl border border-white/15 bg-black/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(222,27,28,0.25)]">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 text-accent">
                  <Mail size={18} />
                </div>
                <button
                  onClick={copyEmail}
                  title="Copy email address"
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-dim hover:text-white hover:border-white/30 transition-colors"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              <p className="mt-4 font-oswald text-[10px] uppercase tracking-[0.25em] text-dim">
                Direct Email
              </p>
              <a
                href={`mailto:${c.email}`}
                className="mt-1 block font-oswald text-sm font-bold text-paper hover:text-accent transition-colors truncate"
              >
                {c.email}
              </a>
            </div>
          )}

          {/* Phone Card */}
          {c.phone && (
            <div className="group relative rounded-2xl border border-white/15 bg-black/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(222,27,28,0.25)]">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
                  <Phone size={18} />
                </div>
                <ArrowUpRight size={16} className="text-dim group-hover:text-accent transition-colors" />
              </div>

              <p className="mt-4 font-oswald text-[10px] uppercase tracking-[0.25em] text-dim">
                Phone &amp; WhatsApp
              </p>
              <a
                href={`tel:${c.phone}`}
                className="mt-1 block font-oswald text-sm font-bold text-paper hover:text-accent transition-colors"
              >
                {c.phone}
              </a>
            </div>
          )}

          {/* Instagram Card */}
          {c.instagram && (
            <div className="group relative rounded-2xl border border-white/15 bg-black/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(222,27,28,0.25)]">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300">
                  <Instagram size={18} />
                </div>
                <ArrowUpRight size={16} className="text-dim group-hover:text-accent transition-colors" />
              </div>

              <p className="mt-4 font-oswald text-[10px] uppercase tracking-[0.25em] text-dim">
                Instagram Runway
              </p>
              <a
                href={c.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block font-oswald text-sm font-bold text-paper hover:text-accent transition-colors"
              >
                @dalu_krishnadas
              </a>
            </div>
          )}

          {/* LinkedIn Card */}
          {c.linkedin && (
            <div className="group relative rounded-2xl border border-white/15 bg-black/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-accent hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(222,27,28,0.25)]">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300">
                  <Linkedin size={18} />
                </div>
                <ArrowUpRight size={16} className="text-dim group-hover:text-accent transition-colors" />
              </div>

              <p className="mt-4 font-oswald text-[10px] uppercase tracking-[0.25em] text-dim">
                Professional Network
              </p>
              <a
                href={c.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block font-oswald text-sm font-bold text-paper hover:text-accent transition-colors"
              >
                in/dalu-krishnadas
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
