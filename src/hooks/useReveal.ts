import { useLayoutEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './useReducedMotion'
gsap.registerPlugin(ScrollTrigger)
/** Fades/slides up every [data-reveal] inside ref when scrolled into view. Cleans up on unmount. */
export function useReveal(ref: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el =>
        gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } }))
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el =>
        gsap.to(el, { yPercent: -8, ease: 'none', scrollTrigger: { trigger: el, scrub: true } }))
    }, ref)
    return () => ctx.revert()
  }, [ref])
}
