"use client";

import { ReactNode } from "react";
import HeaderPrivate from "@/components/protected/HeaderPrivate/page";
import ThemeToggle from "@/components/ui/themeToggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <HeaderPrivate>
            <ThemeToggle />
          </HeaderPrivate>
          <main>{children}</main>
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
