import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { projects } from '../../data/projects'
import ProjectModal from '../../sections/ProjectModal'

const milestones = [
  { label: 'Design', status: 'complete', date: 'Jan 2026' },
  { label: 'Fabrication', status: 'complete', date: 'Mar 2026' },
  { label: 'Foundation', status: 'in-progress', date: 'May 2026' },
  { label: 'Panel Erection', status: 'pending', date: 'Jul 2026' },
  { label: 'Sealing', status: 'pending', date: 'Sep 2026' },
  { label: 'Handover', status: 'pending', date: 'Nov 2026' },
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.proj-card', { y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.2 })
    }, sectionRef.current)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} style={{ padding: 'clamp(80px, 10vw, 100px) clamp(20px, 4vw, 60px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.24em',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          My Projects
        </p>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: '#ffffff',
          marginBottom: '16px',
        }}>
          Active Developments
        </h1>
        <p style={{
          fontSize: '14px',
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '520px',
        }}>
          Track every phase of your Fjäll project — from material fabrication 
          to final handover. Real-time updates on your build timeline.
        </p>
      </div>

      {/* Milestone tracker */}
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '32px',
        marginBottom: '48px',
      }}>
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.24em',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          marginBottom: '28px',
        }}>
          Build Milestones — Nuanu Creative City
        </p>

        <div style={{
          display: 'flex',
          gap: '0',
          overflowX: 'auto',
          paddingBottom: '16px',
        }}>
          {milestones.map((ms, i) => (
            <div
              key={ms.label}
              style={{
                flex: '1 0 100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                position: 'relative',
              }}
            >
              {/* Connector line */}
              {i > 0 && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '-50%',
                  width: '100%',
                  height: '2px',
                  backgroundColor: ms.status === 'complete' ? '#5E9E8C' : 'rgba(255,255,255,0.1)',
                  zIndex: 0,
                }} />
              )}

              {/* Dot */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: ms.status === 'complete' ? '#5E9E8C' : ms.status === 'in-progress' ? '#0b0b0b' : 'rgba(255,255,255,0.08)',
                border: ms.status === 'in-progress' ? '2px solid #5E9E8C' : ms.status === 'complete' ? '2px solid #5E9E8C' : '2px solid rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}>
                {ms.status === 'complete' && <span style={{ color: '#ffffff', fontSize: '12px' }}>✓</span>}
                {ms.status === 'in-progress' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#5E9E8C' }} />}
              </div>

              <span style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: ms.status === 'complete' || ms.status === 'in-progress' ? '#ffffff' : 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
                {ms.label}
              </span>
              <span style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.3)',
                textAlign: 'center',
              }}>
                {ms.date}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Project cards */}
      <p style={{
        fontSize: '11px',
        letterSpacing: '0.24em',
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}>
        All Projects
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        gap: '16px',
      }}>
        {projects.map((project) => (
          <div
            key={project.id}
            className="proj-card"
            onClick={() => setActiveProjectId(project.id)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.12)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#5E9E8C'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
            }}
          >
            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
              <img
                src={project.img}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <p style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#5E9E8C', textTransform: 'uppercase', marginBottom: '6px' }}>
                    {project.id} // {project.materialFocus}
                  </p>
                  <p style={{ fontSize: '18px', fontWeight: 500, color: '#ffffff', letterSpacing: '-0.01em' }}>
                    {project.title}
                  </p>
                </div>
                <p style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
                  {project.value}
                </p>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
                {project.location} {project.architect ? `· ${project.architect}` : ''}
              </p>

              {/* Progress bar */}
              <div style={{
                width: '100%',
                height: '3px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                marginBottom: '8px',
              }}>
                <div style={{
                  width: `${parseInt(project.id) <= 2 ? 65 : parseInt(project.id) <= 4 ? 30 : 15}%`,
                  height: '100%',
                  backgroundColor: '#5E9E8C',
                  transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                  {parseInt(project.id) <= 2 ? 'In Progress' : parseInt(project.id) <= 4 ? 'Planning' : 'Queued'}
                </span>
                <span style={{ fontSize: '11px', color: '#5E9E8C' }}>
                  {parseInt(project.id) <= 2 ? '65%' : parseInt(project.id) <= 4 ? '30%' : '15%'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal projectId={activeProjectId} onClose={() => setActiveProjectId(null)} />
    </div>
  )
}
