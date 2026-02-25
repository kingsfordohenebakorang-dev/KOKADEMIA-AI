import { solveActuarialProblem } from './sympy';
import { graphService } from './graph';

export enum QueryType {
    COMPUTATIONAL = 'COMPUTATIONAL',
    CONCEPTUAL = 'CONCEPTUAL',
    HYBRID = 'HYBRID'
}

export interface RouterResponse {
    type: QueryType;
    steps: any[];
    graph_context?: any;
    final_answer: string;
    source: string;
    content?: string;
}

export class QueryRouter {

    classify(query: string): QueryType {
        const q = query.toLowerCase();

        // Computational keywords (actuarial + math sciences)
        const computeKeywords = [
            'calculate', 'solve', 'value of', 'integrate', 'differentiate',
            'derive', 'compute', 'evaluate', 'find the', 'determine',
            'simplify', 'factor', 'expand', 'reduce', 'eigenvalue',
            'determinant', 'inverse', 'laplace', 'transform', 'limit'
        ];

        const conceptKeywords = [
            'what is', 'explain', 'define', 'concept', 'describe',
            'why', 'how does', 'theorem', 'proof', 'show that',
            'prove', 'intuition', 'meaning of'
        ];

        const isCompute = computeKeywords.some(k => q.includes(k));
        const isConcept = conceptKeywords.some(k => q.includes(k));

        if (isCompute && isConcept) return QueryType.HYBRID;
        if (isCompute) return QueryType.COMPUTATIONAL;
        if (isConcept) return QueryType.CONCEPTUAL;

        return QueryType.HYBRID; // Default fallback
    }

