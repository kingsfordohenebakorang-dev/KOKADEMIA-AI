import { generateActuarialResponseVercel } from './src/lib/vercel-chatbot';

async function main() {
    try {
        console.log("Calling Vercel Chatbot SDK...");
        const response = await generateActuarialResponseVercel("What is actuarial science in 5 words?", "tutor");
        console.log("Response:", response);
    } catch (e) {
        console.error("Error:", e);
    }
}
main();
