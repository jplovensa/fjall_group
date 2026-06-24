import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Technology() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      gsap.from(cards.children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="technology"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        padding: '120px clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '60px', maxWidth: '720px' }}>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.24em',
            color: '#666666',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}>
            Material Intelligence
          </p>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#000000',
            marginBottom: '20px',
          }}>
            The DNA of Permanence
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.65,
            color: '#444444',
          }}>
            We abandoned traditional masonry. Our proprietary EPS-based construction panels 
            provide elite thermal mass, acoustic deadening, and seismic resilience while 
            deploying in a fraction of standard timelines. Steel corrodes; volcanoes do not.
          </p>
        </div>

        {/* Two tech cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: '40px',
          }}
        >
          {/* GX 100 */}
          <div style={{ border: '1px solid #1a1a1a', backgroundColor: '#ffffff' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
              <img
                src="/images/gx100-panels.jpg"
                alt="GX 100 Structural Panels"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <h3 style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#000000', marginBottom: '16px' }}>
                GX 100 — The Architecture of Mass
              </h3>
              <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.65, color: '#444444', marginBottom: '24px' }}>
                Our proprietary EPS-based construction panels form the unyielding core of our system. 
                They act as an elite moisture barrier while drastically outperforming traditional masonry 
                in fire and smoke resistance. The true luxury of space is comfort — the GX-100 system 
                guarantees massive thermal mass, regulating internal temperatures passively.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  'Elite thermal mass regulation',
                  'Acoustic deadening properties',
                  'Seismic resilience built-in',
                  'Fire and smoke resistance',
                  'Prefabricated rapid deployment',
                  'Passive temperature regulation',
                ].map((feature) => (
                  <li key={feature} style={{ fontSize: '13px', color: '#666666', paddingLeft: '16px', position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#5E9E8C', fontWeight: 500 }}>+</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BEMMELS */}
          <div style={{ border: '1px solid #1a1a1a', backgroundColor: '#ffffff' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
              <img
                src="/images/bemmels-fiber.png"
                alt="BEMMELS Volcanic Fiber Beams"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <h3 style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#000000', marginBottom: '16px' }}>
                BEMMELS — Forged from Volcanoes
              </h3>
              <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.65, color: '#444444', marginBottom: '24px' }}>
                Traditional structural steel corrodes. It is heavy, logistically expensive, and carbon-intensive. 
                Fjäll Group has engineered the successor. By fusing advanced composites with basalt volcanic 
                rock fiber, we have created non-corrosive structural beams with a staggering 1:20 
                weight-to-strength ratio compared to steel.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  'Non-corrosive structural beams',
                  '1:20 weight-to-strength vs steel',
                  'Immune to coastal environments',
                  'Massive CO₂ reduction',
                  'Lighter logistics chain',
                  '100+ year lifespan',
                ].map((feature) => (
                  <li key={feature} style={{ fontSize: '13px', color: '#666666', paddingLeft: '16px', position: 'relative', lineHeight: 1.5 }}>
                    <span style={{ position: 'absolute', left: 0, color: '#5E9E8C', fontWeight: 500 }}>+</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The Bemmels Finish callout */}
        <div style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: '0',
          backgroundColor: '#0b0b0b',
          border: '1px solid #1a1a1a',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#5E9E8C', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 500 }}>
              The Monolithic Veil
            </p>
            <h3 style={{ fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#ffffff', marginBottom: '16px' }}>
              Built to last. Engineered to protect.
            </h3>
            <p style={{ fontSize: '15px', fontWeight: 300, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', maxWidth: '520px' }}>
              The Bemmels Finish is a monolithic, breathable coating that shields the 
              structural core from moisture, salt, and thermal shock. It presents a 
              unified, bespoke facade — indistinguishable from traditional masonry — 
              while concealing the rapid-build technology beneath. This is not surface-level 
              aesthetics; it is a protective barrier that extends the lifespan of every 
              Fjäll structure well beyond the century mark.
            </p>
          </div>
          <div style={{ position: 'relative', width: '100%', minHeight: '300px', overflow: 'hidden' }}>
            <video
              src="/videos/wall-panel.mp4"
              muted
              loop
              playsInline
              autoPlay
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
