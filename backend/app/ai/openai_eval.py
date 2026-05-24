import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure the Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)
print("Available models that support text generation:")
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(f"- {m.name}")

# Initialize the model (Gemini 1.5 Flash is fast and cost-effective)
model = genai.GenerativeModel("gemini-2.5-flash")

def analyze_text(text: str):
    # Constructing a prompt to force a specific output format
    prompt = f"""
    You are an expert clinical assistant specializing in early detection of Autism Spectrum Disorder (ASD) and ADHD

    Task:
    Evaluate the text ONLY for early behavioral indicators related to:
    - social interaction
    - communication
    - attention regulation
    - repetitive behaviors
    - sensory sensitivity

    Instructions:
    1. Do NOT diagnose.
    2. Do NOT add explanations outside JSON.
    3. Use ONLY the categories: Low, Moderate, High.
    4. Confidence must reflect strength of indicators in the text.

    Scoring rubric:
    - Low: vague, occasional, or no indicators
    - Moderate: multiple mild indicators OR one strong indicator
    - High: multiple strong indicators across categories

    Return STRICT JSON in this exact format:
    {{
    "label": "Low | Moderate | High",
    "confidence_score": number between 0.0 and 1.0
    "analysis": string (detailed explanation of findings based on the text and questionnaire)
    "recommendations": string[] (list of recommended next steps)
    }}

    Text to analyze:
    \"\"\"{text}\"\"\"
    """


    try:
        # Generate content
        response = model.generate_content(
            prompt,
            generation_config={"response_mime_type": "application/json"}
        )
        
        # Parse the JSON response
        data = json.loads(response.text)
        likelihood = data.get("label", "Moderate")
        confidence = int(data.get("confidence_score", 0.5) * 100)
        ai_analysis = data.get("analysis", "Behavioral patterns were reviewed.")
        recommendations = data.get("recommendations", [])

        return {
            "likelihood": likelihood,
            "confidence": confidence,
            "analysis": ai_analysis,
            "recommendations": recommendations
        }

    except Exception as e:
        print(f"Error: {e}")
        return {
            "likelihood": "Moderate",
            "confidence": 50,
            "analysis": "AI service temporarily unavailable. Showing neutral screening result.",
            "recommendations": [
                "Please try again later.",
                "Consult a healthcare professional."
            ]
        }

