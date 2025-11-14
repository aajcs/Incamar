import Features from "@/features/landing/sections/Features";
import FeaturesByModule from "@/features/landing/sections/FeaturesByModule";

export default function FeaturesPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Características</h1>
      <Features />
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Por módulo</h2>
        <FeaturesByModule />
      </div>
    </>
  );
}
