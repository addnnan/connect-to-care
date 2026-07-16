import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function Terms() {
  const sectionHeading = "text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 block";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 px-4 py-10 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">

        {/* Back Button Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition group mb-6"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" /> 
          Back to Home
        </Link>

        {/* Card Wrapper Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-10 dark:border-slate-800"
        >
          {/* Document Header block */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-6 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/50">
                <FileText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  Terms of Use
                </h1>
                <p className="text-xs text-slate-400 mt-0.5 dark:text-slate-500">
                  Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </div>
          </div>

          {/* Grid-structured Sections Container */}
          <div className="space-y-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>1. Acceptance of Terms</span>
              <p>
                By accessing or using ConnectToCare, you agree to be bound by these
                Terms of Use. If you do not agree to these terms, please do not use
                the platform.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-rose-100 bg-rose-50/10 dark:border-rose-900/30 dark:bg-rose-950/5">
              <span className="text-sm font-semibold uppercase tracking-wider text-rose-800 dark:text-rose-400 mb-2.5 block">
                2. Not a Medical Diagnosis
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                ConnectToCare provides screening tools based on validated
                instruments including the M-CHAT-R™ (Modified Checklist for
                Autism in Toddlers, Revised) and the ADHD Rating Scale IV
                Preschool Version. These screenings indicate likelihood only
                and do not constitute a medical diagnosis. Results should
                always be discussed with a qualified healthcare professional
                before any clinical decisions are made.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>3. Intended Use</span>
              <p>
                This platform is intended to be used by parents, caregivers, or
                healthcare professionals to screen for early indicators of autism
                and ADHD. It is not intended to replace professional evaluation,
                diagnosis, or treatment.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>4. User Accounts</span>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activity that occurs under your
                account. You agree to provide accurate information when
                registering and to notify us of any unauthorized use of your
                account.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>5. Clinic Contact Features</span>
              <p>
                The Care Guidance feature allows you to contact listed clinics
                via WhatsApp or Email with your screening summary pre-filled.
                ConnectToCare is not responsible for the availability,
                responsiveness, or quality of care provided by third-party
                clinics listed on the platform.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>6. Limitation of Liability</span>
              <p>
                ConnectToCare and its developers shall not be held liable for
                any decisions made based on screening results provided by this
                platform. The platform is provided "as is" without warranties
                of any kind, express or implied.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>7. Intellectual Property</span>
              <p>
                The M-CHAT-R™ is a copyrighted instrument © Robins, Fein &
                Barton, used in accordance with its permitted-use guidelines.
                The ADHD Rating Scale IV Preschool Version is adapted from
                published research by McGoey et al. All other platform content,
                design, and code are the property of ConnectToCare unless
                otherwise noted.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>8. Changes to These Terms</span>
              <p>
                We may update these Terms of Use from time to time. Continued
                use of the platform after changes are posted constitutes
                acceptance of the revised terms.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>9. Contact Information</span>
              <p>
                For questions about these Terms of Use, please reach out
                through the contact options available on our platform framework.
              </p>
            </div>

          </div>

          {/* Bottom Clinical Disclaimer Banner */}
          <div className="mt-8 border-t border-gray-100 pt-5 dark:border-slate-800">
            <p className="text-[11px] text-slate-400 text-center dark:text-slate-500 leading-normal">
               ConnectToCare is a screening tool and does not provide medical diagnoses.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}