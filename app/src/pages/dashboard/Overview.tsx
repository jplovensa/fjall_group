import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { projects } from '../../data/projects'

const stats = [
  { label: 'Active Projects', value: '2', detail: 'In progress' },
  { label: 'EPS Panels Deployed', value: '12,400', detail: 'Units manufactured' },
  { label: 'Timeline Saved', value: '68%', detail: 'vs traditional build' },
  { label: 'CO₂ Reduction', value: '14,200t', detail: 'Carbon offset' },
]

const quickActions = [
  { label: 'Enter Build Studio', path: '/dashboard/studio', desc: 'Interactive EPS block placement simulator', icon: '◈' },
  { label: 'Material Catalog', path: '#', desc: 'GX 100, BEMMELS, finishes & connectors', icon: '▣' },
  { label: 'Request Consultation', path: '#contact', desc: 'Speak with a Fjäll project engineer', icon: '◆' },
  { label: 'Download Spec Sheet', path: '#', desc: 'Technical specifications PDF', icon: '↓' },
]

const recentActivity = [
  { date: '2 hours ago', text: 'EPS panels fabricated for Nuanu Phase 2' },
  { date: '1 day ago', text: 'BEMMELS beams delivered to Bali site' },
  { date: '3 days ago', text: 'Foundation inspection passed — 97% rating' },
  { date: '1 week ago', text: 'Build Studio simulation approved by client' },
]

export default function Overview() {
  const heroRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.dash-stat', { y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      gsap.from('.dash-card', { y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.5 })
      gsap.from('.dash-activity', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 })
    }, heroRef.current)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} style={{ padding: 'clamp(80px, 10vw, 120px) clamp(20px, 4vw, 60px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.24em',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Client Portal
        </p>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 400,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: '#ffffff',
          marginBottom: '16px',
        }}>
          Build Command<br />Centre
        </h1>
        <p style={{
          fontSize: 'clamp(14px, 1.2vw, 16px)',
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.6)',
          maxWidth: '560px',
        }}>
          Plan, simulate, and track your Fjäll project. From EPS panel allocation 
          to real-time construction timelines — all in one place.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
        gap: '2px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.08)',
        marginBottom: '48px',
      }}>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="dash-stat"
            style={{
              backgroundColor: 'rgba(17,17,17,0.8)',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <p style={{
              fontSize: 'clamp(28px, 3vw, 40px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: '#5E9E8C',
              lineHeight: 1,
            }}>
              {stat.value}
            </p>
            <p style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              color: '#ffffff',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              {stat.label}
            </p>
            <p style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
            }}>
              {stat.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions + Activity side by side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: '24px',
        marginBottom: '48px',
      }}>
        {/* Quick Actions */}
        <div>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Quick Actions
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  if (action.path.startsWith('#')) {
                    window.location.href = '/'
                    setTimeout(() => {
                      document.querySelector(action.path)?.scrollIntoView({ behavior: 'smooth' })
                    }, 300)
                  } else {
                    navigate(action.path)
                  }
                }}
                className="dash-card"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  textAlign: 'left',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#5E9E8C'
                  e.currentTarget.style.backgroundColor = 'rgba(94,158,140,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'
                }}
              >
                <span style={{ fontSize: '24px', color: '#5E9E8C' }}>{action.icon}</span>
                <div>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}>
                    {action.label}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 300,
                  }}>
                    {action.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dash-activity">
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Recent Activity
          </p>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start',
                  paddingBottom: i < recentActivity.length - 1 ? '16px' : '0',
                  borderBottom: i < recentActivity.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#5E9E8C',
                  marginTop: '6px',
                  flexShrink: 0,
                }} />
                <div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginBottom: '2px' }}>
                    {activity.text}
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project preview */}
      <div>
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.24em',
          color: 'rgba(255,255,255,0.5)',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>
          Your Projects
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '16px',
        }}>
          {projects.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="dash-card"
              style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.12)',
                overflow: 'hidden',
                transition: 'border-color 0.25s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#5E9E8C'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
              onClick={() => navigate('/dashboard/projects')}
            >
              <div style={{ width: '100%', height: '140px', overflow: 'hidden' }}>
                <img
                  src={project.img}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#ffffff', letterSpacing: '-0.01em' }}>
                    {project.title}
                  </p>
                  <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#5E9E8C', textTransform: 'uppercase' }}>
                    {project.value}
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {project.materialFocus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
