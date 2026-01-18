import { Link } from "react-router-dom";
import {Brain,TestTube, ArrowRight,BookOpen} from "lucide-react";


export default function Home() {
  return (
    <>
      <main className="flex-1">

        {/* HERO SECTION */}
        <section className="relative w-full pb-16 pt-20 md:pt-28 bg-gradient-to-b from-green-100 via-white to-green-50 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center gap-14">

              <div className="space-y-6">
                <span className="text-xl flex items-center justify-center gap-2 text-black-500 font-semibold">
                  <Brain className="h-6 w-6 text-black-600" />
                  Specialized Therapy for Autism & ADHD
                </span>

               <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-gray-900 via-emerald-800 to-gray-900 bg-clip-text text-transparent">


                  Early Autism Screening Simplified for Everyone
                </h1>

                <p className="max-w-3xl mx-auto text-xl md:text-xl text-gray-600">
                  AI-powered screening and guided access to care for parents and adults.
                </p>

                <div className="w-full max-w-md mx-auto flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center">
                  <Link to="/detection" className="w-full sm:w-auto">
                    <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      Start Detection Test
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>

                  <Link to="/therapy-modules" className="w-full sm:w-auto">
                    <button className="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-white px-6 py-3 text-base font-medium text-emerald-700 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      Explore Modules
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </Link>
                </div>

              </div>

              {/* THERAPY CARDS */}
              <div className="grid gap-8 sm:grid-cols-2 w-full max-w-5xl mx-auto">

                <div className="flex flex-col items-center space-y-4 rounded-2xl border border-black-500 bg-white/80 p-8 shadow-xl hover:scale-105 transition">
                  <div className="rounded-full bg-purple-100 p-3">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black-600">Autism Therapy</h3>
                  <p className="text-center text-gray-600">
                    Modules for autism therapy and development.
                  </p>
                  <Link to="/autism">
                    <button className="flex items-center gap-2 border border-purple-400 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition">
                      Explore Modules
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>

                <div className="flex flex-col items-center space-y-4 rounded-2xl border border-black-500 bg-white/80 p-8 shadow-xl hover:scale-105 transition">
                  <div className="rounded-full bg-blue-100 p-3">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-black-600">ADHD Therapy</h3>
                  <p className="text-center text-gray-600">
                    Interactive strategies for ADHD.
                  </p>
                  <Link to="/dyslexia">
                    <button className="flex items-center gap-2 border border-blue-400 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition">
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
        <section className="py-20 bg-gradient-to-b from-green-50 via-white to-green-100">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-4">
              Our Approach
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 mb-12">
              We combine AI-powered early screening with guided access to care, helping individuals take timely and informed next steps.
            </p>

            <div className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto">

              <div className="p-8 rounded-2xl border border-green-500 bg-white shadow-xl hover:scale-105 transition">
                <TestTube className="h-8 w-8 text-green-600 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-black-600 mb-2">Early Detection</h3>
                <p className="text-gray-600">
                  Scientifically backed screening tools for early identification.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-green-500 bg-white shadow-xl hover:scale-105 transition">
                <Brain className="h-8 w-8 text-purple-600 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-black-600 mb-2">AI-Powered Screening</h3>
                <p className="text-gray-600">
                  Our system analyzes questionnaire responses using machine learning to estimate autism likelihood.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-green-500 bg-white shadow-xl hover:scale-105 transition">
                <ArrowRight className="h-8 w-8 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-bold text-black-600 mb-2">Progress Tracking</h3>
                <p className="text-gray-600">
                  Monitor development with structured insights and reports.
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      {/* <Footer /> */}
    </>
  );
}
