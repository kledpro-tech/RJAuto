"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl font-bold text-red-500 mb-4">Oups ! Quelque chose s'est mal passé.</h2>
      <p className="text-gray-600 max-w-md mb-8">
        Une erreur inattendue s'est produite. Nous nous excusons pour la gêne occasionnée.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} variant="default">
          Réessayer
        </Button>
        <Button render={<Link href="/" />} variant="outline">
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
