"use client";

import { Calendar as CalendarIcon, Phone, Car } from "lucide-react";
import { mockAppointments } from "@/lib/mock-data";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminAppointments() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Gestion des rendez-vous</h1>
        <p className="mt-2 text-sm text-gray-700">
          Gérez vos demandes de rendez-vous en agence ou par téléphone.
        </p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Select defaultValue="tous">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les statuts</SelectItem>
            <SelectItem value="nouveau">Nouveaux</SelectItem>
            <SelectItem value="confirmé">Confirmés</SelectItem>
            <SelectItem value="terminé">Terminés</SelectItem>
            <SelectItem value="annulé">Annulés</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date & Heure</TableHead>
              <TableHead>Véhicule concerné</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAppointments.map((rdv) => (
              <TableRow key={rdv.id}>
                <TableCell>
                  <div className="font-medium text-gray-900">{rdv.name}</div>
                  <div className="text-xs text-gray-500">{rdv.phone}</div>
                  <div className="text-xs text-gray-500">{rdv.email}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {rdv.type === "telephone" ? (
                      <><Phone className="h-4 w-4 text-gray-500" /> <span className="text-sm">Téléphone</span></>
                    ) : (
                      <><CalendarIcon className="h-4 w-4 text-gray-500" /> <span className="text-sm">En agence</span></>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{rdv.date}</div>
                  <div className="text-gray-500">{rdv.time}</div>
                </TableCell>
                <TableCell>
                  {rdv.vehicleLabel ? (
                    <div className="flex items-start gap-2 max-w-[200px]">
                      <Car className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                      <span className="text-sm truncate" title={rdv.vehicleLabel}>{rdv.vehicleLabel}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400 italic text-sm">Général</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    rdv.status === "nouveau" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                    rdv.status === "confirmé" ? "bg-green-50 text-green-700 border-green-200" :
                    rdv.status === "annulé" ? "bg-red-50 text-red-700 border-red-200" :
                    "bg-gray-50 text-gray-700 border-gray-200"
                  }>
                    {rdv.status.charAt(0).toUpperCase() + rdv.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {rdv.status === "nouveau" && (
                      <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">Confirmer</Button>
                    )}
                    <Button size="sm" variant="ghost">Détails</Button>
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
