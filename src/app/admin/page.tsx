import Link from "next/link";
import { CarFront, Calendar, RefreshCcw, BellRing, ArrowRight } from "lucide-react";
import { mockVehicles, mockAppointments, mockBuybackRequests, mockAlerts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function AdminDashboard() {
  const publishedVehicles = mockVehicles.filter(v => v.published).length;
  const newAppointments = mockAppointments.filter(a => a.status === "nouveau").length;
  const pendingBuybacks = mockBuybackRequests.filter(r => r.status === "nouveau").length;
  const activeAlerts = mockAlerts.filter(a => a.active).length;

  const stats = [
    {
      name: "Véhicules en ligne",
      value: publishedVehicles,
      icon: CarFront,
      href: "/admin/vehicules",
      description: "Véhicules actuellement publiés sur le site",
    },
    {
      name: "Nouveaux rendez-vous",
      value: newAppointments,
      icon: Calendar,
      href: "/admin/rendez-vous",
      description: "Demandes de rendez-vous à traiter",
    },
    {
      name: "Reprises en attente",
      value: pendingBuybacks,
      icon: RefreshCcw,
      href: "/admin/reprises",
      description: "Demandes d'estimation de reprise",
    },
    {
      name: "Alertes actives",
      value: activeAlerts,
      icon: BellRing,
      href: "/admin/alertes",
      description: "Clients en recherche active",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tableau de bord</h1>
          <p className="mt-1 text-sm text-gray-500">
            Vue d'ensemble de votre activité RJ Auto
          </p>
        </div>
        <div>
          <Button render={<Link href="/admin/vehicules/nouveau" />}>
              + Ajouter un véhicule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                {stat.description}
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 mt-4 border-t">
              <Link href={stat.href} className="text-sm font-medium text-black hover:underline flex items-center">
                Gérer <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Derniers RDV */}
        <Card>
          <CardHeader>
            <CardTitle>Derniers rendez-vous demandés</CardTitle>
            <CardDescription>Les dernières demandes soumises par les clients.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAppointments.slice(0, 3).map((rdv) => (
                <div key={rdv.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{rdv.name}</p>
                    <p className="text-xs text-gray-500">{rdv.date} à {rdv.time} - {rdv.type === "telephone" ? "Téléphone" : "En agence"}</p>
                    {rdv.vehicleLabel && <p className="text-xs text-blue-600 mt-1">{rdv.vehicleLabel}</p>}
                  </div>
                  <div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      rdv.status === 'nouveau' ? 'bg-yellow-50 text-yellow-800' : 
                      rdv.status === 'confirmé' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {rdv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button render={<Link href="/admin/rendez-vous" />} variant="ghost" className="w-full">
              Voir tous les rendez-vous
            </Button>
          </CardFooter>
        </Card>

        {/* Dernières Reprises */}
        <Card>
          <CardHeader>
            <CardTitle>Dernières demandes de reprise</CardTitle>
            <CardDescription>Les derniers véhicules proposés par les clients.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockBuybackRequests.slice(0, 3).map((rep) => (
                <div key={rep.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{rep.brand} {rep.model}</p>
                    <p className="text-xs text-gray-500">{rep.year} • {rep.mileage.toLocaleString("fr-FR")} km • {rep.condition}</p>
                    <p className="text-xs text-gray-500 mt-1">{rep.name}</p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      rep.status === 'nouveau' ? 'bg-yellow-50 text-yellow-800' : 
                      rep.status === 'en_estimation' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {rep.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button render={<Link href="/admin/reprises" />} variant="ghost" className="w-full">
              Voir toutes les demandes
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
