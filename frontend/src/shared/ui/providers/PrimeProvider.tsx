"use client";
import React from "react";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

export default function PrimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrimeReactProvider
      value={{
        ripple: true,
        inputStyle: "outlined",
        unstyled: true,
        pt: Tailwind,
      }}
    >
      {children}
    </PrimeReactProvider>
  );
}
