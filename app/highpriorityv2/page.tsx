"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Ccms2Case = {
  name?: string;
  case_type?: string;
  case_status?: string;
  case_stage?: string;
  case_categories?: string;
  item_no?: string;
  main_number?: string;
  cnr?: string;
  filing_no?: string;
  court_no?: string;
  court_number_and_judge?: string;
  pet_name?: string;
  res_name?: string;
  cause_list_date?: string;
  next_hearing_date?: string;
  filing_date?: string;
  priority?: string;
  old_new?: string;
  synopsis?: string;
  synopsis_status?: string;
  prayer?: string;
  relevancy?: string;
  s3_html_link?: string;
  order_link?: string;
  match_keyword?: string;
  alert_to?: string;
};

const filterConfig: Record<
  "all" | "overdue" | "today" | "tomorrow" | "upcoming",
  { title: string; description: string }
> = {
  all: {
    title: "All High Priority Cases",
    description: "Showing all high priority cases in the system",
  },
  overdue: {
    title: "Overdue Cases",
    description: "Cases with hearing dates in the past",
  },
  today: {
    title: "Today's Cases",
    description: "Cases scheduled for hearing today",
  },
  tomorrow: {
    title: "Tomorrow's Cases",
    description: "Cases scheduled for hearing tomorrow",
  },
  upcoming: {
    title: "Upcoming Cases",
    description: "Cases scheduled within the next 15 days",
  },
};

