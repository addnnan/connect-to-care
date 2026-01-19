import { Link } from "react-router-dom";
import { Brain, ArrowRight, ArrowLeft } from "lucide-react";
import {motion} from "framer-motion";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div initial = {{ opacity: 0, y: 0 }} animate = {{ opacity: 1, y: 0 }} className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

     <Link
          to="/"
          className="absolute left-4 top-4 flex items-center gap-1 text-sm text-slate-500 hover:text-emerald-600 transition font-semibold hover:border px-2 py-1 rounded-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>



        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Brain className="h-7 w-7 text-emerald-600" />
          <span className="text-xl font-semibold text-gray-900">
            
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">
          Sign in to your account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Access your assessments and connect to care
        </p>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-white font-medium hover:bg-emerald-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Guest Access */}
        <Link
          to="/assessment"
          className="flex items-center justify-center gap-2 w-full rounded-lg border border-emerald-600 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition"
        >
          Continue as Guest
          <ArrowRight className="h-4 w-4" />
        </Link>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span className="text-emerald-600 cursor-not-allowed">
            Register an account
          </span>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-xs text-gray-400 text-center">
          This platform provides screening support and does not replace
          professional medical diagnosis.
        </p>
      </motion.div>
    </div>
  );
}
