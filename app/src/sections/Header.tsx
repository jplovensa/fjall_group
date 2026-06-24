import { useEffect, useRef, useState } from 'react'

interface HeaderProps {
  scrollRef: React.MutableRefObject<{ y: number; speed: number }>
  forceLight?: boolean
}

const navItems = ['Our Story', 'The Ecosystem', 'Projects', 'Contact']
const sectionIds = ['#philosophy', '#capabilities', '#works', '#contact']

export default function Header({ scrollRef, forceLight = false }: HeaderProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [overHeroRaw, setOverHeroRaw] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const check = () => {
      const y = scrollRef.current.y
      setIsCompact(y > 100)
      setOverHeroRaw(y < window.innerHeight * 0.85)
      rafRef.current = requestAnimationFrame(check)
    }
    rafRef.current = requestAnimationFrame(check)
    return () => cancelAnimationFrame(rafRef.current)
  }, [scrollRef])

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Lock scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const overHero = overHeroRaw && !forceLight

  const handleNavClick = (index: number) => {
    const target = document.querySelector(sectionIds[index])
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: isCompact ? '64px' : '88px',
          backgroundColor: overHero ? 'transparent' : '#ffffff',
          borderBottom: overHero
            ? '1px solid rgba(255,255,255,0.18)'
            : '1px solid #000000',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile
            ? '0 16px'
            : '0 clamp(20px, 4vw, 60px)',
          transition:
            'height 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo — always visible */}
        <a
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setMobileOpen(false)
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            height: '100%',
            zIndex: 110,
          }}
        >
          <img
            src="/images/fjall-logo-v2.png"
            alt="Fjäll Group"
            style={{
              height: isMobile ? '28px' : '36px',
              width: 'auto',
              display: 'block',
            }}
          />
        </a>

        {/* Desktop nav — hidden on mobile */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
            {navItems.map((item, i) => (
              <NavItem
                key={item}
                label={item}
                overHero={overHero}
                onClick={() => handleNavClick(i)}
              />
            ))}
          </nav>
        )}

        {/* Mobile hamburger button */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              width: '44px',
              height: '44px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 110,
              padding: 0,
            }}
            aria-label="Toggle menu"
          >
            <span style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: overHero && !mobileOpen ? '#ffffff' : '#000000',
              transition: 'all 0.3s ease',
              transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }} />
            <span style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: overHero && !mobileOpen ? '#ffffff' : '#000000',
              transition: 'all 0.3s ease',
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block',
              width: '24px',
              height: '2px',
              backgroundColor: overHero && !mobileOpen ? '#ffffff' : '#000000',
              transition: 'all 0.3s ease',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }} />
          </button>
        )}
      </header>

      {/* Mobile fullscreen menu */}
      {isMobile && mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            backgroundColor: overHero ? '#0b0b0b' : '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {/* Logo in menu */}
          <div style={{ marginBottom: '40px' }}>
            <img
              src="/images/fjall-logo-v2.png"
              alt="Fjäll Group"
              style={{ height: '40px', width: 'auto' }}
            />
          </div>

          {navItems.map((item, i) => (
            <button
              key={item}
              onClick={() => handleNavClick(i)}
              style={{
                display: 'block',
                padding: '16px 32px',
                fontSize: '20px',
                fontWeight: 400,
                letterSpacing: '0.12em',
                color: overHero ? '#ffffff' : '#000000',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontFamily: '"Helvetica Neue", sans-serif',
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* CSS animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

function NavItem({
  label,
  overHero,
  onClick,
}: {
  label: string
  overHero: boolean
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const baseColor = overHero ? '#ffffff' : '#000000'
  const hoverBg = overHero ? '#ffffff' : '#000000'
  const hoverFg = overHero ? '#000000' : '#ffffff'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        fontSize: '13px',
        fontWeight: 400,
        letterSpacing: '0.08em',
        backgroundColor: hovered ? hoverBg : 'transparent',
        color: hovered ? hoverFg : baseColor,
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.25s ease, color 0.25s ease',
        whiteSpace: 'nowrap',
        fontFamily: '"Helvetica Neue", sans-serif',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </button>
  )
}
