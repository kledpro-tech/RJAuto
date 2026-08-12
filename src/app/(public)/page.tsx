import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG, mockVehicles } from "@/lib/mock-data";

export default function HomePage() {
  const featuredVehicles = mockVehicles.filter(v => v.featured).slice(0, 3);
  const newArrivals = mockVehicles.filter(v => !v.featured).slice(0, 3);

  const features = [
    {
      name: "Garantie incluse",
      description: "Tous nos véhicules bénéficient d'une garantie minimum de 3 mois, extensible jusqu'à 18 mois.",
      icon: ShieldCheck,
    },
    {
      name: "Véhicules révisés",
      description: "Chaque voiture passe par un contrôle technique rigoureux et une révision complète avant la vente.",
      icon: CheckCircle2,
    },
    {
      name: "Immatriculation sur place",
      description: "Nous gérons toutes les démarches administratives pour vous. Repartez l'esprit tranquille.",
      icon: MapPin,
    },
    {
      name: "Livraison à domicile",
      description: "Possibilité de vous livrer le véhicule directement chez vous, partout en France métropolitaine.",
      icon: Truck,
    },
  ];

  return (
    <div>
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-black py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Votre véhicule d'occasion de confiance
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button render={<Link href="/vehicules" />} size="lg" className="bg-white text-black hover:bg-gray-200">
                Voir nos véhicules
              </Button>
              <Button render={<Link href="/reprise" />} variant="link" className="text-white hover:text-gray-300">
                Estimer ma reprise <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Véhicules à la une</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Découvrez notre sélection de véhicules révisés et garantis.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredVehicles.map((vehicle) => (
              <article key={vehicle.id} className="flex flex-col items-start justify-between bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative w-full h-64 bg-gray-200">
                  <Image
                    src={vehicle.images[0] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {vehicle.price.toLocaleString("fr-FR")} €
                  </div>
                </div>
                <div className="p-6 w-full">
                  <div className="flex items-center gap-x-4 text-xs">
                    <span className="text-gray-500">{vehicle.year}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{vehicle.mileage.toLocaleString("fr-FR")} km</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500">{vehicle.fuel}</span>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link href={`/vehicules/${vehicle.slug}`}>
                        <span className="absolute inset-0" />
                        {vehicle.brand} {vehicle.model}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{vehicle.description}</p>
                  </div>
                  <div className="mt-6">
                    <Button render={<Link href={`/vehicules/${vehicle.slug}`} />} variant="outline" className="w-full">
                      Voir les détails
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button render={<Link href="/vehicules" />} variant="default">
              Voir tout le stock <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-gray-500">Nos engagements</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Pourquoi choisir RJ Auto ?
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

    </div>
  );
}
