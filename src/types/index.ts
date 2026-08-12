export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  price: number; // en euros
  fuel: "Essence" | "Diesel" | "Hybride" | "Électrique";
  transmission: "Manuelle" | "Automatique";
  color: string;
  doors: number;
  seats: number;
  power: string;
  engine: string;
  description: string;
  positivePoints: string[];
  negativePoints: string[];
  images: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  vehicleId?: string;
  vehicleLabel?: string;
  type: "telephone" | "agence";
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  message?: string;
  status: "nouveau" | "confirmé" | "terminé" | "annulé";
  createdAt: string;
}

export interface BuybackRequest {
  id: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  condition: "Bon état" | "État moyen" | "À réviser";
  description?: string;
  images: string[];
  name: string;
  phone: string;
  email: string;
  status: "nouveau" | "en_estimation" | "estimation_envoyee" | "clos";
  createdAt: string;
}

export interface VehicleAlert {
  id: string;
  email: string;
  brand?: string;
  model?: string;
  maxPrice?: number;
  minYear?: number;
  maxMileage?: number;
  fuel?: string;
  active: boolean;
  createdAt: string;
}

export interface Availability {
  id: string;
  dayOfWeek?: number; // 0=dimanche, 1=lundi, ..., 6=samedi
  specificDate?: string;
  startTime?: string;
  endTime?: string;
  isOpen: boolean;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
