import Hero from "@/features/landing/components/Hero";
import Features from "@/features/landing/sections/Features";
import CTA from "@/features/landing/sections/CTA";

export default function Page() {
  return (
    <>
      <Hero />
      <div className="mt-10">
        <Features />
      </div>
      <CTA />
    </>
  );
}
