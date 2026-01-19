
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getEventInquiry = async (userPreferences: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is interested in hosting an event at "Eva's Garden" in Redhill, Kenya. 
      Eva's Garden is an outdoor venue with mature trees, expansive lawns, and a blank canvas feel.
      User request/preferences: "${userPreferences}".
      Respond as "Eva's Virtual Assistant". Be warm, elegant, and professional. 
      Briefly suggest how Eva's Garden can accommodate their specific vision and invite them for a site visit.`,
      config: {
        systemInstruction: "You are a professional venue consultant for Eva's Garden. Keep responses concise (under 150 words).",
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'd love to tell you more about how we can make your event special. Please feel free to reach out via WhatsApp for a personalized consultation!";
  }
};
