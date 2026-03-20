"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { LucideIcon } from "lucide-react"

const navLinks = [
  { href: "/about", label: "ABOUT", highlight: false },
  { href: "/team", label: "TEAM", highlight: true },
  { href: "/garage", label: "GARAGE", highlight: false },
  { href: "/media", label: "MEDIA", highlight: true },
  { href: "/partners", label: "PARTNERS", highlight: false },
  { href: "/contact", label: "CONTACT", highlight: true },
]

interface Props {
  socials: { name: string, link: string }[]
}

export function Navigation({ socials }: Props) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true })

    tl.current
      .to(overlayRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.6,
        ease: "power4.inOut",
      })
      .from(
        ".menu-link",
        {
          y: 60,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".menu-footer",
        {
          y: 20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2",
      )

    return () => {
      tl.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
      tl.current?.play()
    } else {
      document.body.style.overflow = "unset"
      tl.current?.reverse()
    }
  }, [isMenuOpen])

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false)
    setTimeout(() => {
      router.push(href)
    }, 600)
  }
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-24 z-[100] bg-background/80 backdrop-blur-md border-b flex items-center justify-between px-6">
        <Link href="/" className="z-[100]">
          <div className="font-heading text-xl font-bold tracking-wider leading-tight">
            <span className="text-foreground">TU BRNO</span>
            <br />
            <span className="text-primary">RACING</span>
          </div>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-[100] w-14 h-14 bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-primary/90"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5 flex flex-col justify-center items-center">
            <span
              className={`absolute h-0.5 w-6 bg-primary-foreground transition-all duration-300 ease-out ${isMenuOpen ? "rotate-45" : "-translate-y-2"
                }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-primary-foreground transition-all duration-300 ease-out ${isMenuOpen ? "opacity-0 scale-0" : ""
                }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-primary-foreground transition-all duration-300 ease-out ${isMenuOpen ? "-rotate-45" : "translate-y-2"
                }`}
            />
          </div>
        </button>

      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto h-full px-6 py-24 flex flex-col lg:flex-row">
          <div ref={linksRef} className="flex flex-col justify-center lg:w-1/2 lg:pl-12">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.href} className="menu-link overflow-hidden">
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="block text-left w-full py-2 group relative"
                  >
                    <span
                      className={cn("font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight inline-block transition-all duration-300",
                        link.highlight ? "text-primary" : "text-foreground",
                        hoveredLink && hoveredLink !== link.href ? "opacity-20" : "opacity-100"
                      )}
                    >
                      <span className="relative inline-block">
                        {link.label}
                        <span
                          className={cn(
                            "absolute left-0 top-1/2 h-[3px] bg-primary transition-all duration-300 ease-out",
                            !link.highlight ? "bg-primary" : "bg-foreground",
                            hoveredLink === link.href ? "w-full" : "w-0"
                          )}
                        />
                      </span>
                    </span>
                  </button>
                </div>
              ))}
            </nav>

            <div className="menu-footer mt-16 pt-8 border-t border-foreground/10">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Formula Student Since 2009
                </span>
              </div>

              <div className="flex gap-8">
                {socials.filter(({ name }) => name != "LinkedIn").map(({ name, link }) => (
                  <Link
                    key={name}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors duration-300 border-b border-transparent hover:border-primary pb-1"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
