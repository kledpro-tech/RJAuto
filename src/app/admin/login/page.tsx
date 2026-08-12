"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/lib/mock-data";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fake login logic for mockup
    if (email && password) {
      toast.success("Connexion réussie");
      router.push("/admin");
    } else {
      toast.error("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au site public
        </Link>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black">
          <Lock className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Espace Administrateur
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {SITE_CONFIG.name} — Gestion du parc et des rendez-vous
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border">
          <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm mb-6 border border-blue-100">
            <p className="font-semibold mb-1">Mode Maquette</p>
            <p>La vérification est désactivée. Entrez n'importe quel email et mot de passe pour accéder au back-office.</p>
          </div>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email">Adresse email</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@rjauto.fr"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
