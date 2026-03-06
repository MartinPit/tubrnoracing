"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"

const navLinks = [
  { href: "#about", label: "ABOUT", highlight: false },
  { href: "#team", label: "TEAM", highlight: true },
  { href: "#media", label: "MEDIA", highlight: false },
  { href: "#partners", label: "PARTNERS", highlight: true },
  { href: "#contact", label: "CONTACT", highlight: false },
]

const menuImages = [
  "/placeholder.svg?height=400&width=350",
  "/placeholder.svg?height=400&width=350",
  "/placeholder.svg?height=400&width=350",
  "/placeholder.svg?height=400&width=350",
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement>(null)
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
        ".menu-image",
        {
          y: 100,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.2",
      )
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
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: "smooth" })
    }, 600)
  }

  return (
    <>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 right-6 z-[100] w-14 h-14 bg-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105 hover:bg-primary/90"
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-5 flex flex-col justify-center items-center">
          <span
            className={`absolute h-0.5 w-6 bg-primary-foreground transition-all duration-300 ease-out ${
              isMenuOpen ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-primary-foreground transition-all duration-300 ease-out ${
              isMenuOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-primary-foreground transition-all duration-300 ease-out ${
              isMenuOpen ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </div>
      </button>

      <Link href="/" className="fixed top-6 left-6 z-[100]">
        <div className="font-heading text-xl font-bold tracking-wider leading-tight">
          <span className="text-foreground">TU BRNO</span>
          <br />
          <span className="text-primary">RACING</span>
        </div>
      </Link>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[90] bg-[#0d0d0d]"
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
          <div ref={imagesRef} className="hidden lg:grid grid-cols-2 gap-3 w-1/2 pr-12 content-center">
            {menuImages.map((src, index) => (
              <div key={index} className="menu-image aspect-[4/5] overflow-hidden">
                <img
                  src={src || "/placeholder.svg"}
                  alt=""
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>

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
                      className={`font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight inline-block transition-all duration-300 ${
                        link.highlight ? "text-primary" : "text-foreground"
                      } ${hoveredLink && hoveredLink !== link.href ? "opacity-20" : "opacity-100"}`}
                    >
                      <span className="relative inline-block">
                        {link.label}
                        <span
                          className={`absolute left-0 top-1/2 h-[3px] bg-primary transition-all duration-300 ease-out ${
                            hoveredLink === link.href ? "w-full" : "w-0"
                          }`}
                        />
                      </span>
                    </span>
                  </button>
                </div>
              ))}
            </nav>

            <div className="menu-footer mt-16 pt-8 border-t border-foreground/10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 border border-foreground/30 rounded-full flex items-center justify-center">
                  <span className="font-heading text-xs font-bold">TBR</span>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Formula Student Since 2009
                </span>
              </div>

              <div className="flex gap-8">
                {["Instagram", "YouTube", "Facebook", "LinkedIn"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
