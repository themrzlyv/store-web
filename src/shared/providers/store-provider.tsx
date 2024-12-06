"use client";
import React, { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/store";

type Props = {
  children: React.ReactNode;
};

export function StoreProvider({ children }: Props) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = store;
  }

  return (
    <>
      <Provider store={storeRef.current}>{children}</Provider>
    </>
  );
}
