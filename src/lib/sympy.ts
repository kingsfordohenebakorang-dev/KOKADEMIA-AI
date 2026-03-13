export interface Step {
    id: string;
    latex: string;
    explanation: string;
}

export interface SymPyResponse {
    steps: Step[];
    final_answer: string;
    source: string;
}

export async function solveActuarialProblem(query: string): Promise<SymPyResponse> {
    try {
        const { geminiFlashModel } = await import('./gemini');

        const systemPrompt = `You are a symbolic computation engine solving actuarial/math problems.
Please provide a step-by-step mathematical derivation for: "${query}"

Return ONLY a valid JSON object strictly matching this TypeScript interface, without any markdown formatting wrappers like \`\`\`json:
{
    "steps": [
        { "id": "1", "latex": "a^2 + b^2 = c^2", "explanation": "Pythagorean theorem..." }
    ],
    "final_answer": "latex formatted answer here",
    "source": "SymPy via Gemini"
}

Ensure all math fields 'latex' and 'final_answer' use proper LaTeX syntax.`;

        const result = await geminiFlashModel.generateContent(systemPrompt);
        let text = result.response.text().trim();

        if (text.startsWith('\`\`\`json')) {
            text = text.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
        }

        const data = JSON.parse(text) as SymPyResponse;

        return {
            steps: data.steps || [],
            final_answer: data.final_answer || 'Error parsing final answer.',
            source: data.source || 'Gemini Symbolic Engine'
        };

    } catch (e) {
        console.error("SymPy/Gemini JSON Error:", e);
        return {
            steps: [
                {
                    id: "1",
                    latex: "",
                    explanation: "Fallback triggered due to generation error."
                }
            ],
            final_answer: "N/A",
            source: "Error Fallback"
        }
    }
}
