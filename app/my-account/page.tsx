"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"

type ProfileResponse = {
  username: string
  full_name?: string
  email?: string
  first_name?: string
  last_name?: string
  mobile_no?: string
  last_login?: string
  enabled?: number
  time_zone?: string
  language?: string
  roles?: any[]
}

export default function MyAccountPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const loadProfile = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/auth/profile", {
          credentials: "include",
          cache: "no-store",
        })

        if (response.status === 401) {
          router.push("/")
          return
        }

        if (!response.ok) {
          const data = await response.json().catch(() => ({}))
          throw new Error(data?.error || "Unable to load account details")
        }

        const data = (await response.json()) as ProfileResponse
        if (!cancelled) {
          setProfile(data)
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err?.message || "Unable to load account details")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProfile()

    return () => {
      cancelled = true
    }
  }, [router])

  const displayName = useMemo(() => {
    if (!profile) return "User"
    return profile.full_name || profile.first_name || profile.username || "User"
  }, [profile])

  const displayEmail = profile?.email || `${profile?.username || ""}@valuepitch.com`
  const initials = displayName.charAt(0).toUpperCase()

  const formattedLastLogin = useMemo(() => {
    if (!profile?.last_login) return "—"
    try {
      const date = new Date(profile.last_login)
      return date.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    } catch (_error) {
      return profile.last_login
    }
  }, [profile?.last_login])

  const handleNavigation = (href: string) => {
    if (!href) return
    window.open(href, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="account-page">
      <div className="account-container">
        <header className="account-header">
          <button className="account-back" onClick={() => router.back()}>
            ← Back
          </button>
          <h1>My Account</h1>
        </header>

        {loading ? (
          <div className="account-card loading-card">
            <div className="spinner" />
            <p>Loading your account details…</p>
          </div>
        ) : error ? (
          <div className="account-card error-card">
            <h2>We couldn&apos;t load your account</h2>
            <p>{error}</p>
            <button className="primary-btn" onClick={() => window.location.reload()}>
              Try again
            </button>
          </div>
        ) : (
          <>
            <section className="account-card profile-card">
              <div className="profile-summary">
                <div className="avatar">{initials}</div>
                <div className="identity">
                  <h2>{displayName}</h2>
                  <p className="username">@{profile?.username}</p>
                  <p className="email">{displayEmail}</p>
                </div>
              </div>
              <div className="profile-actions">
                <button
                  className="outline-btn"
                  onClick={() => handleNavigation("https://dev2.crimescan.ai/app/user-profile")}
                >
                  ✏️ Edit Profile
                </button>
              </div>
            </section>

            <section className="account-card meta-card">
              <div>
                <span className="meta-label">Status</span>
                <span className="meta-value">
                  {profile?.enabled ? "Active" : "Disabled"}
                </span>
              </div>
              <div>
                <span className="meta-label">Last login</span>
                <span className="meta-value">{formattedLastLogin}</span>
              </div>
              <div>
                <span className="meta-label">Language</span>
                <span className="meta-value">{profile?.language || "English"}</span>
              </div>
              <div>
                <span className="meta-label">Time zone</span>
                <span className="meta-value">{profile?.time_zone || "Asia/Kolkata"}</span>
              </div>
            </section>

            {/* Action items removed as per request */}
          </>
        )}
      </div>

      <style jsx>{`
        .account-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%);
          padding: 48px 16px 64px;
          display: flex;
          justify-content: center;
        }

        .account-container {
          width: 100%;
          max-width: 960px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .account-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .account-header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .account-back {
          background: none;
          border: none;
          color: #2563eb;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .account-back:hover {
          background: rgba(37, 99, 235, 0.08);
        }

        .account-card {
          background: #ffffff;
          border-radius: 18px;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .loading-card,
        .error-card {
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 220px;
          gap: 16px;
        }

        .loading-card p,
        .error-card p {
          margin: 0;
          color: #475569;
        }

        .spinner {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 4px solid rgba(37, 99, 235, 0.18);
          border-top-color: #2563eb;
          animation: rotate 1s linear infinite;
        }

        .profile-card {
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }

        .profile-summary {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #1e293b;
          font-size: 1.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(148, 163, 184, 0.4);
        }

        .identity h2 {
          margin: 0;
          font-size: 1.65rem;
          font-weight: 600;
          color: #0f172a;
        }

        .identity .username {
          margin: 6px 0 4px;
          color: #475569;
          font-weight: 500;
        }

        .identity .email {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
        }

        .profile-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .outline-btn {
          border: 1px solid rgba(37, 99, 235, 0.35);
          background: transparent;
          color: #2563eb;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .outline-btn:hover {
          background: rgba(37, 99, 235, 0.08);
        }

        .meta-card {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 24px;
        }

        .meta-label {
          display: block;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: #94a3b8;
          margin-bottom: 6px;
        }

        .meta-value {
          font-size: 1rem;
          font-weight: 600;
          color: #0f172a;
        }

        .action-card {
          gap: 0;
          padding: 0;
          overflow: hidden;
        }

        .action-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 32px;
          gap: 24px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.18);
        }

        .action-row:last-child {
          border-bottom: none;
        }

        .action-row h3 {
          margin: 0 0 6px;
          font-size: 1.05rem;
          color: #0f172a;
        }

        .action-row p {
          margin: 0;
          color: #64748b;
          font-size: 0.95rem;
        }

        .link-btn,
        .primary-btn {
          border: none;
          background: #2563eb;
          color: #fff;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .link-btn:hover,
        .primary-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 24px rgba(37, 99, 235, 0.18);
        }

        .link-btn {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
        }

        .link-btn:hover {
          background: rgba(37, 99, 235, 0.18);
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .account-container {
            gap: 16px;
          }

          .account-card {
            padding: 24px 20px;
          }

          .profile-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .profile-actions {
            width: 100%;
            justify-content: stretch;
          }

          .outline-btn,
          .link-btn,
          .primary-btn {
            width: 100%;
            text-align: center;
          }

          .action-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  )
}


