import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import { Download, AlertTriangle, CheckCircle, Info, ArrowRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, Cell } from "recharts";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isCritical = data.weight >= 0.1;
    return (
      <div className={`p-4 rounded-2xl border shadow-xl max-w-sm bg-white ${
        isCritical ? "border-amber-200 bg-amber-50/95" : "border-gray-200 bg-white/95"
      }`}>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Question {data.num} ({data.domain})
        </p>
        <p className="text-sm font-semibold text-gray-900 mt-1 leading-relaxed">
          {data.question}
        </p>
        <div className="mt-3 flex justify-between items-center border-t border-gray-200/50 pt-2">
          <span className="text-xs text-gray-500 font-medium">Clinical Severity Weight</span>
          <span className={`text-sm font-bold ${isCritical ? "text-amber-700" : "text-gray-700"}`}>
            {data.weight.toFixed(2)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function Result() {
  const [assessment, setAssessment] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const { id } = useParams();

  const handlePayAndDownload = async () => {
    setDownloading(true);
    try {
      const response = await api.post("/create-checkout-session", {
        assessment_id: id,
      });
      const { checkout_url } = response.data;
      if (checkout_url) {
        window.location.href = checkout_url;
      } else {
        alert("Failed to initiate payment session. Please try again.");
      }
    } catch (err) {
      console.error("Stripe Checkout failed", err);
      alert("Error initiating payment checkout.");
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

  const chartData = (assessment.details?.sortedFailedQuestions || []).map((item) => ({
    name: `Q${item.num}`,
    weight: item.weight,
    question: item.question,
    domain: item.domain,
    num: item.num,
  }));

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

        {/* Critical Indicators (ML Severity Sorted Chart) */}
        {assessment.details?.sortedFailedQuestions?.length > 0 && (
          <section className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Critical Behavioral Indicators (ML Priority Chart)
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              The following chart displays the child's flagged responses sorted by their clinical significance (weight). Hover over each bar to review full behavioral details and domain categories.
            </p>
            <div className="w-full bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                  >
                    <XAxis
                      type="number"
                      domain={[0, 0.3]}
                      tickFormatter={(val) => val.toFixed(2)}
                      stroke="#9ca3af"
                      fontSize={11}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      width={40}
                      stroke="#9ca3af"
                      fontSize={11}
                      tickLine={false}
                    />
                    <RechartsTooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "rgba(0, 0, 0, 0.02)" }}
                    />
                    <Bar dataKey="weight" radius={[0, 4, 4, 0]} barSize={16}>
                      {chartData.map((entry, index) => {
                        const isCritical = entry.weight >= 0.1;
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={isCritical ? "#d97706" : "#10b981"} // Amber-600 vs Emerald-500
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 items-center justify-center text-xs border-t border-gray-100 pt-4">
                <span className="flex items-center gap-1.5 font-medium text-gray-600">
                  <span className="w-3 h-3 rounded bg-[#d97706] inline-block" />
                  Critical Predictor (&ge; 0.10)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-gray-600">
                  <span className="w-3 h-3 rounded bg-[#10b981] inline-block" />
                  Baseline Predictor (&lt; 0.10)
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Next Actions */}
        <section className="space-y-3">

          {/* Download PDF — first and most prominent */}
          <button
            onClick={handlePayAndDownload}
            disabled={downloading}
            className="flex items-center justify-between w-full rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-4 hover:bg-emerald-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <Download className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <div className="text-left">
                <p className="font-medium text-emerald-800 text-sm">
                  {downloading ? "Initiating Checkout…" : "Pay & Download Official Report ($5.00)"}
                </p>
                <p className="text-xs text-emerald-600 mt-0.5">
                  Get your official PDF clinical report with ML severity analysis
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