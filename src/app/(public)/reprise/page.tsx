// @ts-nocheck
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Info, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const repriseSchema = z.object({
  brand: z.string().min(2, "Veuillez renseigner la marque."),
  model: z.string().min(2, "Veuillez renseigner le modèle."),
  year: z.coerce.number().min(1990).max(new Date().getFullYear()),
  mileage: z.coerce.number().min(0),
  condition: z.string({ message: "Veuillez sélectionner l'état général." }),
  description: z.string().optional(),
  name: z.string().min(2, "Le nom est requis."),
  email: z.string().email("Adresse email invalide."),
  phone: z.string().min(10, "Numéro de téléphone invalide."),
});

type RepriseFormValues = z.infer<typeof repriseSchema>;

export default function ReprisePage() {
  const form = useForm<RepriseFormValues>({
    resolver: zodResolver(repriseSchema) as any,
    defaultValues: {
      brand: "",
      model: "",
      description: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(data: RepriseFormValues) {
    console.log(data);
    toast.success("Demande de reprise envoyée !", {
      description: "Nous reviendrons vers vous sous 24h avec une estimation.",
    });
    form.reset();
  }

  return (
    <div className="bg-gray-50 py-12 sm:py-16 min-h-screen">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Estimer ma reprise
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Remplissez ce formulaire avec les caractéristiques de votre véhicule. 
            Nous vous communiquerons une estimation de rachat sous 24h.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              {/* Infos véhicule */}
              <div>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                  Informations du véhicule
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marque</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Renault" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modèle</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Clio 5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2018" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kilométrage</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>État général</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez l'état de votre véhicule" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Excellent">Excellent état (proche du neuf)</SelectItem>
                            <SelectItem value="Bon">Bon état (usure normale)</SelectItem>
                            <SelectItem value="Moyen">État moyen (quelques rayures/coups)</SelectItem>
                            <SelectItem value="À réviser">À réviser (frais mécaniques/carrosserie à prévoir)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Précisions supplémentaires</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Options importantes, rayures spécifiques, entretiens récents..." 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Soyez le plus précis possible pour une estimation au plus juste.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Photos upload (mockup) */}
              <div>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                  Photos
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                  <UploadCloud className="h-10 w-10 text-gray-400 mb-4" />
                  <p className="text-sm font-medium text-gray-900">Cliquez pour ajouter des photos</p>
                  <p className="text-xs text-gray-500 mt-1">ou glissez-déposez vos fichiers ici</p>
                  <p className="text-xs text-gray-400 mt-4 max-w-xs">Pour le stade de la maquette, l'upload de photo n'est pas actif.</p>
                </div>
              </div>

              {/* Coordonnées */}
              <div>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                  Vos coordonnées
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse email</FormLabel>
                        <FormControl>
                          <Input placeholder="jean@exemple.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex gap-3 items-start text-sm">
                <Info className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  L'estimation fournie sera indicative. Une expertise physique du véhicule 
                  sera nécessaire dans nos locaux pour valider l'offre de rachat définitive.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full py-6 text-base">
                Recevoir mon estimation
              </Button>
            </form>
          </Form>
        </div>

      </div>
    </div>
  );
}
