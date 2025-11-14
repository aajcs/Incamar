import React from "react";
import { Card } from "@/shared/ui/molecules/Card";
import { modules } from "../data/modulesData";

export default function FeaturesByModule() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {modules.map((m) => (
        <Card key={m.title} title={m.title}>
          <ul className="list-disc list-inside text-sm">
            {m.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </Card>
      ))}
    </section>
  );
}
