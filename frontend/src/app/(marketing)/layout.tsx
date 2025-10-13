import Navbar from "@/shared/ui/organisms/Navbar";
import Footer from "@/shared/ui/organisms/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Navbar />
      <main className="w-full px-6 py-10">{children}</main>
      <Footer />
    </div>
  );
}
