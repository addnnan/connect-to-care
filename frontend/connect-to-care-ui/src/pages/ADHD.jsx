import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Clock,
  CheckCircle,
  Focus,
  ArrowRight,
  ChevronDown,
  Timer,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ─── Real activity content ────────────────────────────────────────────────────
const ACTIVITIES = [
  {
    id: "focus-timer",
    title: "Focus Timer",
    type: "tool",
    to: "/adhd/focus-timer",
    summary: "An interactive focus/break timer using short, manageable work sessions.",
  },
  {
    id: "task-breakdown",
    title: "Task Breakdown Exercise",
    type: "guide",
    to: "/adhd/task-breakdown",
    summary: "Printable worked examples for turning overwhelming tasks into small, doable steps.",
  },
  {
    id: "impulse-pause",
    title: "Impulse Pause Challenge",
    type: "expand",
    summary: "A simple pause-and-reflect technique before acting on impulse.",
    detail: {
      steps: [
        "When you notice the urge to act, blurt, or interrupt — pause and take one slow breath.",
        "Silently count to 5 before responding or acting.",
        "Ask yourself: 'what happens if I wait 10 seconds?'",
        "If it's still important after the pause, go ahead and say or do it.",
        "Practice this during low-stakes moments first (games, casual chats) before high-stakes ones.",
      ],
    },
  },
  {
    id: "routine-builder",
    title: "Routine Builder",
    type: "expand",
    summary: "Create a predictable, visual daily structure.",
    detail: {
      steps: [
        "List the 5–8 main events of the day in order (wake up, breakfast, work/school, etc.).",
        "Attach a rough time or order — not exact minutes, just sequence.",
        "Use a physical checklist or whiteboard, not just a mental list.",
        "Check off each item as completed for a visible sense of progress.",
        "Keep the same core structure daily; adjust only one element at a time if it's not working.",
      ],
    },
  },
  {
    id: "goal-tracker",
    title: "Goal Tracker",
    type: "expand",
    summary: "Break long-term goals into trackable weekly actions.",
    detail: {
      steps: [
        "Write one goal in a single, specific sentence (not vague — 'finish math homework by Friday' not 'do better in school').",
        "List 3 small actions that move toward it this week.",
        "Put a visible tracker somewhere you'll see daily — a sticky note, whiteboard, or phone widget.",
        "Mark progress daily, even small steps count.",
        "Review and reset the goal every Sunday, regardless of how the week went.",
      ],
    },
  },
  {
    id: "reflection-log",
    title: "Attention Reflection Log",
    type: "expand",
    summary: "A short daily log to notice focus patterns.",
    detail: {
      steps: [
        "At the end of the day, note one task where focus was easy and one where it was hard.",
        "Ask: what was different about the environment, time of day, or task type?",
        "Use a simple 1–5 scale instead of long writing if that's easier.",
        "Look for patterns weekly — certain times or settings that help or hurt focus.",
        "Use what you learn to schedule harder tasks during your best focus windows.",
      ],
    },
  },
];

export default function ADHD() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
            ADHD Support Modules
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Structured, activity-based support designed to improve focus, organization,
            and daily functioning for individuals with attention-related challenges.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid gap-10">

          {/* What This Helps With */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm border p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              What This Module Helps With
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Feature
                icon={Focus}
                title="Attention & Focus"
                text="Exercises designed to improve sustained attention and reduce distractions."
              />
              <Feature
                icon={Clock}
                title="Time Management"
                text="Structured routines and task planning techniques to manage daily activities."
              />
              <Feature
                icon={CheckCircle}
                title="Impulse Control"
                text="Activities that encourage pause, reflection, and controlled responses."
              />
            </div>
          </motion.div>

          {/* Activities — now fully functional */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm border p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Activities
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Some activities open as interactive tools, others as printable
              guides, and a few expand here with quick instructions.
            </p>

            <div className="space-y-3">
              {ACTIVITIES.map((activity) => (
                <ActivityRow
                  key={activity.id}
                  activity={activity}
                  isExpanded={expandedId === activity.id}
                  onToggle={() =>
                    setExpandedId(expandedId === activity.id ? null : activity.id)
                  }
                />
              ))}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            className="bg-indigo-50 border border-indigo-200 rounded-2xl p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Recommended Next Steps
            </h2>
            <p className="text-gray-700 mb-6">
              These modules are designed to support daily functioning and skill development.
              For persistent or severe challenges, professional evaluation is recommended.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/care-guidance/adhd"
                className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 transition"
              >
                Find a healthcare professional
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/assessment/adhd"
                className="flex items-center justify-center gap-2 rounded-lg border border-indigo-600 px-6 py-3 text-indigo-700 hover:bg-indigo-50 transition"
              >
                Retake screening assessment
              </Link>
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            className="text-xs text-gray-400 text-center max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            These modules are intended as supportive tools and do not replace professional
            diagnosis or treatment for ADHD.
          </motion.p>

        </div>
      </section>
    </main>
  );
}

/* ---------- Components ---------- */

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
}

function ActivityRow({ activity, isExpanded, onToggle }) {
  const TypeIcon = activity.type === "tool" ? Timer : activity.type === "guide" ? BookOpen : Brain;
  const typeLabel = activity.type === "tool" ? "Interactive" : activity.type === "guide" ? "Printable guide" : "Quick guide";
  const typeColor = activity.type === "tool"
    ? "bg-violet-50 text-violet-700"
    : activity.type === "guide"
    ? "bg-blue-50 text-blue-700"
    : "bg-indigo-50 text-indigo-700";

  if (activity.type === "tool" || activity.type === "guide") {
    return (
      <Link
        to={activity.to}
        className="flex items-center justify-between border rounded-xl p-5 hover:bg-gray-50 hover:shadow-sm transition group"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0">
            <TypeIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-gray-900">{activity.title}</span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
                {typeLabel}
              </span>
            </div>
            <p className="text-sm text-gray-500">{activity.summary}</p>
          </div>
        </div>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-3" />
      </Link>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition text-left"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0">
            <TypeIcon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-medium text-gray-900">{activity.title}</span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${typeColor}`}>
                {typeLabel}
              </span>
            </div>
            <p className="text-sm text-gray-500">{activity.summary}</p>
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 flex-shrink-0 ml-3 transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 bg-gray-50 border-t">
              <ol className="space-y-2 mt-3">
                {activity.detail.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-700">
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium flex items-center justify-center">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}