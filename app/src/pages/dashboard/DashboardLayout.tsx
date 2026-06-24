import { useEffect, useState } from 'react'
import { useLocation, Outlet, useNavigate } from 'react-router'

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: '◆' },
  { label: 'Build Studio', path: '/dashboard/studio', icon: '◈' },
  { label: 'My Projects', path: '/dashboard/projects', icon: '▣' },
]

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Studio page is full canvas — skip sidebar
  const isStudio = location.pathname === '/dashboard/studio'

  if (isStudio && !isMobile) {
    return <Outlet />
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0b0b0b' }}>
      {/* Mobile hamburger */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 300,
            width: '44px',
            height: '44px',
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.18)',
            color: '#ffffff',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Sidebar - desktop always, mobile slide */}
      <aside
        style={{
          position: isMobile ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          width: isMobile ? '260px' : '240px',
          minWidth: isMobile ? '260px' : '240px',
          height: '100vh',
          backgroundColor: '#111111',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 250,
          transform: isMobile
            ? mobileOpen ? 'translateX(0)' : 'translateX(-100%)'
            : 'translateX(0)',
          transition: 'transform 0.3s ease',
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <img
            src="/images/fjall-logo-v2.png"
            alt="Fjäll Group"
            style={{ height: '26px', width: 'auto', display: 'block' }}
          />
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}>
            Client Portal
          </p>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path)
                  setMobileOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.08em',
                  color: isActive ? '#5E9E8C' : 'rgba(255,255,255,0.6)',
                  backgroundColor: isActive ? 'rgba(94,158,140,0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(94,158,140,0.3)' : '1px solid transparent',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: '"Helvetica Neue", sans-serif',
                }}
              >
                <span style={{ fontSize: '14px' }}>{item.icon}</span>
                {item.label}
              </button>
            )
          })}

          <div style={{ marginTop: '16px', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={() => {
                window.location.href = '/#/'
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.4)',
                backgroundColor: 'transparent',
                border: '1px solid transparent',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              <span style={{ fontSize: '14px' }}>←</span>
              Back to Site
            </button>
          </div>
        </nav>

        {/* User */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#5E9E8C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 500,
            color: '#ffffff',
          }}>
            F
          </div>
          <div>
            <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: 500 }}>Fjäll Client</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>client@fjallgroup.com</p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 240,
          }}
        />
      )}

      {/* Content */}
      <main style={{ flex: 1, minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  )
}
