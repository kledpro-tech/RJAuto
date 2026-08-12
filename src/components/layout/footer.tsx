import Link from "next/link";
import { SITE_CONFIG } from "@/lib/mock-data";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Pied de page
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <span className="text-3xl font-bold tracking-tight">{SITE_CONFIG.name}</span>
            <p className="text-sm leading-6 text-gray-300 max-w-xs">
              {SITE_CONFIG.description}
            </p>
            <div className="flex space-x-6">
              {/* Social links placeholder if any */}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Contact & Accès</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="text-sm leading-6 text-gray-300">{SITE_CONFIG.address}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                    <a href={SITE_CONFIG.phoneLink} className="text-sm leading-6 text-gray-300 hover:text-white">
                      {SITE_CONFIG.phoneFormatted}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400 shrink-0" />
                    <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm leading-6 text-gray-300 hover:text-white">
                      {SITE_CONFIG.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="text-sm leading-6 text-gray-300">{SITE_CONFIG.hours}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Navigation</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/vehicules" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Nos Véhicules
                    </Link>
                  </li>
                  <li>
                    <Link href="/reprise" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Reprise / Rachat
                    </Link>
                  </li>
                  <li>
                    <Link href="/a-propos" className="text-sm leading-6 text-gray-300 hover:text-white">
                      À Propos
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm leading-6 text-gray-300 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0 text-xs text-gray-400">
            <Link href="/mentions-legales" className="hover:text-white">
              Mentions légales & CGV
            </Link>
            <span>|</span>
            <Link href="/admin/login" className="hover:text-white">
              Espace pro
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
