import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CLINIC_PARTNERS = [
  {
    id: "clinic-1",
    name: "Gulswarm Children's Clinic",
    location: "Hawal Area, Srinagar",
    specialty: "Pediatric Consultation & Early Screening",
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
    details: [
      "Pediatric asthma management & allergy diagnostics",
      "Airway & respiratory evaluations for children",
      "General pediatric healthcare & pediatric consultation",
    ],
  },
];

export default function CareGuidance() {
  const { type } = useParams();
  const [toast, setToast] = useState({ show: false, clinicName: "" });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, clinicName: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleRequestAppointment = (clinicName) => {
    setToast({ show: true, clinicName });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:py-12">
      {/* Self-contained Keyframe Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-1rem) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 right-4 z-50 max-w-md bg-white border border-emerald-100 rounded-2xl shadow-xl p-4 flex gap-3 items-start animate-slide-in backdrop-blur-md bg-opacity-95">
          <div className="flex-shrink-0 bg-emerald-50 p-2 rounded-xl text-emerald-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm">Appointment Requested</h4>
            <p className="text-gray-600 text-xs mt-1 leading-relaxed">
              Success! Your contact details have been securely sent to <span className="font-semibold text-gray-950">{toast.clinicName}</span>. They will contact you shortly to schedule.
            </p>
          </div>
          <button 
            onClick={() => setToast({ show: false, clinicName: "" })}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-sm font-semibold text-emerald-650 hover:text-emerald-705 mb-4 transition"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Featured Local Specialists
          </h1>
          <p className="text-gray-550 mt-2 text-base md:text-lg max-w-3xl leading-relaxed">
            These verified local clinics specialize in pediatric care and early intervention.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          {/* Clinic Directory Column */}
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Verified Clinic Directory ({type === "adhd" ? "ADHD & Pediatric Care" : "Autism & Early Care"})
            </h2>

            <div className="space-y-6">
              {CLINIC_PARTNERS.map((clinic) => (
                <div 
                  key={clinic.id} 
                  className="bg-white rounded-2xl border border-gray-250/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Top / Partner Badge */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div>
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-100">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified Partner
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 mt-2 hover:text-emerald-700 transition">
                          {clinic.name}
                        </h3>
                      </div>
                    </div>

                    {/* Location & Specialty */}
                    <div className="space-y-2 mb-4">
                      <p className="text-sm text-gray-500 flex items-center">
                        <svg className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {clinic.location}
                      </p>
                      
                      <div className="border-t border-gray-100 my-3"></div>
                      
                      <div>
                        <span className="text-[10px] font-bold text-emerald-600 tracking-wider uppercase">Primary Specialty</span>
                        <p className="text-sm font-semibold text-gray-700 mt-0.5">{clinic.specialty}</p>
                      </div>
                    </div>

                    {/* Details List */}
                    <ul className="space-y-2 mt-4">
                      {clinic.details.map((detail, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-emerald-500 mt-1 flex-shrink-0">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Request Button */}
                  <button 
                    onClick={() => handleRequestAppointment(clinic.name)}
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 3V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Request Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Google Map Column */}
          <div className="lg:col-span-2 lg:sticky lg:top-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Specialist Locations Map
            </h2>
            
            <div className="bg-white p-2 rounded-2xl border border-gray-250/80 shadow-sm overflow-hidden h-[450px] md:h-[550px] transition-all hover:shadow-md">
              <iframe
                title="Srinagar Clinics Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52824.23832145889!2d74.76615998782352!3d34.15873919108985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f26db0c4e09%3A0x7d01869e59d99727!2sSrinagar!5e0!3m2!1sen!2sin!4v1719012345678!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}