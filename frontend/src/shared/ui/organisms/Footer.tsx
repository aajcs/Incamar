export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] text-[var(--muted)]">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm flex items-center justify-between">
        <span>
          © {new Date().getFullYear()} Incamar. Todos los derechos reservados.
        </span>
        <nav className="flex gap-4">
          <a href="#" className="hover:underline">
            Privacidad
          </a>
          <a href="#" className="hover:underline">
            Términos
          </a>
        </nav>
      </div>
    </footer>
  );
}
