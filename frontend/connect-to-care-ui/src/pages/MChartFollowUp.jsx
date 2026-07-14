import { useState } from "react";
import { ArrowLeft, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import mchatFollowUpItems from "../data/autismFollowups";
import api from "../services/api";
/* eslint-disable no-loop-func */
// M-CHAT-R/F™ © 2009 Diana Robins, Deborah Fein & Marianne Barton
//
// Only the items the child scored elevated on (from stage 1) are administered.
// An item scores 1 (elevated) if the flowchart leads to SCORE_1.
// Overall follow-up is POSITIVE if 2+ items score 1.

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Walk the flowchart for one item given recorded answers { stepId: optionValue }
// Returns "SCORE_0" | "SCORE_1" | null (incomplete)
function resolveItemScore(itemData, stepAnswers) {
  let currentStepId = itemData.steps[0].id;

  for (let i = 0; i < 20; i++) {
    // Guard against infinite loops
    const step = itemData.steps.find((s) => s.id === currentStepId);
    if (!step) return null;

    const answer = stepAnswers[currentStepId];
    if (answer === undefined) return null; // not yet answered

    const chosen = step.options.find((o) => o.value === answer);
    if (!chosen) return null;

    if (chosen.next === "SCORE_0") return "SCORE_0";
    if (chosen.next === "SCORE_1") return "SCORE_1";

    currentStepId = chosen.next;
  }
  return null;
}

// Get the current active step id for an item given answers so far
function getActiveStep(itemData, stepAnswers) {
  let currentStepId = itemData.steps[0].id;

  for (let i = 0; i < 20; i++) {
    const step = itemData.steps.find((s) => s.id === currentStepId);
    if (!step) return null;

    const answer = stepAnswers[currentStepId];
    if (answer === undefined) return currentStepId; // this step needs answering

    const chosen = step.options.find((o) => o.value === answer);
    if (!chosen) return currentStepId;

    if (chosen.next === "SCORE_0" || chosen.next === "SCORE_1") return null; // item complete
    currentStepId = chosen.next;
  }
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function MchatFollowUp() {
  const navigate = useNavigate();
  const location = useLocation();

  // Stage-1 result passed via navigate state
  const stage1Result = location.state || {};
  const elevatedItemNums = stage1Result.elevatedItems || [];

  // Filter follow-up items to only those elevated in stage 1
  const followUpItems = mchatFollowUpItems.filter((item) =>
    elevatedItemNums.includes(item.num)
  );

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [stepAnswers, setStepAnswers] = useState({});
  const [itemScores, setItemScores] = useState({});

  const totalItems = followUpItems.length;

  // ── Edge case: no elevated items ──
  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 transition-colors duration-300 dark:bg-slate-950">
        <div className="max-w-md bg-white rounded-2xl shadow-lg p-8 text-center border border-transparent dark:bg-slate-900 dark:border-slate-800">
          <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto mb-3 dark:text-emerald-400" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
            No follow-up items needed
          </h2>
          <p className="text-sm text-gray-500 mb-6 dark:text-slate-400">
            There were no elevated items from your stage-1 screening to follow up on.
          </p>
          <Link
            to="/assessments"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:underline dark:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" /> Back to assessments
          </Link>
        </div>
      </div>
    );
  }

  const currentItem = followUpItems[currentItemIndex];
  const currentItemAnswers = stepAnswers[currentItem.id] || {};
  const activeStepId = getActiveStep(currentItem, currentItemAnswers);
  const activeStep = activeStepId
    ? currentItem.steps.find((s) => s.id === activeStepId)
    : null;
  const itemComplete = activeStepId === null;
  const resolvedScore = resolveItemScore(currentItem, currentItemAnswers);

  const handleAnswer = (stepId, value) => {
    const newItemAnswers = { ...currentItemAnswers, [stepId]: value };

    const newStepAnswers = {
      ...stepAnswers,
      [currentItem.id]: newItemAnswers,
    };
    setStepAnswers(newStepAnswers);

    const score = resolveItemScore(currentItem, newItemAnswers);
    if (score !== null) {
      setItemScores((prev) => ({
        ...prev,
        [currentItem.id]: score === "SCORE_1" ? 1 : 0,
      }));
    }
  };

  const handleNextItem = () => {
    if (currentItemIndex < totalItems - 1) {
      setCurrentItemIndex((i) => i + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevItem = () => {
    if (currentItemIndex > 0) setCurrentItemIndex((i) => i - 1);
  };

  const handleSubmit = async () => {
    const allScores = { ...itemScores };

    const finalCurrentScore = resolveItemScore(currentItem, currentItemAnswers);
    if (finalCurrentScore !== null) {
      allScores[currentItem.id] = finalCurrentScore === "SCORE_1" ? 1 : 0;
    }

    const elevatedCount = Object.values(allScores).filter((s) => s === 1).length;

    let risk;
    let recommendation;

    if (elevatedCount >= 2) {
      risk = "High";
      recommendation =
        "Your child has screened positive on the M-CHAT-R/F. Please refer for diagnostic evaluation and eligibility evaluation for early intervention as soon as possible.";
    } else {
      risk = "Low";
      recommendation =
        "Your child has screened negative on the follow-up. No further action is required unless surveillance indicates elevated likelihood for autism. Your child should be re-screened at future well-child visits.";
    }

    const domainElevated = {};
    const domainTotal = {};

    followUpItems.forEach((item) => {
      const domain = getDomainForItem(item.id);
      if (!domainTotal[domain]) {
        domainTotal[domain] = 0;
        domainElevated[domain] = 0;
      }
      domainTotal[domain]++;
      if (allScores[item.id] === 1) domainElevated[domain]++;
    });

    const domainPercentages = {};
    for (const domain in domainTotal) {
      domainPercentages[domain] = Math.round(
        (domainElevated[domain] / domainTotal[domain]) * 100
      );
    }

    const followUpResult = {
      elevatedCount,
      risk,
      recommendation,
      domainPercentages,
      finalScore: elevatedCount,
      itemScores: allScores,
      stage: "followup",
    };

    const assessmentRecord = {
      id: Date.now(),
      type: "autism-followup",
      label: "M-CHAT-R/F Follow-Up",
      date: new Date().toISOString(),
      result: risk,
      score: elevatedCount,
      details: followUpResult,
    };

    const response = await api.post("/assessments", assessmentRecord);
    console.log("Saved assessment:", response.data);
    navigate(`/result/${response.data._id}`, { state: followUpResult });
  };

  const progress = Math.round(((currentItemIndex + 1) / totalItems) * 100);
  const answeredSteps = currentItem.steps.filter((step) => currentItemAnswers[step.id] !== undefined);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 transition-colors duration-300 dark:bg-slate-950">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-transparent dark:bg-slate-900 dark:border-slate-800">

        {/* Back */}
        <Link
          to="/assessments"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600 transition mb-6 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to assessments
        </Link>

        {/* Badge */}
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-800">
            M-CHAT-R/F™ · Follow-Up Interview
          </span>
          <span className="text-xs text-gray-400 dark:text-slate-500">
            Stage 2 of 2
          </span>
        </div>

        {/* Info banner */}
        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 dark:bg-amber-950/20 dark:border-amber-900/40">
          <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5 dark:text-amber-400" />
          <p className="text-xs text-amber-700 leading-relaxed dark:text-amber-300">
            Your child's stage-1 score was <strong>Moderate</strong>. This
            follow-up only covers the {totalItems} item
            {totalItems !== 1 ? "s" : ""} flagged as elevated. Answer based on
            your child's <strong>most typical</strong> behaviour.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2 dark:text-slate-400">
            Item {currentItemIndex + 1} of {totalItems}
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-slate-800">
            <div
              className="h-2 bg-emerald-600 rounded-full transition-all duration-300 dark:bg-emerald-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Item header */}
        <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1 dark:text-emerald-400">
          M-CHAT-R/F™ Item {currentItem.num}
        </p>
        <p className="text-sm text-gray-500 italic mb-5 leading-relaxed dark:text-slate-400">
          {currentItem.context}
        </p>

        {/* ── Answered steps (read-only history within this item) ── */}
        {answeredSteps.map((step) => {
          const chosenValue = currentItemAnswers[step.id];
          const chosenOption = step.options.find((o) => o.value === chosenValue);
          return (
            <div
              key={step.id}
              className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100 dark:bg-slate-800/40 dark:border-slate-800"
            >
              <p className="text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">
                {step.text}
              </p>
              <p className="text-sm text-emerald-700 font-medium dark:text-emerald-400">
                ✓ {chosenOption?.label}
              </p>
            </div>
          );
        })}

        {/* ── Active step ── */}
        {activeStep && (
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 leading-snug dark:text-white">
              {activeStep.text}
            </h2>

            {/* Examples */}
            {activeStep.examples && activeStep.examples.length > 0 && (
              <div className="mb-4 bg-blue-50 border border-blue-100 rounded-xl p-3 dark:bg-blue-950/20 dark:border-blue-900/40">
                <p className="text-xs font-medium text-blue-700 mb-2 uppercase tracking-wide dark:text-blue-400">
                  Examples to ask about:
                </p>
                <ul className="space-y-1">
                  {activeStep.examples.map((ex, i) => (
                    <li key={i} className="text-sm text-blue-800 flex gap-2 dark:text-blue-300">
                      <span className="text-blue-400 flex-shrink-0 dark:text-blue-500">•</span>
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Options */}
            <div className="flex flex-col gap-2">
              {activeStep.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(activeStepId, opt.value)}
                  className={`w-full rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition focus:outline-none
                    ${currentItemAnswers[activeStepId] === opt.value
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/50"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Item complete indicator ── */}
        {itemComplete && resolvedScore && (
          <div
            className={`flex items-center gap-2 rounded-xl p-3 mb-6 text-sm font-medium
              ${resolvedScore === "SCORE_0"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-900/40 dark:text-emerald-400"
                : "bg-red-50 border border-red-200 text-red-700 dark:bg-red-950/40 dark:border-red-900/40 dark:text-red-400"
              }`}
          >
            {resolvedScore === "SCORE_0" ? (
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
            )}
            {resolvedScore === "SCORE_0"
              ? "This item screens negative — not elevated on follow-up."
              : "This item screens positive — elevated on follow-up."}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-5 dark:border-slate-800">
          <button
            onClick={handlePrevItem}
            disabled={currentItemIndex === 0}
            className="flex items-center gap-2 text-sm text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed dark:text-slate-400 dark:hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            onClick={handleNextItem}
            disabled={!itemComplete}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            {currentItemIndex === totalItems - 1 ? "Submit" : "Next item"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-gray-400 text-center dark:text-slate-500">
          M-CHAT-R/F™ © 2009 Robins, Fein & Barton. Screening tool only — not a medical diagnosis.
        </p>
      </div>
    </div>
  );
}

// Helper: map item id → domain (mirrors autismQuestions.js)
function getDomainForItem(id) {
  const map = {
    mchat_1: "communication",
    mchat_2: "sensory",
    mchat_3: "motor",
    mchat_4: "motor",
    mchat_5: "sensory",
    mchat_6: "communication",
    mchat_7: "communication",
    mchat_8: "social",
    mchat_9: "communication",
    mchat_10: "communication",
    mchat_11: "social",
    mchat_12: "sensory",
    mchat_13: "motor",
    mchat_14: "social",
    mchat_15: "communication",
    mchat_16: "communication",
    mchat_17: "social",
    mchat_18: "communication",
    mchat_19: "social",
    mchat_20: "motor",
  };
  return map[id] || "other";
}