import { Brain, ShieldCheck, Users, Target, FileCheck, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.main 
      initial={{ opacity: 0, y: -10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-gray-50 min-h-screen transition-colors duration-300 dark:bg-slate-950"
    >

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20 px-4 dark:from-slate-900/50 dark:to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6 dark:text-white">
            About ConnectToCare
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-slate-400">
            A digital platform that uses validated clinical screening tools to
            help families take the first step toward understanding developmental
            and attention-related concerns.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid gap-8">

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 dark:bg-slate-900 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed dark:text-slate-400">
              Our mission is to make early developmental screening more accessible
              and less overwhelming — combining the same instruments paediatricians
              use, in a format parents can complete at home in minutes, with a
              clear path to professional care if it's needed.
            </p>
          </div>

          {/* Problem */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 dark:bg-slate-900 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                The Problem We Address
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed dark:text-slate-400">
              Early identification of concerns such as autism and ADHD is often
              delayed by limited access to screening tools, long waitlists for
              an initial evaluation, and uncertainty about whether a concern is
              worth raising at all. Many families simply don't know where to start.
            </p>
          </div>

          {/* What We Do */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 dark:bg-slate-900 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-2xl font-semibold text-gray-990 dark:text-white">
                What ConnectToCare Does
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4 dark:text-slate-400">
              ConnectToCare offers structured digital screenings built on
              established clinical instruments, with a domain-by-domain
              breakdown of results so families understand exactly where
              concerns are showing up — not just a single number.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-slate-400">
              <li className="flex gap-2">
                <FileCheck className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5 dark:text-emerald-400" />
                M-CHAT-R™ autism screening with two-stage follow-up
              </li>
              <li className="flex gap-2">
                <FileCheck className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5 dark:text-emerald-400" />
                ADHD Rating Scale IV (Preschool) screening
              </li>
              <li className="flex gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5 dark:text-emerald-400" />
                Domain-level breakdowns, not just a single risk label
              </li>
              <li className="flex gap-2">
                <FileCheck className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5 dark:text-emerald-400" />
                Downloadable PDF reports to share with a clinician
              </li>
            </ul>
          </div>

          {/* Responsible Use */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 dark:bg-slate-900 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                What This Platform Is — and Isn't
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed dark:text-slate-300">
              ConnectToCare scores responses using the same published, validated
              algorithms used in clinical practice — it does not use AI or machine
              learning to interpret behavior, and it does not provide a medical
              diagnosis. A screening result indicates likelihood only. Every result
              is meant to inform a conversation with a qualified healthcare
              professional, not replace one.
            </p>
          </div>

          {/* Who It's For */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 dark:bg-slate-900 dark:border-slate-800">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 dark:text-white">
              Who This Platform Is For
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 text-gray-600 dark:text-slate-400">
              <li className="border border-gray-200 rounded-xl p-4 dark:border-slate-800 dark:bg-slate-900/40">
                Parents seeking early developmental insights
              </li>
              <li className="border border-gray-200 rounded-xl p-4 dark:border-slate-800 dark:bg-slate-900/40">
                Adults exploring self-assessment options
              </li>
              <li className="border border-gray-200 rounded-xl p-4 dark:border-slate-800 dark:bg-slate-900/40">
                Healthcare professionals offering care services
              </li>
            </ul>
          </div>

          {/* Academic Context */}
          <div className="text-center pt-8 border-t border-gray-200 dark:border-slate-800">
            <p className="text-sm text-gray-500 max-w-3xl mx-auto dark:text-slate-500">
              ConnectToCare is an academic project developed to explore digital
              implementations of validated clinical screening instruments and
              care coordination pathways.
            </p>
          </div>

        </div>
      </section>
    </motion.main>
  );
}