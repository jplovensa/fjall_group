import { useEffect, useRef, useState } from 'react'

interface VideoPreloaderProps {
  onComplete: () => void
}

export default function VideoPreloader({ onComplete }: VideoPreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [phase, setPhase] = useState<'playing' | 'fading' | 'done'>('playing')
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setCanPlay(true)
      video.play().catch(() => {
        // Video autoplay blocked, skip to main site
        setPhase('fading')
        setTimeout(() => {
          setPhase('done')
          onComplete()
        }, 800)
      })
    }

    const handleEnded = () => {
      setPhase('fading')
      setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 800)
    }

    video.addEventListener('canplaythrough', handleCanPlay)
    video.addEventListener('ended', handleEnded)

    // Fallback: if video takes too long, skip
    const timeout = setTimeout(() => {
      if (phase === 'playing') {
        setPhase('fading')
        setTimeout(() => {
          setPhase('done')
          onComplete()
        }, 800)
      }
    }, 8000)

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
      video.removeEventListener('ended', handleEnded)
      clearTimeout(timeout)
    }
  }, [onComplete, phase])

  const handleSkip = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
    }
    setPhase('fading')
    setTimeout(() => {
      setPhase('done')
      onComplete()
    }, 800)
  }

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0b0b0b',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        muted
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

      {/* Dark overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Centered content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        {/* Logo */}
        <img
          src="/images/fjall-logo-v2.png"
          alt="Fjäll Group"
          style={{
            width: 'clamp(160px, 25vw, 300px)',
            opacity: canPlay ? 1 : 0,
            transform: canPlay ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            opacity: canPlay ? 1 : 0,
            transition: 'opacity 1s ease 0.4s',
          }}
        >
          The Future of Built Environment
        </p>
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          padding: '10px 24px',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.14em',
          color: 'rgba(255,255,255,0.7)',
          backgroundColor: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.18)',
          cursor: 'pointer',
          textTransform: 'uppercase',
          transition: 'all 0.25s ease',
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'
          e.currentTarget.style.color = '#ffffff'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
          e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
        }}
      >
        Skip Intro →
      </button>
    </div>
  )
}
