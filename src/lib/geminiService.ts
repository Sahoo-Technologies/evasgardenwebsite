import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });

export async function getEventInquiry(userPreferences: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are a concierge for Eva's Garden, a premium outdoor garden venue in Redhill, Kenya. The venue features expansive lawns, mature trees, and a serene atmosphere for weddings, celebrations, corporate events, and photoshoots. Capacity is flexible. Parking is available. The venue supports both tented and open-air setups.

A potential client has the following request:
"${userPreferences}"

Provide a warm, personalized response (2-3 paragraphs max) that:
1. Acknowledges their vision
2. Suggests how Eva's Garden can bring it to life
3. Encourages them to schedule a site visit or WhatsApp for availability

Keep the tone elegant, warm, and professional.`,
    });
    return response.text || 'We would love to help you plan your event. Please reach out via WhatsApp for personalized assistance.';
  } catch {
    return 'Thank you for your interest in Eva\'s Garden. Please reach out to us via WhatsApp for personalized assistance with your event planning.';
  }
}
