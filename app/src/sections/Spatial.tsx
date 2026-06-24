import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Spatial() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    if (!section || !content) return

    const ctx = gsap.context(() => {
      gsap.from(content.children, {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: 'power3.out',
        delay: 0.4,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  return (
    <section
      id="spatial"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        backgroundColor: '#0b0b0b',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 'clamp(16px, 3vh, 28px)',
          paddingTop: 'clamp(100px, 14vh, 140px)',
          paddingBottom: 'clamp(40px, 6vh, 80px)',
          paddingLeft: 'clamp(20px, 4.5vw, 72px)',
          paddingRight: 'clamp(20px, 4.5vw, 72px)',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(9px, 1.2vw, 11px)',
            fontWeight: 500,
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
          }}
        >
          Proven Heritage,Elevated Execution
        </span>

        <h1
          style={{
            fontSize: 'clamp(36px, 7vw, 108px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.02,
            color: '#ffffff',
            maxWidth: '920px',
            textShadow: '0 2px 24px rgba(0,0,0,0.25)',
          }}
        >
          Next Decade Development
        </h1>

        <div
          style={{
            maxWidth: '560px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.92)',
          }}>
            We build structures that outlast the century. Engineered for permanence. Deployed at speed.
          </p>
          <p style={{
            fontSize: 'clamp(14px, 1.2vw, 18px)',
            fontWeight: 400,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.85)',
          }}>
            Proprietary EPS modular technology, volcanic fiber reinforcement, and a monolithic finishing system. From luxury coastal villas to mass-scale housing — one integrated partner from blueprint to handover.
          </p>
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginTop: '4px',
          }}>
            {['Thermal comfort', 'Acoustic isolation', 'Seismic resilience', 'Zero corrosion'].map((tag) => (
              <span key={tag} style={{
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: '#5E9E8C',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '4px', flexWrap: 'wrap' }}>
          <button
            onClick={() => document.querySelector('#philosophy')?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              fontSize: 'clamp(11px, 1vw, 13px)',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: hovered ? '#0b0b0b' : '#ffffff',
              backgroundColor: hovered ? '#ffffff' : 'transparent',
              border: '1px solid #ffffff',
              padding: 'clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 36px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
            }}
          >
            Our Story
          </button>
          <button
            onClick={() => document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontSize: 'clamp(11px, 1vw, 13px)',
              fontWeight: 500,
              letterSpacing: '0.14em',
              color: '#ffffff',
              backgroundColor: 'transparent',
              border: 'none',
              padding: 'clamp(12px, 1.5vw, 16px) 8px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", sans-serif',
              textDecoration: 'underline',
              textUnderlineOffset: '6px',
            }}
          >
            View Portfolio →
          </button>
        </div>
      </div>
    </section>
  )
}
