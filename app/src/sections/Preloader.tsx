import { useEffect, useState } from 'react'

export default function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 600)
    const t2 = setTimeout(() => setPhase('done'), 1600)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'reveal' ? 0 : 1,
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: phase === 'reveal' ? 'none' : 'auto',
      }}
    >
      <img
        src="/images/fjall-logo-v2.png"
        alt="Fjäll Group"
        style={{
          width: 'clamp(120px, 20vw, 240px)',
          opacity: phase === 'loading' ? 0 : 0.9,
          transform: phase === 'loading' ? 'translateY(40px)' : 'translateY(0)',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
        }}
      />
    </div>
  )
}
