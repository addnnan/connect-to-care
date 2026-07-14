import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure the Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Initialize the model (Gemini 2.5 Flash is fast, smart, and cost-effective)
model = genai.GenerativeModel("gemini-2.5-flash")

def analyze_text(text: str):
    prompt = f"""
    You are an advanced clinical language processing assistant specializing in neurodevelopmental screening.

    Task:
    Analyze the text provided by a caregiver/observer to map early indicators against established DSM-5 behavioral criteria for Autism Spectrum Disorder (ASD) and ADHD.

    Instructions:
    1. Do NOT make a formal medical diagnosis. Frame everything as "observed indicators" and "screening likelihood".
    2. Explicitly determine if the observed behaviors point toward ASD indicators, ADHD indicators, Combined patterns, or Low indicators across both.
    3. Evaluate ASD traits across two domains: Social Communication/Interaction and Restricted/Repetitive Behaviors.
    4. Evaluate ADHD traits across two domains: Inattention and Hyperactivity/Impulsivity.

    Return STRICT JSON in this exact format:
    {{
      "primary_indication": "Autism Spectrum Disorder | ADHD | Combined Patterns | Low Indicators",
      "likelihood": "Low | Moderate | High",
      "confidence": 0.85,
      "analysis": "A concise, objective summary explaining which indicators appeared in the text and how they relate to the flagged conditions.",
      "domain_flags": {{
        "asd_social_communication": true,
        "asd_repetitive_behaviors": false,
        "adhd_inattention": true,
        "adhd_hyperactivity_impulsivity": false
      }},
      "specific_observations": [
        "e.g., Avoids eye contact when name is called", 
        "e.g., Struggles to remain seated during meals"
      ],
      "recommendations": [
        "First specific diagnostic next step",
        "Second tailored everyday support strategy"
      ]
    }}

    Text to analyze:
    \"\"\"{text}\"\"\"
    """

    try:
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        # Safely parse data
        data = json.loads(response.text)
        
        return {
            "primary_indication": data.get("primary_indication", "Low Indicators"),
            "likelihood": data.get("likelihood", "Moderate"),
            "confidence": int(data.get("confidence_score", data.get("confidence", 0.5)) * 100),
            "analysis": data.get("analysis", "Behavioral logs reviewed by automated screening."),
            "domain_flags": data.get("domain_flags", {
                "asd_social_communication": False,
                "asd_repetitive_behaviors": False,
                "adhd_inattention": False,
                "adhd_hyperactivity_impulsivity": False
            }),
            "specific_observations": data.get("specific_observations", []),
            "recommendations": data.get("recommendations", ["Consult a healthcare professional for an objective observation."])
        }

    except Exception as e:
        print(f"Error during backend text analysis: {e}")
        return {
            "primary_indication": "Low Indicators",
            "likelihood": "Low",
            "confidence": 50,
            "analysis": "AI screening service temporarily unavailable. No definitive traits could be parsed.",
            "domain_flags": {"asd_social_communication": False, "asd_repetitive_behaviors": False, "adhd_inattention": False, "adhd_hyperactivity_impulsivity": False},
            "specific_observations": [],
            "recommendations": ["Please resubmit your observations later.", "Consult with your local pediatric center."]
        }