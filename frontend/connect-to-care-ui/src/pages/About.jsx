import { Brain, ShieldCheck, Users, Target } from "lucide-react";

export default function About() {
  return (
    <main className="bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-6">
            About ConnectToCare
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A digital platform designed to support early developmental screening
            and guide individuals toward appropriate healthcare support.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid gap-8">

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to make early developmental screening more accessible
              and less overwhelming by combining digital tools, AI-assisted analysis,
              and guided pathways to professional care.
            </p>
          </div>

          {/* Problem */}
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                The Problem We Address
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Early identification of developmental concerns such as autism is often
              delayed due to limited access to screening tools, long waiting periods,
              and lack of awareness. Many families struggle to take the first step
              toward understanding developmental needs.
            </p>
          </div>

          {/* What We Do */}
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                What ConnectToCare Does
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              ConnectToCare offers structured digital screening experiences that help
              users reflect on behavioral patterns through guided questionnaires.
              AI-assisted analysis summarizes responses and helps guide informed next
              steps, including connecting with healthcare professionals.
            </p>
          </div>

          {/* Responsible AI */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="h-6 w-6 text-emerald-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Responsible Use of AI
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              ConnectToCare uses artificial intelligence as a supportive tool for
              screening and guidance. The platform does not provide medical diagnoses
              and does not replace professional evaluation by qualified healthcare
              providers. AI outputs are intended to support awareness and informed
              decision-making.
            </p>
          </div>

          {/* Who It's For */}
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Who This Platform Is For
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 text-gray-600">
              <li className="border rounded-xl p-4">
                Parents seeking early developmental insights
              </li>
              <li className="border rounded-xl p-4">
                Adults exploring self-assessment options
              </li>
              <li className="border rounded-xl p-4">
                Healthcare professionals offering care services
              </li>
            </ul>
          </div>

          {/* Academic Context */}
          <div className="text-center pt-8 border-t">
            <p className="text-sm text-gray-500 max-w-3xl mx-auto">
              ConnectToCare is an academic project developed to explore the application
              of artificial intelligence in healthcare screening and digital care
              coordination.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
