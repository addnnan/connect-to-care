import { Brain } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const footerHeading =
    "font-semibold text-slate-900 dark:text-white";

  const footerText =
    "text-sm text-slate-500 dark:text-slate-400";

  const linkClass =
    "text-sm text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors";

  const footerLinks = {
    Resources: [
      { label: "Autism Screening", to: "/assessment/autism" },
      { label: "ADHD Screening", to: "/assessment/adhd" },
      { label: "Detailed Assessment", to: "/detection/detailed" },
    ],
    Support: [
      { label: "Autism Support", to: "/autism" },
      { label: "ADHD Support", to: "/adhd" },
      { label: "Dashboard", to: "/dashboard" },
    ],
    Legal: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Use", to: "/terms" },
    ],
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-10 md:flex-row">

        {/* Logo */}
        <div className="flex-1">
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <Brain className="h-6 w-6 text-emerald-600" />
            <span>ConnectToCare</span>
          </div>

          <p className={`${footerText} mt-2 max-w-sm`}>
            Providing specialized support for autism and ADHD through
            AI-assisted screening and care guidance.
          </p>
        </div>

        {/* Links */}
        <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className={footerHeading}>{section}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200 dark:border-slate-800 py-4 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} ConnectToCare. All rights reserved.
        </p>
      </div>
    </footer>
  );
}