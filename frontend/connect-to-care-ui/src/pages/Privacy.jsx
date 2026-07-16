import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Privacy() {
  const sectionHeading = "text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 block";
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 px-4 py-10 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">

        {/* Back Button Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm  text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition group mb-6"
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
                <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                  Privacy Policy
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
              <span className={sectionHeading}>1. Information We Collect</span>
              <p>
                ConnectToCare collects information you provide directly, including your
                name, email address, and screening responses (autism and ADHD assessment
                answers, resulting scores, and risk levels). If you create an account,
                we store your email and a securely hashed password. We do not collect
                sensitive information beyond what is necessary to provide the screening
                and care guidance features of the platform.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>2. How We Use Your Information</span>
              <p>
                Your screening data is used to calculate risk scores, generate domain
                breakdowns, produce downloadable PDF reports, and maintain your
                assessment history in your dashboard. If you choose to contact a
                clinic through the Care Guidance feature, a summary of your screening
                result is included in the pre-filled message you send — this is only
                shared when you actively click to contact a clinic.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>3. Data Storage and Security</span>
              <p>
                Assessment records and account information are stored in a secured
                database. Passwords are hashed and never stored in plain text.
                Authentication uses industry-standard JSON Web Tokens (JWT) with
                short-lived access tokens and longer-lived refresh tokens.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>4. Data Sharing</span>
              <p>
                We do not sell or rent your personal information to third parties.
                Your screening data is only shared with a healthcare provider when
                you explicitly choose to send it via the WhatsApp or Email contact
                options on the Care Guidance page.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>5. Your Rights</span>
              <p>
                You may request deletion of your account and associated assessment
                history at any time. You can also delete individual assessment
                records directly from your Dashboard.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>6. Children's Privacy</span>
              <p>
                ConnectToCare screening tools are intended to be completed by
                parents, caregivers, or healthcare professionals on behalf of a
                child. We do not knowingly collect personal information directly
                from children.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>7. Changes to This Policy</span>
              <p>
                We may update this Privacy Policy from time to time. Changes will
                be reflected by updating the "Last updated" date at the top of
                this page.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-gray-100 bg-gray-50/20 dark:border-slate-800 dark:bg-slate-950/20">
              <span className={sectionHeading}>8. Contact Information</span>
              <p>
                If you have questions about this Privacy Policy or your data,
                please reach out through the contact options available on our
                platform directory layers.
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