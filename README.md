# Kokademia — Actuarial & Mathematical Sciences Platform

A premium AI-powered study platform for **actuarial science** and **mathematical sciences** students, featuring a **Neuro-Symbolic Trust Layer** that ensures every calculation is verified through SymPy code generation and sandbox execution.

## Academic Coverage

### Actuarial Science
- Probability, Survival Models, Risk Theory
- Financial Mathematics, Loss Distributions
- Life Contingencies, Annuities, Premium Calculation
- SOA/IFoA exam preparation

### Mathematical Sciences
- Calculus (Single & Multivariable)
- Linear Algebra & Matrices
- Differential Equations (ODE, PDE)
- Real Analysis & Proof Techniques
- Mathematical Statistics & Data Science Foundations

## Trust Layer

The LLM is **never trusted** to solve math directly:
1. **Intent** → Student asks a question
2. **Code Generation** → AI generates Python/SymPy code
3. **Execution** → Secure sandbox runs code for exact answers
4. **Verification** → AI cites source document & page

## Features
- **Cinematic UI**: Built with Next.js, Framer Motion, and Tailwind CSS.
- **Symbolic Math**: LaTeX rendering with KaTeX and SymPy verification.
- **AI Integration**: RAG with Vector DB (Pinecone) and LLM synthesis.
- **Exam Engine**: Timed simulations, custom exams, verified solutions.
- **Institutional Dashboard**: Cohort analytics, predictive scoring.
- **Retention Tools**: Flashcards, notebook mode, offline access.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual API keys and secrets
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Project Structure
- `src/app` — Next.js App Router pages and API routes
- `src/components` — UI components (Hero, Navbar, MathBlock, Pricing)
- `src/lib` — Utility functions (router, prompts, auth, schemas)
- `prisma/` — Database schema
- `BLUEPRINT.md` — Full product blueprint and architecture

## Tech Stack
- **Frontend:** Next.js 14+ / Framer Motion / Tailwind CSS
- **Backend:** Node.js + Python (SymPy Math Engine)
- **Database:** PostgreSQL + Pinecone (Vector Search)
- **Auth:** NextAuth.js with JWT
- **Deployment:** Vercel / Docker

## Repository
[https://github.com/kingsfordohenebakorang-dev/kokademia](https://github.com/kingsfordohenebakorang-dev/kokademia)
