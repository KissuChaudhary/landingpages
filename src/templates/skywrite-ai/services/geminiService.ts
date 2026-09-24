import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateBlogPreview = async (topic: string): Promise<string> => {
  try {
    const ai = getClient();
    
    const prompt = `
      You are SkyWrite AI, an expert SEO copywriter known for writing indistinguishable human-like content.
      
      Task: Write a hook/intro paragraph and a 3-point outline for a blog post about: "${topic}".
      
      Requirements:
      1. Tone: Conversational, authoritative, and engaging.
      2. Optimization: Mention that this content is optimized for Google SGE and Perplexity.
      3. Format: Return valid HTML (no markdown code blocks, just standard <p>, <ul>, <li>, <h3> tags).
      4. Length: Keep the intro under 80 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "<p>Could not generate content at this time.</p>";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "<p>Our AI is currently experiencing high traffic. Please try again in a moment.</p>";
  }
};