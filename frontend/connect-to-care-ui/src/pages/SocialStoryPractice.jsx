import { Link } from "react-router-dom";
import { ArrowLeft, Printer } from "lucide-react";

const STORIES = [
  {
    title: "Going to the doctor",
    situation: "Today I am going to visit the doctor. This can feel new and a little scary, but the doctor is there to help me stay healthy.",
    steps: [
      "We will walk into the waiting room and sit down.",
      "Someone will call my name when it is my turn.",
      "The doctor might look in my ears, listen to my heart, or check my height.",
      "I can ask questions if I feel worried.",
      "When we are finished, we go home. I did a great job!",
    ],
    feeling: "It is okay to feel nervous. Taking deep breaths can help me feel calmer.",
  },
  {
    title: "Sharing toys with a friend",
    situation: "Sometimes my friend wants to play with the same toy as me. Sharing helps us both have fun.",
    steps: [
      "If my friend asks to play with my toy, I can say 'okay' or 'in one minute'.",
      "We can take turns — I play, then my friend plays.",
      "If I don't want to share yet, I can say 'not right now, but soon'.",
      "Sharing helps us stay friends and have more fun together.",
    ],
    feeling: "It's normal to feel a little frustrated about sharing. I can take a breath and remember my turn will come.",
  },
  {
    title: "A change in my routine",
    situation: "Sometimes my normal schedule changes — like a different route to school or a cancelled activity. Changes can feel uncomfortable, but I can handle them.",
    steps: [
      "An adult will tell me about the change when they know about it.",
      "I can ask questions about what will happen instead.",
      "I can use a calming strategy if I feel upset — like squeezing a soft toy or counting to ten.",
      "The change is temporary. My regular routine will come back.",
    ],
    feeling: "Feeling unsettled about change is okay. It gets easier each time I practice.",
  },
];

export default function SocialStoryPractice() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 print:bg-white">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link
            to="/autism"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Autism Module
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition"
          >
            <Printer className="h-4 w-4" /> Print
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
            Social Story Practice
          </span>
          <h1 className="text-2xl font-semibold text-gray-900 mt-4 mb-2">
            Practice stories for everyday situations
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Read each story together. Pause to talk about how the child feels
            at each step, and what they could do or say.
          </p>

          <div className="space-y-10">
            {STORIES.map((story, i) => (
              <div key={story.title} className="border-t pt-8 first:border-t-0 first:pt-0">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  {i + 1}. {story.title}
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">{story.situation}</p>

                <ol className="space-y-2 mb-4">
                  {story.steps.map((step, j) => (
                    <li key={j} className="flex gap-3 text-sm text-gray-700">
                      <span className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium flex items-center justify-center">
                        {j + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">
                    How I might feel
                  </p>
                  <p className="text-sm text-amber-800">{story.feeling}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center print:hidden">
          Social stories are a tool to support understanding, not a substitute
          for individualized professional guidance.
        </p>
      </div>
    </div>
  );
}