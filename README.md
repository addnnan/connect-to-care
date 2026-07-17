# ConnectToCare

**Free, clinically grounded screening for autism and ADHD — built for parents, backed by validated instruments.**

ConnectToCare is a full-stack web platform that digitizes standardized developmental screening for children, using the same instruments paediatricians use in clinical practice. It provides domain-level breakdowns, a two-stage autism follow-up workflow, downloadable PDF clinical reports, and a guided path to local healthcare professionals.

> This tool provides early screening only and does not offer a medical diagnosis. Always consult a qualified healthcare professional for clinical evaluation.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screening Instruments](#screening-instruments)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Dark Mode](#dark-mode)
- [Support Modules](#support-modules)
- [Roadmap](#roadmap)
- [Disclaimer](#disclaimer)
- [License](#license)

---

## Features

- 🧠 **Autism screening (M-CHAT-R™)** — 20-item Yes/No questionnaire with correct reversed-scoring logic, domain breakdown (Social, Communication, Sensory, Motor), and a two-stage **M-CHAT-R/F follow-up** interview with full branching flowchart logic for Moderate-risk results
- ⚡ **ADHD screening (ADHD Rating Scale IV — Preschool)** — 18-item frequency questionnaire scored against published 93rd-percentile clinical cutoffs (Inattention, Hyperactivity/Impulsivity, Total)
- ✨ **DSM-5 Narrative Behavioral Analysis** — An advanced natural language interpretation engine that processes unstructured caregiver notes, mapping tokens straight to diagnostic subscale flags (`asd_social_communication`, `asd_repetitive_behaviors`) to convert qualitative stories into clear dataset indicators.
- 📊 **Domain-level results** — every result shows a percentage breakdown per clinical domain, not just a single risk label
- 📄 **PDF clinical reports** — generated server-side with ReportLab, branded layout, humanised answers, domain bar charts, and risk-based recommendations — downloadable and streamed without touching disk
- 🏥 **Care Guidance** — verified local clinic directory with **WhatsApp** and **Email** contact buttons that pre-fill the screening summary automatically, so no manual copy-pasting is needed
- 🔐 **Authentication** — JWT-based email/password auth with access + refresh tokens, bcrypt password hashing, and protected assessment history
- 📈 **Dashboard & Profile** — assessment history, risk-coded badges, quick actions, and account management
- 🌗 **Dark mode** — full app-wide light/dark theme toggle, persisted to `localStorage`
- 🎮 **Support modules** — interactive tools and printable guides for both autism and ADHD (see [Support Modules](#support-modules))
- ✨ **Fast, minimal animation** — Framer Motion used sparingly for entrance and hover feedback, no distracting motion

---

## Tech Stack

**Frontend**
- React + React Router
- Tailwind CSS
- Framer Motion (animation)
- Recharts (data visualization)
- Lucide React (icons)
- Axios (API client with auto token refresh)

**Backend**
- FastAPI (Python, async)
- MongoDB with Motor (async driver)
- python-jose (JWT) + passlib/bcrypt (password hashing)
- ReportLab (PDF report generation)
- Pydantic (schema validation)

---

## Screening Instruments

| Instrument | Ages | Items | Format | Source |
|---|---|---|---|---|
| **M-CHAT-R™** | 16–48 months | 20 | Yes/No | Robins, Fein & Barton (2009), © updated March 2025 |
| **M-CHAT-R/F™** | 16–48 months | Elevated items only | Branching interview | Follow-up to M-CHAT-R, same authors |
| **ADHD Rating Scale IV (Preschool)** | 3–5 years | 18 | 0–3 frequency scale | DuPaul & McGoey; McGoey et al. (2007) |
| **DSM-5 Behavioral Matrix** | Neurodevelopmental Indicators | Open-text parent narrative | LLM Contextual Flag Extraction |

Both instruments are used strictly as free, clinically grounded screening tools. **No AI or machine learning is used to interpret behavior** — all scoring is deterministic, based on published algorithms and normative cutoffs.

---

## Project Structure

```
connect-to-care/
├── frontend/
│   └── src/
│       ├── api/              # Axios client with JWT auto-refresh
│       ├── context/          # AuthContext, ThemeContext
│       ├── hooks/            # useAssessments, etc.
│       ├── data/             # Question banks (autism, ADHD, M-CHAT-R/F flowchart)
│       ├── pages/            # Route-level components
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── AssessmentSelection.jsx
│       │   ├── Assessment.jsx
│       │   ├── MchatFollowUp.jsx
│       │   ├── Result.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Profile.jsx
│       │   ├── CareGuidance.jsx
│       │   ├── AutismModule.jsx
│       │   ├── ADHDModule.jsx
│       │   ├── EmotionMatchingGame.jsx
│       │   ├── SocialStoryPractice.jsx
│       │   ├── FocusTimer.jsx
│       │   ├── TaskBreakdownExercise.jsx
│       │   ├── Login.jsx / Register.jsx
│       │   └── Privacy.jsx / Terms.jsx
│       └── components/
│           ├── Footer.jsx
│           └── DarkModeToggle.jsx
│
└── backend/
    ├── main.py                # FastAPI app entry point
    ├── core/
    │   ├── config.py          # Settings from .env
    │   ├── security.py        # JWT + password hashing
    │   └── dependencies.py    # Auth dependencies
    ├── db/
    │   └── database.py        # MongoDB (Motor) connection
    ├── models/                # User, Assessment document models
    ├── schemas/                # Request/response Pydantic schemas
    └── routers/
        ├── auth.py            # register / login / refresh / me
        ├── assessments.py     # CRUD for assessments
        └── reports.py         # PDF report generation
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB running locally (or a connection string to a hosted instance)

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt

cp .env.example .env
# Edit .env — set JWT_SECRET_KEY to a random string:
python -c "import secrets; print(secrets.token_hex(32))"

# Ensure MongoDB is running, then:
uvicorn main:app --reload --port 8000
```

API docs available at `http://localhost:8000/docs`

### Frontend Setup

```bash
cd frontend
npm install

# Add to .env:
echo "VITE_API_URL=http://localhost:8000/api/v1" >> .env

npm run dev
```

---

## Environment Variables

**Backend (`.env`)**

```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=connect_to_care
JWT_SECRET_KEY=your_generated_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=30
```

**Frontend (`.env`)**

```env
VITE_API_URL=http://localhost:8000/api/v1
```

---

## API Overview

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | — | Create account, returns tokens |
| `POST` | `/api/v1/auth/login` | — | Login, returns tokens |
| `POST` | `/api/v1/auth/refresh` | — | Refresh access token |
| `GET` | `/api/v1/auth/me` | ✓ | Get current user |
| `POST` | `/api/v1/assessments` | ✓ | Save an assessment result |
| `GET` | `/api/v1/assessments` | ✓ | List user's assessment history |
| `GET` | `/api/v1/assessments/{id}` | ✓ | Get a single assessment |
| `DELETE` | `/api/v1/assessments/{id}` | ✓ | Delete an assessment |
| `GET` | `/api/v1/reports/{id}` | — | Generate and stream a PDF report |

MongoDB collections (`users`, `assessments`) are created automatically on first write — no manual migration required.

---

## Dark Mode

Dark mode uses Tailwind's `class` strategy. `ThemeContext` toggles a `dark` class on `<html>` and persists the preference to `localStorage`. Global CSS overrides in `index.css` apply dark variants to common utility classes app-wide, avoiding the need to hand-edit every component.

---

## Support Modules

Beyond screening, ConnectToCare includes lightweight practice tools grounded in real clinical techniques — not a replacement for therapy, but a useful first layer:

**Autism**
- 🎭 Emotion Matching Game — interactive facial-expression recognition practice (SVG-based, no external assets)
- 📖 Social Story Practice — three printable social stories (doctor visits, sharing, routine changes)
- Sensory Comfort Planner, Visual Communication Board, Routine Builder, Interaction Reflection Log — expandable quick guides

**ADHD**
- ⏱️ Focus Timer — working focus/break interval timer with session tracking
- 📝 Task Breakdown Exercise — printable worked examples for breaking overwhelming tasks into steps
- Impulse Pause Challenge, Routine Builder, Goal Tracker, Attention Reflection Log — expandable quick guides

---

## Roadmap

- [ ] Result history trend visualization across repeated screenings
- [ ] Multi-child profile support
- [ ] Clinician review mode
- [ ] Resource library organized by domain
- [ ] Expanded specialist directory with location-based search

---

## Disclaimer

ConnectToCare is a screening tool only. It does **not** provide a medical diagnosis and is **not** a substitute for evaluation by a qualified healthcare professional. The M-CHAT-R™ and M-CHAT-R/F™ are copyrighted instruments © 2009 Robins, Fein & Barton, used under their permitted-use guidelines. The ADHD Rating Scale IV (Preschool Version) is adapted from published research by DuPaul and McGoey.

---

## License

This project is developed for academic and educational purposes. See [`LICENSE`](./LICENSE) for details.
