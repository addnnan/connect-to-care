import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  MessageCircle,
  Users,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Gamepad2,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// ─── Real activity content ────────────────────────────────────────────────────
// type: "game" → links to a fully interactive page
// type: "guide" → links to a fully built printable guide page
// type: "expand" → expands inline with real, usable instructions
const ACTIVITIES = [
  {
    id: "emotion-matching",
    title: "Emotion Matching Game",
    type: "game",
    to: "/autism/emotion-matching",
    summary: "An interactive game to practice recognising 6 basic emotions from facial expressions.",
  },
  {
    id: "social-story",
    title: "Social Story Practice",
    type: "guide",
    to: "/autism/social-story",
    summary: "Three printable social stories for common situations: doctor visits, sharing, and routine changes.",
  },
  {
    id: "sensory-comfort",
    title: "Sensory Comfort Planner",
    type: "expand",
    summary: "Build a simple sensory comfort plan together.",
    detail: {
      steps: [
        "Identify 2–3 sensations that are often overwhelming (loud noise, bright light, certain textures).",
        "List one calming tool for each — noise-cancelling headphones, sunglasses, a soft fidget toy.",
        "Pick a quiet 'safe spot' at home and at school that's always available.",
        "Practice naming the feeling out loud: 'this is too loud, I need my headphones.'",
        "Review the plan together once a week and adjust as needed.",
      ],
    },
  },
  {
    id: "visual-board",
    title: "Visual Communication Board",
    type: "expand",
    summary: "A simple picture-based board for expressing needs.",
    detail: {
      steps: [
        "Print or draw 6–8 cards: water, bathroom, hungry, tired, happy, sad, help, break.",
        "Laminate or place in a small photo album for durability.",
        "Practice pointing to one card during calm moments first, not just during distress.",
        "Keep the board in the same accessible spot every day so it becomes routine.",
        "Add new cards gradually as new needs come up — don't overload it at once.",
      ],
    },
  },
  {
    id: "routine-builder",
    title: "Routine Builder",
    type: "expand",
    summary: "Create a predictable visual daily schedule.",
    detail: {
      steps: [
        "List the 5–8 main events of the day in order (wake up, breakfast, school, etc.).",
        "Use simple icons or photos next to each step, not just text.",
        "Let the child move or check off each item as it's completed — this builds a sense of control.",
        "Keep the same structure daily; only change one element at a time if needed.",
        "Review the next day's routine together the night before to reduce morning anxiety.",
      ],
    },
  },
  {
    id: "reflection-log",
    title: "Interaction Reflection Log",
    type: "expand",
    summary: "A short daily log to track social wins and challenges.",
    detail: {
      steps: [
        "After a social interaction (playdate, class, family event), ask 3 quick questions: What happened? How did it feel? What would you do again?",
        "Use a simple 1–5 scale or emoji faces instead of long writing if that's easier.",
        "Look for patterns weekly — certain settings or people that go especially well or poorly.",
        "Celebrate one specific win each week, however small.",
        "Share patterns with a therapist or teacher if useful for broader support planning.",
      ],
    },
  },
];

export default function Autism() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
            Autism Support Modules
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Structured, gentle activities designed to support communication,
            social interaction, and sensory regulation.
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
                icon={MessageCircle}
                title="Communication Skills"
                text="Activities that support expressive and receptive communication."
              />
              <Feature
                icon={Users}
                title="Social Interaction"
                text="Guided exercises focused on understanding social cues and interaction."
              />
              <Feature
                icon={Sparkles}
                title="Sensory Regulation"
                text="Supportive activities to help manage sensory sensitivity and comfort."
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
            className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Recommended Next Steps
            </h2>
            <p className="text-gray-700 mb-6">
              These modules are designed to support daily development and skill-building.
              For personalized guidance or diagnosis, professional evaluation is recommended.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/care-guidance/autism"
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-white hover:bg-emerald-700 transition"
              >
                Find a healthcare professional
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/assessment/autism"
                className="flex items-center justify-center gap-2 rounded-lg border border-emerald-600 px-6 py-3 text-emerald-700 hover:bg-emerald-50 transition"
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
            These modules are intended as supportive tools and do not replace
            professional diagnosis or treatment for autism spectrum conditions.
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
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
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
  const TypeIcon = activity.type === "game" ? Gamepad2 : activity.type === "guide" ? BookOpen : Brain;
  const typeLabel = activity.type === "game" ? "Interactive" : activity.type === "guide" ? "Printable guide" : "Quick guide";
  const typeColor = activity.type === "game"
    ? "bg-violet-50 text-violet-700"
    : activity.type === "guide"
    ? "bg-blue-50 text-blue-700"
    : "bg-emerald-50 text-emerald-700";

  if (activity.type === "game" || activity.type === "guide") {
    return (
      <Link
        to={activity.to}
        className="flex items-center justify-between border rounded-xl p-5 hover:bg-gray-50 hover:shadow-sm transition group"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
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

  // Expandable inline guide
  return (
    <div className="border rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition text-left"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
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
                    <span className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium flex items-center justify-center">
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