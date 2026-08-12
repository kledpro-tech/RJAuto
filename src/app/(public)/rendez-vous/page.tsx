// @ts-nocheck
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Car } from "lucide-react";

import { mockVehicles } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const rdvSchema = z.object({
  type: z.enum(["telephone", "agence"], { message: "Veuillez choisir un type de RDV." }),
  date: z.date({ message: "Veuillez choisir une date." }),
  time: z.string({ message: "Veuillez choisir un horaire." }),
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Adresse email invalide." }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide." }),
  message: z.string().optional(),
});

type RdvFormValues = z.infer<typeof rdvSchema>;

const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", 
  "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
];

function RdvForm() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("vehicule");
  const selectedVehicle = mockVehicles.find(v => v.slug === slug);

  const form = useForm<RdvFormValues>({
    resolver: zodResolver(rdvSchema),
    defaultValues: {
      type: "agence",
      name: "",
      email: "",
      phone: "",
      message: selectedVehicle ? `Bonjour, je souhaite prendre rendez-vous pour le véhicule : ${selectedVehicle.brand} ${selectedVehicle.model}.` : "",
    },
  });

  const selectedDate = form.watch("date");
  const selectedTime = form.watch("time");

  function onSubmit(data: RdvFormValues) {
    console.log(data);
    toast.success("Demande de rendez-vous envoyée !", {
      description: `Votre RDV est en attente de confirmation pour le ${format(data.date, "dd/MM/yyyy")} à ${data.time}.`,
    });
    form.reset();
  }

  // Disable past dates
  const disabledDays = [{ before: new Date() }];

  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Prendre un rendez-vous
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Sélectionnez une date et un créneau horaire pour nous rencontrer en agence ou pour un échange téléphonique.
          </p>
        </div>

        {selectedVehicle && (
          <div className="mb-8 p-4 bg-gray-50 border rounded-lg flex items-center gap-4">
            <div className="bg-black text-white p-3 rounded-full">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Véhicule concerné</h3>
              <p className="text-sm text-gray-600">{selectedVehicle.brand} {selectedVehicle.model} - {selectedVehicle.price.toLocaleString("fr-FR")} €</p>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Étape 1 : Type de RDV */}
            <div className="p-6 border rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 border-b pb-2">1. Type de rendez-vous</h2>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-lg flex-1 cursor-pointer hover:bg-gray-50 [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-gray-50">
                          <FormControl>
                            <RadioGroupItem value="agence" />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="font-medium cursor-pointer">En agence</FormLabel>
                            <p className="text-xs text-gray-500">Venez voir le véhicule sur place</p>
                          </div>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 p-4 border rounded-lg flex-1 cursor-pointer hover:bg-gray-50 [&:has([data-state=checked])]:border-black [&:has([data-state=checked])]:bg-gray-50">
                          <FormControl>
                            <RadioGroupItem value="telephone" />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel className="font-medium cursor-pointer">Par téléphone</FormLabel>
                            <p className="text-xs text-gray-500">Un conseiller vous rappelle</p>
                          </div>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Étape 2 : Date & Heure */}
            <div className="p-6 border rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 border-b pb-2">2. Date & Heure</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date souhaitée</FormLabel>
                      <Popover>
                        <PopoverTrigger render={
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: fr })
                              ) : (
                                <span>Choisir une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        } />
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            {...({
                              mode: "single",
                              selected: field.value,
                              onSelect: field.onChange,
                              disabled: disabledDays,
                              initialFocus: true,
                              locale: fr
                            } as any)}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-3">
                  <FormLabel className={!selectedDate ? "opacity-50" : ""}>Créneau horaire</FormLabel>
                  {!selectedDate ? (
                    <div className="p-4 bg-gray-50 text-sm text-gray-500 rounded-md border text-center">
                      Veuillez d'abord sélectionner une date
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          className="w-full text-xs"
                          onClick={() => form.setValue("time", time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                  {form.formState.errors.time && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.time.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Étape 3 : Coordonnées */}
            <div className="p-6 border rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6 border-b pb-2">3. Vos coordonnées</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Adresse email</FormLabel>
                      <FormControl>
                        <Input placeholder="jean@exemple.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Message (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Précisions supplémentaires..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full text-base py-6">
              Confirmer la demande de rendez-vous
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function RdvPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Chargement...</div>}>
      <RdvForm />
    </Suspense>
  );
}
