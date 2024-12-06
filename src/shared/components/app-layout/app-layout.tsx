"use client";
import { useEffect, useState } from "react";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="max-w-[850px] mx-auto w-full min-h-[calc(100vh-410px)] mt-20 md:mt-5 py-10 px-3">
        {children}
      </main>
      <Footer />
    </>
  );
}
