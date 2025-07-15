"use client";

import { UserProvider } from "@/contexts/userContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { StickyNavbar } from "../../components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <UserProvider>
        <StickyNavbar />
        <div className="app-container">
          <Toaster position="top-right" richColors />
          {children}
        </div>
      </UserProvider>
    </SessionProvider>
  );
}
