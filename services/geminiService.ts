
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, SwarmResult, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const runGuardianAnalysis = async (
  profile: UserProfile,
  input: string | object,
  language: Language
): Promise<SwarmResult> => {
  const languageInstruction = language === Language.UR 
    ? "Respond entirely in Urdu (اردو). Use standard Urdu script." 
    : "Respond entirely in English.";

  const prompt = `
    Act as Zeenat-AI: The 360 Guardian. 
    You are a swarm of experts analyzing a situation for a Pakistani woman.

    LANGUAGE REQUIREMENT: ${languageInstruction}

    USER PROFILE:
    - Age: ${profile.age}
    - District: ${profile.district}
    - Marital Status: ${profile.maritalStatus}
    - Children: ${profile.childrenCount}
    - Employment: ${profile.isEmployed ? 'Employed' : 'Unemployed'}

    CONTEXT: ${typeof input === 'string' ? input : JSON.stringify(input)}

    SWARM ROLES:
    1. [Advocate]: Analyze civil law. 
       CRITICAL TASK: Audit "Column 17" (Right to Education/Work). Explain its legal validity in Pakistan. If it's missing or restricted, provide a path to reclaim it via a 'Supplemental Deed'.
    2. [Empowerment Auditor]: Specifically check if the "Right to Continue Education" is mentioned. Provide a separate summary of this right.
    3. [Sharia Expert]: Provide religious perspective on the husband's duty to permit education/work if agreed upon.
    4. [NGO Bridge]: Identify relevant NGO.
    5. [Case Preparer]: DRAFT A PROFESSIONAL DOCUMENT.

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
          empowermentAudit: {
            type: Type.OBJECT,
            properties: {
              educationRightStatus: { type: Type.STRING },
              workRightStatus: { type: Type.STRING },
              remedialAction: { type: Type.STRING }
            },
            required: ["educationRightStatus", "workRightStatus", "remedialAction"]
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
          },
          draftedDocument: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              type: { type: Type.STRING }
            },
            required: ["title", "content", "type"]
          }
        },
        required: ["advocate", "empowermentAudit", "shariaExpert", "ngoBridge", "draftedDocument"]
      }
    }
  });

  return JSON.parse(response.text);
};
