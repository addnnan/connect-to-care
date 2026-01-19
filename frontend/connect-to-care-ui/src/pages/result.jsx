import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Result() {
  const location = useLocation();

  // Mock data (later comes from backend / ML)
    const { score, risk } = location.state || { score: 0, risk: "low" };

  const riskConfig = {
    Low: {
      color: "emerald",
      icon: CheckCircle,
      title: "Low likelihood indicators",
      message:
        "Based on the responses, there are currently fewer indicators associated with developmental concerns.",
      recommendation:
        "You may continue monitoring development and explore general learning support resources.",
    },
    Medium: {
      color: "amber",
      icon: Info,
      title: "Moderate likelihood indicators",
      message:
        "Some behavioral patterns may benefit from closer observation or additional screening.",
      recommendation:
        "You may consider a detailed assessment or structured support modules.",
    },
    High: {
      color: "rose",
      icon: AlertTriangle,
      title: "Higher likelihood indicators",
      message:
        "Several behavioral indicators suggest that professional evaluation could be helpful.",
      recommendation:
        "We strongly recommend consulting a qualified healthcare professional.",
    },
  };

  const config = riskConfig[risk];
  const Icon = config.icon;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <motion.div
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-${config.color}-100`}
          >
            <Icon className={`h-7 w-7 text-${config.color}-600`} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Assessment Result {score}
          </h1>
          <p className="mt-2 text-gray-600">
            AI-assisted screening summary
          </p>
        </div>

        {/* Result Summary */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className={`border-l-4 border-${config.color}-500 bg-${config.color}-50 rounded-lg p-4 mb-6`}
        >
          <h2 className="font-semibold text-gray-900 mb-1">
            {config.title}
          </h2>
          <p className="text-gray-700">{config.message}</p>
        </motion.div>

        {/* Recommendation */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="font-medium text-gray-900 mb-2">
            What this means
          </h3>
          <p className="text-gray-600">{config.recommendation}</p>
        </motion.div>

        {/* Next Actions */}
        <motion.div
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {(risk === "Medium" || risk === "High") && (
            <Link
              to="/assessment/detailed"
              className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-800">
                Take a detailed behavioral assessment
              </span>
              <ArrowRight className="h-4 w-4 text-gray-500" />
            </Link>
          )}

          <Link
            to={
              risk === "High"
                ? "/modules/autism"
                : "/modules/general"
            }
            className="flex items-center justify-between rounded-lg border px-4 py-3 hover:bg-gray-50 transition"
          >
            <span className="font-medium text-gray-800">
              Explore recommended support modules
            </span>
            <ArrowRight className="h-4 w-4 text-gray-500" />
          </Link>

          {risk === "High" && (
            <Link
              to="/doctors"
              className="flex items-center justify-between rounded-lg bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700 transition"
            >
              <span className="font-medium">
                Find a healthcare professional
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          className="mt-8 text-xs text-gray-400 text-center"
        >
          This result is based on an AI-assisted screening tool and does not
          provide a medical diagnosis. Always consult a qualified healthcare
          professional for clinical evaluation.
        </motion.p>
      </motion.div>
    </main>
  );
}
