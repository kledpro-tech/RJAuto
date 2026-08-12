import Link from "next/link";
import { 
  LayoutDashboard, 
  CarFront, 
  Calendar, 
  RefreshCcw, 
  BellRing, 
  Clock, 
  LogOut,
  Menu
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const navigation = [
  { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { name: "Véhicules", href: "/admin/vehicules", icon: CarFront },
  { name: "Rendez-vous", href: "/admin/rendez-vous", icon: Calendar },
  { name: "Demandes de reprise", href: "/admin/reprises", icon: RefreshCcw },
  { name: "Alertes clients", href: "/admin/alertes", icon: BellRing },
  { name: "Disponibilités", href: "/admin/disponibilites", icon: Clock },
];

export function AdminSidebar() {
  const NavLinks = () => (
    <nav className="flex flex-1 flex-col mt-6">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  <item.icon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-black"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li className="mt-auto">
          <Link
            href="/admin/login"
            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut
              className="h-6 w-6 shrink-0 text-red-500 group-hover:text-red-600"
              aria-hidden="true"
            />
            Déconnexion
          </Link>
          <div className="mt-4 pb-4">
            <Link href="/" className="text-xs text-gray-500 hover:underline">
              ← Retour au site public
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile Topbar */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" className="-m-2.5 p-2.5 text-gray-700" />}>
              <span className="sr-only">Ouvrir la sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-white">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="text-xl font-bold tracking-tight">{SITE_CONFIG.name} Admin</SheetTitle>
            </SheetHeader>
            <NavLinks />
          </SheetContent>
        </Sheet>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Espace Admin
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center border-b">
            <span className="text-2xl font-bold tracking-tight">{SITE_CONFIG.name}</span>
            <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">Admin</span>
          </div>
          <NavLinks />
        </div>
      </div>
    </>
  );
}
