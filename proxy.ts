import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const segments = pathname.split('/').filter(Boolean)

  const defaultSeason = '2026'
  const defaultSub = 'LDSHP'


  if (pathname === '/team') {
    return NextResponse.redirect(new URL(`/team/${defaultSeason}/${defaultSub}`, request.url))
  }

  if (pathname === '/garage') {
    return NextResponse.redirect(new URL(`/garage/ev/ED5`, request.url))
  }

  if (pathname === '/gallery') {
    return NextResponse.redirect(new URL("/gallery/all", request.url))
  }



  if (segments.length === 2 && segments[0] === 'team') {
    const season = segments[1]
    return NextResponse.redirect(new URL(`/team/${season}/${defaultSub}`, request.url))
  }

  const defaultEVCarModel = 'ED5'
  const defaultCVCarModel = 'DX'
  const defaultSimCarModel = 'sim'
  const carCategory = segments[1]
  const defaultCarModel = carCategory === 'ev' ? defaultEVCarModel : carCategory === 'cv' ? defaultCVCarModel : defaultSimCarModel

  if (segments.length === 2 && segments[0] === 'garage') {
    const carCategory = segments[1]
    return NextResponse.redirect(new URL(`/garage/${carCategory}/${defaultCarModel}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/team', '/team/:path*', '/garage', '/garage/:path*', '/gallery'],
}
