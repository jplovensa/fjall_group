import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: 'Genesis', title: 'Anders Ahman', desc: 'Swedish engineer develops proprietary EPS modular technology in Bali, establishing the foundation of high-speed construction.' },
  { year: 'Breakthrough', title: 'BEMMELS Forged', desc: 'Development and successful testing of volcanic rock fiber beams, achieving a 1:20 weight-to-strength ratio against steel.' },
  { year: '2025', title: 'Scale & Acquisition', desc: 'A consortium led by Christian Daley unifies GreenShift with Fjäll Green Tech to form the Fjäll Group.' },
  { year: 'Today', title: 'Pan-Asia Execution', desc: 'Securing multi-million dollar commissions and rapidly expanding deployment across Pan-Asia and Australasia.' },
]

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.eco-title', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 70%', once: true } })
      gsap.from('.engine-card', { y: 40, opacity: 0, stagger: 0.2, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 55%', once: true } })
      gsap.from('.milestone', { y: 30, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 30%', once: true } })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0b0b0b',
        padding: 'clamp(100px, 12vw, 160px) clamp(20px, 4vw, 60px)',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/ecosystem.mp4"
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
          zIndex: 0,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section header */}
        <div className="eco-title" style={{ marginBottom: '60px', maxWidth: '800px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.24em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '18px' }}>
            The Ecosystem
          </p>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1, color: '#ffffff', marginBottom: '24px' }}>
            The Dual-Engine Advantage
          </h2>
          <p style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)', maxWidth: '640px' }}>
            Today, we pair proven technological heritage with our in-house mastermind, GreenShift. 
            GreenShift orchestrates the entire lifecycle — design and turnkey execution from inception 
            to the monolithic finish. Meanwhile, Fjäll Green Tech provides the physical materials and 
            mass-scale projects: the executors of permanence.
          </p>
        </div>

        {/* Two Engine Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '2px',
          backgroundColor: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.12)',
          marginBottom: '80px',
        }}>
          {/* GreenShift */}
          <div className="engine-card" style={{ backgroundColor: 'rgba(11,11,11,0.6)', padding: '40px 36px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#5E9E8C', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 500 }}>
              The Mind
            </p>
            <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '16px' }}>
              GreenShift
            </h3>
            <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', marginBottom: '24px' }}>
              GreenShift is the operational command layer. It orchestrates the entire 
              project lifecycle — from initial design and capital alignment through to 
              the monolithic finish. By unifying design intelligence with financial 
              architecture, GreenShift eliminates the fragmentation that plagues 
              traditional construction, delivering turnkey execution at scale.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Financial Allocation', 'Design & Turnkey Execution', 'Capital Deployment', 'Lifecycle Orchestration'].map(item => (
                <li key={item} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', paddingLeft: '16px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#5E9E8C' }}>+</span>{item}
                </li>
              ))}
            </ul>
          </div>

          {/* Fjäll Green Tech */}
          <div className="engine-card" style={{ backgroundColor: 'rgba(11,11,11,0.6)', padding: '40px 36px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#5E9E8C', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 500 }}>
              The Muscle
            </p>
            <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em', color: '#ffffff', marginBottom: '16px' }}>
              Fjäll Green Tech
            </h3>
            <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', marginBottom: '24px' }}>
              Fjäll Green Tech owns the material layer. We manufacture and deploy 
              the proprietary GX 100 panels and BEMMELS volcanic fiber beams at 
              institutional scale. From prefabrication to final sealing, we control 
              the physical build — ensuring every structure meets the standard of 
              permanence that defines the Fjäll name.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['GX 100 EPS Panels', 'BEMMELS Volcanic Fiber', 'Mass-Scale Production', 'Physical Material Deployment'].map(item => (
                <li key={item} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', paddingLeft: '16px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#5E9E8C' }}>+</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Delivery Promise */}
        <div style={{
          padding: '48px 40px',
          border: '1px solid rgba(255,255,255,0.18)',
          backgroundColor: 'rgba(11,11,11,0.5)',
        }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#5E9E8C', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 500 }}>
            The Delivery Promise
          </p>
          <h3 style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#ffffff', marginBottom: '16px' }}>
            Elite thermal mass. Acoustic isolation. Monolithic finish.
          </h3>
          <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', maxWidth: '800px' }}>
            By choosing Fjäll Group, you are securing a turnkey delivery system 
            that presents a unified, bespoke facade in a fraction of traditional 
            timelines. One integrated partner from blueprint to handover.
          </p>
        </div>
      </div>
    </section>
  )
}
