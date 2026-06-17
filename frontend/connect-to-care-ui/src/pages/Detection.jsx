// Implementation of the main assessment component for both autism (M-CHAT-R) and ADHD (ADHD Rating Scale IV) screenings. Handles question navigation, answer recording, result calculation, and saving to backend.
// :)

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import autismQuestions from "../data/autismQuestions";
import adhdQuestions from "../data/adhdQuestions";
import api from "../services/api";

// Scale options for ADHD (0–3, ADHD Rating Scale IV)

const scaleOptions = [
  { label: "Rarely or Never", value: 0 },
  { label: "Sometimes",       value: 1 },
  { label: "Often",           value: 2 },
  { label: "Very Often",      value: 3 },
];

// ─ADHD domain scoring:
// ADHD Rating Scale IV Preschool Version (McGoey et al., 2007)
// Parent-report 93rd percentile cutoffs averaged across boys/girls:
//   Inattention ≥ 13  |  Hyperactivity ≥ 16  |  Total ≥ 28

function calculateAdhdResult(questions, answers) {
  // Output will be determined by whether inattention and/or hyperactivity domains are elevated, and whether total score is elevated.........
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

  // Domain percentages for result-page bars (max per domain = count × 3)
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

//  Autism (M-CHAT-R) domain scoring 
function calculateAutismResult(questions, answers) {
  const domainElevated = {};
  const domainTotal = {};
  let totalElevated = 0;
  const elevatedItems = [];

  questions.forEach((q) => {
    if (!domainTotal[q.domain]) {
      domainTotal[q.domain] = 0;
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
  if (totalElevated >= 8) risk = "High";
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
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const { type } = useParams();

  const isAutism = type === "autism";

  const questions = isAutism ? autismQuestions : adhdQuestions;
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id];

  const handleAnswer = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = async () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((s) => s + 1);
      return;
    }

    const result = isAutism
      ? calculateAutismResult(questions, answers)
      : calculateAdhdResult(questions, answers);

    // Autism: Moderate → follow-up; Low/High → result directly
    if (isAutism && result.risk === "Moderate") {
      navigate("/assessment/mchat-followup", { state: result });
      return;
    }

    const answeredQuestions = questions.map((q) => ({
      id: q.id,
      question: q.text,
      answer: answers[q.id],
    }));

    const assessmentRecord = {
      id: Date.now(),
      type,
      date: new Date().toISOString(),
      result: result.risk,
      score: result.finalScore,
      details: result,
      answers,
      answeredQuestions,
    };

    const response = await api.post(
      "/assessments",
      assessmentRecord
    );
    console.log("Saved assessment response:", response);

    const savedAssessment = response.data;

    navigate(`/result/${savedAssessment._id}`, { state: result });
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Back */}
        <Link
          to="/assessments"
          className={isAutism ? "flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600 transition mb-6" : "flex items-center gap-1 text-sm text-gray-600 hover:text-violet-600 transition mb-6"}
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        {/* Assessment type badge */}
        <div className="mb-4">
          {isAutism ? (
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              M-CHAT-R™ · Autism Screening
            </span>
          ) : (
            <span className="text-xs font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-full px-3 py-1">
              ADHD Rating Scale IV · Preschool
            </span>
          )}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Question {currentStep + 1} of {totalQuestions}
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isAutism ? "bg-emerald-600" : "bg-violet-600"
              }`}
              style={{
                width: `${((currentStep + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Item number (autism only) */}
        {isAutism && (
          <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1 ml-2">
            Question: {currentQuestion.num}
          </p>
        )}

        {/* Domain pill */}
        <span
          className={`inline-block text-xs font-medium rounded-full px-2.5 py-0.5 mb-3 capitalize
            ${isAutism
              ? "bg-emerald-50 text-emerald-700"
              : "bg-violet-50 text-violet-700"
            }`}
        >
          TYPE: {currentQuestion.domain}
        </span>

        {/* Question */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 leading-snug">
          {currentQuestion.text}
        </h2>

        {/* Example — autism and ADHD */}
        {currentQuestion.example && (
          <p className="text-sm text-gray-500 italic mb-6">
            {currentQuestion.example}
          </p>
        )}

        {/* ── Autism: Yes / No ── */}
        {isAutism ? (
          <div className="flex gap-3 mb-8 mt-4">
            <button
              onClick={() => handleAnswer("yes")}
              className={`flex-1 rounded-xl border py-4 text-base font-medium transition
                ${currentAnswer === "yes"
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer("no")}
              className={`flex-1 rounded-xl border py-4 text-base font-medium transition
                ${currentAnswer === "no"
                  ? "border-red-400 bg-red-50 text-red-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
            >
              No
            </button>
          </div>
        ) : (
          /* ── ADHD: 0–3 scale ── */
          <div className="flex flex-col gap-2 mb-8 mt-4">
            {scaleOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className={`w-full rounded-lg border px-4 py-3 text-left transition
                  ${currentAnswer === opt.value
                    ? "border-violet-600 bg-violet-50 text-violet-700"
                    : "border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-sm text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={currentAnswer === undefined}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-white text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed
              ${isAutism
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-violet-600 hover:bg-violet-700"
              }`}
          >
            {currentStep === totalQuestions - 1 ? "Submit" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          {isAutism
            ? "M-CHAT-R™ © 2009 Robins, Fein & Barton. Screening tool only — not a medical diagnosis."
            : "ADHD Rating Scale IV adapted from McGoey et al. (2007). Screening tool only — not a medical diagnosis."}
        </p>

        {/* Detailed assessment link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Want a more in-depth analysis?</p>
          <Link
            to="/detection/detailed"
            className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-emerald-600 hover:underline"
          >
            Try detailed behavioral assessment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}