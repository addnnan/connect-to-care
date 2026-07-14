import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { Mail, MessageCircle, Download, ArrowLeft, Building2, MapPin, CheckCircle, X } from "lucide-react";

// ─── Clinic data with WhatsApp numbers and email addresses ───────────────────
const CLINIC_PARTNERS = [
  {
    id: "clinic-1",
    name: "Gulswarm Children's Clinic",
    location: "Hawal Area, Srinagar",
    specialty: "Pediatric Consultation & Early Screening",
    whatsapp: "917006372473", // format: country code + number, no +
    email: "shahadnan727@gmail.com",
    details: [
      "Early intervention screening & developmental assessments",
      "Speech, language, and communication milestone mapping",
      "Behavioral observation & pediatric support plan design",
    ],
  },
  {
    id: "clinic-2",
    name: "AF KIDS CLINIC",
    location: "Near Koker Masjid, Nawakadal, Srinagar",
    specialty: "24/7 Urgent Pediatric Care",
    whatsapp: "919419000002",
    email: "afkids.clinic@example.com",
    details: [
      "24/7 pediatric emergency coverage & urgent consultation",
      "Growth monitoring & general physical child health reviews",
      "Immediate specialist coordination and care plans",
    ],
  },
  {
    id: "clinic-3",
    name: "Dr. Samiya Khan, MD Pediatrics",
    location: "GMC, Srinagar",
    specialty: "Pediatrics, Airway, and Asthma",
    whatsapp: "919419000003",
    email: "dr.samiya.khan@example.com",
    details: [
      "Pediatric asthma management & allergy diagnostics",
      "Airway & respiratory evaluations for children",
      "General pediatric healthcare & pediatric consultation",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function typeLabel(type) {
  if (type === "autism") return "M-CHAT-R™ Autism Screening";
  if (type === "autism-followup") return "M-CHAT-R/F™ Follow-Up";
  if (type === "adhd") return "ADHD Rating Scale IV (Preschool)";
  return type;
}

function buildSummary(assessment) {
  if (!assessment) return "";
  const { type, result, score, date, details } = assessment;
  const domains = details?.domainPercentages || {};
  const domainLines = Object.entries(domains)
    .map(([d, v]) => `   • ${d.charAt(0).toUpperCase() + d.slice(1)}: ${v}%`)
    .join("\n");

  return (
    `*ConnectToCare Screening Summary*\n\n` +
    `Assessment: ${typeLabel(type)}\n` +
    `Result: *${result} likelihood*\n` +
    `Score: ${score}\n` +
    `Date: ${new Date(date).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}\n` +
    (domainLines ? `\nDomain Breakdown:\n${domainLines}\n` : "") +
    `\nI would like to request an appointment for a professional evaluation. ` +
    `Please contact me to schedule.`
  );
}

// ─── Toast component ──────────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm bg-white border border-emerald-100 rounded-2xl shadow-xl p-4 flex gap-3 items-start animate-slide-in dark:bg-slate-900 dark:border-slate-800">
      <div className="flex-shrink-0 bg-emerald-50 p-2 rounded-xl dark:bg-emerald-950/40">
        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">Opening contact</p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed dark:text-slate-400">{message}</p>
      </div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CareGuidance() {
  const { type } = useParams();
  const [assessment, setAssessment] = useState(null);
  const [loadingAssessment, setLoadingAssessment] = useState(true);
  const [toast, setToast] = useState(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const loadLatestAssessment = useCallback(async () => {
    setLoadingAssessment(true);
    try {
      const { data } = await api.get("/assessments");
      const match = data.find((a) =>
        type === "adhd" ? a.type === "adhd" : a.type === "autism" || a.type === "autism-followup"
      );
      setAssessment(match || null);
    } catch (err) {
      console.error("Failed to load assessment", err);
    } finally {
      setLoadingAssessment(false);
    }
  }, [type]);

  useEffect(() => {
    loadLatestAssessment();
  }, [loadLatestAssessment]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const handleWhatsApp = (clinic) => {
    const message = buildSummary(assessment);
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${clinic.whatsapp}?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setToast(`WhatsApp opened with your screening summary pre-filled for ${clinic.name}. Just hit Send.`);
  };

  const handleEmail = (clinic) => {
    const subject = encodeURIComponent(`Appointment Request — ${typeLabel(type)} Screening`);
    const body = encodeURIComponent(
      `Dear Clinic,\n\n` +
      `I am writing to request an appointment following a screening completed on ConnectToCare.\n\n` +
      `Please contact me at your earliest convenience to schedule an evaluation.\n\n` +
      `Thank you.`
    );
    window.location.href = `mailto:${clinic.email}?subject=${subject}&body=${body}`;
    setToast(`Email draft opened for ${clinic.name}. Attach your PDF report before sending.`);
  };

  const handleDownloadPdf = async () => {
    if (!assessment) return;
    setDownloadingPdf(true);
    try {
      const response = await api.get(`/reports/${assessment.id}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `assessment-report-${assessment.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF download failed", err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:py-12 transition-colors duration-300 dark:bg-slate-950">
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-0.75rem) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-slide-in { animation: slideIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-700 mb-4 transition gap-1.5 dark:text-slate-400 dark:hover:text-emerald-400">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight dark:text-white">
            Featured Local Specialists
          </h1>
          <p className="text-gray-500 mt-2 text-base md:text-lg max-w-3xl leading-relaxed dark:text-slate-400">
            Contact a clinic directly with your screening summary pre-filled — no copy-pasting needed.
          </p>
        </div>

        {/* Assessment summary banner */}
        {!loadingAssessment && (
          <div className={`rounded-2xl border p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300
            ${assessment
              ? assessment.result === "High" ? "bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/40"
              : assessment.result === "Moderate" ? "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40"
              : "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40"
              : "bg-gray-50 border-gray-200 dark:bg-slate-900 dark:border-slate-800"}`}
          >
            {assessment ? (
              <>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1 dark:text-slate-400">
                    Assessment to share
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white">{typeLabel(assessment.type)}</p>
                  <p className="text-sm text-gray-600 mt-0.5 dark:text-slate-300">
                    Result: <span className="font-medium">{assessment.result} likelihood</span>
                    {" · "}Score: {assessment.score}
                    {" · "}{new Date(assessment.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <button
                  onClick={handleDownloadPdf}
                  disabled={downloadingPdf}
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 flex-shrink-0 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <Download className="h-4 w-4" />
                  {downloadingPdf ? "Generating…" : "Download PDF to attach"}
                </button>
              </>
            ) : (
              <p className="text-sm text-gray-500 dark:text-slate-400">
                No {type === "adhd" ? "ADHD" : "autism"} screening found.{" "}
                <Link to={`/assessment/${type}`} className="text-emerald-600 hover:underline font-medium dark:text-emerald-400">
                  Take the screening first
                </Link>{" "}
                so your results can be included in your message.
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Clinic cards */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 dark:text-slate-200">
              <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Verified Clinic Directory ({type === "adhd" ? "ADHD & Pediatric Care" : "Autism & Early Care"})
            </h2>

            {CLINIC_PARTNERS.map((clinic) => (
              <div
                key={clinic.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col dark:bg-slate-900 dark:border-slate-800"
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/40">
                      <CheckCircle className="w-3 h-3" /> Verified Partner
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2 dark:text-white">{clinic.name}</h3>
                  </div>
                </div>

                {/* Location & specialty */}
                <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-3 dark:text-slate-400">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 dark:text-slate-500" />
                  {clinic.location}
                </p>

                <div className="border-t border-gray-100 mb-3 dark:border-slate-800" />

                <p className="text-[10px] font-semibold text-emerald-600 tracking-wider uppercase mb-0.5 dark:text-emerald-400">
                  Primary Specialty
                </p>
                <p className="text-sm font-medium text-gray-700 mb-4 dark:text-slate-300">{clinic.specialty}</p>

                <ul className="space-y-1.5 mb-6">
                  {clinic.details.map((detail, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2 dark:text-slate-400">
                      <span className="text-emerald-500 flex-shrink-0 mt-0.5 dark:text-emerald-400">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Contact buttons */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <button
                    onClick={() => handleWhatsApp(clinic)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#1ebe59] text-white text-sm font-semibold py-3 px-4 transition active:scale-[0.97]"
                  >
                    <svg className="w-4 h-4 fill-white flex-shrink-0" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.854L.057 23.428a.5.5 0 00.609.61l5.692-1.45A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.013-1.374l-.36-.214-3.722.948.982-3.62-.234-.372A9.818 9.818 0 1112 21.818z"/>
                    </svg>
                    WhatsApp
                  </button>

                  <button
                    onClick={() => handleEmail(clinic)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 px-4 transition active:scale-[0.97] dark:bg-indigo-600 dark:hover:bg-indigo-500"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    Email
                  </button>
                </div>

                {/* Helper hint */}
                <p className="text-[11px] text-gray-400 text-center mt-3 leading-relaxed dark:text-slate-500">
                  {assessment
                    ? "Your screening summary will be pre-filled in the message."
                    : "Complete a screening first to include your results."}
                </p>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="lg:col-span-2 lg:sticky lg:top-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 dark:text-slate-200">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Specialist Locations Map
            </h2>
            <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-[450px] md:h-[550px] hover:shadow-md transition dark:bg-slate-900 dark:border-slate-800">
              <iframe
                title="Srinagar Clinics Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52824.23832145889!2d74.76615998782352!3d34.15873919108985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f26db0c4e09%3A0x7d01869e59d99727!2sSrinagar!5e0!3m2!1sen!2sin!4v1719012345678!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* How it works box */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 dark:bg-slate-900 dark:border-slate-800">
              <p className="text-sm font-semibold text-gray-800 mb-3 dark:text-white">How contacting works</p>
              <ol className="space-y-2.5">
                {[
                  { icon: <MessageCircle className="h-4 w-4 text-[#25D366]" />, text: "WhatsApp opens with your full screening summary pre-filled — just tap Send." },
                  { icon: <Mail className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />, text: "Email opens with subject and body pre-filled — attach your PDF report before sending." },
                  { icon: <Download className="h-4 w-4 text-gray-400 dark:text-slate-500" />, text: "Download the PDF above and attach it to the email for the full clinical report." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-xs text-gray-600 dark:text-slate-400">
                    <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ol>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}