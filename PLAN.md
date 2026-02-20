# AI-Powered Actuarial Study Platform - Project Plan

## 1. High-Level Goals
- Consolidate notes from multiple universities.
- Cinematic, high-fidelity UI (Framer + Next.js).
- Symbolic Math Solving (SymPy + LLM).
- Provenance-backed answers (RAG).

## 2. Tech Stack
- **Frontend**: Next.js (App Router), React, TailwindCSS, Framer Motion.
- **Math**: KaTeX, SymPy (via Python backend or Pyodide).
- **Backend**: Node.js API Routes (Serverless).
- **Database**: Pinecone (Vectors), PostgreSQL (Metadata), S3 (Files).
- **AI**: OpenAI GPT-4o, text-embedding-3-small.

## 3. Sprint Plan (12 Weeks)

### Sprint 1: The Foundation (Weeks 1-4)
**Focus**: Ingestion, Database, and Basic Retrieval.
- [x] Week 1: Initialize Next.js, Theme, Basic UI Components.
- [ ] Week 2: Build file upload endpoint (Drag & Drop) & PDF Text Extraction (PDFMiner/Tika).
- [ ] Week 3: Implement RAG Chunking & Vector Upsert (Pinecone).
- [ ] Week 4: Basic Chat Interface (connect to OpenAI API).

### Sprint 2: The Math & The Magic (Weeks 5-8)
**Focus**: Symbolic Math, LaTeX, and Cinematic Visuals.
- [ ] Week 5: Integrate MathPix API for Image-to-LaTeX.
- [ ] Week 6: Hero Visuals (Nano Banana export -> Framer).
- [ ] Week 7: Implement robust LaTeX rendering (MathBlock component).
- [ ] Week 8: SymPy Logic Integration (Tool Use for LLM).

### Sprint 3: Production & Collaboration (Weeks 9-12)
**Focus**: Citations, Accounts, and Security.
- [ ] Week 9: Enhanced Citation UI (Side-by-side view).
- [ ] Week 10: User Auth (Auth0/Clerk).
- [ ] Week 11: Security Audit & Performance Tuning.
- [ ] Week 12: Launch & Mobile Optimization.

## 4. Architecture

```text
Client (Web / Mobile)
        ↓
Next.js Frontend (UI Layer)
        ↓
API Gateway (Auth + Rate Limit + Logging)
        ↓
Core AI Engine
   ├── LLM Layer
   ├── Symbolic Math Engine
   ├── Retrieval (Vector DB)
   ├── Trust & Verification Layer
        ↓
Database Layer
   ├── PostgreSQL (User + Metadata)
   ├── Vector DB (Embeddings)
        ↓
Storage Layer
   ├── Document Storage
   ├── Logs
```

### Telemetry & Tracking Metrics (Logs / Verification Layer)
- `model_version`
- `response_time`
- `confidence_estimate`
- `error_rate`
- `prompts_logged`

### Core RAG Flow
```text
User query → Embedding → Similarity search → Top relevant chunks → Injected into LLM prompt
```

---

## 5. Core Application Features

### A. Topic Map (Syllabus Driven)
A structured curriculum spanning:
- **Probability**
- **Stochastic Processes**
- **Survival Models**
- **Financial Mathematics**
- **Risk Theory**
*Each topic contains nested subtopics, linked actuarial formulas, and previous exam questions.*

### B. Exam Mode
- **Timed Practice Mode** simulates real actuarial exam constraints.
- **Solution Breakdown** after submission (showing steps).
- **AI Comparison**: Compare your reasoning/approach with the AI's optimized breakdown.

### C. Flashcard Generator
- **User Uploads Notes** → The AI creates Space Repetition Flashcards, extracts Key Formulas, and generates a Quick Revision Cheat Sheet.

---

## 6. Enterprise & Investor Readiness

### Security & Infrastructure (RBAC & Limits)
- **Role-Based Access Control (RBAC)**: Defined roles for `Student`, `Lecturer`, and `Admin`.
- **Usage Logging**: Granular analytics mapping user prompts to AI response time, error rates, and confidence scores (essential for debugging & trust).
- **Rate Limiting**: API Gateway-level controls to prevent LLM abuse.

### Monetization Model (Freemium + SaaS)
- **Free Tier**: Limited AI questions per day.
- **Premium Tier**: Unlimited AI + Full Exam Mode features.
- **Institutional Licensing**: White-label or batch access for university actuarial programs.

### Metrics Dashboard (For Admins/Stakeholders)
Track and visualize:
- Daily Active Users (DAU)
- Most searched actuarial topics over time
- Error rates & hallucination flags
- Symbolic verification engine usage

---

## 7. Testing & Quality Assurance
- **Unit Tests**: Specifically for the Symbolic Math Engine (ensuring derivations are completely mathematically sound).
- **Prompt Consistency Tests**: Checking the LLM's adherence to professional IFoA/SOA formatting guidelines.
- **Hallucination Detection Tests**: Cross-referencing generated text against the vector-search ground truth.
- **Integration Tests**: Full end-to-end testing of the Next.js API Routes and Database layers.

---

## 8. Professional Documentation RoadMap
The repository should look like an elite engineering project. We need to scaffold:
- `ARCHITECTURE.md` (System topology)
- `SECURITY.md` (Data handling & compliance)
- `TRUST_MODEL.md` (How the AI verifies its math)
- `CONTRIBUTING.md`
- `ROADMAP.md`
- `API_REFERENCE.md`

---

## 9. Advanced / "Flagship" Long-Term Features
- **Actuarial Knowledge Graph**: Visual maps showing relationships (e.g., Distribution → Moments → Applications or Survival Models → Hazard Functions → Pricing).
- **AI Debate Mode**: A challenger system where the student argues their reasoning against the AI.
- **Multi-Model Consensus**: Run `gpt-4o`, `claude-3-5-sonnet`, and `gemini-1.5-pro` in parallel; if they disagree on a math problem, flag a warning to the user.

---

## 10. Strategic Vision: "The Bloomberg Terminal for Actuarial Students"
We are not building another generic ChatGPT clone. The KOK Actuarial Platform is positioned as **Elite, Trust-based, Technical, Verified, and Premium**. 

**Branding to Execute:**
- Professional logo and dark-mode aesthetic branding.
- High-fidelity screenshots of the UI.
- Demo GIFs showcasing the LaTeX rendering and AI analysis.
- Product overview video + Live Demo Link prominently displayed.
