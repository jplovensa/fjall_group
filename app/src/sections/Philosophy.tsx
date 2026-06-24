import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null)
  const part1Ref = useRef<HTMLParagraphElement>(null)
  const part2Ref = useRef<HTMLParagraphElement>(null)
  const block1Ref = useRef<HTMLDivElement>(null)
  const block2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(part1Ref.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      })
      gsap.from(part2Ref.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%', once: true },
      })
      gsap.from(block1Ref.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 60%', once: true },
      })
      gsap.from(block2Ref.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 55%', once: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      style={{
        backgroundColor: '#ffffff',
        padding: '160px clamp(20px, 4vw, 60px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Quote - split into two parts */}
        <div style={{ marginBottom: '80px' }}>
          <p
            ref={part1Ref}
            style={{
              fontSize: 'clamp(28px, 4vw, 60px)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: '#000000',
              marginBottom: '20px',
            }}
          >
            For centuries, architecture has been a war against the environment.
            We asked a different question:
          </p>
          <p
            ref={part2Ref}
            style={{
              fontSize: 'clamp(28px, 4vw, 60px)',
              fontWeight: 400,
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              color: '#5E9E8C',
              fontStyle: 'italic',
            }}
          >
            What if we engineered a structure to simply breathe with it?
          </p>
        </div>

        {/* Two narrative blocks - clean stacked layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* The Foundation */}
          <div
            ref={block1Ref}
            style={{
              padding: '48px 40px',
              border: '1px solid #1a1a1a',
            }}
          >
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              color: '#5E9E8C',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontWeight: 500,
            }}>
              The Foundation
            </p>
            <h3 style={{
              fontSize: 'clamp(22px, 2vw, 28px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: '#000000',
              marginBottom: '16px',
            }}>
              Visionary architecture demands uncompromising execution.
            </h3>
            <p style={{
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: '#444444',
            }}>
              The core EPS modular technology driving our monolithic structures
              was originally engineered and rigorously field-tested across Asia.
              The legacy structures in our portfolio stand as physical proof of
              this material superiority — structures that have withstood seismic
              events, coastal corrosion, and decades of tropical climate.
            </p>
          </div>

          {/* The Corporate Upgrade */}
          <div
            ref={block2Ref}
            style={{
              padding: '48px 40px',
              border: '1px solid #1a1a1a',
              backgroundColor: '#0b0b0b',
            }}
          >
            <p style={{
              fontSize: '11px',
              letterSpacing: '0.24em',
              color: '#5E9E8C',
              textTransform: 'uppercase',
              marginBottom: '20px',
              fontWeight: 500,
            }}>
              The Corporate Upgrade
            </p>
            <h3 style={{
              fontSize: 'clamp(22px, 2vw, 28px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: '#ffffff',
              marginBottom: '16px',
            }}>
              Eliminating the friction of traditional construction.
            </h3>
            <p style={{
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.78)',
            }}>
              In 2025, a consortium acquired and scaled the operation, officially
              forming Fjäll Group. We are no longer simply a material supplier;
              we are a fully integrated development partner. From design to
              monolithic finish, we control every element — erasing the
              fragmentation that has plagued construction for centuries.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
