import  { useState } from "react";
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import {motion,AnimatePresence} from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b relative ">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 ">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Brain className="h-6 w-6" />
          <span>ConnectToCare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link to="/autism" className="text-sm font-medium hover:underline">
            Autism
          </Link>
          <Link to="/ADHD" className="text-sm font-medium hover:underline">
            ADHD
          </Link>
          <Link to="/detection" className="text-sm font-medium hover:underline">
            Detection Test
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline">
            About Us
          </Link>
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:flex">
          <Link to="/login">
          <button className="
          rounded-lg
          border border-emerald-600
          px-4 py-2
          text-sm font-medium
          text-emerald-700
          transition
          hover:bg-emerald-50
          hover:text-emerald-800
          focus:outline-none focus:ring-2 focus:ring-emerald-500
        ">
          Log in
          </button>
        </Link>
      </div>


        {/* Mobile Menu Button */}
        <button
          className="md:hidden border p-2 rounded"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {mobileMenuOpen && (
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10,transition:{duration:0.1,ease:"easeOut"}}}  className="md:hidden flex flex-col gap-4 p-4 bg-white shadow absolute w-full z-50">
          <Link to="/autism" onClick={() => setMobileMenuOpen(false)}>
            Autism
          </Link>
          <Link to="/adhd" onClick={() => setMobileMenuOpen(false)}>
            ADHD
          </Link>
          <Link to="/detection" onClick={() => setMobileMenuOpen(false)}>
            Detection Test
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
          <button className="border px-4 py-2 rounded w-full ">
            Log in
          </button>
          </Link>
        </motion.nav>
      )}
      </AnimatePresence>
    </header>
  );
}
