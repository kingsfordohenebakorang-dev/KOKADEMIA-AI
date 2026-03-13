import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate } from "@langchain/core/prompts";
import { getEnv } from "./env";

const env = getEnv();

// Initialize the LangChain Google Generative AI model
export const langchainGeminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-flash-latest",
    apiKey: env.GOOGLE_API_KEY || "",
    maxOutputTokens: 2048,
    temperature: 0.1,
});

/**
 * Generates an AI response for an actuarial query using LangChain & Google Generative AI.
 */
export async function generateActuarialResponseLangchain(prompt: string, mode: string): Promise<string> {
    if (!env.GOOGLE_API_KEY) {
        throw new Error("GOOGLE_API_KEY is not configured.");
    }

    const systemPromptText = `You are KOK Trust AI Tutor, an advanced actuarial platform.
Mode: {mode_description}
Structure your response professionally, emphasizing accuracy. Use LaTeX inside $$ for math equations (e.g. $$ E[X] = \\mu $$) and ensure all symbolic derivations are clear.`;

    const modeDescription = mode === 'tutor'
        ? 'Tutor Mode - provide comprehensive, step-by-step mathematical explanations, using markdown and LaTeX where appropriate. Start with Problem Statement, Assumptions, Derivation, and Final Result.'
        : 'Study Mode - Provide concise and direct answers focusing on the mathematical output and symbolic verification.';

    // Create a Prompt Template
    const promptTemplate = ChatPromptTemplate.fromMessages([
        SystemMessagePromptTemplate.fromTemplate(systemPromptText),
        HumanMessagePromptTemplate.fromTemplate("{query}")
    ]);

    // Create an output parser
    const outputParser = new StringOutputParser();

    // Build the LangChain runnable chain pipeline
    const chain = promptTemplate.pipe(langchainGeminiModel).pipe(outputParser);

    // Invoke the chain
    const result = await chain.invoke({
        mode_description: modeDescription,
        query: prompt
    });

    return result;
}
