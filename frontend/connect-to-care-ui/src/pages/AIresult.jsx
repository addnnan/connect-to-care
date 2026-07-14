import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { Brain, CheckCircle, Info, ArrowRight, Eye, ShieldAlert, Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AssessmentDetailedResult() {
  const location = useLocation();
  const stateData = location.state || {};

  // 1. Safely locate where the AI payload lives (Dashboard item vs form save payload)
  const result = stateData.details ? stateData.details : stateData;

  // 2. Extract domain flags cleanly with fallback parameters so nested objects never read as undefined
  const domainFlags = result?.domain_flags || {
    asd_social_communication: false,
    asd_repetitive_behaviors: false,
    adhd_inattention: false,
    adhd_hyperactivity_impulsivity: false,
  };

  // 3. Fallback extraction safely mapping string values
  const primaryIndication = result?.primary_indication || "Behavioral Analysis Report";
  const likelihood = result?.likelihood || "Moderate";
  const confidence = result?.confidence || 50;
  const analysis = result?.analysis || "Behavioral logs reviewed by automated screening.";
  const specificObservations = result?.specific_observations || [];
  const recommendations = result?.recommendations || ["Consult a healthcare professional for an objective evaluation."];

  const riskStyles = {
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40",
    Moderate: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40",
    High: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/40",
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 transition-colors duration-300 dark:bg-slate-950">
      <motion.div
        className="max-w-3xl mx-auto space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        {/* Title Header */}
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Behavioral Screening Report
          </h1>
          <p className="text-gray-500 mt-2 dark:text-slate-400">
            Automated parsing of narrative observation entries against DSM-5 criteria
          </p>
        </div>

        {/* Condition / Likelihood Matrix Card */}
        <div className={`rounded-2xl border p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${riskStyles[likelihood] || riskStyles.Moderate}`}>
          <div>
            <span className="uppercase text-xs font-bold tracking-wider opacity-70 block mb-1">
              Primary Screen Indication
            </span>
            <h2 className="text-2xl font-bold">{primaryIndication}</h2>
            <p className="text-sm mt-1 opacity-90">
              Confidence Strength: <span className="font-bold">{confidence}%</span>
            </p>
          </div>
          <div className="sm:text-right">
            <span className="text-xs uppercase font-semibold opacity-70 block">Likelihood Level</span>
            <span className="text-xl font-black tracking-wide block sm:mt-1">{likelihood}</span>
          </div>
        </div>

        {/* Clinical Domain Flags Check */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
            Evaluated Structural Domains
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "ASD: Social Communication", active: domainFlags.asd_social_communication },
              { label: "ASD: Repetitive Behaviors", active: domainFlags.asd_repetitive_behaviors },
              { label: "ADHD: Inattention Profile", active: domainFlags.adhd_inattention },
              { label: "ADHD: Hyperactivity / Impulsivity", active: domainFlags.adhd_hyperactivity_impulsivity },
            ].map((domain, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 p-3 rounded-xl border text-sm transition-colors ${
                  domain.active 
                    ? "bg-indigo-50/50 border-indigo-200 text-indigo-900 dark:bg-indigo-950/20 dark:border-indigo-900/40 dark:text-indigo-300" 
                    : "bg-gray-50 border-gray-100 text-gray-400 dark:bg-slate-800/40 dark:border-slate-800 dark:text-slate-500"
                }`}
              >
                <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  domain.active ? "bg-indigo-600 text-white" : "bg-gray-200 text-transparent dark:bg-slate-800"
                }`}>
                  <Check className="h-3 w-3 stroke-[3]" />
                </div>
                <span className={domain.active ? "font-medium" : ""}>{domain.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Analysis Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
            <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            AI Observation Analysis
          </h3>
          <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-sm">
            {analysis}
          </p>
        </div>

        {/* Specific Observations Parsed */}
        {specificObservations && specificObservations.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-900 dark:text-white">
              <Eye className="h-5 w-5 text-blue-500" />
              Extracted Text Indicators
            </h3>
            <ul className="space-y-2.5">
              {specificObservations.map((obs, i) => (
                <li key={i} className="text-sm text-gray-600 dark:text-slate-400 flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  {obs}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actionable Clinical Recommendations */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Recommended Next Steps
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl dark:bg-slate-800/40">
                <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0 dark:text-emerald-400" />
                <p className="text-sm text-gray-700 dark:text-slate-300">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Action Links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={primaryIndication.includes("ADHD") ? "/adhd" : "/autism"}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-white font-medium hover:bg-emerald-500 transition shadow-sm"
          >
            Open Specialized Support Module
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to={primaryIndication.includes("ADHD") ? "/care-guidance/adhd" : "/care-guidance/autism"}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-white px-6 py-3.5 text-emerald-700 font-medium hover:bg-emerald-50 transition dark:bg-slate-900 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-slate-800"
          >
            Connect to Local Clinicians
          </Link>
        </div>

        {/* Clinical Disclaimer Buffer */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 p-4 rounded-xl dark:bg-blue-950/20 dark:border-blue-900/40">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0 dark:text-blue-400" />
          <p className="text-xs text-blue-700 leading-relaxed dark:text-blue-300">
            This report represents an algorithmic screening process designed to complement parental tracking. It is completely non-diagnostic and should be handed over to a certified professional for formal validation.
          </p>
        </div>
      </motion.div>
    </main>
  );
}