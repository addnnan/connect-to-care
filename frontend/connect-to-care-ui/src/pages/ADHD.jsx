import { motion } from "framer-motion";
import {
  Brain,
  Clock,
  CheckCircle,
  Focus,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ADHDModule() {
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

          {/* Module Levels */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm border p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Module Levels
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <LevelCard
                level="Beginner"
                description="Foundational activities focused on awareness, simple routines, and short focus tasks."
              />
              <LevelCard
                level="Intermediate"
                description="Moderate-length focus exercises, structured planning, and consistency-building."
              />
              <LevelCard
                level="Advanced"
                description="Longer attention challenges, goal-setting activities, and adaptive routines."
              />
            </div>
          </motion.div>

          {/* Example Activities */}
          <motion.div
            className="bg-white rounded-2xl shadow-sm border p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Example Activities
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ActivityCard title="Focus Timer" />
              <ActivityCard title="Task Breakdown Exercise" />
              <ActivityCard title="Impulse Pause Challenge" />
              <ActivityCard title="Routine Builder" />
              <ActivityCard title="Goal Tracker" />
              <ActivityCard title="Attention Reflection Log" />
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
                to="/detection"
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

function LevelCard({ level, description }) {
  return (
    <div className="border rounded-xl p-6 hover:shadow-sm transition">
      <h3 className="font-semibold text-gray-900 mb-2">{level}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function ActivityCard({ title }) {
  return (
    <div className="border rounded-xl p-5 hover:bg-gray-50 transition">
      <div className="flex items-center gap-3">
        <Brain className="h-5 w-5 text-indigo-600" />
        <span className="font-medium text-gray-800">{title}</span>
      </div>
    </div>
  );
}
