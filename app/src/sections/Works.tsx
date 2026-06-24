import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, productTiers } from '../data/projects'
import ProjectModal from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export default function Works() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const [activeTier, setActiveTier] = useState<string | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.tier-card', { y: 60, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 70%', once: true } })
      gsap.from('.work-item', { y: 80, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: gridRef.current, start: 'top 75%', once: true } })
    }, section)

    return () => ctx.revert()
  }, [])

  const filteredProjects = activeTier
    ? projects.filter(p => p.category === activeTier)
    : projects

  return (
    <>
      <section
        id="works"
        ref={sectionRef}
        style={{ backgroundColor: '#f4f4f5', padding: '120px clamp(20px, 4vw, 60px)' }}
      >
        <div style={{ maxWidth: '1560px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            marginBottom: '60px',
            borderBottom: '1px solid #1a1a1a',
            paddingBottom: '20px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <h2 style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#000000',
              }}>
                The Executed Portfolio
              </h2>
              <span style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#666666', textTransform: 'uppercase' }}>
                The Product Spectrum
              </span>
            </div>
            <p style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              fontWeight: 300,
              lineHeight: 1.65,
              color: '#444444',
              maxWidth: '800px',
            }}>
              Our proprietary MMC technology scales flawlessly, ensuring structural integrity
              remains uncompromised whether addressing high-volume shortages or executing
              million-dollar monuments. We categorise our capabilities across three distinct
              architectural tiers.
            </p>
          </div>

          {/* Three Tier Headers - Cinematic Aerial */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '60px' }}>
            {/* 01 - Mass Scale */}
            <div
              className="tier-card"
              onClick={() => setActiveTier(activeTier === 'Fjäll Affordable Development' ? null : 'Fjäll Affordable Development')}
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(280px, 35vw, 420px)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: activeTier === 'Fjäll Affordable Development' ? '2px solid #5E9E8C' : '1px solid #1a1a1a',
                transition: 'border-color 0.3s ease',
              }}
            >
              <video
                src="/videos/tier-affordable.mp4"
                muted
                loop
                playsInline
                autoPlay
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 'clamp(20px, 3vw, 40px)', left: 'clamp(20px, 3vw, 40px)', right: 'clamp(20px, 3vw, 40px)', zIndex: 2 }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#5E9E8C', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 500 }}>01</p>
                <h3 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '8px', lineHeight: 1.1 }}>Mass Scale</h3>
                <p style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(255,255,255,0.8)', maxWidth: '480px', lineHeight: 1.5 }}>Rapid-deployment housing. Government commissions. Disaster-resilient units at unprecedented scale.</p>
              </div>
            </div>

            {/* 02 - Commercial & Modular */}
            <div
              className="tier-card"
              onClick={() => setActiveTier(activeTier === 'Commercial & Modular' ? null : 'Commercial & Modular')}
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(280px, 35vw, 420px)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: activeTier === 'Commercial & Modular' ? '2px solid #5E9E8C' : '1px solid #1a1a1a',
                transition: 'border-color 0.3s ease',
              }}
            >
              <video
                src="/videos/tier-commercial.mp4"
                muted
                loop
                playsInline
                autoPlay
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 'clamp(20px, 3vw, 40px)', left: 'clamp(20px, 3vw, 40px)', right: 'clamp(20px, 3vw, 40px)', zIndex: 2 }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#5E9E8C', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 500 }}>02</p>
                <h3 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '8px', lineHeight: 1.1 }}>Commercial &amp; Modular</h3>
                <p style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(255,255,255,0.8)', maxWidth: '480px', lineHeight: 1.5 }}>Eco-resorts. B2B assets. Extreme climate adaptability from tropics to alpine.</p>
              </div>
            </div>

            {/* 03 - Bespoke & High-End */}
            <div
              className="tier-card"
              onClick={() => setActiveTier(activeTier === 'High-End Luxury Bespoke' ? null : 'High-End Luxury Bespoke')}
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(280px, 35vw, 420px)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: activeTier === 'High-End Luxury Bespoke' ? '2px solid #5E9E8C' : '1px solid #1a1a1a',
                transition: 'border-color 0.3s ease',
              }}
            >
              <video
                src="/videos/tier-bespoke.mp4"
                muted
                loop
                playsInline
                autoPlay
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 'clamp(20px, 3vw, 40px)', left: 'clamp(20px, 3vw, 40px)', right: 'clamp(20px, 3vw, 40px)', zIndex: 2 }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.24em', color: '#5E9E8C', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 500 }}>03</p>
                <h3 style={{ fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.03em', color: '#ffffff', marginBottom: '8px', lineHeight: 1.1 }}>Bespoke &amp; High-End</h3>
                <p style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', color: 'rgba(255,255,255,0.8)', maxWidth: '480px', lineHeight: 1.5 }}>Uncompromising architectural ambition. Coastal villas. Monolithic luxury finish.</p>
              </div>
            </div>
          </div>

          {/* Filter indicator */}
          {activeTier && (
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '12px', letterSpacing: '0.1em', color: '#666666', textTransform: 'uppercase' }}>
                Showing: {activeTier}
              </span>
              <button
                onClick={() => setActiveTier(null)}
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#5E9E8C',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                }}
              >
                Show All
              </button>
            </div>
          )}

          {/* Project Grid */}
          <div
            ref={gridRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '2px',
            }}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setActiveProjectId(project.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <ProjectModal projectId={activeProjectId} onClose={() => setActiveProjectId(null)} />
    </>
  )
}

function ProjectCard({
  project,
  onClick,
}: {
  project: typeof projects[0]
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      className="work-item"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '1px solid #000000',
        backgroundColor: '#ffffff',
        padding: 0,
        display: 'block',
        cursor: 'pointer',
        position: 'relative',
        fontFamily: 'inherit',
        textAlign: 'left',
      }}
    >
      {/* Image - using img tag for reliability */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', overflow: 'hidden', backgroundColor: '#e5e5e5' }}>
        <img
          src={project.img}
          alt={project.title}
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none',
        }} />
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          backgroundColor: '#0b0b0b', color: '#5E9E8C',
          padding: '4px 10px', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
        }}>
          {project.category}
        </div>
      </div>
      {/* Info bar */}
      <div style={{ padding: '20px 24px', borderTop: '1px solid #000000' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px', flexWrap: 'wrap' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#666666', textTransform: 'uppercase' }}>
                {project.id} &middot; {project.client}
              </p>
              <p style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#5E9E8C', textTransform: 'uppercase' }}>
                {project.value}
              </p>
            </div>
            <p style={{ fontSize: '18px', fontWeight: 500, color: '#000000', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
              {project.title}
            </p>
            <p style={{ fontSize: '13px', color: '#666666', marginTop: '4px' }}>
              {project.location}
            </p>
          </div>
        </div>
      </div>
    </button>
  )
}
