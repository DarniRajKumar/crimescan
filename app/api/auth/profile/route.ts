import { NextRequest, NextResponse } from 'next/server'

const FRAPPE_BASE = 'https://dev2.crimescan.ai'

async function fetchLoggedUser(cookie: string) {
  const response = await fetch(`${FRAPPE_BASE}/api/method/frappe.auth.get_logged_user`, {
    method: 'GET',
    headers: {
      Cookie: cookie,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to verify session')
  }

  return response.json()
}

async function fetchUserProfile(username: string, cookie: string) {
  const response = await fetch(`${FRAPPE_BASE}/api/resource/User/${encodeURIComponent(username)}`, {
    method: 'GET',
    headers: {
      Cookie: cookie,
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch user profile')
  }

  const raw = await response.json()
  const profile = raw?.data ?? raw ?? {}

  return {
    username,
    full_name: profile.full_name ?? profile.username ?? username,
    email: profile.email ?? profile.user_email ?? '',
    first_name: profile.first_name ?? profile.full_name?.split(' ')?.[0] ?? '',
    last_name: profile.last_name ?? profile.last_names ?? '',
    mobile_no: profile.mobile_no ?? profile.phone ?? '',
    last_login: profile.last_login ?? '',
    enabled: profile.enabled ?? profile.user_enabled ?? 1,
    time_zone: profile.time_zone ?? '',
    language: profile.language ?? '',
    roles: profile.roles ?? [],
  }
}

export async function GET(request: NextRequest) {
  const cookie = request.headers.get('cookie') || ''

  if (!cookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const userData = await fetchLoggedUser(cookie)
    const username = userData?.message

    if (!username || username === 'Guest') {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const profile = await fetchUserProfile(username, cookie)

    const response = NextResponse.json(profile)

    return response
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to load profile',
        details: error?.message ?? 'Unknown error',
      },
      { status: 500 }
    )
  }
}


