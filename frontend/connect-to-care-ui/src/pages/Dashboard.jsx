import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {useState, useEffect} from "react";
import api from "../services/api";

import {
  Brain,
  FileText,
  PlusCircle,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  // TEMP: replace later with backend / localStorage
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    const response =
      await api.get("/assessments");

    setAssessments(response.data);
};




  // const assessments = JSON.parse(localStorage.getItem("connect_to_care_assessments")) || [];

  const latestAssessment = assessments[0];




  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-semibold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Review assessments and continue care
          </p>
        </motion.div>

        {/* Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row justify-between gap-6"
        >
          <div>
            <p className="text-sm text-gray-500 mb-1">Latest Assessment</p>
            <h2 className="text-xl font-semibold text-gray-900">
              {latestAssessment?.result ?? "No assessment yet"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {latestAssessment?.date ? new Date(latestAssessment.date).toLocaleString() : "—"}
            </p>
          </div>

          <Link
            to="/detection"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-3 text-white text-sm font-medium hover:bg-emerald-700 transition"
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
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Assessment History
            </h3>
          </div>

          {assessments.length === 0 ? (
            <p className="text-sm text-gray-500">
              No assessments available yet.
            </p>
          ) : (
            <ul className="divide-y">
              {assessments.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                   <p className="text-md font-semibold text-gray-900">
                      {item.type === "autism" ? "Autism" : "ADHD"} Assessment
                    </p>

                    <p className="text-xs text-gray-600">
                      {item.result} likelihood
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleString()}
                    </p>
                  </div>

                  <Link
                    to={`/result/${item._id}`}
                    state={item}
                    className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:underline"
                  >
                    View result
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              ))}
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
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <Brain className="h-6 w-6 text-emerald-600 mb-3" />
            <h4 className="font-semibold text-gray-900">
              Start Screening
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Quick autism & ADHD screening
            </p>
          </Link>

          <Link
            to="/detection/detailed"
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <FileText className="h-6 w-6 text-emerald-600 mb-3" />
            <h4 className="font-semibold text-gray-900">
              Detailed Assessment
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              In-depth behavioral evaluation
            </p>
          </Link>
        </motion.div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Assessments are screening tools and not medical diagnoses.
        </p>
      </div>
    </div>
  );
}
