import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Mail, ClipboardList, ArrowRight, Brain, Zap, FileText, Calendar, Sparkles } from "lucide-react";
import api from "../services/api";

function riskBadge(risk) {
  const normalized = risk?.toString().toLowerCase() || "";
  if (normalized.includes("high"))     return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/40";
  if (normalized.includes("mod"))     return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/40";
  return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/40";
}

function typeLabel(type, details) {
  if (type === "detailed-ai") {
    const isAdhd = details?.primary_indication?.includes("ADHD");
    return {
      label: `AI Screen: ${details?.primary_indication || "Behavioral Analysis"}`,
      icon: Sparkles,
      color: isAdhd ? "text-purple-600 dark:text-purple-400" : "text-emerald-600 dark:text-emerald-400",
      route: "/detailed-result"
    };
  }
  if (type === "autism")       return { label: "Autism (M-CHAT-R™)", icon: Brain, color: "text-emerald-600 dark:text-emerald-400", route: "/result" };
  if (type === "autism-followup") return { label: "Autism Follow-Up", icon: Brain, color: "text-emerald-600 dark:text-emerald-400", route: "/result" };
  if (type === "adhd")         return { label: "ADHD Screening", icon: Zap, color: "text-purple-600 dark:text-purple-400", route: "/result" };
  return { label: type, icon: ClipboardList, color: "text-gray-500", route: "/result" };
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function getInitials(name, email) {
  if (name) return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  if (email) return email[0].toUpperCase();
  return "?";
}

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser]             = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Instantly pull user metadata from client localStorage cache
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // 2. Query data history list directly
      const assessRes = await api.get("/assessments");
      
      // Handle array unpack safely whether nested in key structures or bare arrays
      const rawList = Array.isArray(assessRes.data) 
        ? assessRes.data 
        : (assessRes.data?.data || assessRes.data?.assessments || []);

      // CHANGED: Limits history list directly to the 3 most recent entries
      setAssessments(rawList.slice(0, 3)); 
    } catch (err) {
      console.error("Failed loading assessments tracking array", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ── Flexible, Case-Insensitive Tally Counting ──
  const totalAssessments = assessments.length;
  const highCount        = assessments.filter(a => 
    a.result?.toString().toLowerCase().includes("high")
  ).length;
  const lastDate         = assessments[0]?.date ? formatDate(assessments[0].date) : "—";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <p className="text-gray-400 dark:text-slate-500 text-sm">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 px-4 py-10 transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* ── Avatar + info card ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="h-20 w-20 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold select-none">
                {getInitials(user?.full_name || user?.name, user?.email)}
              </div>
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
            </div>

            {/* Details */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.full_name || user?.name || "User"}
              </h1>

              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1.5 text-sm text-gray-500 dark:text-slate-400">
                <Mail className="h-3.5 w-3.5" />
                {user?.email || "—"}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex-shrink-0 flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Screenings", value: totalAssessments, sub: "completed (recent)" },
            { label: "High risk", value: highCount, sub: "flagged results" },
            { label: "Last screening", value: lastDate, sub: "most recent", small: true },
          ].map(({ label, value, sub, small }) => (
            <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4 text-center shadow-sm">
              <p className={`font-bold text-gray-900 dark:text-white ${small ? "text-sm mt-1" : "text-2xl"}`}>{value}</p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Recent assessments ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Assessments (Latest 3)</h2>
            </div>
            <Link to="/dashboard" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline">
              View all
            </Link>
          </div>

          {assessments.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <ClipboardList className="h-8 w-8 text-gray-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-slate-400">No assessments yet.</p>
              <Link to="/assessments" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                Take your first screening <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-slate-800">
              {assessments.map((a) => {
                const isDetailedAI = a.type === "detailed-ai";
                const { label, icon: Icon, color, route } = typeLabel(a.type, a.details);
                
                return (
                  <li key={a.id || a._id}>
                    <Link
                      to={isDetailedAI ? route : `${route}/${a.id || a._id}`}
                      state={isDetailedAI ? a.details : a}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-4 w-4 flex-shrink-0 ${color}`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-400 dark:text-slate-500">
                            <Calendar className="h-3 w-3" />
                            {formatDate(a.date)}
                            {isDetailedAI && ` · Confidence: ${a.score || 50}%`}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${riskBadge(a.result)}`}>
                          {a.result}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-gray-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* ── Quick actions ── */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/assessment/autism"
            className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition group"
          >
            <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center flex-shrink-0">
              <Brain className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Autism Screen</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">M-CHAT-R™</p>
            </div>
          </Link>
          <Link
            to="/assessment/adhd"
            className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md transition group"
          >
            <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center flex-shrink-0">
              <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">ADHD Screen</p>
              <p className="text-xs text-gray-400 dark:text-slate-500">ARS-IV Preschool</p>
            </div>
          </Link>
        </div>

        {/* ── Logout confirm modal ── */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-800 p-6 max-w-sm w-full">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-50 dark:bg-red-950 mx-auto mb-4">
                <LogOut className="h-5 w-5 text-red-500 dark:text-red-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white text-center mb-1">
                Sign out?
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 text-center mb-6">
                You'll need to sign back in to access your assessment history.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 rounded-xl border border-gray-200 dark:border-slate-700 py-2.5 text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 py-2.5 text-sm font-medium text-white transition"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}