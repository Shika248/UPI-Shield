import { GoogleGenAI, Type } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API constraints: use gemini-3.5-flash for general tasks
  const MODEL = "gemini-3.5-flash";

  app.post("/api/analyze", async (req, res) => {
    try {
      const { type, content } = req.body;
      
      let prompt = "";
      if (type === "upi") {
        prompt = `Analyze this UPI ID or Payment Request context to determine if it's a scam: "${content}". 
        Evaluate formatting, known scam patterns, brand impersonation, and typo-squatting. 
        Provide a risk score (0-100, where 100 is highly dangerous) and a detailed explanation.`;
      } else if (type === "text") {
        prompt = `Analyze this message, SMS, or WhatsApp text for phishing or scam patterns: "${content}".
        Look for urgency, fake rewards, impersonation, or KYC scams. 
        Provide a risk score (0-100) and a detailed explanation.`;
      } else if (type === "qr-info") {
         prompt = `Analyze this extracted QR code payment information for scams: "${content}".
        Check for hidden intents, lookalike merchant names, or suspicious notes. Provide a risk score (0-100) and an explanation.`;
      }

      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
             type: Type.OBJECT,
             properties: {
                 riskScore: { type: Type.INTEGER, description: "Risk score from 0 (safe) to 100 (dangerous)." },
                 riskLevel: { type: Type.STRING, description: "Safe, Low Risk, Medium Risk, High Risk, or Critical." },
                 explanation: { type: Type.STRING, description: "Human-readable explanation of why this risk score was given." },
                 indicators: { 
                     type: Type.ARRAY, 
                     items: { type: Type.STRING },
                     description: "List of specific scam indicators found."
                 }
             },
             required: ["riskScore", "riskLevel", "explanation", "indicators"]
          }
        }
      });
      
      const text = response.text;
      if (text) {
          res.json(JSON.parse(text));
      } else {
        res.status(500).json({ error: "Failed to generate AI response" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || "Failed AI analysis" });
    }
  });


  app.post("/api/analyze-image", async (req, res) => {
    try {
      const { imageParams, promptText } = req.body;
      // imageParams: { inlineData: { data: base64, mimeType } }

      // We'll use gemini-3.5-flash since it accepts images as well, or gemini-2.5-flash-image
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          { text: promptText || "Analyze this QR code or payment screenshot for potential scam indicators. Provide risk assessment in JSON." },
          { inlineData: imageParams.inlineData }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
             type: Type.OBJECT,
             properties: {
                 riskScore: { type: Type.INTEGER },
                 riskLevel: { type: Type.STRING },
                 explanation: { type: Type.STRING },
                 indicators: { type: Type.ARRAY, items: { type: Type.STRING } }
             },
             required: ["riskScore", "riskLevel", "explanation", "indicators"]
          }
        }
      });
      
      const text = response.text;
      if (text) {
          res.json(JSON.parse(text));
      } else {
        res.status(500).json({ error: "Failed to generate AI response" });
      }
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message || "Failed AI analysis" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
