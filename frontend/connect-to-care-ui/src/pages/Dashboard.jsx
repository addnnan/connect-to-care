import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../services/api";
import { 
  Brain, 
  FileText, 
  PlusCircle, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  ShieldAlert, 
  Calendar,
  Layers
} from "lucide-react";

// Dynamic Risk Badge Color Map Helper
function getRiskStyle(risk) {
  const normalized = risk?.toString().toLowerCase() || "";
  if (normalized.includes("high")) {
    return "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/40";
  }
  if (normalized.includes("mod")) {
    return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40";
  }
  return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40";
}

// Contextual Layout Icon Helper
function getAssessmentMeta(type, details) {
  if (type === "detailed-ai") {
    const isAdhd = details?.primary_indication?.includes("ADHD");
    return {
      title: `AI Screen: ${details?.primary_indication || "Behavioral Analysis"}`,
      icon: Sparkles,
      color: isAdhd ? "text-purple-500 bg-purple-50 dark:bg-purple-950/40" : "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
    };
  }
  if (type === "adhd") {
    return { title: "ADHD Screening (ARS-IV)", icon: Zap, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/40" };
  }
  return { title: "Autism Screening (M-CHAT-R)", icon: Brain, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40" };
}

// Animation Constants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/assessments");
      const rawList = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || response.data?.assessments || []);
      setAssessments(rawList);
    } catch (err) {
      console.error("Failed to fetch dashboard evaluations", err);
    } finally {
      setLoading(false);
    }
  };

  const latestAssessment = assessments[0];
  const latestMeta = latestAssessment ? getAssessmentMeta(latestAssessment.type, latestAssessment.details) : null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 transition-colors duration-300 dark:bg-slate-950">
      <motion.div 
        className="max-w-4xl mx-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* Header Block Section */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1 text-sm dark:text-slate-400">
              Review tracked developer analytics, automated diagnostics, and next steps.
            </p>
          </div>
          
          <Link
            to="/assessments"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white text-sm font-semibold hover:bg-emerald-500 transition shadow-sm active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4" />
            New Dynamic Screening
          </Link>
        </motion.div>

        {/* Hero Card Overview Section */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 dark:bg-slate-900 dark:border-slate-800"
        >
          <div className="flex items-start gap-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${latestMeta ? latestMeta.color : "bg-gray-100 text-gray-400 dark:bg-slate-800"}`}>
              {latestMeta ? <latestMeta.icon className="h-6 w-6" /> : <Layers className="h-6 w-6" />}
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-gray-400 block mb-0.5">
                Latest screening result
              </span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-snug">
                {latestMeta ? latestMeta.title : "No structural tests executed yet"}
              </h2>
              {latestAssessment && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getRiskStyle(latestAssessment.result)}`}>
                    {latestAssessment.result} Likelihood
                  </span>
                  <span className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(latestAssessment.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {latestAssessment && (
            <Link
              to={latestAssessment.type === "detailed-ai" ? "/detailed-result" : `/result/${latestAssessment._id || latestAssessment.id}`}
              state={latestAssessment.type === "detailed-ai" ? latestAssessment.details : latestAssessment}
              className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/80"
            >
              Review Diagnostics
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </motion.div>

        {/* Content Splitting Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Block Column: Recent History Timeline list */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Assessment History Tracking
                </h3>
              </div>
            </div>

            {loading ? (
              <div className="p-10 text-center text-sm text-gray-400">Loading data elements...</div>
            ) : assessments.length === 0 ? (
              <div className="p-12 text-center">
                <ShieldAlert className="h-8 w-8 text-gray-300 mx-auto mb-2 dark:text-slate-700" />
                <p className="text-sm text-gray-500 dark:text-slate-400">No structured reports stored yet.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-slate-800/60">
                {assessments.map((item) => {
                  const isDetailedAI = item.type === "detailed-ai";
                  const meta = getAssessmentMeta(item.type, item.details);
                  const Icon = meta.icon;

                  return (
                    <li key={item._id || item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40 transition">
                      <Link
                        to={isDetailedAI ? "/detailed-result" : `/result/${item._id || item.id}`}
                        state={isDetailedAI ? item.details : item}
                        className="flex items-center justify-between px-6 py-4 group text-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.color}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 truncate dark:text-white">
                              {meta.title}
                            </p>
                            <span className="text-xs text-gray-400 dark:text-slate-500">
                              {new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 flex-shrink-0">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getRiskStyle(item.result)}`}>
                            {item.result}
                          </span>
                          <ArrowRight className="h-4 w-4 text-gray-300 group-hover:translate-x-0.5 transition-transform dark:text-slate-700" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>

          {/* Right Column Section Actions panels */}
          <div className="space-y-6 flex flex-col justify-start">
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm space-y-3 dark:bg-slate-900 dark:border-slate-800"
            >
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Quick Action Entry</h4>
              
              <Link
                to="/assessments"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-gray-50 transition group dark:border-slate-800 dark:bg-slate-950/20 dark:hover:bg-slate-800/50"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-slate-200">Standard Question Inventory</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">M-CHAT-R/F & ARS-IV Inventories</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/detection/detailed"
                className="flex items-center justify-between p-3 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-gray-50 transition group dark:border-slate-800 dark:bg-slate-950/20 dark:hover:bg-slate-800/50"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-slate-200">Generative Observation Screen</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Free-text narrative analysis diary</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-indigo-50/40 border border-indigo-100/60 rounded-2xl p-4 dark:bg-indigo-950/10 dark:border-indigo-900/30">
              <h5 className="text-xs font-bold text-indigo-900 uppercase tracking-wider dark:text-indigo-400">Clinical Guide Disclaimer</h5>
              <p className="text-[11px] text-indigo-700/90 leading-relaxed mt-1.5 dark:text-indigo-300/80">
                All algorithmic calculations generated by this platform serve explicitly as early- childhood developmental triage heuristics. They completely lack diagnostic authority and must be verified by a certified clinic physician.
              </p>
            </motion.div>
          </div>

        </div>

      </motion.div>
    </div>
  );
}