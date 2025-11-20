'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function TodaysCauseListPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ message?: string } | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Set page title
    document.title = 'main page'
    
    // Load FontAwesome
    const link = document.createElement('link')
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    
    checkAuth()

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.lcc-ap-profile-dropdown-container')) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Session validation - check periodically and on API errors
  useEffect(() => {
    let sessionCheckInterval: NodeJS.Timeout | null = null
    let isRedirecting = false

    const validateSession = async () => {
      // Prevent multiple simultaneous redirects
      if (isRedirecting) return

      try {
        const response = await fetch("/api/auth/check", { 
          credentials: "include" 
        })
        
        if (!response.ok) {
          isRedirecting = true
          router.push('/')
          return
        }
        
        const data = await response.json()
        if (!data || !data.message || data.message === "Guest") {
          isRedirecting = true
          router.push('/')
        }
      } catch (error) {
        // Session check failed, redirect to login
        isRedirecting = true
        router.push('/')
      }
    }

    // Check session every 30 seconds
    sessionCheckInterval = setInterval(validateSession, 30000)

    // Also check on visibility change (when user switches tabs/windows)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        validateSession()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Check on window focus
    const handleFocus = () => {
      validateSession()
    }
    window.addEventListener('focus', handleFocus)

    return () => {
      if (sessionCheckInterval) {
        clearInterval(sessionCheckInterval)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [router])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/check", { 
        credentials: "include" 
      })
      
      if (!response.ok) {
        router.push('/')
        return
      }
      
      const data = await response.json()
      if (!data || !data.message || data.message === "Guest") {
        router.push('/')
      } else {
        setUser(data)
        setLoading(false)
        // Stay on this page
      }
    } catch (error) {
      router.push('/')
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      })
      
      if (response.ok) {
        // Clear any local storage
        localStorage.removeItem("lcc_ap_remember")
        // Redirect to login page
        router.push('/')
      } else {
        console.error("Logout failed")
        // Still redirect to login page even if logout API fails
        router.push('/')
      }
    } catch (error) {
      console.error("Logout error:", error)
      // Still redirect to login page
      router.push('/')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <div className="gradient-text text-xl font-semibold">Loading Legal Command Center...</div>
        </div>
      </div>
    )
  }

  // Get the first letter of the email/username for the profile icon
  const getInitialLetter = () => {
    if (!user || !user.message) return 'U'
    const email = user.message
    return email.charAt(0).toUpperCase()
  }

  const handleMyAccount = () => {
    setShowDropdown(false)
    router.push('/my-account')
  }

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown)
  }

  return (
    <div className="welcome-page-container bg-gray-50">
      {/* Navigation Bar */}
      <nav className="lcc-ap-navbar">
        <div className="lcc-ap-nav-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h1 className="lcc-ap-nav-title">
              <i className="fas fa-balance-scale"></i>Legal Command Centre (Powered by Valuepitch)
            </h1>
            {user && (
              <div className="lcc-ap-profile-dropdown-container" style={{ marginLeft: '550px' }}>
                <div 
                  className="lcc-ap-profile-icon"
                  onClick={handleProfileClick}
                  style={{ cursor: 'pointer' }}
                >
                  {getInitialLetter()}
                </div>
                {showDropdown && (
                  <div className="lcc-ap-profile-dropdown">
                    <div className="lcc-ap-dropdown-item" onClick={handleMyAccount}>
                      <i className="fas fa-user" style={{ marginRight: '8px' }}></i>
                      My Account
                    </div>
                    <div className="lcc-ap-dropdown-divider"></div>
                    <div className="lcc-ap-dropdown-item" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
                      Sign Out
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="welcome-content-wrapper bg-white text-black">
        <div className="welcome-header">
          <h1>Cause List</h1>
          <p>Access court case information and filtered listings</p>
        </div>

        <div className="cards-grid">
          <div className="court-card filtered-cases" onClick={() => window.open(process.env.NODE_ENV === 'production' ? 'https://lcc-ai-app.netlify.app/dailycauselist507' : '/dailycauselist507', '_blank')}>
            <div className="card-badge">Filtered</div>
            <h2>Filtered Cases</h2>
            <p>Browse through filtered and categorized court cases. Find specific cases based on criteria, case types, or other filtering parameters.</p>
          </div>

          <div className="court-card all-cases" onClick={() => window.open(process.env.NODE_ENV === 'production' ? 'https://lcc-ai-app.netlify.app/dcl1' :'/dcl1', '_blank')}>
            <div className="card-badge">Live</div>
            <h2>All Court Cases</h2>
            <p>Access the complete list of all court cases scheduled for today. View comprehensive case details, timings, and courtroom assignments.</p>
          </div>

          <div className="court-card case-search" onClick={() => window.open(process.env.NODE_ENV === 'production' ? 'https://lcc-ai-app.netlify.app/case-search' : '/case-search', '_blank')}>
            <div className="card-badge">Search</div>
            <h2>Case Search</h2>
            <p>Search for specific court cases using various search criteria. Find cases by case number, party names, date range, or other parameters.</p>
          </div>

          <div className="court-card high-priority-cases" onClick={() => window.open(process.env.NODE_ENV === 'production' ? 'https://lcc-ai-app.netlify.app//highpriorityv2' : '/highpriorityv2', '_blank')}>
            <div className="card-badge priority-badge">Priority</div>
            <h2>High Priority Cases</h2>
            <p>Access urgent and high-priority court cases that require immediate attention. View time-sensitive cases and critical proceedings.</p>
          </div>

          <div className="court-card high-court-vc" onClick={() => window.open('https://aphc.gov.in/Hcdbs/vclinks.jsp', '_blank')}>
            <div className="card-badge">VC Links</div>
            <h2>High Court VC Meeting Links</h2>
            <p>Access virtual court meeting links for the High Court. Join scheduled video conferencing sessions for today&apos;s hearings.</p>
          </div>
         

          <div className="court-card keywords-config" onClick={() => window.open('http://13.233.165.90/lcc_v2/config', '_blank')}>
            <div className="card-badge">Config</div>
            <h2>Keywords Configuration</h2>
            <p>configure your keywords here</p>
          </div>
        </div>

        <div className="welcome-footer">
          <p>Click on any card to access the respective court case listings</p>
        </div>
      </div>

      <footer style={{    
        position: 'fixed',
        bottom: '20px',       
        right: '24px',
        textAlign: 'right',
        color: '#666666',
        fontSize: '12px',
        fontStyle: 'italic'
      }}>
        <p style={{ margin: '5px 0 0 0', fontSize: '11px', opacity: 0.8 }}>
          Legal Command Centre (Powered by Valuepitch)
        </p>
      </footer>
    </div>
  )
}

