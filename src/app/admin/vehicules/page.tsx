"use client";

import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { mockVehicles } from "@/lib/mock-data";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function AdminVehicles() {
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Gestion des véhicules</h1>
          <p className="mt-2 text-sm text-gray-700">
            Liste de tous les véhicules de votre parc, publiés ou en brouillon.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button render={<Link href="/admin/vehicules/nouveau" />}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter un véhicule
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <Input 
          placeholder="Rechercher par marque, modèle..." 
          className="max-w-sm"
        />
        <div className="text-sm text-gray-500">
          {mockVehicles.length} véhicules
        </div>
      </div>

      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Photo</TableHead>
              <TableHead>Véhicule</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Kilométrage</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div className="h-12 w-16 relative rounded overflow-hidden bg-gray-100">
                    <Image 
                      src={vehicle.images[0] || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop"} 
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{vehicle.brand} {vehicle.model}</div>
                  <div className="text-xs text-gray-500">{vehicle.year} • {vehicle.fuel}</div>
                </TableCell>
                <TableCell className="font-medium">
                  {vehicle.price.toLocaleString("fr-FR")} €
                </TableCell>
                <TableCell>
                  {vehicle.mileage.toLocaleString("fr-FR")} km
                </TableCell>
                <TableCell>
                  {vehicle.published ? (
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">En ligne</Badge>
                  ) : (
                    <Badge variant="secondary">Brouillon</Badge>
                  )}
                  {vehicle.featured && (
                    <Badge variant="outline" className="ml-2 border-yellow-500 text-yellow-600">À la une</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                        <span className="sr-only">Ouvrir le menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem render={<Link href={`/vehicules/${vehicle.slug}`} target="_blank" />}>
                          Voir sur le site
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
