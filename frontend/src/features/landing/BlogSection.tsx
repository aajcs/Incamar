"use client";

const posts = Array.from({ length: 3 }).map((_, i) => ({
  id: `b${i + 1}`,
  title: `Artículo Ejemplo ${i + 1}`,
  excerpt:
    "Breve extracto del artículo que invita al lector a profundizar en el tema.",
  date: "2025-09-01",
}));

export default function BlogSection() {
  return (
    <section id="blog" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">
          Últimas Noticias y Artículos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((p) => (
            <article key={p.id} className="p-4 border rounded">
              <div className="h-36 bg-gray-200 rounded mb-3" />
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-muted">{p.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
