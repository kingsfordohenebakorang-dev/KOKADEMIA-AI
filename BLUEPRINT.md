# Kokademia – Actuarial + Mathematical Sciences Blueprint

## 1. Core Concept

**System Name:** Kokademia  
**Core Value:** Verified, structured AI learning platform for actuarial and mathematical sciences with a **Neuro-Symbolic Trust Layer**.  
**Architecture:** Hybrid RAG (Vector + Graph) + Symbolic Compute Engine (SymPy) + Cinematic Frontend.

### Trust Layer (Neuro-Symbolic Architecture)
- LLM is **not trusted** to do math directly.
- Workflow:
  1. **Intent:** Student asks a question ("Integrate x² dx" / "Calculate annuity due…").
  2. **Code Generation:** AI generates Python code using SymPy for math verification.
  3. **Execution:** Secure sandbox runs code for exact numeric or symbolic answers.
  4. **Verification:** AI cites source document/page (textbook, lecture slide).

---

## 2. Strategic Layers

| # | Layer | Description |
|---|-------|-------------|
| 1 | **Lecturer Layer** | Verified syllabus uploads, authenticated mock exams |
| 2 | **Institutional Dashboard** | Analytics for department heads, cohort metrics |
| 3 | **Predictive Analytics** | AI forecasts exam success based on usage patterns |
| 4 | **Timed Simulation** | Mock exams with countdown timers, auto-submission |
| 5 | **Retention Tools** | Offline flashcards, spaced repetition, streaks |
| 6 | **Growth Mechanics** | Referral systems, campus ambassador tools |

---

## 3. Academic Coverage

### Actuarial Science
- Probability & Survival Models
- Risk Theory & Ruin Probabilities
- Financial Mathematics (TVM, Duration, Convexity)
- Loss Distributions & Compound Models
- Life Contingencies & Annuities
- CT-series textbooks & SOA/IFoA syllabi

### Mathematical Sciences
- **Calculus** — Single & Multivariable (limits, derivatives, integrals, series)
- **Linear Algebra** — Matrices, eigenvalues, vector spaces, transformations
- **Differential Equations** — ODE, PDE, Laplace transforms
- **Real Analysis** — Proofs, convergence, continuity, measure theory
- **Mathematical Statistics** — Distributions, estimation, hypothesis testing
- **Data Science Foundations** — Regression, classification basics

Every calculation is verified using the **Python/SymPy engine**, regardless of discipline.

---

## 4. System Architecture & Data Flow

```mermaid
graph TD
    User[Student] -->|Upload/Query| FE[Frontend (Next.js/Framer)]
    FE -->|API Gateway| API[Node.js / Express]
    
    subgraph "Ingestion Pipeline"
    API -->|Raw File| S3[Object Storage]
    S3 -->|Trigger| OCR[MathPix API]
    OCR -->|LaTeX + Text| Parser[Text/Math Parser]
    Parser -->|Chunks| Embed[OpenAI text-embedding-3]
    Embed -->|Vectors| Pinecone[Vector DB]
    Parser -->|Entities| Neo4j[Knowledge Graph]
    end

    subgraph "Reasoning Engine"
    API -->|Query| Router{Query Classifier}
    
    Router -->|Computational| SymPy[Python Symbolic Engine]
    Router -->|Concept/Search| Hybrid[Hybrid Retrieval]
    
    Hybrid -->|1. Dense Search| Pinecone
    Hybrid -->|2. Graph Traversal| Neo4j
    
    SymPy -->|Result| Synthesizer[LLM Synthesizer]
    Hybrid -->|Ctx + Snippets| Synthesizer
    
    Synthesizer -->|JSON Resp| API
    end

    subgraph "Analytics & Feedback"
    API -->|Log Interaction| Postgres[PostgreSQL]
    Postgres -->|Aggregations| Dashboard[Analytics View]
    end
```

---

## 5. Feature Breakdown

| Layer | Features |
|-------|----------|
| **Academic Intelligence & Tutoring** | Expert LLM for actuarial & math; symbolic verification; LaTeX rendering; provenance tracking |
| **Exam Engine & Simulation** | Timed simulations; custom exams; verified solutions; smart syllabus parsing |
| **Institutional Infrastructure** | Lecturer uploads; class analytics; predictive success scoring |
| **Retention & Mobile** | Flashcards; notebook mode; offline mode; behavioral nudges |
| **Growth & Community** | Campus ambassador tools; collaborative knowledge base; peer benchmarking |

---

## 6. Tech Stack

