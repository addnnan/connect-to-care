import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw, Coffee, Zap } from "lucide-react";

// ─── Modes ────────────────────────────────────────────────────────────────────
const MODES = {
  focus: { label: "Focus", minutes: 10, color: "indigo" },
  short: { label: "Short break", minutes: 3, color: "emerald" },
  long:  { label: "Long break", minutes: 8, color: "amber" },
};

const COLOR_MAP = {
  indigo:  { bg: "bg-indigo-600",  ring: "stroke-indigo-600",  light: "bg-indigo-50",  text: "text-indigo-700" },
  emerald: { bg: "bg-emerald-600", ring: "stroke-emerald-600", light: "bg-emerald-50", text: "text-emerald-700" },
  amber:   { bg: "bg-amber-500",   ring: "stroke-amber-500",   light: "bg-amber-50",   text: "text-amber-700" },
};

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function FocusTimer() {
  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(MODES.focus.minutes * 60);
  const [running, setRunning] = useState(false);
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0);
  const intervalRef = useRef(null);

  const totalSeconds = MODES[mode].minutes * 60;
  const colors = COLOR_MAP[MODES[mode].color];
  const progress = 1 - secondsLeft / totalSeconds;

  // Circle math
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const switchMode = useCallback((newMode) => {
    setRunning(false);
    setMode(newMode);
    setSecondsLeft(MODES[newMode].minutes * 60);
  }, []);

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          if (mode === "focus") {
            setCompletedFocusSessions((c) => c + 1);
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const handleReset = () => {
    setRunning(false);
    setSecondsLeft(totalSeconds);
  };

  const isFinished = secondsLeft === 0;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        <Link
          to="/adhd"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to ADHD Module
        </Link>

        <div className="mb-6">
          <span className="text-xs font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1">
            Focus Timer
          </span>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-8">
          {Object.entries(MODES).map(([key, m]) => (
            <button
              key={key}
              onClick={() => switchMode(key)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition
                ${mode === key
                  ? `${COLOR_MAP[m.color].light} ${COLOR_MAP[m.color].text}`
                  : "text-gray-500 hover:bg-gray-50"}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Circular timer */}
        <div className="flex justify-center mb-8">
          <div className="relative" style={{ width: 220, height: 220 }}>
            <svg width="220" height="220" className="-rotate-90">
              <circle
                cx="110" cy="110" r={radius}
                fill="none" stroke="#e5e7eb" strokeWidth="12"
              />
              <circle
                cx="110" cy="110" r={radius}
                fill="none" strokeWidth="12"
                strokeLinecap="round"
                className={colors.ring}
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-gray-900 tabular-nums">
                {formatTime(secondsLeft)}
              </span>
              <span className="text-xs text-gray-400 mt-1">{MODES[mode].label}</span>
            </div>
          </div>
        </div>

        {isFinished && (
          <div className={`text-center mb-6 ${colors.light} rounded-xl p-4`}>
            <p className={`text-sm font-medium ${colors.text}`}>
              {mode === "focus" ? "Nice work! Time for a break." : "Break's over — ready to focus?"}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handleReset}
            className="flex items-center justify-center h-12 w-12 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          <button
            onClick={() => setRunning((r) => !r)}
            disabled={isFinished}
            className={`flex items-center justify-center h-16 w-16 rounded-full ${colors.bg} text-white hover:opacity-90 transition disabled:opacity-40`}
          >
            {running ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
          <div className="h-12 w-12" /> {/* spacer for symmetry */}
        </div>

        {/* Session counter */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
          <Zap className="h-4 w-4 text-indigo-400" />
          {completedFocusSessions} focus session{completedFocusSessions !== 1 ? "s" : ""} completed today
        </div>

        <div className="bg-gray-50 rounded-xl p-4 flex gap-3">
          <Coffee className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Tip: start with just one focus session. Short, consistent bursts
            work better than long stretches. Take the break seriously —
            stand up and move around.
          </p>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center">
          A simple focus/break timer to support sustained attention in short,
          manageable bursts.
        </p>
      </div>
    </div>
  );
}