import  { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import {motion,AnimatePresence} from "framer-motion";
import {  useRef, useEffect } from "react";




export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

 
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
};
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

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
          <Link to="/assessments" className="text-sm font-medium hover:underline">
            Detection Test
          </Link>
          <Link to="/about" className="text-sm font-medium hover:underline">
            About Us
          </Link>
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:flex">
          {user ? (
  <div className="relative"ref={dropdownRef}>
    <button
      onClick={() => setOpen(!open)}
      className="h-10 w-10 rounded-full bg-emerald-600 text-white font-semibold flex items-center justify-center hover:bg-emerald-700 transition"
    >
      {user.name?.charAt(0).toUpperCase()}
    </button>

    {open && (
      <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border z-50">
        
        {/* User Info */}
        <div className="p-4 border-b">
          <p className="font-semibold text-gray-900">
            {user.name}
          </p>
          <p className="text-sm text-gray-500">
            {user.email}
          </p>
        </div>

        {/* Menu */}
        <div className="py-2">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>

          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm hover:bg-gray-50"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>

          <button
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            // onClick={() => setOpen(false)}
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
    className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
  >
    Login
  </Link>
)}
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
         {user ? (
  <>
    <div className="flex items-center gap-3 border-t pt-4">
      <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">
        {user.name?.charAt(0).toUpperCase()}
      </div>

      <div>
        <p className="font-medium text-sm">{user.name}</p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>
    </div>

    <Link
      to="/profile"
      onClick={() => setMobileMenuOpen(false)}
      className="font-medium"
    >
      Profile
    </Link>

    <Link
      to="/dashboard"
      onClick={() => setMobileMenuOpen(false)}
      className="font-medium"
    >
      Dashboard
    </Link>

    <button
      onClick={() => {
        handleLogout();
        setMobileMenuOpen(false);
      }}
      className="border border-red-500 text-red-600 px-4 py-2 rounded w-full"
    >
      Logout
    </button>
  </>
) : (
  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
    <button className="border px-4 py-2 rounded w-full">
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
