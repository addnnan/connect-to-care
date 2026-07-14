import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../services/api";

import {
  Brain,
  FileText,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    const response = await api.get("/assessments");
    setAssessments(response.data);
  };

  const latestAssessment = assessments[0];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 transition-colors duration-300 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1 dark:text-slate-400">
            Review assessments and continue care
          </p>
        </motion.div>

        {/* Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row justify-between gap-6 border border-transparent dark:bg-slate-900 dark:border-slate-800"
        >
          <div>
            <p className="text-sm text-gray-500 mb-1 dark:text-slate-400">Latest Assessment</p>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {latestAssessment?.result ?? "No assessment yet"}
            </h2>
            <p className="text-sm text-gray-500 mt-1 dark:text-slate-500">
              {latestAssessment?.date ? new Date(latestAssessment.date).toLocaleString() : "—"}
            </p>
          </div>

          <Link
            to="/assessments"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-white text-sm font-medium hover:bg-emerald-700 transition dark:bg-emerald-600 dark:hover:bg-emerald-500 self-start sm:self-center"
          >
            <PlusCircle className="h-4 w-4" />
            New Assessment
          </Link>
        </motion.div>

        {/* Assessment History */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-6 border border-transparent dark:bg-slate-900 dark:border-slate-800"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Assessment History
            </h3>
          </div>

          {assessments.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-slate-400">
              No assessments available yet.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-slate-800">
              {assessments.map((item) => {
                // Determine user-friendly display titles based on the evaluation type
                const isDetailedAI = item.type === "detailed-ai";
                let displayTitle = "";
                
                if (isDetailedAI) {
                  displayTitle = `Detailed AI Screen: ${item.details?.primary_indication || "Behavioral Analysis"}`;
                } else {
                  displayTitle = `${item.type === "autism" ? "Autism" : "ADHD"} Screening`;
                }

                return (
                  <li key={item._id} className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-md font-semibold text-gray-900 dark:text-white">
                        {displayTitle}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-slate-300">
                        {item.result} Likelihood {isDetailedAI && `(Confidence: ${item.score}%)`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-500">
                        {new Date(item.date).toLocaleString()}
                      </p>
                    </div>

                    {/* Dynamic routing parameter choice */}
                    <Link
                      to={isDetailedAI ? "/detailed-result" : `/result/${item._id}`}
                      state={isDetailedAI ? item.details : item}
                      className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:underline dark:text-emerald-400"
                    >
                      View result
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid sm:grid-cols-2 gap-6"
        >
          <Link
            to="/assessments"
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg border border-transparent transition dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800/60"
          >
            <Brain className="h-6 w-6 text-emerald-600 mb-3 dark:text-emerald-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Start Screening
            </h4>
            <p className="text-sm text-gray-600 mt-1 dark:text-slate-400">
              Quick autism & ADHD screening
            </p>
          </Link>

          <Link
            to="/detection/detailed"
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg border border-transparent transition dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800/60"
          >
            <FileText className="h-6 w-6 text-emerald-600 mb-3 dark:text-emerald-400" />
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Detailed Assessment
            </h4>
            <p className="text-sm text-gray-600 mt-1 dark:text-slate-400">
              In-depth behavioral evaluation
            </p>
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-6 dark:text-slate-500">
          Assessments are screening tools and not medical diagnoses.
        </p>
      </div>
    </div>
  );
}