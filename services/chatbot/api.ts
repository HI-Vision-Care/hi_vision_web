// pages/api/gemini.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI } from "@google/genai";

type Data = { result?: string; message?: string };
type Message = { sender: "user" | "bot"; text: string };

// Khởi tạo client server-side
const ai = new GoogleGenAI({
  vertexai: false,
  apiKey: process.env.GEMINI_API_KEY!,
});

// Hướng dẫn chung (có thể thêm userInfo vào nếu cần)
const BASE_INSTRUCTION = `
Bạn là AI chat bot của HI-Vision, phong cách tận tâm, chuyên nghiệp và nhẹ nhàng.
Hãy trả lời dựa trên lịch sử hội thoại và đợi user hỏi rõ ràng khi cần.
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  // 1. Nhận history từ client
  const { history, userInfo } = req.body as {
    history?: Message[];
    userInfo?: { name: string; age: number; condition: string };
  };
  if (!history || !Array.isArray(history) || history.length === 0) {
    return res.status(400).json({ message: "Missing or invalid history" });
  }

  // 2. Xây systemInstruction: nếu client gửi userInfo, thêm vào
  let systemInstruction = BASE_INSTRUCTION.trim();
  if (userInfo) {
    systemInstruction += `\n\nThông tin bệnh nhân:\n• Name: ${userInfo.name}\n• Age: ${userInfo.age}\n• Condition: ${userInfo.condition}`;
  }

  // 3. Ghép history thành prompt string
  const promptString = history
    .map((m) => (m.sender === "user" ? `User: ${m.text}` : `Bot: ${m.text}`))
    .join("\n");

  try {
    // 4. Gọi Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: promptString,
      config: { systemInstruction },
    });
    return res.status(200).json({ result: response.text });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: err instanceof Error ? err.message : String(err) });
  }
}
