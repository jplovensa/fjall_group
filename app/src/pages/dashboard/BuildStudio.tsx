import { useEffect, useRef, useState, useCallback } from 'react'

// ── Types ──
interface GridCell {
  x: number
  y: number
  z: number
  type: string
}

interface MaterialDef {
  id: string
  name: string
  color: string
  highlight: string
  icon: string
  count: number
  maxCount: number
}

// ── Materials Catalog ──
const MATERIALS: MaterialDef[] = [
  { id: 'eps-wall', name: 'EPS Wall', color: '#e8e8e8', highlight: '#ffffff', icon: '▣', count: 48, maxCount: 48 },
  { id: 'eps-floor', name: 'EPS Floor', color: '#d0d0d0', highlight: '#e0e0e0', icon: '▦', count: 32, maxCount: 32 },
  { id: 'bemmels-beam', name: 'BEMMELS Beam', color: '#3a3a3a', highlight: '#5E9E8C', icon: '║', count: 16, maxCount: 16 },
  { id: 'window', name: 'Smart Window', color: '#87CEEB', highlight: '#b0e0ff', icon: '◈', count: 12, maxCount: 12 },
  { id: 'door', name: 'Entry Door', color: '#8B7355', highlight: '#a08060', icon: '▸', count: 4, maxCount: 4 },
  { id: 'finish', name: 'Bemmels Finish', color: '#5E9E8C', highlight: '#7ab8a8', icon: '◼', count: 24, maxCount: 24 },
]

// ── Isometric Math ──
function isoToScreen(x: number, y: number, z: number, cx: number, cy: number, scale: number) {
  const screenX = cx + (x - y) * scale * 0.866
  const screenY = cy + (x + y) * scale * 0.5 - z * scale * 0.82
  return { x: screenX, y: screenY }
}

