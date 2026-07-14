import { Link } from "react-router-dom";
import { Brain, TestTube, ArrowRight, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="flex-1">

        {/* HERO SECTION */}
        <section className="relative w-full pb-16 pt-20 md:pt-28 bg-gradient-to-b from-green-100 via-white to-green-50 transition-colors duration-300 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center gap-14">

              <div className="space-y-6">
                <span className="md:text-xl text-sm flex items-center justify-center gap-2 font-semibold text-gray-700 dark:text-gray-300">
                  <Brain className="h-4 w-4 md:h-6 md:w-6 text-emerald-600 dark:text-emerald-400" />
                  Specialized Therapy for Autism & ADHD
                </span>

                <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-900 dark:from-gray-100 dark:via-emerald-400 dark:to-gray-100 bg-clip-text text-transparent">
                  Early Autism Screening Simplified for Everyone
                </h1>

                <p className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400">
                  AI-powered screening and guided access to care for parents and toddlers.
                </p>

                <div className="w-full max-w-md mx-auto flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center">
                  <Link to="/assessments" className="w-full sm:w-auto">
                    <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500">
                      Start Detection Test
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>

                  <Link to="/detection/detailed" className="w-full sm:w-auto">
                    <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-white px-6 py-3 text-base font-medium text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-900 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-slate-800">
                      Behavioral Test
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* THERAPY CARDS */}
              <div className="grid gap-8 sm:grid-cols-2 w-full max-w-5xl mx-auto">

                <div className="flex flex-col items-center space-y-4 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl hover:scale-105 transition dark:border-gray-800 dark:bg-gray-900/80">
                  <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-950/50">
                    <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Autism Therapy</h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Modules for autism therapy and development.
                  </p>
                  <Link to="/autism">
                    <button className="flex items-center gap-2 border border-purple-400 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-950/60">
                      Explore Modules
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>

                <div className="flex flex-col items-center space-y-4 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl hover:scale-105 transition dark:border-gray-800 dark:bg-gray-900/80">
                  <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-950/50">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">ADHD Therapy</h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Interactive strategies for ADHD.
                  </p>
                  <Link to="/adhd">
                    <button className="flex items-center gap-2 border border-blue-400 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/80">
                      Explore Modules
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* APPROACH SECTION */}
        <section className="py-20 bg-gradient-to-b from-green-50 via-white to-green-100 transition-colors duration-300 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-4 dark:text-gray-200">
              Our Approach
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 mb-12 dark:text-gray-400">
              We combine AI-powered early screening with guided access to care, helping
              individuals take timely and informed next steps.
            </p>

            <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">

              <div className="p-8 rounded-2xl border border-green-500 bg-white shadow-xl hover:scale-105 transition dark:border-slate-800 dark:bg-gray-900">
                <TestTube className="h-8 w-8 text-green-600 mb-4 mx-auto dark:text-green-400" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-100">Early Detection</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Scientifically backed screening tools for early identification.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-green-500 bg-white shadow-xl hover:scale-105 transition dark:border-slate-800 dark:bg-gray-900">
                <Brain className="h-8 w-8 text-purple-600 mb-4 mx-auto dark:text-purple-400" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-100">AI-Powered Screening</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our system analyzes questionnaire responses using machine learning
                  to estimate autism likelihood.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-green-500 bg-white shadow-xl hover:scale-105 transition dark:border-slate-800 dark:bg-gray-900">
                <ArrowRight className="h-8 w-8 text-blue-600 mb-4 mx-auto dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-100">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor development with structured insights and reports.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}