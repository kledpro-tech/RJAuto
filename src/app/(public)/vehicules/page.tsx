"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { mockVehicles, BRANDS, FUEL_TYPES, TRANSMISSION_TYPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function VehiclesCatalogue() {
  const [searchQuery, setSearchQuery] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [fuelFilter, setFuelFilter] = useState("all");
  const [transmissionFilter, setTransmissionFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([50000]);
  const [sortBy, setSortBy] = useState("recent");

  // Mock filtering
  let filteredVehicles = mockVehicles.filter(v => v.published);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredVehicles = filteredVehicles.filter(
      v => v.brand.toLowerCase().includes(q) || v.model.toLowerCase().includes(q)
    );
  }
  
  if (brandFilter !== "all") {
    filteredVehicles = filteredVehicles.filter(v => v.brand === brandFilter);
  }

  if (fuelFilter !== "all") {
    filteredVehicles = filteredVehicles.filter(v => v.fuel === fuelFilter);
  }

  if (transmissionFilter !== "all") {
    filteredVehicles = filteredVehicles.filter(v => v.transmission === transmissionFilter);
  }

  filteredVehicles = filteredVehicles.filter(v => v.price <= priceRange[0]);

  // Sorting
  filteredVehicles.sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "km_asc") return a.mileage - b.mileage;
    // recent by default (mocked by id here)
    return parseInt(b.id) - parseInt(a.id);
  });

  const FiltersContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Recherche</Label>
        <Input 
          placeholder="Modèle..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Marque</Label>
        <Select value={brandFilter} onValueChange={(v) => setBrandFilter(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Toutes les marques" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les marques</SelectItem>
            {BRANDS.map(brand => (
              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Budget max : {priceRange[0].toLocaleString("fr-FR")} €</Label>
        <Slider 
          defaultValue={[50000]} 
          max={50000} 
          step={1000} 
          value={priceRange}
          onValueChange={(v) => setPriceRange(Array.isArray(v) ? [...v] : [v])}
        />
      </div>

      <div className="space-y-2">
        <Label>Carburant</Label>
        <Select value={fuelFilter} onValueChange={(v) => setFuelFilter(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Tous les carburants" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les carburants</SelectItem>
            {FUEL_TYPES.map(fuel => (
              <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Boîte de vitesse</Label>
        <Select value={transmissionFilter} onValueChange={(v) => setTransmissionFilter(v ?? "all")}>
          <SelectTrigger>
            <SelectValue placeholder="Toutes les boîtes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les boîtes</SelectItem>
            {TRANSMISSION_TYPES.map(t => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSearchQuery("");
          setBrandFilter("all");
          setFuelFilter("all");
          setTransmissionFilter("all");
          setPriceRange([50000]);
        }}
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-8 pb-4 border-b">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Nos véhicules d'occasion</h1>
        
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-gray-500" />
            <Select value={sortBy} onValueChange={(v) => setSortBy(v ?? "recent")}>
              <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récents</SelectItem>
                <SelectItem value="price_asc">Prix croissant</SelectItem>
                <SelectItem value="price_desc">Prix décroissant</SelectItem>
                <SelectItem value="km_asc">Faible kilométrage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Sheet>
            <SheetTrigger render={
              <Button variant="outline" size="sm" className="md:hidden flex gap-2">
                <Filter className="h-4 w-4" /> Filtres
              </Button>
            } />
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filtres</SheetTitle>
                <SheetDescription>Affinez votre recherche de véhicule.</SheetDescription>
              </SheetHeader>
              <div className="mt-6">
                <FiltersContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-4 font-semibold text-lg">
              <SlidersHorizontal className="h-5 w-5" /> Filtres
            </div>
            <FiltersContent />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredVehicles.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-lg font-medium">Aucun véhicule trouvé</h3>
              <p className="text-gray-500 mt-2">Essayez de modifier vos filtres de recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Link key={vehicle.id} href={`/vehicules/${vehicle.slug}`} className="group flex flex-col bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={vehicle.images[0] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop"}
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                      {vehicle.price.toLocaleString("fr-FR")} €
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-x-2 text-xs text-gray-500 mb-2 font-medium">
                      <span>{vehicle.year}</span>
                      <span>•</span>
                      <span>{vehicle.mileage.toLocaleString("fr-FR")} km</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-sm text-gray-500 mb-4">{vehicle.engine}</p>
                    
                    <div className="mt-auto flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {vehicle.fuel}
                      </span>
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                        {vehicle.transmission}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
