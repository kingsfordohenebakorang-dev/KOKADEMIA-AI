import { getEnv } from "./env";
import { geminiModel } from "./gemini";

const env = getEnv();

const AUTOGPT_API_URL = "http://localhost:8000/api/v1";

/**
 * Attempts to connect to a local AutoGPT Agent server.
 * Fallbacks to a Gemini-powered autonomous simulation if the local python server is down.
 */
export async function generateActuarialResponseAutoGPT(prompt: string, mode: string): Promise<string> {
    try {
        // Step 1: Attempt real integration with AutoGPT REST Agent 
        const response = await fetch(`${AUTOGPT_API_URL}/agents`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: `You are an Actuarial AI. Mode: ${mode}. Request: ${prompt}`,
                name: "ActuarialTutor"
            }),
            // Use a short timeout so the UI doesn't hang if AutoGPT server is unbooted
            signal: AbortSignal.timeout(2000)
        });

        if (response.ok) {
            const data = await response.json();
            const taskId = data.task_id;

            // Trigger Agent Execution (Naive sync block)
            const execResponse = await fetch(`${AUTOGPT_API_URL}/agents/${taskId}/steps`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input: "Execute Actuarial Analysis" })
            });
            const execData = await execResponse.json();
            return `**AutoGPT Autonomous Execution Result:**\n\n${execData.output || JSON.stringify(execData)}`;
        }
    } catch (error) {
        console.log("[AutoGPT Client] Local Python server not detected. Executing fallback continuous-reasoning framework...");
    }

    // Step 2: AutoGPT Autonomous Logic Fallback Simulation using native GenAI
    const autoGptSystemPrompt = `You are an autonomous Actuarial AutoGPT Agent.
You must construct your response following the exact JSON structure of an AutoGPT execution loop: 
THOUGHT, REASONING, PLAN (numbered array), and CRITICISM.
After detailing your autonomous loop, provide the final mathematical solution formatted cleanly in markdown under an "EXECUTION_OUTPUT" header.
Mode Context: ${mode}
User Query: ${prompt}
Use LaTeX inside $$ for equations. Return only the final markdown execution log.`;

    const chat = geminiModel.startChat({
        history: [{ role: "user", parts: [{ text: autoGptSystemPrompt }] }],
    });

    const result = await chat.sendMessage("Execute Action Plan.");
    let text = result.response.text();

    // Inject AutoGPT style logging framework around the response for visual demonstration
    const prefix = `### AutoGPT Autonomous Initialization 🤖
* **Status**: Task Assigned 
* **Agent**: KOK-Trust AutoGPT Wrapper
* **Goal**: Analyze Actuarial Task

---

`;
    return prefix + text;
}
