import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brain, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative border-b border-slate-200 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900 transition-colors dark:text-white">
          <Brain className="h-6 w-6 text-emerald-600" />
          <span>ConnectToCare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link to="/autism" className="text-sm font-medium text-slate-800 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
            Autism
          </Link>
          <Link to="/ADHD" className="text-sm font-medium text-slate-800 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
            ADHD
          </Link>
          <Link to="/assessments" className="text-sm font-medium text-slate-800 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
            Detection Test
          </Link>
          <Link to="/about" className="text-sm font-medium text-slate-800 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
            About Us
          </Link>
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-slate-100 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <AnimatePresence mode="wait">
              {theme === "light" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5 text-slate-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5 text-amber-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="h-10 w-10 rounded-full bg-emerald-600 text-white font-medium text-lg flex items-center justify-center hover:bg-emerald-700 transition"
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 dark:bg-slate-900 dark:border-slate-700">
                  {/* User Info */}
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {user.email}
                    </p>
                  </div>

                  {/* Menu */}
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      onClick={() => setOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 transition hover:bg-red-50 dark:hover:bg-slate-800"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg border border-emerald-600 bg-white px-4 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50 dark:bg-slate-900 dark:hover:bg-slate-800 dark:font-semibold dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden border border-slate-200 p-2 rounded transition hover:bg-gray-100 dark:border-slate-800 dark:text-white dark:hover:bg-gray-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="absolute w-full z-50 left-0 top-16 md:hidden flex flex-col gap-4 p-4 bg-white text-slate-800 shadow-lg border-t border-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800" 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10, transition: { duration: 0.1, ease: "easeOut" } }}
          >
            <Link to="/autism" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Autism
            </Link>
            <Link to="/ADHD" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 dark:hover:text-emerald-400">
              ADHD
            </Link>
            <Link to="/assessments" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 dark:hover:text-emerald-400">
              Detection Test
            </Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-600 dark:hover:text-emerald-400">
              About Us
            </Link>

            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 py-2 font-medium border-t border-slate-100 dark:border-slate-800 text-left"
            >
              {theme === "light" ? (
                <>
                  <Moon className="h-5 w-5" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5 text-amber-400" />
                  Light Mode
                </>
              )}
            </button>
            
            {user ? (
              <>
                <div className="flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                  <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                </div>

                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                  Profile
                </Link>

                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="font-medium hover:text-emerald-600 dark:hover:text-emerald-400">
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="border border-red-500 text-red-600 px-4 py-2 rounded w-full hover:bg-red-50 dark:hover:bg-red-950/30 transition duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full pt-2">
                <button className="border border-emerald-600 text-emerald-600 px-4 py-2 rounded w-full hover:bg-emerald-50 dark:hover:bg-slate-800 transition">
                  Log in
                </button>
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}