import { useParams } from "react-router-dom";

export default function CareGuidance() {
  const { type } = useParams();

//   const isAutism = type === "autism";
  const guidance = {
  autism: {
    title: "Autism Care Guidance",
    professionals: [
      "Developmental Pediatrician",
      "Child Psychologist",
      "Speech Therapist",
      "Occupational Therapist",
    ],
    resources: [
      "Early intervention programs",
      "Communication support",
      "Social skills development",
      "Parent guidance resources",
    ],
  },

  adhd: {
    title: "ADHD Care Guidance",
    professionals: [
      "Child Psychiatrist",
      "Clinical Psychologist",
      "Behavioral Therapist",
      "Pediatrician",
    ],
    resources: [
      "Attention management strategies",
      "School support planning",
      "Behavioral interventions",
      "Parent education resources",
    ],
  },
};


const current = guidance[type] || guidance.autism;

  return (
    
    <div>
     <div className="min-h-screen bg-gray-50 px-4 py-10">
  <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

    <h1 className="text-3xl font-bold mb-3">
      {current.title}
    </h1>

    <p className="text-gray-600 mb-8">
      Based on the assessment results, these
      professionals and resources may be helpful.
    </p>

    <div className="grid md:grid-cols-2 gap-8">

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Recommended Professionals
        </h2>

        <ul className="space-y-3">
          {current.professionals.map((item) => (
            <li
              key={item}
              className="border rounded-lg p-3"
            >
              {item}
            </li>
          ))}
        </ul>

        <a
            href={
                type === "autism"
                ? "https://www.google.com/search?q=developmental+pediatrician+near+me"
                : "https://www.google.com/search?q=child+psychiatrist+near+me"
            }
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block bg-emerald-600 text-white px-5 py-3 rounded-lg"
            >
            Search Nearby Specialists
            </a>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Helpful Resources
        </h2>

        <ul className="space-y-3">
          {current.resources.map((item) => (
            <li
              key={item}
              className="border rounded-lg p-3"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

    </div>

  </div>
</div>
    </div>
  );
}