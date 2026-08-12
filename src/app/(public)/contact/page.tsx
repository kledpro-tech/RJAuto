// @ts-nocheck
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/mock-data";

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
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Adresse email invalide." }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide." }),
  subject: z.string().min(5, { message: "Le sujet doit contenir au moins 5 caractères." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    toast.success("Message envoyé !", {
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    form.reset();
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contactez-nous</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Une question ? Un projet d'achat ou de revente ? N'hésitez pas à nous contacter par téléphone, par message ou directement sur place.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
          
          {/* Contact info & Map */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Nos coordonnées</h2>
            <dl className="space-y-6 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Adresse</span>
                  <MapPin className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>{SITE_CONFIG.address}</dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Téléphone</span>
                  <Phone className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-gray-900" href={SITE_CONFIG.phoneLink}>
                    {SITE_CONFIG.phoneFormatted}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>
                  <a className="hover:text-gray-900" href={`mailto:${SITE_CONFIG.email}`}>
                    {SITE_CONFIG.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Horaires</span>
                  <Clock className="h-7 w-6 text-gray-400" aria-hidden="true" />
                </dt>
                <dd>{SITE_CONFIG.hours}</dd>
              </div>
            </dl>

            <div className="mt-10 h-80 bg-gray-200 rounded-2xl overflow-hidden">
              <iframe 
                src={SITE_CONFIG.mapEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte Google Maps RJ Auto"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Envoyez-nous un message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <Input placeholder="Demande de renseignements..." {...field} />
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Votre message ici..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Envoyer le message
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
        </div>
      </div>
    </div>
  );
}
