import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Smile } from "lucide-react";

// ─── Emotion data ─────────────────────────────────────────────────────────────
const EMOTIONS = [
  { id: "happy",     label: "Happy",     color: "#fde68a" },
  { id: "sad",       label: "Sad",       color: "#bfdbfe" },
  { id: "angry",     label: "Angry",     color: "#fecaca" },
  { id: "surprised", label: "Surprised", color: "#ddd6fe" },
  { id: "scared",    label: "Scared",    color: "#a7f3d0" },
  { id: "calm",      label: "Calm",      color: "#fed7aa" },
];

// ─── Face renderer — real SVG paths, one per emotion ─────────────────────────
function FaceSVG({ emotion, size = 80 }) {
  const e = EMOTIONS.find((x) => x.id === emotion);
  if (!e) return null;

  const stroke = "#374151";
  const sw = 5; // stroke width for features

  const features = {
    happy: (
      <>
        {/* eyes: simple dots */}
        <circle cx="35" cy="42" r="5" fill={stroke} />
        <circle cx="65" cy="42" r="5" fill={stroke} />
        {/* smile: upward curve */}
        <path d="M 30 60 Q 50 80 70 60" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </>
    ),
    sad: (
      <>
        <circle cx="35" cy="42" r="5" fill={stroke} />
        <circle cx="65" cy="42" r="5" fill={stroke} />
        {/* frown: downward curve */}
        <path d="M 30 70 Q 50 52 70 70" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        {/* eyebrows slanted inward-up for sadness */}
        <path d="M 27 32 L 40 36" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M 73 32 L 60 36" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    angry: (
      <>
        <circle cx="35" cy="44" r="4.5" fill={stroke} />
        <circle cx="65" cy="44" r="4.5" fill={stroke} />
        {/* angled angry eyebrows */}
        <path d="M 24 30 L 42 38" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        <path d="M 76 30 L 58 38" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        {/* flat/tight mouth */}
        <path d="M 33 65 Q 50 60 67 65" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </>
    ),
    surprised: (
      <>
        {/* wide round eyes */}
        <circle cx="35" cy="42" r="7" fill="white" stroke={stroke} strokeWidth="3" />
        <circle cx="35" cy="42" r="3" fill={stroke} />
        <circle cx="65" cy="42" r="7" fill="white" stroke={stroke} strokeWidth="3" />
        <circle cx="65" cy="42" r="3" fill={stroke} />
        {/* raised eyebrows */}
        <path d="M 27 28 Q 35 24 43 28" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M 57 28 Q 65 24 73 28" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* open round mouth */}
        <ellipse cx="50" cy="68" rx="9" ry="11" fill={stroke} />
      </>
    ),
    scared: (
      <>
        {/* wide eyes, slightly asymmetric for unease */}
        <circle cx="35" cy="42" r="6.5" fill="white" stroke={stroke} strokeWidth="3" />
        <circle cx="36" cy="43" r="2.8" fill={stroke} />
        <circle cx="65" cy="42" r="6.5" fill="white" stroke={stroke} strokeWidth="3" />
        <circle cx="64" cy="43" r="2.8" fill={stroke} />
        {/* worried eyebrows, angled up in middle */}
        <path d="M 26 30 L 41 35" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        <path d="M 74 30 L 59 35" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
        {/* wavy/zigzag mouth — actual zigzag path */}
        <path
          d="M 30 64 L 36 70 L 42 64 L 48 70 L 54 64 L 60 70 L 70 64"
          fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
        />
      </>
    ),
    calm: (
      <>
        {/* closed, gently curved eyes (resting/peaceful) */}
        <path d="M 28 42 Q 35 38 42 42" fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        <path d="M 58 42 Q 65 38 72 42" fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
        {/* soft, very slight smile */}
        <path d="M 38 64 Q 50 70 62 64" fill="none" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100"
      role="img" aria-label={e.label}
      style={{ flexShrink: 0 }}
    >
      <circle cx="50" cy="50" r="48" fill={e.color} />
      {features[emotion]}
    </svg>
  );
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ROUND_SIZE = 4;

export default function EmotionMatchingGame() {
  const [round, setRound] = useState(0);
  const [targetEmotion, setTargetEmotion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const startRound = useCallback(() => {
    const pool = shuffle(EMOTIONS).slice(0, ROUND_SIZE);
    const target = pool[Math.floor(Math.random() * pool.length)];
    setTargetEmotion(target);
    setOptions(shuffle(pool));
    setSelected(null);
    setFeedback(null);
  }, []);

  useEffect(() => {
    startRound();
  }, [startRound]);

  const handleSelect = (emotionId) => {
    if (feedback) return;
    setSelected(emotionId);
    const isCorrect = emotionId === targetEmotion.id;
    setFeedback(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (round + 1 >= 6) {
      setFinished(true);
    } else {
      setRound((r) => r + 1);
      startRound();
    }
  };

  const handleRestart = () => {
    setRound(0);
    setScore(0);
    setFinished(false);
    startRound();
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 transition-colors duration-300 dark:bg-slate-950">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-transparent dark:bg-slate-900 dark:border-slate-800">

        <Link
          to="/autism"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-emerald-600 transition dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Autism Module
        </Link>

        <div className="mb-6 mt-2">
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400">
            Emotion Matching Game
          </span>
        </div>

        {!finished ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500 dark:text-slate-400">Round {round + 1} of 6</p>
              <p className="text-sm text-gray-500 dark:text-slate-400">Score: {score}</p>
            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full mb-8 dark:bg-slate-800">
              <div
                className="h-2 bg-emerald-600 rounded-full transition-all duration-300 dark:bg-emerald-500"
                style={{ width: `${((round + 1) / 6) * 100}%` }}
              />
            </div>

            <div className="text-center mb-8">
              <p className="text-gray-600 mb-1 dark:text-slate-400">Which face looks</p>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {targetEmotion?.label}?
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {options.map((opt) => {
                const isSelected = selected === opt.id;
                const isCorrectAnswer = opt.id === targetEmotion?.id;
                let ring = "border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-600";
                
                if (feedback && isSelected && feedback === "correct") {
                  ring = "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/30";
                } else if (feedback && isSelected && feedback === "incorrect") {
                  ring = "border-red-400 bg-red-50 dark:border-red-500 dark:bg-red-950/30";
                } else if (feedback && isCorrectAnswer) {
                  ring = "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-950/30";
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    disabled={!!feedback}
                    className={`flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition bg-white dark:bg-slate-800 ${ring} disabled:cursor-default`}
                  >
                    <FaceSVG emotion={opt.id} size={64} />
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div className="text-center mb-6">
                <p className={`text-sm font-medium ${feedback === "correct" ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                  {feedback === "correct" ? "That's right!" : `Not quite — that's ${targetEmotion.label}`}
                </p>
                <button
                  onClick={handleNext}
                  className="mt-4 rounded-lg bg-emerald-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-emerald-700 transition dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  {round + 1 >= 6 ? "See results" : "Next round"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <Smile className="h-12 w-12 text-emerald-500 mx-auto mb-4 dark:text-emerald-400" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-white">
              Great job!
            </h2>
            <p className="text-gray-600 mb-6 dark:text-slate-400">
              You got {score} out of 6 correct.
            </p>
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-white text-sm font-medium hover:bg-emerald-700 transition dark:bg-emerald-600 dark:hover:bg-emerald-500"
            >
              <RefreshCw className="h-4 w-4" /> Play again
            </button>
          </div>
        )}

        <p className="mt-8 text-xs text-gray-400 text-center dark:text-slate-500">
          A simple, repeatable game to help recognise and name basic emotions
          from facial expressions.
        </p>
      </div>
    </div>
  );
}