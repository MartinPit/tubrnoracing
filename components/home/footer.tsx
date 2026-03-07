import Link from "next/link"
import { Instagram, Facebook, Youtube, Linkedin, Mail, MapPin } from "lucide-react"
import { SOCIALS } from "@/lib/data"

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-card py-16 px-6 border-t border-border">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xl font-semibold tracking-wider">TU BRNO RACING</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Brno University of Technology Formula Student Team. Engineering excellence through passion and innovation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-6">Contact</h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@tubrnoracing.cz" className="hover:text-primary transition-colors">
                  info@tubrnoracing.cz
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>
                  Brno University of Technology
                  <br />
                  Technická 2896/2
                  <br />
                  616 69 Brno, Czech Republic
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider mb-6">Follow Us</h3>
            <div className="flex gap-4">
              {SOCIALS.map((social) => (
                <Link
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TU Brno Racing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
