import urllib.request
import json
from jose import jwt

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# Create a mock user ID "test_user_123"
token = jwt.encode({"sub": "test_user_123"}, SECRET_KEY, algorithm=ALGORITHM)

# Construct mock M-CHAT-R assessment payload
# Question 1 ("mchat_1"), 3 ("mchat_3"), 9 ("mchat_9"), 10 ("mchat_10"), and 5 ("mchat_5") are elevated (failed)
# Standard questions fail on "no", reversed questions (like 5) fail on "yes"
payload = {
    "type": "autism",
    "result": "Moderate",
    "score": 5,
    "date": "2026-06-21T12:00:00Z",
    "details": {
        "finalScore": 5,
        "risk": "Moderate",
        "domainPercentages": {
            "communication": 50,
            "sensory": 33,
            "motor": 25,
            "social": 0
        },
        "totalElevated": 5,
        "elevatedItems": [1, 9, 3, 10, 5]
    },
    "answers": {
        "mchat_1": "no",  # fails
        "mchat_2": "no",
        "mchat_3": "no",  # fails
        "mchat_4": "yes",
        "mchat_5": "yes", # fails (reversed)
        "mchat_6": "yes",
        "mchat_7": "yes",
        "mchat_8": "yes",
        "mchat_9": "no",  # fails
        "mchat_10": "no", # fails
        "mchat_11": "yes"
    },
    "answeredQuestions": []
}

req = urllib.request.Request(
    "http://127.0.0.1:8000/assessments",
    data=json.dumps(payload).encode("utf-8"),
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    },
    method="POST"
)

try:
    with urllib.request.urlopen(req) as res:
        response_data = json.loads(res.read().decode("utf-8"))
        print("Success! Response:")
        print(json.dumps(response_data, indent=2))
        
        assessment_id = response_data["_id"]
        report_url = f"http://127.0.0.1:8000/reports/{assessment_id}"
        print(f"\nFetching PDF report from: {report_url}")
        
        report_req = urllib.request.Request(report_url, method="GET")
        with urllib.request.urlopen(report_req) as report_res:
            pdf_data = report_res.read()
            with open("test_report.pdf", "wb") as f:
                f.write(pdf_data)
            print("PDF report successfully downloaded and saved to 'test_report.pdf'!")
except Exception as e:
    print(f"Failed: {e}")
