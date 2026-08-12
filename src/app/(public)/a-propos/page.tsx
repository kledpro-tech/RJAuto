import { SITE_CONFIG } from "@/lib/mock-data";
import { CheckCircle2, ShieldCheck, MapPin, Truck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">À Propos de RJ Auto</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Fondée en 2018 à Bondy, RJ Auto est une entreprise spécialisée dans l'achat et la revente de véhicules d'occasion. 
            Notre mission est de rendre l'acquisition d'un véhicule d'occasion simple, transparente et sécurisée.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <ShieldCheck className="h-5 w-5 flex-none text-black" aria-hidden="true" />
                La sécurité avant tout
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Chaque véhicule qui entre dans notre parc est rigoureusement inspecté par des professionnels. 
                  Nous fournissons une garantie systématique de 3 mois sur l'ensemble de notre stock, 
                  avec des possibilités d'extension pour vous offrir une tranquillité d'esprit totale sur la route.
                </p>
              </dd>
            </div>
            
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <CheckCircle2 className="h-5 w-5 flex-none text-black" aria-hidden="true" />
                Transparence totale
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  L'historique complet de nos voitures est disponible sur demande. Nous listons les points forts 
                  mais aussi les petits défauts (points d'attention) en toute transparence sur nos fiches véhicules. 
                  Pas de mauvaises surprises avec RJ Auto.
                </p>
              </dd>
            </div>
            
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <MapPin className="h-5 w-5 flex-none text-black" aria-hidden="true" />
                Accompagnement administratif
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  L'achat d'une voiture implique de nombreuses démarches. Notre équipe s'occupe de tout : 
                  déclaration d'achat, demande d'immatriculation (carte grise) et pose des plaques si nécessaire. 
                  Repartez au volant de votre nouvelle voiture en toute légalité.
                </p>
              </dd>
            </div>
            
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                <Truck className="h-5 w-5 flex-none text-black" aria-hidden="true" />
                Flexibilité et service sur mesure
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Nous savons que votre temps est précieux. C'est pourquoi nous proposons des rendez-vous par téléphone 
                  pour un premier contact, la possibilité d'estimer la reprise de votre ancien véhicule à distance, 
                  et un service de livraison de votre nouvelle voiture à domicile.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
