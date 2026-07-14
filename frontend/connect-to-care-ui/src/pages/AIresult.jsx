import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle,
  Info,
  ArrowRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AssessmentDetailedResult() {
  const location = useLocation();

  // Mock AI output (replace with backend later)
  const result = location.state || {
    likelihood: "Moderate",
    confidence: 72,
    analysis:
      "The behavioral description suggests challenges related to attention regulation, social responsiveness, and sensory sensitivity. These patterns may benefit from structured support and further professional evaluation.",
    recommendations: [
      "Consider a formal developmental evaluation by a qualified professional.",
      "Use structured daily routines to support predictability and focus.",
      "Explore guided support modules aligned with observed behaviors.",
    ],
  };

  const riskStyles = {
    Low: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
    Moderate: "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    High: "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400",
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        className="max-w-3xl mx-auto space-y-8"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Detailed Assessment Result
          </h1>
          <p className="text-gray-600 mt-2 dark:text-slate-400">
            AI-assisted behavioral analysis summary
          </p>
        </div>

        {/* Likelihood */}
        <div
          className={`rounded-xl p-6 text-center transition-colors duration-300 ${riskStyles[result.likelihood]}`}
        >
          <span className="uppercase text-sm tracking-wider opacity-80">
            Likelihood
          </span>
          <h2 className="text-3xl font-bold mt-1">
            {result.likelihood}
          </h2>
          <p className="mt-2 text-sm">
            Confidence level:{" "}
            <span className="font-medium">{result.confidence}%</span>
          </p>
        </div>

        {/* AI Summary */}
        <motion.div
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-colors duration-300 dark:bg-slate-900 dark:border-slate-800"
          variants={fadeUp}
        >
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4 dark:text-white">
            <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            AI Analysis Summary
          </h3>
          <p className="text-gray-700 leading-relaxed dark:text-slate-300">
            {result.analysis}
          </p>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition-colors duration-300 dark:bg-slate-900 dark:border-slate-800"
          variants={fadeUp}
        >
          <h3 className="text-xl font-semibold mb-4 dark:text-white">
            Recommended Next Steps
          </h3>
          <div className="space-y-3">
            {result.recommendations.map((rec, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg transition-colors duration-300 dark:bg-slate-800/40"
              >
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-1 flex-shrink-0 dark:text-emerald-400" />
                <p className="text-gray-700 dark:text-slate-300">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={fadeUp}
        >
          <Link
            to="/modules/autism"
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 transition dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Explore support modules
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/doctors"
            className="flex items-center justify-center gap-2 rounded-lg border border-emerald-600 px-6 py-3 text-emerald-700 hover:bg-emerald-50 transition dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-slate-800"
          >
            Find a healthcare professional
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 p-4 rounded-lg transition-colors duration-300 dark:bg-blue-950/20 dark:border-blue-900/40">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0 dark:text-blue-400" />
          <p className="text-xs text-blue-700 leading-relaxed dark:text-blue-300">
            This assessment uses AI for screening and guidance only. It does not
            provide a medical diagnosis and should not replace professional
            evaluation.
          </p>
        </div>
      </motion.div>
    </main>
  );
}