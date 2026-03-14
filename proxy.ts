import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const defaultSeason = '2026'
  const defaultSub = encodeURIComponent('sw&dv')

  // 1. Handle exact /team
  if (pathname === '/team') {
    return NextResponse.redirect(new URL(`/team/${defaultSeason}/${defaultSub}`, request.url))
  }

  // 2. Handle /team/[season]
  // We split the path into segments: ["", "team", "2026"]
  const segments = pathname.split('/').filter(Boolean)

  // If there are exactly 2 segments (team + season), redirect to default sub
  if (segments.length === 2 && segments[0] === 'team') {
    const season = segments[1]
    return NextResponse.redirect(new URL(`/team/${season}/${defaultSub}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Only trigger middleware for these specific starting paths
  matcher: ['/team', '/team/:path*'],
}
