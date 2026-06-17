import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";

const EXAMPLES = [
  {
    title: "Clean my room",
    overwhelm: "This task feels huge and vague, so it gets avoided entirely.",
    steps: [
      "Pick up all clothes and put them in the laundry basket (set a 5-minute timer).",
      "Clear everything off the desk into one pile.",
      "Throw away obvious trash.",
      "Put books and items back on shelves, one category at a time.",
      "Make the bed.",
      "Vacuum or sweep the floor.",
    ],
  },
  {
    title: "Write a school essay",
    overwhelm: "Staring at a blank page feels impossible to start.",
    steps: [
      "Write down 3 things you already know about the topic — no full sentences needed.",
      "Turn those 3 things into a one-line outline (intro, point 1, point 2).",
      "Write just the introduction paragraph. Stop there if needed.",
      "Take a short break.",
      "Write one body paragraph at a time, with a break between each.",
      "Write the conclusion last — re-read your intro first.",
    ],
  },
  {
    title: "Study for a test",
    overwhelm: "Too much material, no idea where to begin.",
    steps: [
      "List every topic that will be on the test.",
      "Rank topics from 'know well' to 'know least'.",
      "Spend 15 minutes only on the lowest-confidence topic.",
      "Take a 5-minute break.",
      "Quiz yourself on what you just studied using flashcards or a friend.",
      "Repeat with the next topic on the list.",
    ],
  },
];

export default function TaskBreakdownExercise() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 print:bg-white">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/adhd"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to ADHD Module
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition"
          >
            <Printer className="h-4 w-4" /> Print
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <span className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
            Task Breakdown Exercise
          </span>
          <h1 className="text-2xl font-semibold text-gray-900 mt-4 mb-2">
            Turning overwhelming tasks into small steps
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Big, vague tasks trigger avoidance. Breaking them into specific,
            tiny actions makes starting much easier. Use these examples as a
            template for any task.
          </p>

          <div className="space-y-10">
            {EXAMPLES.map((ex, i) => (
              <div key={ex.title} className="border-t pt-8 first:border-t-0 first:pt-0">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {i + 1}. {ex.title}
                </h2>
                <p className="text-sm text-gray-500 italic mb-4">{ex.overwhelm}</p>

                <ol className="space-y-2">
                  {ex.steps.map((step, j) => (
                    <li key={j} className="flex gap-3 text-sm text-gray-700">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium flex items-center justify-center">
                        {j + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-indigo-50 border border-indigo-100 rounded-xl p-5">
            <p className="text-sm font-medium text-indigo-800 mb-2">Your own task:</p>
            <p className="text-xs text-indigo-600 mb-3">
              Pick something you've been avoiding. Write down the very first
              physical action — not the goal, just the first 2-minute step.
            </p>
            <div className="border-2 border-dashed border-indigo-200 rounded-lg h-20 bg-white" />
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center print:hidden">
          This exercise is a self-management tool and does not replace
          individualized executive function coaching or therapy.
        </p>
      </div>
    </div>
  );
}