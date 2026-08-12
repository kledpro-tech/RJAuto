// @ts-nocheck
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { BellRing } from "lucide-react";

import { BRANDS, FUEL_TYPES } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const alertSchema = z.object({
  email: z.string().email("Adresse email invalide."),
  brand: z.string().optional(),
  model: z.string().optional(),
  maxPrice: z.coerce.number().optional(),
  minYear: z.coerce.number().optional(),
  fuel: z.string().optional(),
});

type AlertFormValues = z.infer<typeof alertSchema>;

export default function AlertsPage() {
  const form = useForm<AlertFormValues>({
    resolver: zodResolver(alertSchema) as any,
    defaultValues: {
      email: "",
      brand: "",
      model: "",
    },
  });

  function onSubmit(data: AlertFormValues) {
    console.log(data);
    toast.success("Alerte créée avec succès !", {
      description: "Vous serez averti(e) par email dès qu'un véhicule correspondra à vos critères.",
    });
    form.reset();
  }

  return (
    <div className="bg-gray-50 py-16 sm:py-24 min-h-screen">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="bg-black p-4 rounded-full inline-flex mb-4">
            <BellRing className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Créer une alerte véhicule
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Vous ne trouvez pas votre bonheur dans notre stock actuel ? 
            Définissez vos critères et soyez le premier informé dès qu'un véhicule correspond à vos attentes.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre adresse email <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="jean.dupont@exemple.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="font-medium text-lg border-b pb-2">Vos critères de recherche (optionnels)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marque</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Toutes marques" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BRANDS.map(brand => (
                            <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        <Input placeholder="Ex: Golf" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget maximum (€)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 15000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Année minimum</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 2015" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fuel"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Carburant</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Tous carburants" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {FUEL_TYPES.map(fuel => (
                            <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button type="submit" size="lg" className="w-full">
                  M'alerter par email
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Vous pourrez vous désinscrire à tout moment grâce au lien présent dans les emails d'alerte.
                </p>
              </div>
            </form>
          </Form>
        </div>

      </div>
    </div>
  );
}
