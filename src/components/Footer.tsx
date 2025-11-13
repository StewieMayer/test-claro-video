import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-600 text-gray-200 py-6 mt-10 border-t border-gray-700">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Antonio Amaya.
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/StewieMayer"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/tu-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="mailto:stewiemayer@correo.com"
            className="hover:text-white transition-colors duration-200"
          >
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;