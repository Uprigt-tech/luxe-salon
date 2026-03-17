import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

// Pages
import Home from './pages/Home'
import Services from './pages/Services'
import Franchise from './pages/Franchise'
import Investment from './pages/Investment'
import Contact from './pages/Contact'

// Components
import MainLayout from './components/MainLayout'
import ScrollToTop from './components/ScrollToTop'
import AdminLogin from './components/AdminLogin'
  
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './components/AdminDashboard'
import AdminContacted from './components/AdminContacted'
import AdminTickets from './components/AdminTickets'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    // Refresh scroll triggers on mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/pricing" element={<Investment />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="contacted" element={<AdminContacted />} />
          <Route path="tickets" element={<AdminTickets />} />
        </Route>

        {/* Redirects */}
        <Route path="/admin-login.html" element={<Navigate to="/admin" replace />} />
        <Route path="/admin-dashboard.html" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
