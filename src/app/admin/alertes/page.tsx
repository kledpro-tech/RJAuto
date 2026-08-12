"use client";

import { BellRing, Ban } from "lucide-react";
import { mockAlerts } from "@/lib/mock-data";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminAlerts() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Alertes clients</h1>
        <p className="mt-2 text-sm text-gray-700">
          Gérez les alertes de recherche créées par vos clients.
        </p>
      </div>

      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email client</TableHead>
              <TableHead>Critères de recherche</TableHead>
              <TableHead>Date création</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAlerts.map((alerte) => (
              <TableRow key={alerte.id}>
                <TableCell>
                  <div className="font-medium text-gray-900">{alerte.email}</div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {alerte.brand && <Badge variant="secondary" className="text-xs">{alerte.brand}</Badge>}
                    {alerte.model && <Badge variant="secondary" className="text-xs">{alerte.model}</Badge>}
                    {alerte.maxPrice && <Badge variant="secondary" className="text-xs">Max {alerte.maxPrice.toLocaleString("fr-FR")} €</Badge>}
                    {alerte.minYear && <Badge variant="secondary" className="text-xs">Dès {alerte.minYear}</Badge>}
                    {alerte.fuel && <Badge variant="secondary" className="text-xs">{alerte.fuel}</Badge>}
                    {!alerte.brand && !alerte.model && !alerte.maxPrice && !alerte.minYear && !alerte.fuel && (
                      <span className="text-sm text-gray-500 italic">Tous véhicules</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(alerte.createdAt).toLocaleDateString("fr-FR")}</span>
                </TableCell>
                <TableCell>
                  {alerte.active ? (
                    <Badge variant="default" className="bg-green-600 hover:bg-green-700">Active</Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-500">Désactivée</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {alerte.active && (
                      <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Ban className="h-4 w-4 mr-2" /> Désactiver
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
