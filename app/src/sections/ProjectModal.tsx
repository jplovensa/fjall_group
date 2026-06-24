import { useEffect, useRef, useCallback } from 'react'
import { projects, type Project } from '../data/projects'

interface ProjectModalProps {
  projectId: string | null
  onClose: () => void
}

export default function ProjectModal({ projectId, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const project: Project | undefined = projects.find((p) => p.id === projectId)

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (projectId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [projectId])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleClose])

  if (!project || !projectId) return null

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(16px, 4vw, 60px)',
        overflow: 'auto',
      }}
    >
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          overflow: 'auto',
          backgroundColor: '#ffffff',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '40px',
            height: '40px',
            backgroundColor: '#ffffff',
            border: '1px solid #000000',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#000000',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#000000'
            e.currentTarget.style.color = '#ffffff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff'
            e.currentTarget.style.color = '#000000'
          }}
        >
          ✕
        </button>

        {/* Left: Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '300px',
            overflow: 'hidden',
            backgroundColor: '#e5e5e5',
          }}
        >
          <img
            src={project.img}
            alt={project.title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Overlay badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              backgroundColor: '#0b0b0b',
              color: '#ffffff',
              padding: '8px 16px',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {project.id} // {project.materialFocus}
          </div>
        </div>

        {/* Right: Details */}
        <div
          style={{
            padding: 'clamp(28px, 3vw, 48px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            overflowY: 'auto',
          }}
        >
          {/* Header */}
          <div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.24em',
                color: '#666666',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              {project.client}
            </p>
            <h2
              style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#000000',
                marginBottom: '8px',
              }}
            >
              {project.title}
            </h2>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  color: '#5E9E8C',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {project.category}
              </span>
              <span style={{ fontSize: '12px', color: '#999999' }}>|</span>
              <span
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.14em',
                  color: '#5E9E8C',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {project.value}
              </span>
              <span style={{ fontSize: '12px', color: '#999999' }}>|</span>
              <span
                style={{
                  fontSize: '12px',
                  letterSpacing: '0.08em',
                  color: '#666666',
                  textTransform: 'uppercase',
                }}
              >
                {project.location}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#1a1a1a' }} />

          {/* Material Application */}
          <div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.24em',
                color: '#000000',
                textTransform: 'uppercase',
                marginBottom: '12px',
                fontWeight: 500,
              }}
            >
              Material Application
            </p>
            <p
              style={{
                fontSize: '14px',
                fontWeight: 300,
                lineHeight: 1.65,
                color: '#444444',
              }}
            >
              {project.materialApplication}
            </p>
          </div>

          {/* Description */}
          <div>
            {project.description.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: '#444444',
                  marginBottom: i < project.description.length - 1 ? '12px' : '0',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#e5e5e5' }} />

          {/* Materials Used */}
          <div>
            <p
              style={{
                fontSize: '11px',
                letterSpacing: '0.24em',
                color: '#000000',
                textTransform: 'uppercase',
                marginBottom: '14px',
                fontWeight: 500,
              }}
            >
              Materials Deployed
            </p>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
              }}
            >
              {project.materials.map((material) => (
                <li
                  key={material}
                  style={{
                    fontSize: '12px',
                    color: '#444444',
                    paddingLeft: '16px',
                    position: 'relative',
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      color: '#5E9E8C',
                      fontWeight: 600,
                    }}
                  >
                    /
                  </span>
                  {material}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
