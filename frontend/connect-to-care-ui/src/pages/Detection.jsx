// Implementation of the main assessment component for both autism (M-CHAT-R) and ADHD (ADHD Rating Scale IV) screenings. Handles question navigation, answer recording, result calculation, and saving to backend.
// :)

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import autismQuestions from "../data/autismQuestions";
import adhdQuestions from "../data/adhdQuestions";
import api from "../services/api";
// import { LanguageProvider } from "../context/LanguageContext";
import { useLanguage } from "../context/LanguageContext";



// const scaleOptions = [
//   { label: "Rarely or Never", value: 0 },
//   { label: "Sometimes",       value: 1 },
//   { label: "Often",           value: 2 },
//   { label: "Very Often",      value: 3 },
// ];

const scaleOptions = [
  {
    value: 0,
    label: {
      en: "Rarely or Never",
      ur: "کبھی نہیں",
    },
  },
  {
    value: 1,
    label: {
      en: "Sometimes",
      ur: "کبھی کبھار",
    },
  },
  {
    value: 2,
    label: {
      en: "Often",
      ur: "اکثر",
    },
  },
  {
    value: 3,
    label: {
      en: "Very Often",
      ur: "بہت اکثر",
    },
  },
];

function calculateAdhdResult(questions, answers) {
  const CUTOFF_INATTENTION   = 13;
  const CUTOFF_HYPERACTIVITY = 16;
  const CUTOFF_TOTAL         = 28;

  const domainRaw    = {};
  const domainCounts = {};

  questions.forEach((q) => {
    if (!domainRaw[q.domain]) {
      domainRaw[q.domain]    = 0;
      domainCounts[q.domain] = 0;
    }
    domainRaw[q.domain] += answers[q.id] ?? 0;
    domainCounts[q.domain]++;
  });

  const totalRaw = Object.values(domainRaw).reduce((a, b) => a + b, 0);

  const domainPercentages = {};
  for (const domain in domainRaw) {
    const max = domainCounts[domain] * 3;
    domainPercentages[domain] = Math.round((domainRaw[domain] / max) * 100);
  }

  const finalScore = Math.round(
    Object.values(domainPercentages).reduce((a, b) => a + b, 0) /
      Object.keys(domainPercentages).length
  );

  const inattentionElevated   = (domainRaw["inattention"]   ?? 0) >= CUTOFF_INATTENTION;
  const hyperactivityElevated = (domainRaw["hyperactivity"] ?? 0) >= CUTOFF_HYPERACTIVITY;
  const totalElevated         = totalRaw >= CUTOFF_TOTAL;

  let risk = "Low";
  if (totalElevated && inattentionElevated && hyperactivityElevated) risk = "High";
  else if (totalElevated || inattentionElevated || hyperactivityElevated) risk = "Moderate";

  return {
    finalScore,
    risk,
    domainPercentages,
    rawScores: {
      inattention:   domainRaw["inattention"]   ?? 0,
      hyperactivity: domainRaw["hyperactivity"] ?? 0,
      total:         totalRaw,
    },
  };
}

