"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/layout/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <AdminSidebar />
      <main className="lg:pl-72">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          {children}
        </div>
      </main>
    </div>
  );
}
