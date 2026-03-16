import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Método no permitido." });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ reply: "Falta el mensaje." });
    }

    const response = await client.responses.create({
      model: "gpt-5",
      input: message
    });

    return res.status(200).json({
      reply: response.output_text || "No hubo respuesta."
    });
  } catch (error) {
    return res.status(500).json({
      reply: "Ocurrió un error al consultar OpenAI."
    });
  }
}
