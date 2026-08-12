"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X, ShieldCheck, MapPin, Truck, Calendar, Phone } from "lucide-react";
import { mockVehicles, SITE_CONFIG } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

export default function VehicleDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const vehicle = mockVehicles.find((v) => v.slug === resolvedParams.slug);
  
  const [financeAmount, setFinanceAmount] = useState([2000]);
  const [months, setMonths] = useState([3]);

  if (!vehicle) {
    notFound();
  }

  // Financement mock calculation
  const amountToFinance = Math.min(vehicle.price, Math.min(3000, financeAmount[0]));
  const estimatedMonthly = amountToFinance > 0 ? (amountToFinance / months[0]) : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column - Gallery & Details */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="mt-2 text-xl text-gray-500">{vehicle.engine}</p>
          </div>

          {/* Gallery Carousel */}
          <div className="w-full">
            <Carousel className="w-full relative">
              <CarouselContent>
                {vehicle.images.length > 0 ? vehicle.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-[16/9] w-full bg-gray-100 rounded-xl overflow-hidden">
                      <Image 
                        src={img} 
                        alt={`${vehicle.brand} ${vehicle.model} - Photo ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                )) : (
                  <CarouselItem>
                    <div className="relative aspect-[16/9] w-full bg-gray-100 rounded-xl flex items-center justify-center">
                      <span className="text-gray-400">Aucune photo</span>
                    </div>
                  </CarouselItem>
                )}
              </CarouselContent>
              {vehicle.images.length > 1 && (
                <>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
                </>
              )}
            </Carousel>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y">
            <div className="flex flex-col items-center justify-center text-center p-2">
              <span className="text-sm text-gray-500">Année</span>
              <span className="font-semibold text-lg">{vehicle.year}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-2 border-l">
              <span className="text-sm text-gray-500">Kilométrage</span>
              <span className="font-semibold text-lg">{vehicle.mileage.toLocaleString("fr-FR")} km</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-2 border-t sm:border-t-0 sm:border-l">
              <span className="text-sm text-gray-500">Carburant</span>
              <span className="font-semibold text-lg">{vehicle.fuel}</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-2 border-t sm:border-t-0 sm:border-l border-l">
              <span className="text-sm text-gray-500">Boîte</span>
              <span className="font-semibold text-lg">{vehicle.transmission}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="whitespace-pre-line leading-relaxed text-gray-700">
                {vehicle.description}
              </p>
            </div>
          </div>

          <Separator />

          {/* Specs */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">Caractéristiques techniques</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex justify-between py-2 border-b">
                <dt className="text-gray-500">Puissance</dt>
                <dd className="font-medium text-gray-900">{vehicle.power || "N/A"}</dd>
              </div>
              <div className="flex justify-between py-2 border-b">
                <dt className="text-gray-500">Couleur</dt>
                <dd className="font-medium text-gray-900">{vehicle.color || "N/A"}</dd>
              </div>
              <div className="flex justify-between py-2 border-b">
                <dt className="text-gray-500">Portes</dt>
                <dd className="font-medium text-gray-900">{vehicle.doors || "N/A"}</dd>
              </div>
              <div className="flex justify-between py-2 border-b">
                <dt className="text-gray-500">Places</dt>
                <dd className="font-medium text-gray-900">{vehicle.seats || "N/A"}</dd>
              </div>
            </dl>
          </div>

          <Separator />

          {/* Conditions */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">État du véhicule</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-green-700 mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5" /> Points forts
                </h3>
                <ul className="space-y-3">
                  {vehicle.positivePoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 mt-1">✔️</span> {pt}
                    </li>
                  ))}
                  {vehicle.positivePoints.length === 0 && <span className="text-gray-400 italic">Non renseigné</span>}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
                  <X className="h-5 w-5" /> Points d'attention
                </h3>
                <ul className="space-y-3">
                  {vehicle.negativePoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-red-500 mt-1">🔴</span> {pt}
                    </li>
                  ))}
                  {vehicle.negativePoints.length === 0 && <span className="text-gray-400 italic">Aucun défaut majeur signalé</span>}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* Price Card */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-6">
                {vehicle.price.toLocaleString("fr-FR")} €
              </div>
              
              <div className="space-y-3">
                <Button render={<Link href={`/rendez-vous?vehicule=${vehicle.slug}`} />} className="w-full text-base py-6 border-2 border-black bg-black text-white hover:bg-gray-800 shadow-lg font-bold" size="lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Prendre un rendez-vous
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button render={<a href={SITE_CONFIG.phoneLink} />} variant="outline" className="w-full border-gray-300">
                    <Phone className="mr-2 h-4 w-4" />
                    Appeler
                  </Button>
                  <Button render={<a href={SITE_CONFIG.whatsappLink} target="_blank" rel="noopener noreferrer" />} variant="outline" className="w-full border-gray-300 bg-[#25D366] text-white hover:bg-[#20bd5a] hover:text-white border-none">
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Inclus avec ce véhicule</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 text-gray-700 shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-gray-900 block">Garantie 3 mois</span>
                    <span className="text-gray-500">Extension possible jusqu'à 18 mois.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Check className="h-5 w-5 text-gray-700 shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-gray-900 block">Véhicule révisé</span>
                    <span className="text-gray-500">Prêt à partir, aucun frais à prévoir.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Truck className="h-5 w-5 text-gray-700 shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-gray-900 block">Livraison possible</span>
                    <span className="text-gray-500">À domicile partout en France.</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 text-gray-700 shrink-0" />
                  <div className="text-sm">
                    <span className="font-medium text-gray-900 block">Immatriculation sur place</span>
                    <span className="text-gray-500">On s'occupe de la carte grise.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Financing Simulator */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Simulateur de financement</h3>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-gray-600 font-medium">Montant à financer</label>
                    <span className="font-semibold">{Math.min(3000, financeAmount[0]).toLocaleString("fr-FR")} €</span>
                  </div>
                  <Slider 
                    defaultValue={[2000]} 
                    min={500}
                    max={Math.min(3000, vehicle.price)} 
                    step={100}
                    value={financeAmount}
                    onValueChange={(v) => setFinanceAmount(Array.isArray(v) ? [...v] : [v])}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <label className="text-gray-600 font-medium">Paiement en</label>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setMonths([3])}
                      className={`py-2 rounded-lg border-2 transition-all font-semibold ${months[0] === 3 ? "border-black bg-black text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}
                    >
                      3 fois
                    </button>
                    <button 
                      onClick={() => setMonths([4])}
                      className={`py-2 rounded-lg border-2 transition-all font-semibold ${months[0] === 4 ? "border-black bg-black text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}
                    >
                      4 fois
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-gray-600">Mensualité estimée :</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.round(estimatedMonthly).toLocaleString("fr-FR")} €
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    *Simulation non contractuelle. Sous réserve d'acceptation du dossier par notre partenaire financier.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
