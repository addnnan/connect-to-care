import { useEffect, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, AlertTriangle, ArrowRight, Loader2, Download } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const downloadReport = useCallback(async () => {
    if (!session_id) {
      setStatus("error");
      setErrorMsg("No payment session ID found in the URL.");
      return;
    }

    try {
      setStatus("loading");
      const response = await api.get(`/reports/download/${session_id}`, {
        responseType: "blob",
      });

      // Save blob as PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `official-assessment-report-${session_id.substring(0, 10)}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setStatus("success");
    } catch (err) {
      console.error("PDF download failed:", err);
      setStatus("error");
      setErrorMsg("Failed to generate and download your PDF report. Please contact support.");
    }
  }, [session_id]);

  useEffect(() => {
    downloadReport();
  }, [downloadReport]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center"
      >
        {status === "loading" && (
          <div className="space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <Loader2 className="h-8 w-8 text-emerald-600 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Processing Payment...</h1>
            <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              We are verifying your Stripe payment and preparing your official ConnectToCare clinical report. Your download will start automatically.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              Thank you for your purchase. Your official clinical report has been compiled and is downloading to your device.
            </p>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-xs text-emerald-800 text-left">
              💡 <strong>Tip:</strong> If the download did not start automatically, click the button below to retry.
            </div>
            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={downloadReport}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 px-5 py-3.5 text-white font-medium transition"
              >
                <Download className="h-4 w-4" />
                Retry PDF Download
              </button>
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-1 w-full rounded-xl border border-gray-200 hover:bg-gray-50 px-5 py-3.5 text-gray-700 font-medium transition text-sm"
              >
                Return to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <AlertTriangle className="h-10 w-10 text-rose-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Verification Failed</h1>
            <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
              {errorMsg || "We were unable to verify your payment session or download the PDF report."}
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-1 w-full rounded-xl bg-gray-900 hover:bg-gray-800 px-5 py-3.5 text-white font-medium transition"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
}
