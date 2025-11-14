// app/page.tsx

"use client";

import { useState, useEffect, FormEvent } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Certifications from "./components/Certifications";
import Services from "./components/Services";
import About from "./components/About";
import Projects from "./components/Projects";
import Resources from "./components/Resources";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Define a type for our captcha state for better type safety
type CaptchaState = {
  num1: number;
  num2: number;
  solution: number;
};

export default function HomePage() {
  // State for mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // State for the simple captcha
  const [captcha, setCaptcha] = useState<CaptchaState>({
    num1: 0,
    num2: 0,
    solution: 0,
  });

  // State for form submission messages
  const [contactMessage, setContactMessage] = useState("");
  const [catalogMessage, setCatalogMessage] = useState("");
  const [captchaError, setCaptchaError] = useState(false);

  // Initialize AOS and generate the first captcha on component mount
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false, // Allows animations to repeat on scroll
      easing: "ease-out-cubic",
      offset: 120,
    });
    generateCaptcha();
  }, []); // Empty dependency array ensures this runs only once

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to generate a new captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 9) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    setCaptcha({
      num1,
      num2,
      solution: num1 + num2,
    });
    setCaptchaError(false); // Reset error state
  };

  // Handler for the contact form submission
  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const userResponse = parseInt(
      formData.get("captcha-response") as string,
      10
    );

    if (userResponse !== captcha.solution) {
      setCaptchaError(true);
      setContactMessage(""); // Clear success message
      generateCaptcha(); // Generate a new challenge
      return;
    }

    // --- If captcha is correct ---
    setCaptchaError(false);
    // Here you would typically send the form data to an API endpoint
    console.log("Form submitted successfully:", Object.fromEntries(formData));

    // Show success message and reset form
    setContactMessage("¡Mensaje enviado con éxito!");
    form.reset();
    generateCaptcha();

    // Hide success message after 5 seconds
    setTimeout(() => {
      setContactMessage("");
    }, 5000);
  };

  // Handler for the catalog form submission
  const handleCatalogSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    // Here you would send the email to your backend/API
    console.log("Catalog request submitted:", new FormData(form).get("email"));

    // Show success message
    setCatalogMessage("¡Gracias! El catálogo ha sido enviado a tu correo.");
    form.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
      setCatalogMessage("");
    }, 5000);
  };

  return (
    <>
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <main>
        <Hero />
        <Certifications />
        <Services />
        <About />
        <Projects />
        <Resources
          handleCatalogSubmit={handleCatalogSubmit}
          catalogMessage={catalogMessage}
        />
        <Contact
          captcha={captcha}
          captchaError={captchaError}
          contactMessage={contactMessage}
          handleContactSubmit={handleContactSubmit}
        />
      </main>
      <Footer />
    </>
  );
}
