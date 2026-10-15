import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../hooks/useReducedMotion'

interface DaluWalkingProps {
  className?: string
  isWalking?: boolean
}

export default function DaluWalking({
  className = '',
  isWalking = true,
}: DaluWalkingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const figureRef = useRef<HTMLImageElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !figureRef.current || !shadowRef.current) return

    // Natural runway walking stride cadence:
    // With each step forward: vertical hip heave, lateral weight shift, foot-strike shadow pulse
    const walkTimeline = gsap.timeline({ repeat: -1, paused: !isWalking })

    // Step 1: Left foot stride
    walkTimeline
      .to(figureRef.current, {
        y: -10,
        x: -5,
        rotateZ: -0.8,
        duration: 0.28,
        ease: 'power1.out',
      })
      .to(
        shadowRef.current,
        {
          scaleX: 1.08,
          x: -6,
          opacity: 0.9,
          duration: 0.28,
          ease: 'power1.out',
        },
        '<'
      )
      .to(figureRef.current, {
        y: 0,
        x: 0,
        rotateZ: 0,
        duration: 0.28,
        ease: 'power1.in',
      })
      .to(
        shadowRef.current,
        {
          scaleX: 0.94,
          x: 0,
          opacity: 0.75,
          duration: 0.28,
          ease: 'power1.in',
        },
        '<'
      )
      // Step 2: Right foot stride
      .to(figureRef.current, {
        y: -10,
        x: 5,
        rotateZ: 0.8,
        duration: 0.28,
        ease: 'power1.out',
      })
      .to(
        shadowRef.current,
        {
          scaleX: 1.08,
          x: 6,
          opacity: 0.9,
          duration: 0.28,
          ease: 'power1.out',
        },
        '<'
      )
      .to(figureRef.current, {
        y: 0,
        x: 0,
        rotateZ: 0,
        duration: 0.28,
        ease: 'power1.in',
      })
      .to(
        shadowRef.current,
        {
          scaleX: 0.94,
          x: 0,
          opacity: 0.75,
          duration: 0.28,
          ease: 'power1.in',
        },
        '<'
      )

    return () => {
      walkTimeline.kill()
    }
  }, [isWalking])

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-end ${className}`}
    >
      {/* Subtle crimson rim light reflection responding to typography behind him */}
      <div
        className="absolute inset-0 bg-radial from-accent/25 via-transparent to-transparent blur-2xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Dalu walking character: animated walk cycle (striding steps) */}
      <picture>
        <source srcSet="/media/dalu-walking.webp" type="image/webp" />
        <img
          ref={figureRef}
          src="/media/dalu-walking.png"
          alt="Dalu Krishnadas — Fashion Director"
          width={896}
          height={1200}
          className="w-full h-auto max-h-[60vh] sm:max-h-[66vh] object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
          loading="eager"
          draggable="false"
        />
      </picture>

      {/* Dynamic contact shadow beneath shoes pulsing with walk steps */}
      <div
        ref={shadowRef}
        className="char-shadow -mt-4 sm:-mt-6 h-8 w-[84%] rounded-[100%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.95)_0%,_rgba(0,0,0,0.6)_40%,_transparent_75%)] blur-md pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}
