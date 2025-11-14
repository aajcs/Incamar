import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/features/landing/icons";
import React from "react";

const socialLinks = [
  { href: "#", icon: LinkedinIcon },
  { href: "#", icon: FacebookIcon },
  { href: "#", icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="bg-blue-950/60 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Ingeniería y Calidad Marina C.A.
            Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <link.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
