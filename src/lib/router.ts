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
            console.log(`[Router] Processing query in TUTOR mode via Gemini AI`);

            try {
                // Dynamically import to prevent circular dependencies or initialization issues
                const { generateActuarialResponseVercel } = await import('./vercel-chatbot');
                const content = await generateActuarialResponseVercel(query, mode);

                return {
                    type: QueryType.CONCEPTUAL,
                    steps: [], // Tutor mode uses markdown content, not steps
                    final_answer: '',
                    source: 'Vercel AI Chatbot',
                    content: content
                };
            } catch (e) {
                console.error("Gemini Error:", e);
                return {
                    type: QueryType.CONCEPTUAL,
                    steps: [],
                    final_answer: '',
                    source: 'Error Fallback',
                    content: `There was an error generating the response: ${e instanceof Error ? e.message : 'Unknown'}`
                };
            }
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