export default function BuildStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [materials, setMaterials] = useState<MaterialDef[]>(MATERIALS.map(m => ({ ...m })))
  const [activeMat, setActiveMat] = useState(0)
  const [grid, setGrid] = useState<GridCell[]>([])
  const [hoverCell, setHoverCell] = useState<{x:number,y:number,z:number}|null>(null)
  const [stats, setStats] = useState({ placed: 0, saved: 0, integrity: 100 })
  const [timeOfDay, setTimeOfDay] = useState(0.3) // 0-1
  const [showTutorial, setShowTutorial] = useState(true)

  const gridSize = 12
  const scale = 32

  // Camera pan
  const camRef = useRef({ x: 0, y: 0, dragging: false, lastX: 0, lastY: 0 })

  // ── Drawing ──
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width / Math.min(window.devicePixelRatio, 2)
    const h = canvas.height / Math.min(window.devicePixelRatio, 2)

    // Sky gradient based on time
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h)
    const brightness = Math.sin(timeOfDay * Math.PI)
    skyGrad.addColorStop(0, `rgb(${10 + brightness * 15}, ${11 + brightness * 20}, ${15 + brightness * 30})`)
    skyGrad.addColorStop(1, `rgb(${8 + brightness * 8}, ${brightness * 12}, ${brightness * 16})`)
    ctx.fillStyle = skyGrad
    ctx.fillRect(0, 0, w, h)

    // Ground grid
    const cx = w / 2 + camRef.current.x
    const cy = h * 0.55 + camRef.current.y

    // Draw ground plane
    for (let gx = 0; gx < gridSize; gx++) {
      for (let gy = 0; gy < gridSize; gy++) {
        const tl = isoToScreen(gx, gy, 0, cx, cy, scale)
        const tr = isoToScreen(gx + 1, gy, 0, cx, cy, scale)
        const br = isoToScreen(gx + 1, gy + 1, 0, cx, cy, scale)
        const bl = isoToScreen(gx, gy + 1, 0, cx, cy, scale)

        ctx.beginPath()
        ctx.moveTo(tl.x, tl.y)
        ctx.lineTo(tr.x, tr.y)
        ctx.lineTo(br.x, br.y)
        ctx.lineTo(bl.x, bl.y)
        ctx.closePath()

        // Checkerboard ground
        const isEven = (gx + gy) % 2 === 0
        const groundBrightness = 0.04 + (isEven ? 0.02 : 0)
        ctx.fillStyle = `rgba(94,158,140,${groundBrightness})`
        ctx.fill()
        ctx.strokeStyle = `rgba(94,158,140,0.06)`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    // Sort grid cells by depth (back-to-front)
    const sorted = [...grid].sort((a, b) => {
      const da = (a.x + a.y) * 100 + a.z
      const db = (b.x + b.y) * 100 + b.z
      return da - db
    })

    // Draw placed blocks
    sorted.forEach(cell => {
      const mat = MATERIALS.find(m => m.id === cell.type) || MATERIALS[0]
      drawBlock(ctx, cell.x, cell.y, cell.z, cx, cy, scale, mat.color, mat.highlight, false)
    })

    // Draw hover ghost
    if (hoverCell && hoverCell.x >= 0 && hoverCell.x < gridSize && hoverCell.y >= 0 && hoverCell.y < gridSize) {
      const mat = MATERIALS[activeMat]
      const occupied = grid.some(c => c.x === hoverCell.x && c.y === hoverCell.y && c.z === hoverCell.z)
      if (!occupied) {
        drawBlock(ctx, hoverCell.x, hoverCell.y, hoverCell.z, cx, cy, scale, mat.color, mat.highlight, true)
      }
    }

    // Grid border highlight
    ctx.strokeStyle = `rgba(94,158,140,0.15)`
    ctx.lineWidth = 1
    const corners = [
      isoToScreen(0, 0, 0, cx, cy, scale),
      isoToScreen(gridSize, 0, 0, cx, cy, scale),
      isoToScreen(gridSize, gridSize, 0, cx, cy, scale),
      isoToScreen(0, gridSize, 0, cx, cy, scale),
    ]
    ctx.beginPath()
    ctx.moveTo(corners[0].x, corners[0].y)
    corners.forEach(c => ctx.lineTo(c.x, c.y))
    ctx.closePath()
    ctx.stroke()

  }, [grid, hoverCell, activeMat, timeOfDay])

  // ── Block Drawing ──
  function drawBlock(
    ctx: CanvasRenderingContext2D,
    x: number, y: number, z: number,
    cx: number, cy: number, scale: number,
    color: string, highlight: string,
    isGhost: boolean
  ) {
    const alpha = isGhost ? 0.35 : 1

    // Top face
    const tl = isoToScreen(x, y, z + 1, cx, cy, scale)
    const tr = isoToScreen(x + 1, y, z + 1, cx, cy, scale)
    const br = isoToScreen(x + 1, y + 1, z + 1, cx, cy, scale)
    const bl = isoToScreen(x, y + 1, z + 1, cx, cy, scale)

    ctx.globalAlpha = alpha
    ctx.fillStyle = highlight
    ctx.beginPath()
    ctx.moveTo(tl.x, tl.y)
    ctx.lineTo(tr.x, tr.y)
    ctx.lineTo(br.x, br.y)
    ctx.lineTo(bl.x, bl.y)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = isGhost ? `rgba(94,158,140,0.5)` : `rgba(0,0,0,0.15)`
    ctx.lineWidth = 0.5
    ctx.stroke()

    // Right face
    const r_tl = isoToScreen(x + 1, y, z + 1, cx, cy, scale)
    const r_tr = isoToScreen(x + 1, y, z, cx, cy, scale)
    const r_br = isoToScreen(x + 1, y + 1, z, cx, cy, scale)
    const r_bl = isoToScreen(x + 1, y + 1, z + 1, cx, cy, scale)

    ctx.fillStyle = shadeColor(color, -20)
    ctx.beginPath()
    ctx.moveTo(r_tl.x, r_tl.y)
    ctx.lineTo(r_tr.x, r_tr.y)
    ctx.lineTo(r_br.x, r_br.y)
    ctx.lineTo(r_bl.x, r_bl.y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Left face
    const l_tl = isoToScreen(x, y + 1, z + 1, cx, cy, scale)
    const l_tr = isoToScreen(x + 1, y + 1, z + 1, cx, cy, scale)
    const l_br = isoToScreen(x + 1, y + 1, z, cx, cy, scale)
    const l_bl = isoToScreen(x, y + 1, z, cx, cy, scale)

    ctx.fillStyle = shadeColor(color, -35)
    ctx.beginPath()
    ctx.moveTo(l_tl.x, l_tl.y)
    ctx.lineTo(l_tr.x, l_tr.y)
    ctx.lineTo(l_br.x, l_br.y)
    ctx.lineTo(l_bl.x, l_bl.y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.globalAlpha = 1
  }

  function shadeColor(color: string, percent: number) {
    const num = parseInt(color.replace('#', ''), 16)
    const r = Math.max(0, Math.min(255, (num >> 16) + percent))
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + percent))
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + percent))
    return `rgb(${r},${g},${b})`
  }

  // ── Screen to Grid ──
  const screenToGrid = useCallback((sx: number, sy: number) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const dpr = Math.min(window.devicePixelRatio, 2)
    const w = canvas.width / dpr
    const h = canvas.height / dpr
    const cx = w / 2 + camRef.current.x
    const cy = h * 0.55 + camRef.current.y

    // Inverse isometric transform
    const dx = sx - cx
    const dy = sy - cy
    const x = (dx / (scale * 0.866) + dy / (scale * 0.5)) / 2
    const y = (dy / (scale * 0.5) - dx / (scale * 0.866)) / 2

    const gx = Math.floor(x)
    const gy = Math.floor(y)

    if (gx < 0 || gx >= gridSize || gy < 0 || gy >= gridSize) return null

    // Find topmost z at this position
    let gz = 0
    for (let z = 4; z >= 0; z--) {
      if (grid.some(c => c.x === gx && c.y === gy && c.z === z)) {
        gz = z + 1
        break
      }
    }

    return { x: gx, y: gy, z: gz }
  }, [grid])

  // ── Canvas Events ──
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = parent.clientWidth * dpr
      canvas.height = parent.clientHeight * dpr
      canvas.style.width = parent.clientWidth + 'px'
      canvas.style.height = parent.clientHeight + 'px'
    }
    handleResize()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if (camRef.current.dragging) {
        camRef.current.x += x - camRef.current.lastX
        camRef.current.y += y - camRef.current.lastY
        camRef.current.lastX = x
        camRef.current.lastY = y
      } else {
        const cell = screenToGrid(x, y)
        setHoverCell(cell)
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      camRef.current.dragging = true
      camRef.current.lastX = x
      camRef.current.lastY = y
    }

    const handleMouseUp = () => {
      camRef.current.dragging = false
    }

    const handleClick = (e: MouseEvent) => {
      if (camRef.current.dragging) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cell = screenToGrid(x, y)

      if (cell) {
        const mat = materials[activeMat]
        if (mat.count > 0) {
          const occupied = grid.some(c => c.x === cell.x && c.y === cell.y && c.z === cell.z)
          if (!occupied) {
            setGrid(prev => [...prev, { ...cell, type: mat.id }])
            setMaterials(prev => prev.map((m, i) =>
              i === activeMat ? { ...m, count: m.count - 1 } : m
            ))
            setStats(prev => ({
              placed: prev.placed + 1,
              saved: Math.floor((prev.placed + 1) * 0.68 * 14),
              integrity: Math.min(100, prev.integrity + 2),
            }))
          }
        }
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', () => setHoverCell(null))
    canvas.addEventListener('click', handleClick)
    window.addEventListener('resize', handleResize)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', () => setHoverCell(null))
      canvas.removeEventListener('click', handleClick)
      window.removeEventListener('resize', handleResize)
    }
  }, [screenToGrid, activeMat, materials, grid])

  // ── Render Loop ──
  useEffect(() => {
    let rafId: number
    const loop = () => {
      draw()
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [draw])

  // ── Reset ──
  const handleReset = () => {
    setGrid([])
    setMaterials(MATERIALS.map(m => ({ ...m })))
    setStats({ placed: 0, saved: 0, integrity: 100 })
  }

  // ── Day/Night Animation ──
  useEffect(() => {
    let rafId: number
    const start = performance.now()
    const tick = () => {
      const elapsed = (performance.now() - start) / 20000 // 20s cycle
      setTimeOfDay((elapsed % 1))
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0b0b0b' }}>
      {/* Top Bar */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>
            Build Studio
          </p>
          <h1 style={{
            fontSize: 'clamp(20px, 3vw, 32px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            color: '#ffffff',
          }}>
            EPS Build Simulator
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(94,158,140,0.1)',
            border: '1px solid rgba(94,158,140,0.3)',
          }}>
            <span style={{ fontSize: '11px', color: '#5E9E8C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Blocks: {stats.placed}
            </span>
          </div>
          <div style={{
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Saved: {stats.saved}h
            </span>
          </div>
          <button
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: '#ffffff',
              backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Material Toolbar */}
        <div style={{
          width: '200px',
          minWidth: '200px',
          backgroundColor: '#111111',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto',
        }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            marginBottom: '8px',
          }}>
            Materials
          </p>
          {materials.map((mat, i) => (
            <button
              key={mat.id}
              onClick={() => setActiveMat(i)}
              style={{
                padding: '12px',
                backgroundColor: activeMat === i ? 'rgba(94,158,140,0.15)' : 'rgba(255,255,255,0.03)',
                border: activeMat === i ? '2px solid #5E9E8C' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                opacity: mat.count === 0 ? 0.4 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '20px',
                  color: mat.color,
                }}>{mat.icon}</span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                }}>{mat.name}</span>
              </div>
              <div style={{
                height: '3px',
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${(mat.count / mat.maxCount) * 100}%`,
                  height: '100%',
                  backgroundColor: mat.count > 5 ? '#5E9E8C' : '#c0392b',
                  transition: 'width 0.3s ease',
                }} />
              </div>
              <p style={{
                fontSize: '10px',
                color: mat.count > 5 ? 'rgba(255,255,255,0.4)' : '#c0392b',
                marginTop: '4px',
                letterSpacing: '0.05em',
              }}>
                {mat.count} / {mat.maxCount} remaining
              </p>
            </button>
          ))}

          {/* Integrity meter */}
          <div style={{
            marginTop: 'auto',
            padding: '16px 12px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}>
              Structure Integrity
            </p>
            <div style={{
              height: '6px',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${stats.integrity}%`,
                height: '100%',
                backgroundColor: stats.integrity > 80 ? '#5E9E8C' : stats.integrity > 50 ? '#f39c12' : '#c0392b',
                transition: 'width 0.5s ease',
              }} />
            </div>
            <p style={{
              fontSize: '24px',
              fontWeight: 400,
              color: stats.integrity > 80 ? '#5E9E8C' : stats.integrity > 50 ? '#f39c12' : '#c0392b',
              marginTop: '8px',
              letterSpacing: '-0.02em',
            }}>
              {stats.integrity}%
            </p>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            cursor: camRef.current.dragging ? 'grabbing' : 'crosshair',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            }}
          />

          {/* Tutorial overlay */}
          {showTutorial && (
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
              right: '24px',
              backgroundColor: 'rgba(11,11,11,0.9)',
              border: '1px solid rgba(94,158,140,0.3)',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 500, color: '#5E9E8C', marginBottom: '6px' }}>
                  How to Build
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  Select a material → Hover over the grid → Click to place blocks → Drag to pan camera
                </p>
              </div>
              <button
                onClick={() => setShowTutorial(false)}
                style={{
                  padding: '8px 20px',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Got it
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
