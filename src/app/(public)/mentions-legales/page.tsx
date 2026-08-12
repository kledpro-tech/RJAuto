import { SITE_CONFIG } from "@/lib/mock-data";

export default function LegalPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-10">Mentions Légales & CGV</h1>
        
        <div className="prose prose-gray max-w-none space-y-8 text-gray-600">
          
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Éditeur du site</h2>
            <p>
              Le site <strong>{SITE_CONFIG.name}</strong> est édité par la société {SITE_CONFIG.name}, 
              société par actions simplifiée (SAS) au capital de 10 000 euros.
            </p>
            <p>
              <strong>Siège social :</strong> {SITE_CONFIG.address}<br />
              <strong>RCS :</strong> Bobigny B 123 456 789<br />
              <strong>TVA Intracommunautaire :</strong> FR 12 345678901<br />
              <strong>Téléphone :</strong> {SITE_CONFIG.phoneFormatted}<br />
              <strong>Email :</strong> {SITE_CONFIG.email}
            </p>
            <p>
              <strong>Directeur de la publication :</strong> M. Directeur RJ
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc.<br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789<br />
              États-Unis
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Conditions Générales de Vente (CGV)</h2>
            <p>
              Les présentes conditions générales s'appliquent à l'ensemble des ventes de véhicules d'occasion 
              conclues par {SITE_CONFIG.name} avec des acheteurs non professionnels.
            </p>
            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.1. Réservation et Acompte</h3>
            <p>
              Toute réservation d'un véhicule doit s'accompagner du versement d'un acompte représentant 
              10% du prix total de vente. En cas de rétractation de l'acheteur (hors cas prévus par la loi 
              comme le refus de crédit), cet acompte restera acquis à {SITE_CONFIG.name}.
            </p>
            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.2. Garantie</h3>
            <p>
              Tous nos véhicules bénéficient d'une garantie commerciale de 3 mois minimum incluant moteur, boîte et pont, 
              conformément au carnet de garantie remis lors de la livraison. Cette garantie s'ajoute à la garantie légale 
              des vices cachés (Art. 1641 et suivants du Code civil).
            </p>
            <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.3. Livraison</h3>
            <p>
              Le transfert de propriété est subordonné au paiement intégral du prix (clause de réserve de propriété). 
              L'acheteur prend à sa charge tous les risques relatifs au véhicule dès sa livraison physique.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Propriété Intellectuelle</h2>
            <p>
              L'ensemble des éléments constituant ce site (textes, images, logos, design) sont la propriété 
              exclusive de {SITE_CONFIG.name}. Toute reproduction, même partielle, est strictement interdite sans 
              autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Protection des Données (RGPD)</h2>
            <p>
              Les informations recueillies via nos formulaires (contact, rendez-vous, reprise, alertes) 
              sont enregistrées dans un fichier informatisé par {SITE_CONFIG.name} pour la gestion de la clientèle.
            </p>
            <p>
              Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux 
              données vous concernant et les faire rectifier en contactant notre service via l'adresse : 
              {SITE_CONFIG.email}.
            </p>
            <p>
              <strong>Note (Maquette) :</strong> Ce site étant une maquette de démonstration, aucune donnée réelle n'est actuellement sauvegardée dans une base de données pérenne.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
