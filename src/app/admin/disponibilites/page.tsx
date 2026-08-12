"use client";

import { Info, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const DAYS = [
  { id: "lundi", label: "Lundi" },
  { id: "mardi", label: "Mardi" },
  { id: "mercredi", label: "Mercredi" },
  { id: "jeudi", label: "Jeudi" },
  { id: "vendredi", label: "Vendredi" },
  { id: "samedi", label: "Samedi" },
  { id: "dimanche", label: "Dimanche" },
];

export default function AdminAvailabilities() {
  const handleSave = () => {
    toast.success("Paramètres enregistrés", {
      description: "Vos horaires d'ouverture ont été mis à jour avec succès.",
    });
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Horaires et disponibilités</h1>
        <p className="mt-2 text-sm text-gray-700">
          Configurez vos jours et heures d'ouverture. Ces informations seront utilisées pour 
          proposer des créneaux aux clients lors de la prise de rendez-vous.
        </p>
      </div>

      <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex gap-3 items-start text-sm mb-8 border border-blue-100">
        <Info className="h-5 w-5 shrink-0 mt-0.5" />
        <p>
          <strong>Maquette :</strong> Les modifications effectuées ici ne sont pas réellement sauvegardées. 
          Il s'agit d'une interface de démonstration.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b bg-gray-50 flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Horaires d'ouverture réguliers</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {DAYS.map((day) => (
            <div key={day.id} className="flex items-center justify-between py-2 border-b last:border-0 last:pb-0">
              <div className="flex items-center space-x-3 w-1/3">
                <Checkbox id={day.id} defaultChecked={day.id !== "dimanche"} />
                <label 
                  htmlFor={day.id} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {day.label}
                </label>
              </div>
              
              <div className="flex items-center gap-4 w-2/3 justify-end">
                <div className="flex items-center gap-2">
                  <select className="text-sm border rounded p-1" defaultValue="10:00">
                    <option value="08:00">08:00</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                  </select>
                  <span>à</span>
                  <select className="text-sm border rounded p-1" defaultValue="20:00">
                    <option value="18:00">18:00</option>
                    <option value="19:00">19:00</option>
                    <option value="20:00">20:00</option>
                    <option value="21:00">21:00</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-gray-50 border-t flex justify-end">
          <Button onClick={handleSave}>
            Enregistrer les horaires
          </Button>
        </div>
      </div>
    </div>
  );
}
