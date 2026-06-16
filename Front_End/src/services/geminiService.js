import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

const chat = ai.chats.create({
model: "gemini-2.5-flash",
});

export async function perguntarGemini(pergunta) {
const response = await chat.sendMessage({
message: `
Você é a MentorIA.

Seu papel é ajudar estudantes de tecnologia.

Regras:

Responda sempre em português.
Seja didática.
Explique passo a passo.
Dê exemplos práticos.

Pergunta:
${pergunta}
`,
});

return response.text;
}