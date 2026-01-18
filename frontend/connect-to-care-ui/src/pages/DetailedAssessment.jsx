import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Sparkles,Brain} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const assessmentSchema = z.object({
  title: z.string().min(3, "Title is required"),
  notes: z.string().min(20, "Please provide more detailed observations"),
});

export default function DetailedAssessment() {
  const form = useForm({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: "",
      notes: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Observation data for AI:", data);
    // later → send to AI backend
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto">

        <Link
          to="/detection"
          className="inline-flex items-center text-sm text-gray-600 hover:text-emerald-600 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Screening
        </Link>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            Detailed Behavioral Observation
          </h1>
          <p className="text-gray-600 mb-8">
            Share detailed observations to help our AI analyze behavioral patterns.
          </p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-6"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Assessment Title
              </label>
              <input
                {...form.register("title")}
                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g., Initial observation for child"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Behavioral Notes & Observations
              </label>
              <textarea
                {...form.register("notes")}
                rows={8}
                className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-emerald-500"
                placeholder="Describe communication, social interaction, repetitive behaviors, etc."
              />
              {form.formState.errors.notes && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.notes.message}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-amber-500" />
                AI works best with specific behavioral examples.
              </p>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 transition"
              >
                <Brain className="h-4 w-4" />
                Run AI Analysis
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
