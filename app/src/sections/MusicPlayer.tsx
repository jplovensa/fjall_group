import { useState, useRef, useEffect } from 'react'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showTooltip, setShowTooltip] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasStartedRef = useRef(false)

  // Try to autoplay after first user interaction
  useEffect(() => {
    const tryPlay = () => {
      if (hasStartedRef.current) return
      hasStartedRef.current = true
      const audio = audioRef.current
      if (audio) {
        audio.volume = 0.4
        audio.play().then(() => {
          setPlaying(true)
        }).catch(() => {
          // Autoplay blocked — user must click
        })
      }
    }

    window.addEventListener('click', tryPlay, { once: true })
    window.addEventListener('scroll', tryPlay, { once: true })

    return () => {
      window.removeEventListener('click', tryPlay)
      window.removeEventListener('scroll', tryPlay)
    }
  }, [])

  // Progress tracking
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const interval = setInterval(() => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.volume = 0.4
      audio.play().then(() => {
        setPlaying(true)
      }).catch(() => {})
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !muted
    setMuted(!muted)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {/* Song info tooltip */}
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          position: 'relative',
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            width: '80px',
            height: '3px',
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '6px',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#5E9E8C',
              transition: 'width 1s linear',
            }}
          />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={togglePlay}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(94,158,140,0.2)',
              border: '1px solid rgba(94,158,140,0.4)',
              color: '#5E9E8C',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            {playing ? '❚❚' : '▶'}
          </button>

          <button
            onClick={toggleMute}
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {muted ? '🔇' : '🔊'}
          </button>

          <span
            style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}
          >
            {playing ? 'Now Playing' : 'Paused'}
          </span>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              right: 0,
              marginBottom: '12px',
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '14px 18px',
              minWidth: '200px',
            }}
          >
            <p style={{
              fontSize: '12px',
              fontWeight: 500,
              color: '#ffffff',
              marginBottom: '4px',
              letterSpacing: '0.05em',
            }}>
              Caribbean Blue
            </p>
            <p style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '6px',
            }}>
              Enya — 2009 Remastered
            </p>
            <p style={{
              fontSize: '10px',
              color: '#5E9E8C',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Shepherd Moons
            </p>
          </div>
        )}
      </div>

      {/* Audio element — user should replace src with their own audio file */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="/audio/caribbean-blue.mp3"
      />
    </div>
  )
}
