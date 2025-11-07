'use client'

import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CaseResult {
  main_case: string
  case_status: string
  case_stage: string
  district: string
  next_hearing_date?: string
  court_no: string
  pet_name?: string[]
  res_name?: string[]
  pet_adv?: string
  res_adv?: string
  prayer?: string
  order_url: string
  s3_html_link: string
}

export default function CaseSearchPage() {
  const router = useRouter()
  const [caseType, setCaseType] = useState('')
  const [caseNumber, setCaseNumber] = useState('')
  const [caseYear, setCaseYear] = useState('')
  const [results, setResults] = useState<CaseResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState<{ message?: string } | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    // Set page title
    document.title = 'case search'
    
    // Load FontAwesome
    const link = document.createElement('link')
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    // Check auth and get user
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
      
      if (response.ok) {
        const data = await response.json()
        if (data && data.message && data.message !== "Guest") {
          setUser(data)
          setAuthLoading(false)
        } else {
          // User is not authenticated, redirect to login
          router.push('/')
        }
      } else {
        // Auth check failed, redirect to login
        router.push('/')
      }
    } catch (error) {
      // Auth check error, redirect to login
      router.push('/')
    }
  }

  useEffect(() => {
    // Handle ESC key to close modal
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        setShowModal(false)
      }
    }

    if (showModal) {
      document.addEventListener('keydown', handleEsc)
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
    }
  }, [showModal])

  const handleLogout = async () => {
    setShowDropdown(false)
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      })
      
      if (response.ok) {
        localStorage.removeItem("lcc_ap_remember")
        router.push('/')
      } else {
        console.error("Logout failed")
        router.push('/')
      }
    } catch (error) {
      console.error("Logout error:", error)
      router.push('/')
    }
  }

  // Get the first letter of the email/username for the profile icon
  const getInitialLetter = () => {
    if (!user || !user.message) return 'U'
    const email = user.message
    return email.charAt(0).toUpperCase()
  }

  const handleMyAccount = () => {
    setShowDropdown(false)
    alert('My Account feature coming soon!')
  }

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Check if user is authenticated before submitting
    if (!user) {
      setError('Please login to search cases')
      router.push('/')
      return
    }
    
    setLoading(true)
    setError('')
    setResults([])

    const formData = new FormData()
    formData.append('case_type', caseType)
    formData.append('case_number', caseNumber)
    formData.append('case_year', caseYear)

    try {
      const response = await fetch('https://automation.lendingcube.ai/webhook/case-search', {
        method: 'POST',
        body: formData
      })

      // Check for authentication errors
      if (response.status === 401 || response.status === 403) {
        router.push('/')
        return
      }

      if (!response.ok) {
        setError('Record not found')
        setLoading(false)
        return
      }

      // Check if response has content
      const contentType = response.headers.get('content-type')
      const responseText = await response.text()
      
      // If response is empty or not JSON, show record not found
      if (!responseText || responseText.trim() === '' || !contentType?.includes('application/json')) {
        setError('Record not found')
        setShowModal(false)
        setLoading(false)
        return
      }

      // Try to parse JSON
      let data: CaseResult[]
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        // If JSON parsing fails, show user-friendly message
        setError('Record not found')
        setShowModal(false)
        setLoading(false)
        return
      }
      
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setError('Record not found')
        setShowModal(false)
      } else {
        setResults(Array.isArray(data) ? data : [data])
        setError('')
        setShowModal(true)
      }
    } catch (err) {
      // Show user-friendly message instead of technical error
      setError('Record not found')
      setShowModal(false)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="glass-card p-8 text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <div className="gradient-text text-xl font-semibold">Loading Legal Command Center...</div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Navigation Bar */}
      <nav className="lcc-ap-navbar">
        <div className="lcc-ap-nav-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => router.push('/todaycauselist')}
              className="lcc-ap-home-btn"
              title="Home"
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </button>
            <h1 className="lcc-ap-nav-title">
              <i className="fas fa-balance-scale"></i>Legal Command Centre (Powered by Valuepitch)
            </h1>
            {user && (
              <div className="lcc-ap-profile-dropdown-container" style={{ marginLeft: '450px' }}>
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
       <div style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: 'white',
        padding: '30px',
        color: '#333',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ flex: 1 }}>
          <h2 style={{
            textAlign: 'center',
            marginBottom: '30px',
            color: '#1a202c'
          }}>
           High Court Case Search
          </h2>

          <form 
          onSubmit={handleSubmit}
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            background: '#f8f9fa',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.5s ease-in-out'
          }}
        >
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <label 
              htmlFor="case_type"
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: '6px',
                color: '#2d3748',
                textAlign: 'left'
              }}
            >
              Case Type
            </label>
            <input
              type="text"
              id="case_type"
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              placeholder="e.g., WA"
              required
              style={{
                width: '100%',
                padding: '12px 20px 12px 12px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                transition: 'border 0.3s',
                display: 'block',
                margin: '0 auto',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <label 
              htmlFor="case_number"
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: '6px',
                color: '#2d3748',
                textAlign: 'left'
              }}
            >
              Case Number
            </label>
            <input
              type="text"
              id="case_number"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              placeholder="e.g., 1055"
              required
              style={{
                width: '100%',
                padding: '12px 20px 12px 12px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                transition: 'border 0.3s',
                display: 'block',
                margin: '0 auto',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <label 
              htmlFor="case_year"
              style={{
                display: 'block',
                fontWeight: 600,
                marginBottom: '6px',
                color: '#2d3748',
                textAlign: 'left'
              }}
            >
              Case Year
            </label>
            <input
              type="text"
              id="case_year"
              value={caseYear}
              onChange={(e) => setCaseYear(e.target.value)}
              placeholder="e.g., 2024"
              required
              style={{
                width: '100%',
                padding: '12px 20px 12px 12px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                transition: 'border 0.3s',
                display: 'block',
                margin: '0 auto',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              backgroundColor: loading ? '#93c5fd' : '#3182ce',
              color: '#fff',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#2b6cb0'
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = '#3182ce'
            }}
          >
            {loading ? '🔄 Searching...' : 'Search Case'}
          </button>
        </form>

          {/* Error message display */}
          {error && !showModal && (
            <div style={{
              marginTop: '20px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#e53e3e', fontSize: '16px' }}>❌ {error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer style={{    
          position: 'relative',
          bottom: '40px',       
          textAlign: 'right',
          color: '#666666',
          fontSize: '12px',
          fontStyle: 'italic'
        }}>
         
          <p style={{ margin: '5px 0 0 0', fontSize: '11px', opacity: 0.8 }}>
          © 2025 Local Command Centre. All rights reserved.
          </p>
        </footer>

        {/* Modal Popup */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              animation: 'fadeIn 0.3s ease-in-out'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false)
              }
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                padding: '30px',
                maxWidth: '900px',
                width: '90%',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                animation: 'slideUp 0.3s ease-in-out'
              }}
            >
              {/* Modal Header */}
              <div style={{
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '2px solid #e2e8f0'
              }}>
                <h2 style={{
                  color: '#2c5282',
                  margin: 0,
                  fontSize: '24px'
                }}>
                  Results
                </h2>
              </div>

              {/* Modal Content */}
              <div>
                {results.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      background: '#f8f9fa',
                      padding: '20px',
                      borderRadius: '12px',
                      marginBottom: '20px',
                      border: '1px solid #e2e8f0',
                      animation: 'fadeIn 0.4s ease-in-out'
                    }}
                  >
                    <h3 style={{
                      color: '#2c5282',
                      marginBottom: '15px',
                      fontSize: '20px'
                    }}>
                      {item.main_case}
                    </h3>
                    
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>Status:</strong> {item.case_status}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>Stage:</strong> {item.case_stage}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>District:</strong> {item.district}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>Next Hearing:</strong> {item.next_hearing_date || 'N/A'}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>Court:</strong> {item.court_no}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>Petitioners:</strong> {item.pet_name?.join(', ') || 'N/A'}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>Respondents:</strong> {item.res_name?.join(', ') || 'N/A'}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>Petitioner Advocate:</strong> {item.pet_adv || 'N/A'}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>Respondent Advocate:</strong> {item.res_adv || 'N/A'}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <strong>Prayer:</strong> {item.prayer || 'N/A'}
                    </p>
                    <p style={{ margin: '8px 0', lineHeight: '1.6', fontSize: '15px' }}>
                      <a 
                        href={item.order_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          color: '#3182ce',
                          textDecoration: 'none',
                          fontWeight: 500
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        📄 Order PDF
                      </a>
                      {' | '}
                      <a 
                        href={item.s3_html_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          color: '#3182ce',
                          textDecoration: 'none',
                          fontWeight: 500
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        📑 Cause List View
                      </a>
                    </p>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div style={{
                marginTop: '20px',
                paddingTop: '15px',
                borderTop: '2px solid #e2e8f0',
                textAlign: 'right'
              }}>
                <button
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: '10px 24px',
                    fontSize: '16px',
                    backgroundColor: '#3182ce',
                    color: '#fff',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#2b6cb0'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#3182ce'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        input:focus {
          border-color: #3182ce !important;
          outline: none;
        }
      `}</style>
    </>
  )
}