- **Frontend:** Next.js 14+ + Framer Motion + Tailwind CSS
- **Backend:** Node.js + Python (Math Engine via SymPy)
- **Database:** PostgreSQL (users/metadata) + Pinecone (vector search)
- **Knowledge Graph:** Neo4j (theorem/formula relationships)
- **Deployment:** Dockerized & scalable (Vercel + AWS)

---

## 7. Pricing Model

### Subscription Tiers

| Tier | Price (GH₵) | Features & Limits |
|------|-------------|-------------------|
| **Foundation** | 0 / month | 10 queries/day; 5 docs/month; 1 exam generation; standard response speed; no offline/notebook mode |
| **Analyst** | 49 / month | 150 queries/month; 50 docs; 3MB max per file; Notebook mode; basic mock exams; faster response speed |
| **Semester Pro** | 159 / semester | 600 queries/semester; 150 docs; 5MB max per file; Actuarial + Math Vault access; 15 verified solutions; priority queue; offline mode; full mock exam generator |
| **Institutional** | Contact Sales | University-wide dashboards; centralized billing; 500+ student minimum; full admin features; predictive analytics; campus-wide access |

> **Note (Internal):** Model selection is handled server-side and is NOT exposed to users. Foundation uses Haiku, Analyst uses Sonnet, Semester Pro uses Opus for verification. This is a competitive advantage — users see features, not infrastructure.

### Add-On Boost Packs

| Pack | Price (GH₵) | Includes |
|------|-------------|----------|
| **Query Boost** | 20 | +100 additional queries |
| **Verification Boost** | 30 | +5 verified solutions |
| **Exam Pack** | 40 | 3 full mock exams (batch processed) |

---

## 8. Vector Vault (Actuarial + Math)

- **Purpose:** Store PDFs of textbooks & course notes as searchable vectors.
- **Process:**
  1. **Chunking:** Break PDFs into 500-word paragraphs.
  2. **Embedding:** Convert paragraphs into vectors (text-embedding-3-small).
  3. **Retrieval:** AI queries the vault for exact context before answering.
- **Tech Options:** Pinecone (managed) or Supabase Vector (if on Vercel).
- **Hybrid Search:** BM25 keyword boost + semantic dense search + graph expansion.

---

## 9. Math Solver Integration Plan

**Stack:** Python (FastAPI) + SymPy + Actuarial-specific libraries.

**Library Structure:**
- `agpt.life_contingencies`: `check_survival(x, t)`, `commutation_functions`.
- `agpt.financial_math`: `annuity_due(n, i)`, `bond_price(yield, coupon)`.
- `agpt.loss_models`: `aggregate_loss_variance(freq_dist, sev_dist)`.
- `agpt.calculus`: `integrate(expr)`, `differentiate(expr)`, `limits(expr)`.
- `agpt.linear_algebra`: `eigenvalues(matrix)`, `row_reduce(matrix)`, `determinant(matrix)`.
- `agpt.diff_eq`: `solve_ode(eq)`, `laplace_transform(expr)`.
- `agpt.statistics`: `hypothesis_test(data)`, `confidence_interval(data)`.

**Workflow:**
1. LLM generates **Python Code** based on the query.
2. **Sandbox Execution:** Run code in a secure, timeout-restricted environment.
3. **Output:** Capture `stdout` and LaTeX-formatted return value.

---

## 10. Security Model

- **Encryption:** AES-256 for parsed text stored in DB.
- **Presigned URLs:** S3 links expire after 15 minutes.
- **Provenance:** Every answer block has a content hash of the source chunk.
- **Auth:** Role-based (Student / Pro / Institution), JWT + NextAuth.
- **Rate Limiting:** Per-tier query limits enforced at API level.
- **Input Validation:** Zod schemas on all endpoints.

---

## 11. Evaluation Framework

**Python Script (`eval_harness.py`):**
1. Load `benchmark_questions.json`: `{ "q": "...", "ground_truth_latex": "..." }`.
2. Run `agpt_solver(q)`.
3. **Symbolic Check:** Use SymPy to simplify `(generated_answer - ground_truth)`. If 0, Pass.
4. **Citation Check:** Verify if returned Document ID exists in the "Gold Standard" list.

**Success Metrics:**
- **Accuracy:** >95% Symbolic Correctness on Benchmark.
- **Latency:** <2s for Compute, <5s for RAG+Synthesis.
- **Retention:** >40% DAU/MAU ratio.

---

This positions Kokademia as a **verified, structured learning platform** for both actuarial and broader quantitative disciplines, with strong cost control, academic credibility, and campus-focused adoption strategy.
