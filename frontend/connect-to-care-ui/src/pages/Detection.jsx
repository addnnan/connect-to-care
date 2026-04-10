import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const questions = [
  {
    id: "eye_contact",
    text: "Avoids or struggles to maintain eye contact",
    domain: "social",
  },
  {
    id: "name_response",
    text: "Does not consistently respond when name is called",
    domain: "communication",
  },
  {
    id: "peer_play",
    text: "Has difficulty engaging in play with others",
    domain: "social",
  },
  {
    id: "gestures",
    text: "Rarely uses gestures such as pointing or waving",
    domain: "communication",
  },
  {
    id: "repetitive",
    text: "Repeats the same actions or behaviors frequently",
    domain: "repetitive",
  },
  {
    id: "routine_change",
    text: "Becomes distressed by changes in routine",
    domain: "sensory",
  },
];
const scaleOptions = [
  { label: "Never", value: 0 },
  { label: "Rarely", value: 1 },
  { label: "Sometimes", value: 2 },
  { label: "Often", value: 3 },
  { label: "Always", value: 4 },
];


export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];
  
  const calculateResult = () => {
    const domainScores = {};

    questions.forEach((q) => {
      domainScores[q.domain] ??= [];
      domainScores[q.domain].push(answers[q.id]);
    });

    const domainPercentages = {};

    for (const domain in domainScores) {
      const total = domainScores[domain].reduce((a, b) => a + b, 0);
      const max = domainScores[domain].length * 4;
      domainPercentages[domain] = Math.round((total / max) * 100);
    }

    const finalScore =
      Object.values(domainPercentages).reduce((a, b) => a + b, 0) /
      Object.values(domainPercentages).length;

    let risk = "Low";
    if (finalScore > 60) risk = "High";
    else if (finalScore > 30) risk = "Moderate";

    return { finalScore: Math.round(finalScore), risk, domainPercentages };
  };

 



  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Later this will send data to AI backend
      console.log("Assessment answers:", answers);
      const result = calculateResult();
      console.log("Calculated result:", result);
      // navigate("/result", { state: result }); // placeholder
      const assessmentRecord = {
      id: Date.now(),
      date: new Date().toISOString(),
      result: result.risk || result.likelihood,
      score: result.score ?? null,
      confidence: result.confidence ?? null,
      details: result,
    };

    const existing =
      JSON.parse(localStorage.getItem("connect_to_care_assessments")) || [];

    localStorage.setItem(
      "connect_to_care_assessments",
      JSON.stringify([assessmentRecord, ...existing])
    );

    navigate(`/result/${assessmentRecord.id}`, { state: result });

    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        {/* Back to Home */}
        <Link
          to="/"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>

        {/* Progress */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Question {currentStep + 1} of {totalQuestions}
          </p>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-emerald-600 rounded-full transition-all"
              style={{
                width: `${((currentStep + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          {currentQuestion.text}
        </h2>

        {/* Answer Buttons */}
        <div className="flex flex-col gap-2 mb-8">
        {scaleOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            className={`w-full rounded-lg border px-4 py-3 text-left transition
              ${
                answers[currentQuestion.id] === opt.value
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>


        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-sm text-gray-600 disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={answers[currentQuestion.id] === undefined || currentStep === totalQuestions}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white text-sm font-medium hover:bg-emerald-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === totalQuestions - 1 ? "Submit" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-gray-400 text-center">
          This assessment is a screening tool and does not provide a medical diagnosis.
        </p>
        <div className="mt-8 text-center">
  <p className="text-sm text-gray-500">
    Want a more in-depth analysis?
  </p>
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
