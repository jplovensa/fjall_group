import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hubs = [
  {
    id: '01',
    name: 'Indonesia HQ',
    role: 'Global Headquarters',
    detail: 'Jl. Sunset Road No 777, Bali 80361, Indonesia',
    phone: '+62 812-3753-5508',
  },
  {
    id: '02',
    name: 'Indonesia Commercial',
    role: 'Commercial Office',
    detail: 'Menara Cakrawala 12th Floor 5A, Jl MH Thamrin Kav 9, Jakarta Pusat',
    phone: '+62 877-860-10290',
  },
  {
    id: '03',
    name: 'Japan HQ',
    role: 'R&D & Design Centre',
    detail: '2-chome-6-11 Daimyo, Chuo Ward, Fukuoka, 810-0041, Japan',
    phone: '+81 90-8348-8068',
  },
]

const principles = [
  { label: 'Swedish Engineering', desc: 'Uncompromising structural integrity and material science forming the core of our EPS modular systems.' },
  { label: 'Japanese Precision', desc: 'Absolute accuracy in off-site manufacturing to eliminate on-site errors and guarantee flawless quality.' },
  { label: 'Indonesian Scalability', desc: 'High-volume, rapid production models allowing us to meet the demands of million-dollar projects and global housing crises alike.' },
  { label: 'Environmental Symbiosis', desc: 'Respecting the landscape by utilizing low-carbon footprint materials and highly efficient delivery methods.' },
]

export default function Hubs() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current
    if (!section || !cards) return

    const ctx = gsap.context(() => {
      gsap.from('.hub-card', { y: 50, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 75%', once: true } })
      gsap.from('.principle-item', { y: 30, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 50%', once: true } })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hubs"
      ref={sectionRef}
      style={{
        backgroundColor: '#0b0b0b',
        padding: '100px clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Section header */}
        <div style={{ marginBottom: '60px', maxWidth: '720px' }}>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            marginBottom: '18px',
          }}>
            Global Presence
          </p>
          <h2 style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#ffffff',
            marginBottom: '20px',
          }}>
            The Hubs
          </h2>
          <p style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'rgba(255,255,255,0.7)',
          }}>
            A unique global synthesis: combining uncompromising Swedish engineering, 
            Japanese precision manufacturing, and highly scalable Indonesian production.
          </p>
        </div>

        {/* Hub cards */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2px',
            backgroundColor: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.18)',
            marginBottom: '80px',
          }}
        >
          {hubs.map((hub) => (
            <div
              key={hub.id}
              className="hub-card"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)', fontVariantNumeric: 'tabular-nums' }}>
                  {hub.id}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.18em', color: '#5E9E8C', textTransform: 'uppercase' }}>
                  {hub.role}
                </span>
              </div>
              <h3 style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.2, color: '#ffffff' }}>
                {hub.name}
              </h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)', margin: 0 }}>
                {hub.detail}
              </p>
              <p style={{ fontSize: '13px', color: '#5E9E8C', letterSpacing: '0.05em' }}>
                {hub.phone}
              </p>
            </div>
          ))}
        </div>

        {/* Core Principles */}
        <div>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: '28px',
            fontWeight: 500,
          }}>
            Core Principles
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '2px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {principles.map((p) => (
              <div
                key={p.label}
                className="principle-item"
                style={{
                  backgroundColor: 'rgba(17,17,17,0.7)',
                  padding: '28px 24px',
                }}
              >
                <h4 style={{ fontSize: '15px', fontWeight: 500, color: '#ffffff', marginBottom: '10px', letterSpacing: '0.02em' }}>
                  {p.label}
                </h4>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
