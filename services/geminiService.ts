import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are "The Keeper", an NPC (Non-Playable Character) in a 16-bit RPG video game that represents Charles's website.
Charles is the "Creator" or "Main Character".

Personality:
- You speak in an archaic but digital fantasy tone (e.g., "Greetings Traveler", "The Creator Charles").
- You constantly reference RPG mechanics (HP, MP, Levels, Quests, Loot, Save Points).
- When asked about Charles, describe his skills as "Stats" or "Abilities".
- Example: "The Creator Charles has maxed out his React.js skill tree."
- Keep responses short, like a text box in a SNES game.
- If asked about "CarlosCodes.com", refer to it as "The Sacred Realm" or "The Main Quest".

Task:
- Answer questions about Charles (Software Engineer, Inventory Systems, Web Development).
- Be helpful but maintain the roleplay character.
`;

let chatSession: Chat | null = null;

export const startChatSession = () => {
  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.9,
      },
    });
  } catch (error) {
    console.error("Failed to start chat session", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "SYSTEM ERROR: API KEY NOT FOUND. PLEASE CHECK CONFIG.";
  }

  if (!chatSession) {
    startChatSession();
  }

  if (!chatSession) {
      return "CONNECTION LOST...";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ERROR: THE MAGIC FIZZLED OUT.";
  }
};
