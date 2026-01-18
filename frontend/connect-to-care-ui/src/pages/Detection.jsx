import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "Does the child make eye contact during interaction?",
  },
  {
    id: 2,
    text: "Does the child respond when their name is called?",
  },
  {
    id: 3,
    text: "Does the child show interest in playing with others?",
  },
  {
    id: 4,
    text: "Does the child use gestures such as pointing or waving?",
  },
  {
    id: 5,
    text: "Does the child repeat certain behaviors frequently?",
  },
];

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep];

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
      navigate("/result"); // placeholder
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
        <div className="flex flex-col gap-3 mb-8">
          <button
            onClick={() => handleAnswer(true)}
            className={`w-full rounded-lg border px-4 py-3 text-left transition
              ${
                answers[currentQuestion.id] === true
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            Yes
          </button>

          <button
            onClick={() => handleAnswer(false)}
            className={`w-full rounded-lg border px-4 py-3 text-left transition
              ${
                answers[currentQuestion.id] === false
                  ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
          >
            No
          </button>
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
            disabled={answers[currentQuestion.id] === undefined}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-white text-sm font-medium hover:bg-emerald-700 transition disabled:opacity-50"
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
