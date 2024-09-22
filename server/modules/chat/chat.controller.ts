import Groq from "groq-sdk";
require("dotenv").config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(req, res) {
  try {
    const userMessage =
      req.query.message || "what is html in 5 word";

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama3-8b-8192",
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    res.status(500).json({ error: "Failed to get chat completion" });
  }
}
