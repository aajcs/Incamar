import MarketingLayout from "@/app/(marketing)/layout";
import HeroClient from "@/features/landing/HeroClient";
import AboutSection from "@/features/landing/AboutSection";
import ServicesSection from "@/features/landing/ServicesSection";
import ProjectsSection from "@/features/landing/ProjectsSection";
import CertificationsSection from "@/features/landing/CertificationsSection";
import BlogSection from "@/features/landing/BlogSection";
import ContactSection from "@/features/landing/ContactSection";

export default function Page() {
  return (
    <MarketingLayout>
      <main>
        <section id="home" className="scroll-mt-20">
          <HeroClient />
        </section>

        <section id="about" className="mt-16 scroll-mt-20">
          <AboutSection />
        </section>

        <section id="services" className="mt-16 scroll-mt-20">
          <ServicesSection />
        </section>

        <section id="projects" className="mt-16 scroll-mt-20">
          <ProjectsSection />
        </section>

        <section id="certifications" className="mt-16 scroll-mt-20">
          <CertificationsSection />
        </section>

        <section id="blog" className="mt-16 scroll-mt-20">
          <BlogSection />
        </section>

        <section id="contact" className="mt-16 scroll-mt-20">
          <ContactSection />
        </section>
      </main>
    </MarketingLayout>
  );
}