function calculateAutismResult(questions, answers) {
  const domainElevated = {};
  const domainTotal    = {};
  let totalElevated    = 0;
  const elevatedItems  = [];

  questions.forEach((q) => {
    if (!domainTotal[q.domain]) {
      domainTotal[q.domain]    = 0;
      domainElevated[q.domain] = 0;
    }
    domainTotal[q.domain]++;

    const answer = answers[q.id];
    if (answer === undefined) return;

    const isElevated = q.reversed ? answer === "yes" : answer === "no";
    if (isElevated) {
      domainElevated[q.domain]++;
      totalElevated++;
      elevatedItems.push(q.num);
    }
  });

  const domainPercentages = {};
  for (const domain in domainTotal) {
    domainPercentages[domain] = Math.round(
      (domainElevated[domain] / domainTotal[domain]) * 100
    );
  }

  let risk = "Low";
  if (totalElevated >= 8)      risk = "High";
  else if (totalElevated >= 3) risk = "Moderate";

  return {
    finalScore: totalElevated,
    risk,
    domainPercentages,
    totalElevated,
    elevatedItems,
  };
}

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers]         = useState({});
  const navigate  = useNavigate();
  const { type }  = useParams();

 

  const isAutism        = type === "autism";
  const questions       = isAutism ? autismQuestions : adhdQuestions;
  const totalQuestions  = questions.length;
  const currentQuestion = questions[currentStep];
  const currentAnswer   = answers[currentQuestion.id];
  const { language, toggleLanguage } = useLanguage();

  

  const handleAnswer = (value) =>
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));

  const handleNext = async () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }

    const result = isAutism
      ? calculateAutismResult(questions, answers)
      : calculateAdhdResult(questions, answers);

    if (isAutism && result.risk === "Moderate") {
      navigate("/assessment/mchat-followup", { state: result });
      return;
    }

    const answeredQuestions = questions.map((q) => ({
      id:       q.id,
      question: q.text.en,
      answer:   answers[q.id],
    }));

    const assessmentRecord = {
      id: Date.now(),
      type,
      date: new Date().toISOString(),
      result: result.risk,
      score:  result.finalScore,
      details: result,
      answers,
      answeredQuestions,
    };

    const response = await api.post("/assessments", assessmentRecord);
    console.log("Saved assessment response:", response);
    navigate(`/result/${response.data._id}`, { state: result });
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const activeBg = type === "adhd" ? "bg-purple-600 dark:bg-purple-600" : "bg-emerald-600 dark:bg-emerald-600";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 px-4 py-10 transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg dark:shadow-black/40 p-6 sm:p-8 border border-transparent dark:border-slate-800">
      
      <div className="flex justify-between flex-row-reverse mb-5">
      {/* Language Toggle */}
      <div className="flex justify-end mb-5">
    <div className="flex rounded-full border border-gray-300 dark:border-slate-700 overflow-hidden shadow-sm">
      <button
        onClick={() => language !== "en" && toggleLanguage()}
        className={`px-3 py-1 text-xs font-semibold transition-all duration-200 ${
          language === "en"
            ? `${activeBg} text-white`
            : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        EN
      </button>

      <button
        onClick={() => language !== "ur" && toggleLanguage()}
        className={`px-3 py-1 text-xs font-semibold transition-all duration-200 ${
          language === "ur"
            ? `${activeBg} text-white`
            : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        اردو
      </button>
    </div>
  </div>

        {/* Back */}
        <Link
          to="/assessments"
          className={`flex items-center gap-1 text-sm transition mb-6 ${
            isAutism
              ? "text-gray-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
              : "text-gray-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
        </div>

        {/* Badge */}
        <div className="mb-4">
          {isAutism ? (
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full px-3 py-1">
              M-CHAT-R/F™ · Autism Screening
            </span>
          ) : (
            <span className="text-xs font-medium text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 rounded-full px-3 py-1">
              ADHD Rating Scale IV · Preschool
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">
            Question {currentStep + 1} of {totalQuestions}
          </p>
          <div className="w-full h-2 bg-gray-200 dark:bg-slate-800 rounded-full">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isAutism ? "bg-emerald-600 dark:bg-emerald-500" : "bg-violet-600 dark:bg-violet-500"
              }`}
              style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Item number (autism only) */}
        {isAutism && (
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1 ml-2">
            Question: {currentQuestion.num}
          </p>
        )}

        {/* Domain pill */}
        <span
          className={`inline-block text-xs font-medium rounded-full px-2.5 py-0.5 mb-3 capitalize ${
            isAutism
              ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
              : "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400"
          }`}
        >
          TYPE: {currentQuestion.domain}
        </span>

        {/* Question */}
        <h2 dir={language === "ur" ? "rtl" : "ltr"} className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
          {currentQuestion.text[language]}
        </h2>

        {/* Example */}
        {currentQuestion.example && (
          <p dir={language === "ur" ? "rtl" : "ltr"} className="text-sm text-gray-500 dark:text-slate-400 italic mb-6">
            {currentQuestion.example[language]}
          </p>
        )}

        {/* ── Autism: Yes / No ── */}
        {isAutism ? (
          <div className="flex gap-3 mb-8 mt-4">
            <button
              onClick={() => handleAnswer("yes")}
              className={`flex-1 rounded-xl border py-4 text-base font-medium transition ${
                currentAnswer === "yes"
                  ? "border-emerald-600 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                  : "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50"
              }`}
            >
              {language === "en" ? "Yes" : "ہاں"}
            </button>
            <button
              onClick={() => handleAnswer("no")}
              className={`flex-1 rounded-xl border py-4 text-base font-medium transition ${
                currentAnswer === "no"
                  ? "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-950/40 text-red-700 dark:text-red-400"
                  : "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50"
              }`}
            >
              {language === "en" ? "No" : "نہیں"}
            </button>
          </div>
        ) : (
          /* ── ADHD: 0–3 scale ── */
          <div className="flex flex-col gap-2 mb-8 mt-4">
            {scaleOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className={`w-full rounded-lg border px-4 py-3 text-left transition ${
                  currentAnswer === opt.value
                    ? "border-violet-600 bg-violet-50 dark:border-violet-500 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400"
                    : "border-gray-300 dark:border-slate-700 text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                }`}
              >
                {opt.label[language]}
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed hover:text-gray-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={currentAnswer === undefined}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-white text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${
              isAutism
                ? "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                : "bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-500"
            }`}
          >
            {currentStep === totalQuestions - 1 ? "Submit" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-gray-400 dark:text-slate-500 text-center">
          {isAutism
            ? "M-CHAT-R/F™ © 2025 Fein & Barton. Screening tool only — not a medical diagnosis."
            : "ADHD Rating Scale IV adapted from McGoey et al. (2007). Screening tool only — not a medical diagnosis."}
        </p>

        {/* Detailed assessment link */}
        <div className="mt-8 text-center border-t border-gray-100 dark:border-slate-800 pt-6">
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Want a more in-depth analysis?
          </p>
          <Link
            to="/detection/detailed"
            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Try detailed behavioral assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>

  );
}