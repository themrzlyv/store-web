"use client";
import { useEffect, useState } from "react";
import { StoreProvider } from "./store-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastContainer } from "react-toastify";
import { Modal } from "../components/side-modal/side-modal";

export function MainProviders({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <StoreProvider>
      <ThemeProvider attribute="class" storageKey="themirzaliyev-store-theme">
        {children}
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        toastClassName="dark:bg-dark-light dark:text-dark-light-gray"
      />
      <Modal />
    </StoreProvider>
  );
}
