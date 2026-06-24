import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router'
import Header from './sections/Header'
import Spatial from './sections/Spatial'
import Philosophy from './sections/Philosophy'
import Works from './sections/Works'
import Capabilities from './sections/Capabilities'
import Technology from './sections/Technology'
import Hubs from './sections/Hubs'
import Hero from './sections/Hero'
import Footer from './sections/Footer'
import VideoPreloader from './sections/VideoPreloader'
import Login from './pages/Login'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import Overview from './pages/dashboard/Overview'
import BuildStudio from './pages/dashboard/BuildStudio'
import Projects from './pages/dashboard/Projects'

function MainSite() {
  const scrollRef = useRef({ y: 0, speed: 0 })
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    let rafId: number
    let prevY = window.scrollY

    const tick = () => {
      const y = window.scrollY
      const delta = y - prevY
      scrollRef.current.y = y
      scrollRef.current.speed = delta
      prevY = y
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(rafId)
  }, [])

  const handlePreloaderComplete = () => {
    setShowPreloader(false)
  }

  return (
    <>
      {showPreloader && (
        <VideoPreloader onComplete={handlePreloaderComplete} />
      )}
      <Header scrollRef={scrollRef} />
      <main>
        <Spatial />
        <Philosophy />
        <Capabilities />
        <Technology />
        <Works />
        <Hubs />
        <Hero />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="studio" element={<BuildStudio />} />
        <Route path="projects" element={<Projects />} />
      </Route>

      {/* Main Site */}
      <Route path="*" element={<MainSite />} />
    </Routes>
  )
}

export default App