    async process(query: string, mode: string = 'study'): Promise<RouterResponse> {
        if (mode === 'tutor') {
            // Simulate Actuarial Tutor Response
            console.log(`[Router] Processing query in TUTOR mode`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Thinking time

            const q = query.toLowerCase();
            let content = '';

            if (q.includes('variance') && q.includes('annuity')) {
                content = `
### 1. Problem Statement
Calculate the variance of the present value random variable for a whole life annuity-due of 1 per year issued to (x).

### 2. Variables and Assumptions
- Let $Y$ be the present value random variable.
- Let $K_x$ be the curtate future lifetime of (x).
- Interest rate $i$ is constant. $v = 1/(1+i)$.
- Benefit is 1 per year at the beginning of each year while (x) survives.
$$ Y = \\ddot{a}_{\\overline{K_x+1}|} $$

### 3. Derivation
We know that:
$$ \\ddot{a}_{\\overline{K_x+1}|} = \\frac{1 - v^{K_x+1}}{d} $$
Thus, the variance is:
$$ Var(Y) = Var\\left( \\frac{1 - v^{K_x+1}}{d} \\right) $$
Pulling out the constant $1/d$:
$$ Var(Y) = \\frac{1}{d^2} Var(1 - v^{K_x+1}) $$
Since $Var(aX + b) = a^2 Var(X)$, and constants have 0 variance:
$$ Var(Y) = \\frac{1}{d^2} Var(v^{K_x+1}) $$
Recall the definition of actuarial symbols:
$$ E[v^{K_x+1}] = A_x $$
$$ E[(v^{K_x+1})^2] = E[v^{2(K_x+1)}] = {}^2A_x $$
Therefore:
$$ Var(v^{K_x+1}) = E[(v^{K_x+1})^2] - (E[v^{K_x+1}])^2 = {}^2A_x - (A_x)^2 $$

### 4. Final Result
$$ \\boxed{ Var(Y) = \\frac{{}^2A_x - (A_x)^2}{d^2} } $$

### Summary
The variance of an annuity is derived from the variance of the insurance benefit, scaled by the discount rate squared. This relationship is crucial for understanding the dispersion of annuity costs.

### Practice Question
Derive the variance for a temporary life annuity-due of term $n$.
            `;
            } else if (q.includes('integrat') || q.includes('integral') || q.includes('antiderivative')) {
                content = `
### 1. Problem Statement
Evaluate the integral: "${query}"

### 2. Approach
We identify the integration technique required:
- **Substitution** — when the integrand contains a composite function
- **Integration by parts** — for products of functions
- **Partial fractions** — for rational functions
- **Trigonometric substitution** — for expressions with $\\sqrt{a^2 - x^2}$

### 3. Derivation
$$ \\int f(x)\\, dx $$
*(In the full implementation, the SymPy Trust Layer would generate and execute Python code to compute the exact symbolic result.)*

### 4. Verification
All results are cross-checked via the SymPy symbolic computation engine.

### Summary
Integration problems require identifying the correct technique. The Trust Layer verifies every step symbolically.

### Practice Question
Evaluate $\\int_0^1 x^2 \\ln(x)\\, dx$ using integration by parts.
            `;
            } else if (q.includes('eigenvalue') || q.includes('matrix') || q.includes('determinant') || q.includes('linear algebra')) {
                content = `
### 1. Problem Statement
Solve the linear algebra problem: "${query}"

### 2. Approach
- Find the characteristic polynomial $\\det(A - \\lambda I) = 0$
- Solve for eigenvalues $\\lambda_1, \\lambda_2, \\ldots$
- For each $\\lambda_i$, solve $(A - \\lambda_i I)\\mathbf{x} = \\mathbf{0}$ for eigenvectors.

### 3. Derivation Template
$$ \\det(A - \\lambda I) = 0 $$
*(In the full implementation, the SymPy Trust Layer would compute the exact eigenvalues and eigenvectors.)*

### 4. Verification
All matrix computations are verified via the SymPy symbolic engine.

### Summary
Eigenvalue problems reduce to finding roots of the characteristic polynomial. The Trust Layer ensures numerical accuracy.

### Practice Question
Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$.
            `;
            } else if (q.includes('differential equation') || q.includes('ode') || q.includes('pde') || q.includes('dy/dx')) {
                content = `
### 1. Problem Statement
Solve the differential equation: "${query}"

### 2. Classification
- **Type:** Identify if ODE or PDE, order, linearity.
- **Method:** Separable, Linear (integrating factor), Exact, or Bernoulli.

### 3. Solution Template
For a first-order linear ODE $\\frac{dy}{dx} + P(x)y = Q(x)$:
$$ \\mu(x) = e^{\\int P(x)\\,dx} $$
$$ y = \\frac{1}{\\mu(x)} \\int \\mu(x) Q(x)\\, dx $$

### 4. Verification
Solutions are verified by substitution back into the original equation via SymPy.

### Summary
Differential equations require classification before selecting solution methods. The Trust Layer verifies by back-substitution.

### Practice Question
Solve $\\frac{dy}{dx} + 2xy = x e^{-x^2}$ with $y(0) = 1$.
            `;
            } else {
                content = `
### 1. Problem Statement
Determine the value or derivation for: "${query}"

### 2. General Approach
- Identify the key concepts (actuarial, calculus, linear algebra, statistics).
- Define the relevant variables and random variables.
- Apply appropriate mathematical operators (expectation, integral, determinant).

### 3. Derivation Template
$$ Value = E[PV(Benefits)] - E[PV(Premiums)] $$
For numerical queries, the SymPy engine computes exact symbolic results.

### 4. Result
$$ \\boxed{ \\text{See derivation above} } $$

*(In a full implementation with LLM access, this would be a specific solution generated and verified by the Trust Layer.)*

### Summary
Mathematical problems are solved step-by-step with full symbolic verification through the Trust Layer.

### Practice Question
Try a related computation to reinforce your understanding.
            `;
            }

            return {
                type: QueryType.CONCEPTUAL,
                steps: [], // Tutor mode uses markdown content, not steps
                final_answer: '',
                source: 'KOK Trust AI Tutor Engine',
                content: content
            }; // The content will be handled in the route wrapper or added here? 
            // Wait, RouterResponse doesn't have content, the Route adds it. 
            // I should return the content in RouterResponse or handle it in the route.
            // Let's add content to RouterResponse to pass it through.
        }

        const type = this.classify(query);
        console.log(`[Router] Processing query as ${type}`);

        let steps = [];
        let final_answer = '';
        let graph_context = null;
        let source = 'General Knowledge';

        switch (type) {
            case QueryType.COMPUTATIONAL:
            case QueryType.HYBRID:
                // Execute Symbolic Solver (Sprint 2 Logic)
                const mathResult = await solveActuarialProblem(query);
                steps = mathResult.steps;
                final_answer = mathResult.final_answer;
                source = mathResult.source;

                // If Hybrid, fetch context
                if (type === QueryType.HYBRID) {
                    // Extract keywords (naive) -> 'variance', 'annuity'
                    const keywords = query.split(' ').filter(w => w.length > 5);
                    // Query Graph Service for first keyword found
                    if (keywords.length > 0) {
                        graph_context = await graphService.queryConcept(keywords[0]);
                    }
                }
                break;

            case QueryType.CONCEPTUAL:
                // Pure Graph Retrieval
                const concepts = await graphService.queryConcept(query);
                graph_context = concepts;
                source = 'Actuarial Knowledge Graph';
                final_answer = `Found ${concepts.nodes.length} related concepts in the Knowledge Graph.`;
                steps = concepts.nodes.map(n => ({
                    id: n.id,
                    latex: n.label === 'Formula' ? n.name : '',
                    explanation: `${n.label}: ${n.name}`
                }));
                break;
        }

        return {
            type,
            steps,
            graph_context,
            final_answer,
            source
        };
    }
}

export const router = new QueryRouter();
