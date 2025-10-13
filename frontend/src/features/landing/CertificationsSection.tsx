"use client";

const certs = [
  { id: "iws", name: "IWS ABS" },
  { id: "lloyd", name: "Lloyd's Register" },
  { id: "bv", name: "Bureau Veritas" },
];

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="py-16 bg-[color-mix(in_oklab,var(--fg)2%,transparent)]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Certificaciones</h2>
        <div className="flex gap-6 items-center">
          {certs.map((c) => (
            <div
              key={c.id}
              className="p-4 border rounded shadow-sm flex items-center gap-3"
            >
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                Logo
              </div>
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-muted">
                  Reconocida internacionalmente
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
