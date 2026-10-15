import { portfolio, navItems } from '../data/portfolio'
import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const items = navItems()

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/10 bg-black py-10 text-paper overflow-hidden">
      <div className="wrap flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-anton text-lg tracking-wider uppercase text-paper">
            {portfolio.brand}
          </span>
          <span className="font-oswald text-[11px] uppercase tracking-[0.22em] text-dim">
            &copy; {new Date().getFullYear()} {portfolio.name} &mdash; All rights reserved
          </span>
        </div>

        {/* Center: Quick navigation links */}
        <nav className="hidden sm:flex items-center gap-6" aria-label="Footer Nav">
          {items.map(i => (
            <a
              key={i.id}
              href={`#${i.id}`}
              onClick={e => {
                e.preventDefault()
                document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-oswald text-xs uppercase tracking-[0.24em] text-dim hover:text-accent transition-colors"
            >
              {i.label}
            </a>
          ))}
        </nav>

        {/* Right: Back to Top Action */}
        <div className="flex items-center gap-4">
          <a
            href="#home"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-oswald uppercase tracking-[0.22em] text-dim hover:border-accent hover:text-paper hover:bg-accent/20 transition-all shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp size={13} className="text-accent transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
