
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, SwarmResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const runGuardianAnalysis = async (
  profile: UserProfile,
  input: string | object
): Promise<SwarmResult> => {
  const prompt = `
    Act as Zeenat-AI: The 360 Guardian. 
    You are a swarm of experts analyzing a situation for a Pakistani woman.

    USER PROFILE (Agentic Memory):
    - Age: ${profile.age}
    - District: ${profile.district}
    - Marital Status: ${profile.maritalStatus}
    - Children: ${profile.childrenCount}
    - Employment: ${profile.isEmployed ? 'Employed' : 'Unemployed'}

    CONTEXT: ${typeof input === 'string' ? input : JSON.stringify(input)}

    SWARM ROLES:
    1. [Advocate]: Analyze civil law (Protection against Harassment, Family Laws, Domestic Violence Act 2026). Provide a Safety Score (0-100) and district-specific stats.
    2. [Sharia Expert]: Provide religious perspective on rights (Haq Mehr, Nafaqah, Tafweez).
    3. [Health Agent]: (If applicable based on profile) Provide priority health screenings or mental wellness advice.
    4. [NGO Bridge]: Identify the most relevant NGO from our database based on the risk level.

    Output must be JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          advocate: {
            type: Type.OBJECT,
            properties: {
              analysis: { type: Type.STRING },
              safetyScore: { type: Type.NUMBER },
              riskLevel: { type: Type.STRING },
              stats: { type: Type.STRING },
              legalRoadmap: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["analysis", "safetyScore", "riskLevel", "stats", "legalRoadmap"]
          },
          shariaExpert: {
            type: Type.OBJECT,
            properties: {
              context: { type: Type.STRING },
              principles: { type: Type.ARRAY, items: { type: Type.STRING } },
              guidance: { type: Type.STRING }
            },
            required: ["context", "principles", "guidance"]
          },
          healthAgent: {
            type: Type.OBJECT,
            properties: {
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              priorityLevel: { type: Type.STRING }
            }
          },
          ngoBridge: {
            type: Type.OBJECT,
            properties: {
              recommendedNgo: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  contact: { type: Type.STRING },
                  reason: { type: Type.STRING }
                }
              }
            },
            required: ["recommendedNgo"]
          }
        },
        required: ["advocate", "shariaExpert", "ngoBridge"]
      }
    }
  });

  return JSON.parse(response.text);
};
