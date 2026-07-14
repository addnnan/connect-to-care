import { Brain, Zap, ArrowRight, Timer } from "lucide-react";
import { Link } from "react-router-dom";

export default function AssessmentSelection() {
  const assessments = [
    {
      title: "Autism Screening",
      icon: Brain,
      description:
        "Evaluate social interaction, communication, and behavioral patterns.",
      duration: "10 min",
      route: "/assessment/autism",
      color: "emerald",
    },
    {
      title: "ADHD Screening",
      icon: Zap,
      description:
        "Assess attention, impulsivity, and hyperactivity symptoms.",
      duration: "8 min",
      route: "/assessment/adhd",
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-16">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Choose an Assessment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Select the assessment that best matches your concerns. Each
            screening provides personalized insights and recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {assessments.map((assessment) => {
            const Icon = assessment.icon;
            const isEmerald = assessment.color === "emerald";

            return (
              <div
                key={assessment.title}
                className="group bg-white dark:bg-gray-900 rounded-3xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl dark:hover:shadow-black/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    isEmerald
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                      : "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                  }`}
                >
                  <Icon size={28} />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  {assessment.title}
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {assessment.description}
                </p>

                {/* Feature list */}
                <div className="space-y-2 mb-8">
                  {assessment.title.includes("Autism") ? (
                    <>
                      <p className="text-gray-700 dark:text-gray-300">• Social Interaction</p>
                      <p className="text-gray-700 dark:text-gray-300">• Communication Skills</p>
                      <p className="text-gray-700 dark:text-gray-300">• Behavioral Patterns</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700 dark:text-gray-300">• Attention Span</p>
                      <p className="text-gray-700 dark:text-gray-300">• Hyperactivity</p>
                      <p className="text-gray-700 dark:text-gray-300">• Impulsivity</p>
                    </>
                  )}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <Timer size={16} className="inline mr-2" />
                    {assessment.duration}
                  </span>

                  <Link
                    to={assessment.route}
                    className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-white transition ${
                      isEmerald
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    Start
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}