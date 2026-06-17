import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import { Download, AlertTriangle, CheckCircle, Info, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Result() {
  const [assessment, setAssessment] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const { id } = useParams();

  const handleDownloadReport = async () => {
    setDownloading(true);
    try {
      const response = await api.get(`/reports/${id}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `assessment-report-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed", err);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        const response = await api.get(`/assessments/${id}`);
        setAssessment(response.data);
      } catch (err) {
        console.error("result error", err);
      }
    };
    loadAssessment();
  }, [id]);

  if (!assessment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const {
    finalScore = assessment.details?.finalScore ?? 0,
    risk = assessment.result ?? "Low",
    type = assessment.type ?? "autism",
    domainPercentages = assessment.details?.domainPercentages || {},
  } = assessment;

  const riskConfig = {
    Low: {
      icon: CheckCircle,
      badge: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-300",
      title: "Low likelihood indicators",
      description:
        "Current responses show fewer behavioral indicators commonly associated with developmental concerns.",
    },
    Moderate: {
      icon: Info,
      badge: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-300",
      title: "Moderate likelihood indicators",
      description:
        "Some behavioral patterns may benefit from closer observation or additional screening.",
    },
    High: {
      icon: AlertTriangle,
      badge: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-300",
      title: "Higher likelihood indicators",
      description:
        "Several behavioral indicators suggest that professional evaluation could be helpful.",
    },
  };

  const config = riskConfig[risk];
  const Icon = config.icon;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${config.bg}`}>
            <Icon className={`h-8 w-8 ${config.badge}`} />
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {type === "autism" ? "Autism" : "ADHD"} Screening Result
          </h1>
          <p className="mt-2 text-gray-600">AI-assisted early screening summary</p>
        </div>

        {/* Score Overview */}
        <div className={`rounded-xl border ${config.border} ${config.bg} p-6 mb-10`}>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
            <div>
              <p className="text-sm text-gray-600">Overall Screening Score</p>
              {type === "autism" ? (
                <p className="text-4xl font-bold text-gray-900 mt-1">{finalScore}/20</p>
              ) : (
                <p className="text-4xl font-bold text-gray-900 mt-1">{finalScore}%</p>
              )}
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${config.badge}`}>
                {risk} likelihood
              </span>
            </div>
            <p className="text-sm text-gray-700 max-w-sm">{config.description}</p>
          </div>
        </div>

        {/* Explainability */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Why this result?</h2>
          <p className="text-gray-600 text-sm">
            This screening result is based on domain-wise behavioral responses.
            Domains with consistently higher scores contributed more strongly to
            the final likelihood level.
          </p>
        </section>

        {/* Domain Breakdown */}
        {Object.keys(domainPercentages).length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Domain breakdown</h3>
            <div className="space-y-4">
              {Object.entries(domainPercentages).map(([domain, value]) => (
                <div key={domain}>
                  <div className="flex justify-between text-sm text-gray-700 mb-1">
                    <span className="capitalize">{domain}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-gray-800" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Next Actions */}
        <section className="space-y-3">

          {/* Download PDF — first and most prominent */}
          <button
            onClick={handleDownloadReport}
            disabled={downloading}
            className="flex items-center justify-between w-full rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 hover:bg-emerald-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <Download className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-emerald-800 text-sm">
                  {downloading ? "Generating report…" : "Download PDF report"}
                </p>
                <p className="text-xs text-emerald-600 mt-0.5">
                  Full summary with domain breakdown and recommendations
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-emerald-500 flex-shrink-0" />
          </button>

          {(risk === "Moderate" || risk === "High") && (
            <Link
              to="/detection/detailed"
              className="flex items-center justify-between rounded-lg border px-5 py-4 hover:bg-gray-50 transition"
            >
              <span className="font-medium text-gray-800">
                Take a detailed behavioral assessment
              </span>
              <ArrowRight className="h-4 w-4 text-gray-500" />
            </Link>
          )}

          <Link
            to={`/care-guidance/${type}`}
            className="flex items-center justify-between rounded-lg border px-5 py-4 hover:bg-gray-50 transition"
          >
            <span className="font-medium text-gray-800">
              Find nearest healthcare professionals
            </span>
            <ArrowRight className="h-4 w-4 text-gray-500" />
          </Link>
        </section>

        {/* Disclaimer */}
        <p className="mt-10 text-xs text-gray-400 text-center">
          This tool provides AI-assisted early screening only and does not offer a
          medical diagnosis. Always consult qualified healthcare professionals for
          clinical evaluation.
        </p>
      </motion.div>
    </main>
  );
}