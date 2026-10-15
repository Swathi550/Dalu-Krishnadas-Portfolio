import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems, portfolio } from '../data/portfolio'

const items = navItems()

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -40% 0px' }
    )
    items.forEach(i => {
      const el = document.getElementById(i.id)
      el && io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="wrap flex items-center justify-between gap-4">
        {/* Left: Brand mark with signature distressed finish */}
        <div className="flex items-center gap-4">
          <a href="#home" onClick={go('home')} className="flex items-center gap-2.5 group">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_#de1b1c] group-hover:scale-125 transition-transform" />
            <span className="mark-word font-anton text-xl sm:text-2xl uppercase tracking-wider">
              {portfolio.brand}
            </span>
          </a>

          <span className="hidden lg:block h-5 w-[1px] bg-white/20" aria-hidden="true" />

          {/* Director Roles - Technical uppercase micro-stack */}
          <div className="hidden lg:flex flex-col text-[8.5px] uppercase font-oswald tracking-[0.28em] text-dim leading-tight">
            <span>Fashion Director</span>
            <span className="text-white/60">Choreographer · Casting</span>
          </div>
        </div>

        {/* Center: Desktop Navigation with signature red dot active indicator */}
        <nav className="hidden md:flex items-center" aria-label="Primary">
          <ul className="flex items-center gap-6 lg:gap-8 list-none m-0 p-0">
            {items.map(i => {
              const isActive = active === i.id
              return (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    onClick={go(i.id)}
                    className={`relative block py-1 font-oswald text-xs uppercase tracking-[0.24em] transition-colors duration-300 ${
                      isActive ? 'text-paper font-semibold' : 'text-dim hover:text-paper'
                    }`}
                  >
                    {i.label}
                    {/* Animated red pip under active item */}
                    <span
                      className={`absolute left-1/2 -bottom-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_6px_#de1b1c] transition-transform duration-300 ${
                        isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Right: Technical Metadata & Inquire Action */}
        <div className="flex items-center gap-5">
          <div className="hidden xl:flex flex-col items-end gap-1">
            <span className="text-[9px] font-oswald tracking-[0.28em] uppercase text-dim">
              Runway Archive — MMXXVI
            </span>
            <div className="flex gap-1.5">
              <i className="h-1.5 w-1.5 rounded-full bg-accent opacity-90 shadow-[0_0_4px_#de1b1c]" />
              <i className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              <i className="h-1.5 w-1.5 rounded-full bg-accent/30" />
            </div>
          </div>

          <a
            href="#contact"
            onClick={go('contact')}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-black/60 px-5 py-2 text-[11px] font-oswald font-bold uppercase tracking-[0.22em] text-paper transition-all hover:border-accent hover:bg-accent hover:text-white shadow-lg backdrop-blur-sm"
          >
            <span className="relative z-10">Inquire</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 group-hover:bg-white transition-colors animate-pulse" />
          </a>

          {/* Mobile hamburger toggle */}
          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-paper md:hidden hover:border-accent transition-colors"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X size={20} className="text-accent" /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[68px] bottom-0 bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 md:hidden flex flex-col justify-between overflow-y-auto animate-fadeIn"
        >
          <div className="space-y-6">
            <p className="font-oswald text-[10px] tracking-[0.35em] uppercase text-accent font-bold">
              ••• Navigation •••
            </p>
            <ul className="space-y-4">
              {items.map(i => (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    onClick={go(i.id)}
                    className="flex items-center justify-between border-b border-white/10 py-3 font-anton text-2xl uppercase tracking-wider text-paper hover:text-accent transition-colors"
                  >
                    <span>{i.label}</span>
                    <span className="text-xs font-oswald text-dim">0{items.indexOf(i) + 1}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-3">
            <p className="text-xs font-oswald tracking-[0.22em] uppercase text-dim">
              {portfolio.tagline}
            </p>
            <p className="text-[11px] font-oswald text-white/50 tracking-wider">
              {portfolio.location}
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
