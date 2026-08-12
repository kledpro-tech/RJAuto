import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-9xl font-bold text-gray-200">404</h2>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page introuvable</h1>
      <p className="mt-6 text-base leading-7 text-gray-600 max-w-md">
        Désolé, nous n'avons pas pu trouver la page que vous recherchez. 
        Elle a peut-être été déplacée ou n'existe plus.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button render={<Link href="/" />} size="lg">
          Retour à l'accueil
        </Button>
        <Button render={<Link href="/vehicules" />} variant="outline" size="lg">
          Voir nos véhicules
        </Button>
      </div>
    </div>
  );
}
