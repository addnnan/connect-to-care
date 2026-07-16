import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, TestTube, ArrowRight, BookOpen } from "lucide-react";

// ─── Animation variants — fast, snappy timings ────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 18 },
  },
};

export default function Home() {
  return (
    <>
      <main className="flex-1">

        {/* HERO SECTION */}
        <section className="relative w-full pb-16 pt-20 md:pt-28 bg-gradient-to-b from-green-100 via-white to-green-50 transition-colors duration-300 dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center text-center gap-14"
              initial="hidden"
              animate="visible"
              variants={container}
            >

              <div className="space-y-6">
                <motion.span
                  variants={fadeUp}
                  transition={{ duration: 0.2 }}
                  className="md:text-xl text-sm flex items-center justify-center gap-2 font-semibold text-gray-700 dark:text-gray-300"
                >
                  <Brain className="h-4 w-4 md:h-6 md:w-6 text-emerald-600 dark:text-emerald-400" />
                  Specialized Therapy for Autism & ADHD
                </motion.span>

                <motion.h1
                  variants={fadeUp}
                  transition={{ duration: 0.25 }}
                  className="max-w-4xl text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight bg-gradient-to-r from-slate-900 via-emerald-700 to-slate-900 dark:from-gray-100 dark:via-emerald-400 dark:to-gray-100 bg-clip-text text-transparent"
                >
                  Early Autism Screening Simplified for Everyone
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  transition={{ duration: 0.25 }}
                  className="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-400"
                >
                  AI-powered screening and guided access to care for parents and toddlers.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-md mx-auto flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center"
                >
                  <Link to="/assessments" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                    >
                      Start Detection Test
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </Link>

                  <Link to="/detection/detailed" className="w-full sm:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="w-full flex items-center justify-center gap-2 rounded-lg border border-emerald-600 bg-white px-6 py-3 text-base font-medium text-emerald-700 transition-colors hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-900 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-slate-800"
                    >
                      Behavioral Test
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              </div>

              {/* THERAPY CARDS */}
              <motion.div
                variants={container}
                className="grid gap-8 sm:grid-cols-2 w-full max-w-5xl mx-auto"
              >

                <motion.div
                  variants={cardVariant}
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="flex flex-col items-center space-y-4 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl transition-shadow hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900/80"
                >
                  <motion.div
                    variants={iconPop}
                    className="rounded-full bg-purple-100 p-3 dark:bg-purple-950/50"
                  >
                    <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Autism Therapy</h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Modules for autism therapy and development.
                  </p>
                  <Link to="/autism">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="flex items-center gap-2 border border-purple-400 text-purple-600 px-4 py-2 rounded-md transition-colors hover:bg-purple-50 dark:border-purple-700 dark:text-purple-400 dark:hover:bg-purple-950/60"
                    >
                      Explore Modules
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div
                  variants={cardVariant}
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className="flex flex-col items-center space-y-4 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl transition-shadow hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900/80"
                >
                  <motion.div
                    variants={iconPop}
                    className="rounded-full bg-blue-100 p-3 dark:bg-blue-950/50"
                  >
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">ADHD Therapy</h3>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Interactive strategies for ADHD.
                  </p>
                  <Link to="/adhd">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="flex items-center gap-2 border border-blue-400 text-blue-600 px-4 py-2 rounded-md transition-colors hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/80"
                    >
                      Explore Modules
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </Link>
                </motion.div>

              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* APPROACH SECTION */}
        <section className="py-20 bg-gradient-to-b from-green-50 via-white to-green-100 transition-colors duration-300 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.25 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-4 dark:text-gray-200"
            >
              Our Approach
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.25, delay: 0.04 }}
              className="max-w-3xl mx-auto text-gray-600 mb-12 dark:text-gray-400"
            >
              We combine AI-powered early screening with guided access to care, helping
              individuals take timely and informed next steps.
            </motion.p>

            <motion.div
              className="grid gap-8 lg:grid-cols-3 max-w-5xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={container}
            >

              <motion.div
                variants={cardVariant}
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="p-8 rounded-2xl border border-green-500 bg-white shadow-xl transition-shadow hover:shadow-2xl dark:border-slate-800 dark:bg-gray-900"
              >
                <motion.div variants={iconPop}>
                  <TestTube className="h-8 w-8 text-green-600 mb-4 mx-auto dark:text-green-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-100">Early Detection</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Scientifically backed screening tools for early identification.
                </p>
              </motion.div>

              <motion.div
                variants={cardVariant}
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="p-8 rounded-2xl border border-green-500 bg-white shadow-xl transition-shadow hover:shadow-2xl dark:border-slate-800 dark:bg-gray-900"
              >
                <motion.div variants={iconPop}>
                  <Brain className="h-8 w-8 text-purple-600 mb-4 mx-auto dark:text-purple-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-100">AI-Powered Screening</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our system analyzes questionnaire responses using machine learning
                  to estimate autism likelihood.
                </p>
              </motion.div>

              <motion.div
                variants={cardVariant}
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="p-8 rounded-2xl border border-green-500 bg-white shadow-xl transition-shadow hover:shadow-2xl dark:border-slate-800 dark:bg-gray-900"
              >
                <motion.div variants={iconPop}>
                  <ArrowRight className="h-8 w-8 text-blue-600 mb-4 mx-auto dark:text-blue-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-100">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor development with structured insights and reports.
                </p>
              </motion.div>

            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}