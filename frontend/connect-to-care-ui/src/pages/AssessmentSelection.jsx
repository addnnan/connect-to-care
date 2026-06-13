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
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose an Assessment
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the assessment that best matches your concerns. Each
            screening provides personalized insights and recommendations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {assessments.map((assessment) => {
            const Icon = assessment.icon;

            return (
              <div
                key={assessment.title}
                className="group bg-white rounded-3xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    assessment.color === "emerald"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Icon size={28} />
                </div>

                <h2 className="text-2xl font-semibold mb-3">
                  {assessment.title}
                </h2>

                <p className="text-gray-600 mb-6">
                  {assessment.description}
                </p>

                <div className="space-y-2 mb-8">
                  {assessment.title.includes("Autism") ? (
                    <>
                      <p>• Social Interaction</p>
                      <p>• Communication Skills</p>
                      <p>• Behavioral Patterns</p>
                    </>
                  ) : (
                    <>
                      <p>• Attention Span</p>
                      <p>• Hyperactivity</p>
                      <p>• Impulsivity</p>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    <Timer size={16} className="inline mr-2 " />
                    {assessment.duration}
                  </span>

                  <Link
                    to={assessment.route}
                    className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-white transition ${
                      assessment.color === "emerald"
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