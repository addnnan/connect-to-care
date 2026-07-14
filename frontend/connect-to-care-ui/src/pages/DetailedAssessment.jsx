import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Sparkles, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const assessmentSchema = z.object({
  title: z.string().min(3, "Title is required"),
  notes: z.string().min(20, "Please provide more detailed observations"),
});

export default function DetailedAssessment() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: "",
      notes: "",
    },
  });
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      // 1. Get the newly structured AI analysis from your Python backend
      const res = await fetch("http://127.0.0.1:8000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: data.notes }),
      });

      if (!res.ok) throw new Error(`Backend error ${res.status}`);
      const aiResult = await res.json();

      // 2. Wrap it in your system's standard assessment log format
      const assessmentRecord = {
        type: "detailed-ai", // Unique type identifier for history tracking
        date: new Date().toISOString(),
        result: aiResult.likelihood, 
        score: aiResult.confidence, // Successfully tracks the corrected integer confidence percentage
        details: aiResult, // Keeps the entire structure (domain_flags, observations, etc.)
      };

      // 3. Save the full record to your database route
      const saveResponse = await api.post("/assessments", assessmentRecord);

      // 4. Navigate to the results page passing the clean nested object layout
      navigate("/detailed-result", {
        state: saveResponse.data
      });
      
    } catch (err) {
      console.error("ERROR:", err);
      alert("Something went wrong while analyzing and saving the assessment.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 transition-colors duration-300 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/assessments"
          className="inline-flex items-center text-sm text-gray-600 hover:text-emerald-600 mb-6 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Screening
        </Link>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2 dark:text-white">
            Detailed Behavioral Observation
          </h1>
          <p className="text-gray-600 mb-8 dark:text-slate-400">
            Share detailed observations to help our AI analyze behavioral patterns.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6 border border-transparent transition-colors duration-300 dark:bg-slate-900 dark:border-slate-800"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">
                Assessment Title
              </label>
              <input
                {...form.register("title")}
                className="w-full rounded-lg border px-4 py-3 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-400"
                placeholder="e.g., Initial observation for child"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500 mt-1 dark:text-red-400">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-slate-300">
                Behavioral Notes & Observations
              </label>
              <textarea
                {...form.register("notes")}
                rows={8}
                className="w-full rounded-lg border px-4 py-3 border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-emerald-400"
                placeholder="Describe communication, social interaction, repetitive behaviors, etc."
              />
              {form.formState.errors.notes && (
                <p className="text-sm text-red-500 mt-1 dark:text-red-400">
                  {form.formState.errors.notes.message}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-500 flex items-center gap-1 dark:text-slate-400">
                <Sparkles className="h-4 w-4 text-amber-500" />
                AI works best with specific behavioral examples.
              </p>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                disabled={loading}
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 transition disabled:opacity-50 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                <Brain className="h-4 w-4" />
                {loading ? "Analyzing..." : "Run AI Analysis"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}