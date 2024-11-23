// import Groq from "groq-sdk";
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGroqChatCompletion(req, res) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Explain how AI works";
  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  // try {
  //   const userMessage = req.body.message || "cv";

  //   const completion = await groq.chat.completions.create({
  //     messages: [
  //       {
  //         role: "user",
  //         content: userMessage,
  //       },
  //     ],
  //     model: "llama3-8b-8192",
  //   });

  //   res.json({ reply: completion.choices[0].message.content });
  // } catch (error) {
  //   console.error("Error fetching chat completion:", error);
  //   res.status(500).json({ error: "Failed to get chat completion" });
  // }
}
