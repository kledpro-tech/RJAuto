"use client";

import { RefreshCcw } from "lucide-react";
import { mockBuybackRequests } from "@/lib/mock-data";

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

export default function AdminBuybacks() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Demandes de reprise</h1>
        <p className="mt-2 text-sm text-gray-700">
          Gérez les estimations de rachat demandées par vos clients.
        </p>
      </div>

      <div className="bg-white rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Véhicule à reprendre</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Date demande</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBuybackRequests.map((rep) => (
              <TableRow key={rep.id}>
                <TableCell>
                  <div className="font-medium text-gray-900">{rep.name}</div>
                  <div className="text-xs text-gray-500">{rep.phone}</div>
                  <div className="text-xs text-gray-500">{rep.email}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{rep.brand} {rep.model}</div>
                  <div className="text-gray-500 text-sm">{rep.year} • {rep.mileage.toLocaleString("fr-FR")} km</div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{rep.condition}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(rep.createdAt).toLocaleDateString("fr-FR")}</span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    rep.status === "nouveau" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                    rep.status === "en_estimation" ? "bg-blue-50 text-blue-700 border-blue-200" :
                    rep.status === "estimation_envoyee" ? "bg-green-50 text-green-700 border-green-200" :
                    "bg-gray-50 text-gray-700 border-gray-200"
                  }>
                    {rep.status === "nouveau" && "Nouveau"}
                    {rep.status === "en_estimation" && "En estimation"}
                    {rep.status === "estimation_envoyee" && "Estimation envoyée"}
                    {rep.status === "clos" && "Clos"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline">Voir & Estimer</Button>
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