function toISODateOnly(date: Date): string {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "Not scheduled";
  const date = new Date(dateStr);
  const today = toISODateOnly(new Date());
  const tomorrow = toISODateOnly(new Date(Date.now() + 86400000));
  const dateOnly = toISODateOnly(date);

  if (dateOnly === today) return "🔴 Today";
  if (dateOnly === tomorrow) return "🟡 Tomorrow";
  if (date < new Date()) return "⚠️ Overdue";
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateDDMMYYYY(dateStr?: string): string {
  if (!dateStr) return "Not scheduled";
  try {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return "Invalid date";
  }
}

function getCaseStatus(hearingDate?: string): "overdue" | "today" | "tomorrow" | "upcoming" | "" {
  if (!hearingDate) return "";
  const today = toISODateOnly(new Date());
  const tomorrow = toISODateOnly(new Date(Date.now() + 86400000));
  if (hearingDate < today) return "overdue";
  if (hearingDate === today) return "today";
  if (hearingDate === tomorrow) return "tomorrow";
  return "upcoming";
}

export default function HighPriorityV2Page(): JSX.Element {
  const router = useRouter();
  const [cases, setCases] = useState<Ccms2Case[]>([]);
  const [currentFilter, setCurrentFilter] = useState<
    "all" | "overdue" | "today" | "tomorrow" | "upcoming"
  >("all");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isPrayerOpen, setIsPrayerOpen] = useState<boolean>(false);
  const [prayerTitle, setPrayerTitle] = useState<string>("");
  const [prayerContent, setPrayerContent] = useState<string>("");
  const [user, setUser] = useState<{ message?: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 10;
  const [pageInputValue, setPageInputValue] = useState<string>("");

  const today = useMemo(() => toISODateOnly(new Date()), []);
  const tomorrow = useMemo(
    () => toISODateOnly(new Date(Date.now() + 86400000)),
    []
  );
  const after15Days = useMemo(
    () => toISODateOnly(new Date(Date.now() + 15 * 86400000)),
    []
  );

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const date = c.next_hearing_date;
      switch (currentFilter) {
        case "all":
          return true;
        case "overdue":
          return Boolean(date && date < today);
        case "today":
          return date === today;
        case "tomorrow":
          return date === tomorrow;
        case "upcoming":
          return Boolean(date && date > tomorrow && date <= after15Days);
        default:
          return true;
      }
    });
  }, [cases, currentFilter, today, tomorrow, after15Days]);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
    setPageInputValue("");
  }, [currentFilter]);

  // Sync pageInputValue with currentPage
  useEffect(() => {
    setPageInputValue(currentPage.toString());
  }, [currentPage]);

  // Pagination calculations
  const totalCases = filteredCases.length;
  const totalPages = useMemo(() => Math.ceil(totalCases / recordsPerPage), [totalCases]);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedCases = useMemo(() => {
    return filteredCases.slice(startIndex, endIndex);
  }, [filteredCases, startIndex, endIndex]);

  // Check if Go button should be disabled
  const isGoButtonDisabled = useMemo(() => {
    const trimmedValue = pageInputValue.trim();
    if (!trimmedValue || trimmedValue === '') return true;
    const page = parseInt(trimmedValue, 10);
    return isNaN(page) || page < 1 || page > totalPages || page === currentPage;
  }, [pageInputValue, totalPages, currentPage]);

  const counts = useMemo(() => {
    return {
      all: cases.length,
      overdue: cases.filter((c) => c.next_hearing_date && c.next_hearing_date < today).length,
      today: cases.filter((c) => c.next_hearing_date === today).length,
      tomorrow: cases.filter((c) => c.next_hearing_date === tomorrow).length,
      upcoming: cases.filter(
        (c) => c.next_hearing_date && c.next_hearing_date > tomorrow && c.next_hearing_date <= after15Days
      ).length,
    };
  }, [cases, today, tomorrow, after15Days]);

  const openPrayer = useCallback((prayer: string, caseName: string) => {
    setPrayerTitle(`Prayer Details - ${caseName || ""}`);
    setPrayerContent(prayer || "No prayer details available");
    setIsPrayerOpen(true);
  }, []);

  const closePrayer = useCallback(() => setIsPrayerOpen(false), []);

  // Pagination navigation functions
  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setPageInputValue(page.toString());
    // Scroll to top of cases container
    const casesContainer = document.getElementById("casesContent");
    if (casesContainer) {
      casesContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [totalPages]);

  const handlePageInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string for typing, but validate on submit
    // Only allow numbers and empty string
    if (value === '' || /^\d+$/.test(value)) {
      setPageInputValue(value);
    }
  }, []);

  const handlePageInputSubmit = useCallback(() => {
    // Trim and check if empty
    const trimmedValue = pageInputValue.trim();
    if (!trimmedValue || trimmedValue === '') {
      setPageInputValue(currentPage.toString());
      return;
    }
    
    const page = parseInt(trimmedValue, 10);
    if (isNaN(page) || page < 1) {
      alert("Please enter a valid page number");
      setPageInputValue(currentPage.toString());
      return;
    }
    if (page > totalPages) {
      alert(`Page number cannot exceed ${totalPages}`);
      setPageInputValue(currentPage.toString());
      return;
    }
    if (page === currentPage) {
      // Already on this page, just reset the input
      setPageInputValue(currentPage.toString());
      return;
    }
    goToPage(page);
  }, [pageInputValue, totalPages, currentPage, goToPage]);

  const handlePageInputKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePageInputSubmit();
    }
  }, [handlePageInputSubmit]);

  const handlePageInputBlur = useCallback(() => {
    // If input is empty or invalid, reset to current page
    const trimmedValue = pageInputValue.trim();
    if (!trimmedValue || trimmedValue === '') {
      setPageInputValue(currentPage.toString());
      return;
    }
    const page = parseInt(trimmedValue, 10);
    if (isNaN(page) || page < 1 || page > totalPages) {
      setPageInputValue(currentPage.toString());
    }
  }, [pageInputValue, currentPage, totalPages]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fields = [
        "name",
        "case_type",
        "case_status",
        "case_stage",
        "case_categories",
        "item_no",
        "main_number",
        "cnr",
        "filing_no",
        "court_no",
        "court_number_and_judge",
        "pet_name",
        "res_name",
        "cause_list_date",
        "next_hearing_date",
        "filing_date",
        "priority",
        "old_new",
        "synopsis",
        "synopsis_status",
        "prayer",
        "relevancy",
        "s3_html_link",
        "order_link",
        "match_keyword",
        "alert_to",
      ];

      const filters = [["priority", "=", "High"]];
      const url = `/api/frappe/cases?limit=0&fields=${encodeURIComponent(
        JSON.stringify(fields)
      )}&filters=${encodeURIComponent(JSON.stringify(filters))}`;

      const headers: Record<string, string> = {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      };
      // Best-effort pass-through of Frappe CSRF if present in global scope
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const maybeFrappe = (globalThis as any)?.frappe;
      if (maybeFrappe?.csrf_token) {
        headers["X-Frappe-CSRF-Token"] = String(maybeFrappe.csrf_token);
      }

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers,
      });

      // Check for authentication errors
      if (response.status === 401 || response.status === 403) {
        router.push('/');
        return;
      }

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText}\n${errText}`);
      }

      const data = (await response.json()) as { data?: Ccms2Case[] };
      setCases(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/check", { 
        credentials: "include" 
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.message && data.message !== "Guest") {
          setUser(data);
        }
      }
    } catch (error) {
      // User may not be logged in
    }
  }, []);

  const handleLogout = useCallback(async () => {
    setShowDropdown(false);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      
      if (response.ok) {
        localStorage.removeItem("lcc_ap_remember");
        router.push('/');
      } else {
        console.error("Logout failed");
        router.push('/');
      }
    } catch (error) {
      console.error("Logout error:", error);
      router.push('/');
    }
  }, [router]);

  // Get the first letter of the email/username for the profile icon
  const getInitialLetter = useCallback(() => {
    if (!user || !user.message) return 'U';
    const email = user.message;
    return email.charAt(0).toUpperCase();
  }, [user]);

  const handleMyAccount = useCallback(() => {
    setShowDropdown(false);
    router.push('/my-account');
  }, [router]);

  const handleProfileClick = useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [showDropdown]);

  const handleLatestStatus = useCallback(async (caseId?: string, caseName?: string) => {
    if (!caseId) {
      alert(`Latest Status for case "${caseName || ""}"\nCase Status: N/A\nCase Stage: N/A\nSynopsis Status: N/A\nNext Hearing Date: N/A`);
      return;
    }

    try {
      const headers: Record<string, string> = {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      };
      // Best-effort pass-through of Frappe CSRF if present in global scope
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const maybeFrappe = (globalThis as any)?.frappe;
      if (maybeFrappe?.csrf_token) {
        headers["X-Frappe-CSRF-Token"] = String(maybeFrappe.csrf_token);
      }

      const response = await fetch(`/api/frappe/cases/${caseId}`, {
        method: "GET",
        credentials: "include",
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as { data?: Ccms2Case };
      const caseData = data.data || data as Ccms2Case;
      
      const nextHearingDate = formatDateDDMMYYYY(caseData.next_hearing_date);
      
      alert(
        `Latest Status for case "${caseName || caseId}"\n\n` +
        `Case Status: ${caseData.case_status || "N/A"}\n` +
        `Case Stage: ${caseData.case_stage || "N/A"}\n` +
        `Synopsis Status: ${caseData.synopsis_status || "N/A"}\n` +
        `Next Hearing Date: ${nextHearingDate}`
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      alert(`Error fetching latest status: ${message}`);
    }
  }, []);

  useEffect(() => {
    // Set page title
    if (typeof document !== 'undefined') {
      document.title = 'highpriorityv2'
      
      // Load FontAwesome only if not already loaded
      if (!document.querySelector('link[href*="font-awesome"]')) {
        const link = document.createElement('link')
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        link.rel = 'stylesheet'
        document.head.appendChild(link)
      }
    }
    
    // Check auth and get user
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.lcc-ap-profile-dropdown-container')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Fetch data immediately on mount
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Refresh data every 5 minutes
    const id = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [fetchData]);

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

  return (
    <>
    <div className="hpv2-container container">
      <div className="main-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            className="lcc-ap-home-btn"
            onClick={() => router.push('/todaycauselist')}
            title="Home"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </button>
          <div className="header-title-section">
          <h1 className="main-title"><i className="fa fa-balance-scale" aria-hidden="true"></i>Legal Command Centre (Powered by Valuepitch)</h1>
            <p className="header-subtitle">High Priority Cases Dashboard - Real-time monitoring of critical CCMS2 cases</p>
          </div>
          {user && (
            <div className="lcc-ap-profile-dropdown-container" style={{ marginLeft: '750px' }}>
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

      <div className="stats-container">
        <div
          className={`stat-card total ${currentFilter === "all" ? "active" : ""}`}
          data-filter="all"
          onClick={() => setCurrentFilter("all")}
        >
          <div className="stat-icon">📊</div>
          <div className="stat-number" id="count-all">
            {counts.all}
          </div>
          <div className="stat-label">Total Cases</div>
        </div>

        <div
          className={`stat-card overdue ${currentFilter === "overdue" ? "active" : ""}`}
          data-filter="overdue"
          onClick={() => setCurrentFilter("overdue")}
        >
          <div className="stat-icon">⚠️</div>
          <div className="stat-number" id="count-overdue">
            {counts.overdue}
          </div>
          <div className="stat-label">Overdue</div>
        </div>

        <div
          className={`stat-card today ${currentFilter === "today" ? "active" : ""}`}
          data-filter="today"
          onClick={() => setCurrentFilter("today")}
        >
          <div className="stat-icon">📅</div>
          <div className="stat-number" id="count-today">
            {counts.today}
          </div>
          <div className="stat-label">Today</div>
        </div>

        <div
          className={`stat-card tomorrow ${currentFilter === "tomorrow" ? "active" : ""}`}
          data-filter="tomorrow"
          onClick={() => setCurrentFilter("tomorrow")}
        >
          <div className="stat-icon">📆</div>
          <div className="stat-number" id="count-tomorrow">
            {counts.tomorrow}
          </div>
          <div className="stat-label">Tomorrow</div>
        </div>

        <div
          className={`stat-card upcoming ${currentFilter === "upcoming" ? "active" : ""}`}
          data-filter="upcoming"
          onClick={() => setCurrentFilter("upcoming")}
        >
          <div className="stat-icon">📋</div>
          <div className="stat-number" id="count-upcoming">
            {counts.upcoming}
          </div>
          <div className="stat-label">Next 15 Days</div>
        </div>
      </div>

      <div className="cases-container">
        <div className="cases-header">
          <h2 className="cases-title" id="currentFilter">
            {filterConfig[currentFilter].title}
          </h2>
          <p className="cases-subtitle" id="filterDescription">
            {filterConfig[currentFilter].description}
          </p>
        </div>

        <div className="cases-content" id="casesContent">
          {isLoading && (
            <div className="hp-loading-overlay">
              <div className="hp-loading-card">
                <div className="hp-loading-spinner"></div>
                <h3>Fetching the latest cases</h3>
                <p id="hp-loading-progress">Hold tight while we prepare your insights.</p>
                <p id="hp-loading-status">This should only take a moment.</p>
              </div>
            </div>
          )}
          {!isLoading && error && (
            <div className="error">
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>❌</div>
              <strong>Error fetching data:</strong>
              <br />
              <code>{error}</code>
            </div>
          )}
          {!isLoading && !error && filteredCases.length === 0 && (
            <div className="no-cases">
              <div style={{ fontSize: "3rem", marginBottom: 15 }}>📝</div>
              <div>No cases found for this filter</div>
            </div>
          )}

          {!isLoading && !error && filteredCases.length > 0 && (
            <>
              {paginatedCases.map((c, index) => {
                const status = getCaseStatus(c.next_hearing_date);
                const hearingFormatted = formatDate(c.next_hearing_date);
                return (
                  <div key={c.name || `case-${index}`} className={`case-card ${status}`}>
                    <div className="case-header">
                      <div className="case-info">
                        <div className="case-title">
                          {(c.case_type || "Unknown Type") + " - " + (c.name || "N/A")}
                        </div>
                        <div className="case-meta">
                          <div className="meta-item">
                            <span className="meta-icon">🏛️</span>
                            <span>{c.court_number_and_judge || c.court_no || "N/A"}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">📋</span>
                            <span>{`CNR: ${c.cnr || "N/A"}`}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">📄</span>
                            <span>{`Item: ${c.item_no || "N/A"}`}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">📅</span>
                            <span>{`Next Hearing: ${c.next_hearing_date || "Not scheduled"}`}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="case-status">
                      <span className="status-badge status-priority">High Priority</span>
                      <span className="status-badge status-stage">{c.case_stage || "Unknown Stage"}</span>
                      {c.old_new === "Repeat" ? (
                        <span className="status-badge status-repeat">Repeat Case</span>
                      ) : null}
                      {c.next_hearing_date ? (
                        <span className="status-badge status-hearing">{hearingFormatted}</span>
                      ) : null}
                    </div>

                    <div className="case-parties">
                      <div className="party">
                        <div className="party-label">Petitioner</div>
                        <div className="party-name">{c.pet_name || "Not specified"}</div>
                      </div>
                      <div className="party">
                        <div className="party-label">Respondent</div>
                        <div className="party-name">{c.res_name || "Not specified"}</div>
                      </div>
                    </div>

                    {c.synopsis ? (
                      <div className="case-synopsis">
                        <strong>AI Synopsis:</strong> {c.synopsis}
                      </div>
                    ) : null}

                    <div className="case-actions">
                      {c.s3_html_link ? (
                        <a
                          href={c.s3_html_link}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-primary"
                        >
                          📄 View Case
                        </a>
                      ) : null}
                      {c.prayer ? (
                        <button
                          className="btn btn-success"
                          onClick={() => openPrayer(c.prayer || "", c.name || "")}
                        >
                          📋 Prayer
                        </button>
                      ) : null}
                      <button
                        className="btn btn-info"
                        onClick={() => handleLatestStatus(c.name, c.name)}
                      >
                        📊 Latest Status
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => alert(`Alert sent for case "${c.name || ""}"`)}
                      >
                        🔔 Alert
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          // Placeholder for remove priority action
                          // eslint-disable-next-line no-alert
                          if (confirm(`Remove "${c.name || ""}" from high priority?`)) {
                            alert(
                              `Case "${c.name || ""}" would be removed from high priority (API call needed)`
                            );
                          }
                        }}
                      >
                        Remove Priority
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Pagination Component */}
        {!isLoading && !error && filteredCases.length > 0 && (
          <div className="pagination-container">
            <div className="pagination-inner">
              {totalPages <= 1 ? (
                <div className="pagination-info-left">
                  Showing all {totalCases} cases
                </div>
              ) : (
                <>
                  <div className="pagination-info-left">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="pagination-controls">
                    {currentPage > 1 && (
                      <button
                        className="pagination-link"
                        onClick={() => goToPage(currentPage - 1)}
                        title="Previous page"
                      >
                        Prev
                      </button>
                    )}
                    
                    {/* Page number links */}
                    {(() => {
                      // Show up to 10 pages starting from current page
                      let startPage = currentPage;
                      let endPage = Math.min(currentPage + 9, totalPages);
                      
                      // If near the end, show pages before current
                      if (endPage === totalPages && totalPages > 10) {
                        startPage = Math.max(1, totalPages - 9);
                        endPage = totalPages;
                      }
                      
                      const pageNumbers = [];
                      for (let i = startPage; i <= endPage; i++) {
                        pageNumbers.push(i);
                      }
                      
                      return (
                        <>
                          {pageNumbers.map((page) => (
                            page === currentPage ? (
                              <button
                                key={page}
                                className="pagination-btn-active"
                                aria-current="page"
                              >
                                {page}
                              </button>
                            ) : (
                              <button
                                key={page}
                                className="pagination-link"
                                onClick={() => goToPage(page)}
                              >
                                {page}
                              </button>
                            )
                          ))}
                        </>
                      );
                    })()}
                    
                    {currentPage < totalPages && (
                      <button
                        className="pagination-link"
                        onClick={() => goToPage(currentPage + 1)}
                        title="Next page"
                      >
                        NEXT
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {isPrayerOpen && (
        <div className="modal" onClick={(e) => e.currentTarget === e.target && closePrayer()}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">{prayerTitle}</div>
              <span className="close" onClick={closePrayer}>&times;</span>
            </div>
            <div className="modal-body">
              <div style={{ whiteSpace: "pre-wrap", fontFamily: "Georgia, serif", lineHeight: 1.8 }}>
                {prayerContent}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .main-title { 
          font-size: 22px; 
          font-weight: 700; 
          color: #2c3e50; 
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
          margin: 0;
        }
        .main-title i { color: #3498db; }
        .hp-loading-overlay {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
          padding: 40px 20px;
          width: 100%;
          flex: 1;
        }
        .hp-loading-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 32px 44px;
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.12);
          text-align: center;
          max-width: 360px;
          width: 100%;
          margin: 0 auto;
        }
        .hp-loading-card h3 {
          margin: 16px 0 8px;
          font-size: 18px;
          color: #1f2937;
          font-weight: 600;
        }
        .hp-loading-card p {
          margin: 4px 0;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.6;
        }
        .hp-loading-spinner {
          border: 4px solid rgba(37, 99, 235, 0.15);
          border-top-color: #2563eb;
          border-radius: 50%;
          width: 46px;
          height: 46px;
          margin: 0 auto;
          animation: hp-spin 1s linear infinite;
        }
        @keyframes hp-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .main-title { font-size: 18px; }
          .hpv2-container .header-title-section { gap: 2px; }
          .hpv2-container .header-subtitle { font-size: 11px; }
          
          .pagination-container {
            padding: 10px 15px;
          }
          
          .pagination-inner {
            gap: 10px;
            max-width: 100%;
          }
          
          .pagination-info {
            font-size: 11px;
            text-align: center;
            width: 100%;
            padding: 0 5px;
          }
          
          .pagination-inner {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          
          .pagination-info-left {
            font-size: 12px;
            width: 100%;
          }
          
          .pagination-controls {
            width: 100%;
            justify-content: flex-start;
            gap: 8px;
            flex-wrap: wrap;
          }
          
          .pagination-btn-active {
            width: 32px;
            height: 32px;
            font-size: 12px;
          }
          
          .pagination-link {
            font-size: 12px;
          }
        }

        /* Pagination styles - minimalist design matching image */
        .pagination-container {
          position: sticky;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
          z-index: 100;
          margin: 0;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
        }
        
        .pagination-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        @media (min-width: 768px) and (max-width: 1024px) {
          .pagination-inner {
            max-width: 900px;
          }
        }
        
        @media (min-width: 1024px) {
          .pagination-inner {
            max-width: 1200px;
          }
        }
        
        @media (min-width: 1400px) {
          .pagination-container {
            padding-left: calc((100% - 1400px) / 2 + 20px);
            padding-right: calc((100% - 1400px) / 2 + 20px);
          }
          .pagination-inner {
            max-width: 1200px;
          }
        }
        
        .pagination-info-left {
          font-size: 14px;
          color: #2c3e50;
          font-weight: 400;
        }
        
        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        
        /* Active page - blue circular button */
        .pagination-btn-active {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #3498db;
          color: white;
          border: none;
          cursor: default;
          font-size: 14px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          box-shadow: 0 0 0 1px rgba(52, 152, 219, 0.2);
        }
        
        /* Inactive page numbers and navigation - plain text links */
        .pagination-link {
          background: none;
          border: none;
          color: #2c3e50;
          cursor: pointer;
          font-size: 14px;
          font-weight: 400;
          padding: 0;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        
        .pagination-link:hover {
          color: #3498db;
        }
        
        .pagination-link:active {
          color: #2980b9;
        }
      `}</style>
    </div>

    <footer style={{    
      position: 'relative',
      bottom: '40px',       
      textAlign: 'right',
      color: '#666666',
      fontSize: '12px',
      fontStyle: 'italic',
      marginTop: '20px',
      paddingRight: '20px',
      width: '100%'
    }}>
      <p style={{ margin: '50px 0 0 10px', fontSize: '11px', opacity: 0.8 }}>
        Legal Command Centre (Powered by Valuepitch)
      </p>
    </footer>
    </>
  );
}

 