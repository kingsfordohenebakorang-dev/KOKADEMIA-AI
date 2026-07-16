import { Document, VectorStoreIndex, Settings } from 'llamaindex';
import { Gemini, GeminiEmbedding, GEMINI_MODEL, GEMINI_EMBEDDING_MODEL } from '@llamaindex/google';
import { getEnv } from "./env";

const env = getEnv();

// Initialize the LlamaIndex Google Generative AI model
// Note: We're setting these globally in the Settings object as recommended by LlamaIndex
Settings.llm = new Gemini({
    model: 'models/gemini-flash-latest' as any,
    apiKey: env.GOOGLE_API_KEY || "",
    temperature: 0.1,
});

Settings.embedModel = new GeminiEmbedding({
    model: GEMINI_EMBEDDING_MODEL.TEXT_EMBEDDING_004 || 'models/embedding-001' as any,
    apiKey: env.GOOGLE_API_KEY || "",
});

/**
 * Generates an AI response for an actuarial query using LlamaIndex & Google Generative AI.
 */
export async function generateActuarialResponseLlamaIndex(prompt: string, mode: string): Promise<string> {
    if (!env.GOOGLE_API_KEY) {
        throw new Error("GOOGLE_API_KEY is not configured.");
    }

    const modeDescription = mode === 'tutor'
        ? 'Tutor Mode - provide comprehensive, step-by-step mathematical explanations, using markdown and LaTeX where appropriate. Start with Problem Statement, Assumptions, Derivation, and Final Result.'
        : 'Study Mode - Provide concise and direct answers focusing on the mathematical output and symbolic verification.';

    const systemPromptText = `You are Kokademia Tutor, an advanced actuarial platform built.
    Mode: ${modeDescription}
Structure your response professionally, emphasizing accuracy.Use LaTeX inside $$ for math equations(e.g.$$ E[X] = \\mu $$) and ensure all symbolic derivations are clear.`;

    const fullPrompt = `${systemPromptText} \n\nUser Query: \n${prompt} `;

    // LlamaIndex generic completion execution
    const response = await Settings.llm.complete({ prompt: fullPrompt });

    return response.text;
}

/**
 * Creates a vectorized index of knowledge components
 */
export async function createActuarialIndex(text: string) {
    const document = new Document({ text, id_: "actuarial_doc_1" });
    const index = await VectorStoreIndex.fromDocuments([document]);
    return index;
}

/**
 * Queries the vectorized index
 */
export async function queryActuarialIndex(index: VectorStoreIndex, query: string) {
    const queryEngine = index.asQueryEngine();
    const response = await queryEngine.query({ query });
    return response.response;
}
